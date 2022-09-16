import React, { useContext } from 'react';
import styled from 'styled-components';
import { IS_SALE, ORIG_PRICE, PRICE } from '../globals';
import { Box, Button, ThemeContext } from '../Jet';


const PageStyle = styled.div.attrs((props: any) => props)`
  margin-top: 4rem;

  .purchase-box {
    transform: translateY(-8rem);

    h1, h2, h3, h4, h5, p, span, a, s {
      color: #000;
    }
  }

  .reviews {
    grid-template-columns: repeat(2, 1fr);
  }

  a {
    color: ${props => props.theme.colors.success[0]};
  }

  @media (max-width: 728px) {
    .purchase-box {
      transform: translateY(-2rem);
      padding: 2rem !important;

      h4 {
        font-size: 1.2rem;
      }
    }

    .info-section {
      padding: 4rem 2rem !important;
    }

    .limit {
      font-size: 1rem;
    }

    .reviews {
      grid-template-columns: 1fr;
    }

    .faq {
      flex-direction: column;
    }

    .faq-header {
      margin-bottom: 2rem;
      font-size: 1.8rem;
    }
  }
`;

export const BuyPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <PageStyle theme={theme}>
      <Box className="info-section" flexDirection="column" alignItems="center" style={{ backgroundColor: theme.colors.primary[0], padding: '4rem 6rem', paddingBottom: '12rem', textAlign: 'center' }}>
        <h5 style={{ color: theme.colors.text[6], fontWeight: 500 }}>PRICING</h5>
        <h1 style={{ fontWeight: 500 }}>Get Access</h1>
        <p style={{ color: theme.colors.text[5], fontWeight: 100, fontSize: '1.2rem', maxWidth: '25rem', marginTop: '1.6rem' }}>Purchase life-time access to our value packed trading tool that will help you simplify your charts and gain an edge in the markets for just a one time payment.</p>
      </Box>

      <Box justifyContent="center">
        <Box className="purchase-box" style={{ borderRadius: theme.rounded, padding: '2rem 6rem', backgroundColor: '#fff', maxWidth: '60rem', margin: '0 4rem', marginBottom: '8rem' }} flexDirection="column" justifyContent="center" alignItems="center" spacing="1.4rem">
          {IS_SALE && <h5 className="limit" style={{ color: theme.colors.success[0], fontWeight: 500, padding: '0.2rem 0.8rem', borderRadius: theme.roundedFull, backgroundColor: '#c4ffcf' }}>LIMITED TIME OFFER</h5>}
          <h1 style={{ fontWeight: 500 }}>${PRICE}
            {IS_SALE && <h4 style={{ display: 'inline', marginLeft: '1rem' }}><s style={{ color: theme.colors.text[8] }}>${ORIG_PRICE}</s></h4>}
          </h1>
          <p style={{ fontWeight: 100, fontSize: '1.2rem', textAlign: 'center' }}>One Time Payment</p>

          <div>
            <h4>🟣 Buy &amp; Sell Signals</h4>
            <h4>🟣 Free Updates</h4>
            <h4>🟣 24/7 Support</h4>
          </div>

          <Button block large glowing style={{ fontSize: '1.4rem', marginTop: '2rem' }}>Get Access</Button>
        </Box>
      </Box>

      <Box className="info-section" flexDirection="column" alignItems="center" style={{ backgroundColor: theme.colors.background[1], padding: '4rem 6rem', paddingBottom: '6rem', textAlign: 'center' }}>
        <h5 style={{ color: theme.colors.text[6], fontWeight: 500 }}>REVIEWS</h5>
        <h1 style={{ fontWeight: 500, marginBottom: '4rem' }}>See what our customers say</h1>

        <Box className="reviews" display="grid" spacing="2rem">
          <Box flexDirection="column" style={{ border: 0, backgroundColor: theme.colors.background[0], padding: '1.4rem', borderRadius: theme.rounded, maxWidth: '40rem' }}>
            <h5 style={{ fontWeight: 500, textAlign: 'left' }}>AlgoDemon paid for itself within the first trade!</h5>
            <p style={{ color: theme.colors.text[5], fontWeight: 100, textAlign: 'left', marginBottom: '1.4rem' }}>I was skeptical when buying AlgoDemon because I've tried similar indicators that haven't worked but my mind was blown when I made over $300 within my first trade using AlgoDemon!</p>

            <Box style={{ marginTop: 'auto'}}>
              <img src="https://i.imgur.com/J4cTu1k.png" style={{ width: '3rem', height: '3rem', borderRadius: '50%', marginRight: '1rem' }} alt="Avatar" />
              <p style={{ textAlign: 'left' }}>Justin
                <br /><small>Options Trader</small>
              </p>
            </Box>
          </Box>

          <Box flexDirection="column" style={{ border: 0, backgroundColor: theme.colors.background[0], padding: '1.4rem', borderRadius: theme.rounded, maxWidth: '40rem' }}>
            <h5 style={{ fontWeight: 500, textAlign: 'left' }}>I can't believe more people aren't using it</h5>
            <p style={{ color: theme.colors.text[5], fontWeight: 100, textAlign: 'left', marginBottom: '1.4rem' }}>I was blessed to find an ad about AlgoDemon, I've been using it for a month now and i've never made so much money trading futures. Thank you AlgoDemon team!</p>

            <Box style={{ marginTop: 'auto' }}>
              <img src="https://i.imgur.com/5BZzfN2.png" style={{ width: '3rem', height: '3rem', borderRadius: '50%', marginRight: '1rem' }} alt="Avatar" />
              <p style={{ textAlign: 'left' }}>KingJay
                <br /><small>Currency Trader</small>
              </p>
            </Box>
          </Box>

          <Box flexDirection="column" style={{ border: 0, backgroundColor: theme.colors.background[0], padding: '1.4rem', borderRadius: theme.rounded, maxWidth: '40rem' }}>
            <h5 style={{ fontWeight: 500, textAlign: 'left' }}>Just when I was about to give up on trading...</h5>
            <p style={{ color: theme.colors.text[5], fontWeight: 100, textAlign: 'left', marginBottom: '1.4rem' }}>I am so lucky to have found AlgoDemon. Before using AD, I was constantly losing money and blowing up my account, it was so frustrating. But once I started using AlgoDemon that completely changed. Since purchasing I've made enough to buy myself my dream computer setup!</p>

            <Box style={{ marginTop: 'auto'}}>
              <img src="https://i.imgur.com/SI2i8re.png" style={{ width: '3rem', height: '3rem', borderRadius: '50%', marginRight: '1rem' }} alt="Avatar" />
              <p style={{ textAlign: 'left' }}>AdrianFX
                <br /><small>Forex Day Trader</small>
              </p>
            </Box>
          </Box>

          <Box flexDirection="column" style={{ border: 0, backgroundColor: theme.colors.background[0], padding: '1.4rem', borderRadius: theme.rounded, maxWidth: '40rem' }}>
            <h5 style={{ fontWeight: 500, textAlign: 'left' }}>The best that I've ever used!</h5>
            <p style={{ color: theme.colors.text[5], fontWeight: 100, textAlign: 'left', marginBottom: '1.4rem' }}>AlgoDemon is so much better than other indicators I have used. First off, it offers more features for a cheaper price unlike other greedy companies! Second of all the signals actually work and I was able to make back the cost of the algo within the first day of purchasing! I definitely recommend it.</p>

            <Box style={{ marginTop: 'auto'}}>
              <img src="https://i.imgur.com/5BZzfN2.png" style={{ width: '3rem', height: '3rem', borderRadius: '50%', marginRight: '1rem' }} alt="Avatar" />
              <p style={{ textAlign: 'left' }}>Ahmed
                <br /><small>Stock Swing Trader</small>
              </p>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="info-section faq" alignItems="center" justifyContent='space-around' style={{ padding: '4rem 6rem', paddingBottom: '6rem', textAlign: 'center' }}>
        <h1 className="faq-header" style={{ fontWeight: 500, textAlign: 'left' }}>Frequently Asked Questions</h1>

        <Box flexDirection="column" spacing="2rem">
          <Box flexDirection="column" style={{ backgroundColor: theme.colors.background[1], padding: '1.4rem', borderRadius: theme.rounded, maxWidth: '40rem' }}>
            <h4 style={{ fontWeight: 500, textAlign: 'left' }}>Does AlgoDemon work for forex?</h4>
            <p style={{ color: theme.colors.text[5], fontWeight: 100, textAlign: 'left' }}>Yes! Our trading algorithm works for all markets and all timeframes!</p>
          </Box>

          <Box flexDirection="column" style={{ backgroundColor: theme.colors.background[1], padding: '1.4rem', borderRadius: theme.rounded, maxWidth: '40rem' }}>
            <h4 style={{ fontWeight: 500, textAlign: 'left' }}>How do I setup the algorithm?</h4>
            <p style={{ color: theme.colors.text[5], fontWeight: 100, textAlign: 'left' }}>Its very simple to setup/use! Follow the tutorial <a href="/tutorial">here</a>.</p>
          </Box>

          <Box flexDirection="column" style={{ backgroundColor: theme.colors.background[1], padding: '1.4rem', borderRadius: theme.rounded, maxWidth: '40rem' }}>
            <h4 style={{ fontWeight: 500, textAlign: 'left' }}>Does it work for the free version of Tradingview?</h4>
            <p style={{ color: theme.colors.text[5], fontWeight: 100, textAlign: 'left' }}>Yes! AlgoDemon works perfectly with the free version of Tradingview.</p>
          </Box>

          <Box flexDirection="column" style={{ backgroundColor: theme.colors.background[1], padding: '1.4rem', borderRadius: theme.rounded, maxWidth: '40rem' }}>
            <h4 style={{ fontWeight: 500, textAlign: 'left' }}>How can I contact the AlgoDemon team?</h4>
            <p style={{ color: theme.colors.text[5], fontWeight: 100, textAlign: 'left' }}>We offer 24/7 support, just <a href="contact">send us a message</a>!</p>
          </Box>
        </Box>
      </Box>
    </PageStyle>
  );
}

export default BuyPage;
