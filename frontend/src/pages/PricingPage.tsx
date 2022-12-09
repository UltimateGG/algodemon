import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import CheckoutForm from '../components/CheckoutForm';
import FAQ from '../components/FAQ';
import { DISCORD_URL, NAME } from '../globals';
import { Box, Button, Divider, Modal, ThemeContext } from '../Jet';
import FreeTrialForm from '../components/FreeTrialForm';
import { ReviewsCarousel } from '../components/ReviewsCarousel';
import { useAuth } from '../contexts/AuthContext';


const PageStyle = styled.div.attrs((props: any) => props)`
  margin-top: 4rem;

  .purchase-box {
    border-radius: ${props => props.theme.rounded};
    background-color: ${props => props.theme.colors.background[1]};
    max-width: 60rem;
    margin: 0 4rem;
    margin-bottom: 4rem;
    transform: translateY(-8rem);
    box-shadow: 5px 5px 50px 1px rgba(0, 0, 0, 0.4);
  }

  .code-p {
    display: flex;
    align-items: center;
    background-color: ${props => props.theme.colors.background[2]};
    padding: 0.2rem 0.4rem;
    border-radius: ${props => props.theme.rounded};
    margin-top: 1rem;
  }

  .package-section {
    padding: 2rem 4rem;
  }

  .info-section {
    padding: 4rem 6rem;
    text-align: center;
  }

  h4 {
    text-align: left;
  }

  @media (max-width: 858px) {
    .packages-container {
      flex-direction: column;
    }

    .purchase-box {
      margin: 0 auto;
      margin-bottom: 4rem;
    }
  }

  @media (max-width: 728px) {
    .purchase-box {
      transform: translateY(-2rem);

      h4 {
        font-size: 1.2rem;
      }
    }

    .package-section {
      padding: 1.4rem;
    }

    .info-section {
      padding: 4rem 2rem !important;
    }

    .faq {
      flex-direction: column;
    }

    .section-header {
      margin-bottom: 2rem;
      font-size: 1.8rem;
    }
  }
`;

export const PricingPage = () => {
  const { theme } = useContext(ThemeContext);
  const [showCheckoutModal, setShowCheckoutModal] = React.useState(false);
  const [showTrialModal, setShowTrialModal] = React.useState(false);
  const { appState } = useAuth();


  useEffect(() => {
    document.title = `${NAME} - Pricing`;
  });

  return (
    <PageStyle theme={theme}>
      <Box className="info-section background-primary" flexDirection="column" alignItems="center" style={{ paddingBottom: '12rem' }}>
        <h5 className="pretitle" style={{ color: '#000' }}>Pricing</h5>
        <h1>Get Access</h1>
        <p style={{ maxWidth: '25rem', marginTop: '1.6rem', color: '#000' }}>Purchase life-time access to the most accurate trading indicator for just a one time payment.</p>
      </Box>

      <Box justifyContent="center" className="packages-container">
        {appState.freeTrialsEnabled && (
        <Box className="purchase-box" flexDirection="column" justifyContent="center" alignItems="center">
            <div className="package-section">
              <h1>$0.00
                <span style={{ display: 'inline', marginLeft: '1rem', fontSize: '1.4rem' }}><s style={{ color: theme.colors.text[8] }}>${appState.priceDisplay}</s></span>
              </h1>
              <p style={{ textAlign: 'center' }}>{appState.freeTrialDays} Day Free Trial</p>
            </div>

            <Box style={{ width: '100%' }} justifyContent="center" alignItems="center">
              <Divider style={{ borderColor: theme.colors.background[2] }} fullWidth />
            </Box>

            <div className="package-section">
              <div>
                <p>🟣 {appState.freeTrialDays} Days Access</p>
                <p>🟣 Buy &amp; Sell Signals</p>
                <p>🟣 3 Take Profit Signals</p>
              </div>

              <Button block large glowing style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: 0 }} onClick={() => setShowTrialModal(true)}>Start Trial</Button>
            </div>
          </Box>
        )}

        <Box className="purchase-box" flexDirection="column" justifyContent="center" alignItems="center">
          <div className="package-section">
            <h1>${appState.price}
              <span style={{ display: 'inline', marginLeft: '1rem', fontSize: '1.4rem' }}><s style={{ color: theme.colors.text[8] }}>${appState.priceDisplay}</s></span>
            </h1>
            <p style={{ textAlign: 'center' }}>One Time Payment</p>
          </div>

          <Box style={{ width: '100%' }} justifyContent="center" alignItems="center">
            <Divider style={{ borderColor: theme.colors.background[2] }} fullWidth />
          </Box>
          
          <div className="package-section">
            <div>
              <p>🟣 Lifetime Access</p>
              <p>🟣 Buy &amp; Sell Signals</p>
              <p>🟣 3 Take Profit Signals</p>
              <p>🟣 Free Updates</p>
              <p>🟣 24/7 Support</p>
            </div>

            <Button block large glowing style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: 0 }} onClick={() => setShowCheckoutModal(true)}>Purchase Now</Button>
          </div>
        </Box>
      </Box>

      <ReviewsCarousel primaryBackgroundColor={1} />

      <Box className="info-section faq" alignItems="center" justifyContent='space-around' style={{ paddingBottom: '6rem' }}>
        <h1 className="section-header" style={{ textAlign: 'left' }}>Frequently Asked Questions</h1>

        <Box flexDirection="column" spacing="2rem">
          <FAQ title={`What app do I use?`}>
            To use the indicator, you will need a free <a href="https://tradingview.com/" rel="noopener noreferrer" target="_blank">TradingView</a> account. This is where you will be able to view price data, and buy/sell signals.
          </FAQ>

          <FAQ title="Does it work for the free version of TradingView?">
            Yes, {NAME} works perfectly with the free version of TradingView.
          </FAQ>

          <FAQ title="How do I setup the algorithm?">
            Please see the tutorial on how to setup and use the algorithm <a href="#/tutorial">here</a>.
          </FAQ>

          <FAQ title={`How can I contact the ${NAME} team?`}>
            We offer 24/7 support, join our <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">Discord</a>!
          </FAQ>
        </Box>
      </Box>

      <Modal open={showTrialModal} onClose={() => setShowTrialModal(false)} title={'Free Trial'}>
       <FreeTrialForm onClose={() => setShowTrialModal(false)} />
      </Modal>
  
      <Modal open={showCheckoutModal} onClose={() => setShowCheckoutModal(false)} title={'Purchase ' + NAME}>
        <CheckoutForm
          price={appState.price}
          onSuccessfulCheckout={(data, username, id) => {
            window.location.href = '#/success';

            window.gtag('event', 'purchase', {
              'event_category': 'purchase',
              'event_label': 'purchase',
              'value': appState.price
            });
          }}
        />
      </Modal>
    </PageStyle>
  );
}

export default PricingPage;
