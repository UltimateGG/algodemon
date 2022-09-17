import { useContext, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

import BillingDetailsFields, { countryToCode } from './checkout/BillingDetailsFields';
import CheckoutError from './checkout/CheckoutError';
import styled from 'styled-components';
import { Button, Progress, TextField, ThemeContext } from '../Jet';


const CardElementContainer = styled.div.attrs((props: any) => props)`
  height: 40px;
  & .StripeElement {
    width: 100%;
    padding: 16px;
    border: 1px solid ${props => props.theme.colors.background[5]};
    border-radius: ${props => props.theme.rounded};
    background-color: ${props => props.theme.colors.background[1]};
  }
`;

export interface CheckoutFormProps {
  price: number;
  onSuccessfulCheckout: () => void;
}
const CheckoutForm = ({ price, onSuccessfulCheckout }: CheckoutFormProps) => {
  const { theme } = useContext(ThemeContext);
  const [isProcessing, setProcessingTo] = useState<boolean>(false);
  const [checkoutError, setCheckoutError] = useState<string>('');
  const [country, setCountry] = useState<string>('United States of America');

  const stripe = useStripe();
  const elements = useElements();

  if (!stripe || !elements)
    return null;
  
  const handleCardDetailsChange = (ev: any) => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError('');
  };

  const handleFormSubmit = async (ev: any) => {
    ev.preventDefault();

    const billingDetails = {
      name: ev.target.name.value,
      email: ev.target.email.value,
      address: {
        city: ev.target.city.value,
        line1: ev.target.address.value,
        state: ev.target.state.value,
        postal_code: ev.target.zip.value,
        country: countryToCode(country)
      }
    };

    setProcessingTo(true);

    const cardElement = elements.getElement('card');

    try {
      if (!cardElement)
        throw new Error('Card element not found');

      const { data } = await axios.get("api/payment");
      const { secret, id } = data;

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billingDetails
      });

      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message || 'Unknown error');
        setProcessingTo(false);
        return;
      }

      const { error } = await stripe.confirmCardPayment(secret, {
        payment_method: paymentMethodReq.paymentMethod.id
      });

      if (error) {
        setCheckoutError(error.message || 'Unknown error');
        setProcessingTo(false);
        return;
      }

      await axios.post('/api/payment', { paymentIntentId: id, username: ev.target.username.value });
      onSuccessfulCheckout();
    } catch (err) {
      setCheckoutError((err as any).message);
      setProcessingTo(false);
    }
  };

  const iframeStyles = {
    base: {
      color: theme.colors.text[0],
      fontSize: "16px",
      iconColor: theme.colors.text[0],
      "::placeholder": {
        color: theme.colors.background[6]
      }
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "#FFC7EE"
    },
    complete: {
      iconColor: "#cbf4c9"
    }
  };

  const cardElementOpts = {
    style: iframeStyles,
    hidePostalCode: true
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h2>Customer Info</h2>
      <BillingDetailsFields country={country} onSetCountry={setCountry} />

      <h2 style={{ marginTop: '2rem' }}>Payment Info</h2>
      <CardElementContainer theme={theme}>
        <CardElement
          options={cardElementOpts}
          onChange={handleCardDetailsChange}
        />
      </CardElementContainer>

      <h2 style={{ marginTop: '2rem' }}>TradingView</h2>
      <TextField
        name="username"
        placeholder="TradingView Username"
        type="text"
        fullWidth
        required
      />

      {checkoutError !== '' && <CheckoutError>{checkoutError}</CheckoutError>}
      <Button large block disabled={isProcessing || !stripe} style={{ fontSize: '1.2rem', marginTop: '2rem', marginBottom: 0 }}>
        {isProcessing ? 'Processing...' : `Pay $${price}`}
      </Button>
      {isProcessing && <Progress indeterminate />}
    </form>
  );
};

export default CheckoutForm;
