import React, { useContext } from 'react';
import styled from 'styled-components';
import CheckoutForm from '../components/CheckoutForm';
import FAQ from '../components/FAQ';
import Review from '../components/Review';
import { IS_SALE, ORIG_PRICE, PRICE } from '../globals';
import { Box, Button, Divider, Modal, ThemeContext } from '../Jet';


const PageStyle = styled.div.attrs((props: any) => props)`
  margin-top: 4rem;

  .purchase-box {
    border-radius: ${props => props.theme.rounded};
    background-color: #fff;
    max-width: 60rem;
    margin: 0 4rem;
    margin-bottom: 4rem;
    transform: translateY(-8rem);

    h1, h2, h3, h4, h5, p, span, a, s {
      color: #000;
    }
  }

  .package-section {
    padding: 2rem 4rem;
  }

  .limit {
    color: ${props => props.theme.colors.success[0]} !important;
    padding: 0.2rem 0.8rem;
    text-align: center;
    border-radius: ${props => props.theme.roundedFull};
    background-color: #c4ffcf;
  }

  .reviews {
    grid-template-columns: repeat(2, 1fr);
  }

  a {
    color: ${props => props.theme.colors.success[0]};
  }

  h4 {
    text-align: left;
  }

  @media (max-width: 728px) {
    .purchase-box {
      transform: translateY(-2rem);

      h4 {
        font-size: 1.2rem;
      }
    }

    .package-section {
      padding: 2rem;
    }

    .info-section {
      padding: 4rem 2rem !important;
    }

    .limit {
      font-size: 1.2rem;
    }

    .reviews {
      grid-template-columns: 1fr;
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
  const [showModal, setShowModal] = React.useState(false);

  return (
    <PageStyle theme={theme}>
      <Box className="info-section background-primary" flexDirection="column" alignItems="center" style={{ padding: '4rem 6rem', paddingBottom: '12rem', textAlign: 'center' }}>
        <h5 className="pretitle">Pricing</h5>
        <h1>Get Access</h1>
        <p style={{ maxWidth: '25rem', marginTop: '1.6rem' }}>Purchase life-time access to our value packed trading tool that will help you simplify your charts and gain an edge in the markets for just a one time payment.</p>
      </Box>

      <Box justifyContent="center">
        <Box className="purchase-box" flexDirection="column" justifyContent="center" alignItems="center">
          <div className="package-section">
            {IS_SALE && <h5 className="limit pretitle">Limited Time Offer</h5>}
            <h1>${PRICE}
              {IS_SALE && <span style={{ display: 'inline', marginLeft: '1rem', fontSize: '1.4rem' }}><s style={{ color: theme.colors.text[8] }}>${ORIG_PRICE}</s></span>}
            </h1>
            <p style={{ textAlign: 'center' }}>One Time Payment</p>
          </div>

          <Divider style={{ borderColor: theme.colors.text[3] }} fullWidth />

          <div className="package-section">
            <div>
              <p>🟣 Buy &amp; Sell Signals</p>
              <p>🟣 Free Updates</p>
              <p>🟣 24/7 Support</p>
            </div>

            <Button block large glowing style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: 0 }} onClick={() => setShowModal(true)}>Get Access</Button>
          </div>
        </Box>
      </Box>

      <Box className="info-section" flexDirection="column" alignItems="center" style={{ backgroundColor: theme.colors.background[1], padding: '4rem 6rem', paddingBottom: '6rem', textAlign: 'center' }}>
        <h5 className="pretitle">Top Reviews</h5>
        <h1 className="section-header" style={{ marginBottom: '4rem' }}>See what our customers say</h1>

        <Box className="reviews" display="grid" spacing="2rem">
          <Review
            title="Paid for itself within the first trade!"
            description="I was skeptical when buying AlgoDemon because I've tried similar indicators that haven't worked but my mind was blown when I made over $160 within my first trade."
            avatar="https://i.imgur.com/qSHZSKw.png"
            name="Lxgan"
            subtitle="Options Trader"
          />

          <Review
            title="I can't believe more people aren't using it"
            description="I was blessed to find an ad about AlgoDemon, I've been using it for a month now and i've never made so much money trading futures. Thank you AlgoDemon team!"
            avatar="https://i.imgur.com/OioRfhl.png"
            name="Cptp"
            subtitle="Forex Day Trader"
          />

          <Review
            title="Just when I was about to give up on trading..."
            description="Before using AlgoDemon, I was constantly losing money and blowing up my account, it was so frustrating. But once I started using AlgoDemon that completely changed. Since purchasing I've made enough to buy myself my dream computer setup!"
            avatar="https://i.imgur.com/pCDVL6G.png"
            name="Luxy"
            subtitle="Forex Day Trader"
          />

          <Review
            title="The best that I've ever used!"
            description="AlgoDemon is so much better than other indicators I have used. First off, it offers more features for a cheaper price unlike other greedy companies! Second of all the signals actually work and I was able to make back the cost of the algo within the first day of purchasing! I definitely recommend it."
            avatar="https://i.imgur.com/U9H3Be4.png"
            name="Pot_Rapid"
            subtitle="Stock Swing Trader"
          />
        </Box>
      </Box>

      <Box className="info-section faq" alignItems="center" justifyContent='space-around' style={{ padding: '4rem 6rem', paddingBottom: '6rem', textAlign: 'center' }}>
        <h1 className="section-header" style={{ textAlign: 'left' }}>Frequently Asked Questions</h1>

        <Box flexDirection="column" spacing="2rem">
          <FAQ title="Does AlgoDemon work for forex?">
            Yes! Our trading algorithm works for all markets and all timeframes!
          </FAQ>

          <FAQ title="How do I setup the algorithm?">
            Its very simple to setup/use! Follow the tutorial <a href="/tutorial">here</a>.
          </FAQ>

          <FAQ title="Does it work for the free version of Tradingview?">
            Yes! AlgoDemon works perfectly with the free version of Tradingview.
          </FAQ>

          <FAQ title="How can I contact the AlgoDemon team?">
            We offer 24/7 support, just <a href="contact">send us a message</a>!
          </FAQ>
        </Box>
      </Box>


      <Modal open={showModal} onClose={() => setShowModal(false)} title="Purchase AlgoDemon">
        <CheckoutForm
          price={PRICE}
          onSuccessfulCheckout={() => window.location.href = '/success'}
        />
      </Modal>
    </PageStyle>
  );
}

export default PricingPage;
