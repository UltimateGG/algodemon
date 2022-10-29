import { useContext, useEffect, useState } from 'react';
import { Box, Icon, IconEnum, Progress, TextField, ThemeContext } from '../Jet';
import { apiGet, apiPost } from '../api/apiExecutor';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";


export interface CheckoutFormProps {
  price: number;
  onSuccessfulCheckout: (data: any, username: string, ref: string, id: string) => void;
}
const CheckoutForm = ({ price, onSuccessfulCheckout }: CheckoutFormProps) => {
  const { theme } = useContext(ThemeContext);
  const [username, setUsername] = useState<string>('');
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    dispatch({
        type: 'resetOptions',
        value: {
            ...options,
            currency: 'USD',
        },
    });
}, [price]); // eslint-disable-line

  return (
    <>
      <h2 style={{ marginBottom: 0 }}>TradingView</h2>
      <TextField
        name="username"
        placeholder="TradingView Username"
        type="text"
        fullWidth
        required
        value={username}
        onChanged={setUsername}
        style={{ marginBottom: '0.2rem' }}
      />

      {error !== '' && (
        <Box flexDirection="column" justifyContent="center" alignItems="center">
          <h1 style={{ color: theme.colors.danger[0], fontSize: '3rem' }}><Icon icon={IconEnum.error} size={36} color={theme.colors.danger[0]} /> Error</h1>
          <p>{error}</p>
        </Box>
      )}

      <h2 style={{ marginTop: '0.4rem', marginBottom: 0 }}>Payment</h2>
      <div style={{ marginTop: '0.2rem' }}>
        {isPending ? <Progress circular indeterminate /> : (
          <PayPalButtons
            disabled={username.trim() === ''}
            forceReRender={[price, username]}
            onClick={() => setError('')}
            createOrder={(data, actions) => {
              const intent = apiGet(`payment/intent?ref=${localStorage.getItem('ref')}`).then(res => {
                if (res.error) return setError(res.error);
                return res.data.id;
              });

              return intent;
            }}
            onApprove={async (data, actions) => {
              apiPost('payment/verify', {
                paymentId: data.paymentID || '[unknown]',
                payerId: data.payerID || '[unknown]',
                username: username,
                ref: localStorage.getItem('ref')
              }).then(res => {
                if (res.error) return setError(res.error);
                onSuccessfulCheckout(res.data.log || res.data, username, localStorage.getItem('ref') || '[none]', data.paymentID || '[unknown]');
              });
            }}
            onError={(err) => {
              setError(err.toString());
            }}
          />
        )}
      </div>
    </>
  );
}

export default CheckoutForm;
