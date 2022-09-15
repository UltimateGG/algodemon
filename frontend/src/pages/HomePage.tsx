import React, { useContext } from 'react';
import styled from 'styled-components';
import { Box, Button, Icon, IconEnum, ThemeContext } from '../Jet';


const PageStyle = styled.div.attrs((props: any) => props)`
  .welcome-text {
    font-size: 4rem;
    font-weight: 500;
    margin: 0;
  }

  .reasons-text {
    font-size: 3rem;
    font-weight: 500;
    margin: 0;
  }
  
  .home-img {
    max-width: 450px;
  }

  .brands img {
    max-height: 50px;
  }

  .reasons {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 1123px) {
    .container {
      flex-direction: column;
      padding: 2rem !important;
    }
    
    .home-img {
      max-width: 100%;
    }
  }

  @media (max-width: 900px) {
    .reasons {
      grid-template-columns: repeat(2, 1fr);
    }

    .quote {
      max-width: 70% !important;
    }
  }

  @media (max-width: 600px) {
    .brands {
      flex-direction: column;
      justify-content: center;
      align-items: center;

      img {
        max-height: auto !important;
        max-width: 50% !important;
      }
    }

    .reasons {
      grid-template-columns: repeat(1, 1fr);
    }

    .reasons-text {
      font-size: 2.6rem;
    }

    .quote {
      max-width: 95% !important;
    }
  }

  @media (max-width: 430px) {
    .welcome-text {
      font-size: 2.6rem;
    }

    .action-buttons button {
      padding: 0.6rem 1.2rem;
    }

    .sub-text {
      font-size: 1rem !important;
    }

    .profits-img {
      max-width: 300px !important;
    }
  }
`;

export const HomePage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <PageStyle theme={theme}>
      <Box className="container" style={{ padding: '2rem 6rem', marginTop: '4rem', paddingBottom: '6rem' }} justifyContent="space-around" alignItems="center" spacing="1.6rem">
        <Box flexDirection="column" spacing="1.8rem">
          <div style={{ lineHeight: 1 }}>
            <h1 className="welcome-text">Welcome to</h1>
            <h1 className="welcome-text" style={{ color: theme.colors.primary[0] }}>Algo Demon</h1>
          </div>

          <p className="sub-text" style={{ fontSize: '1.2rem', color: theme.colors.text[4] }}>The ultimate trading tool to help you gain an edge in the markets.</p>

          <Box spacing="1rem" className="action-buttons">
            <Button onClick={() => window.location.href = '/buy'} large glowing style={{ backgroundColor: theme.colors.primary[0] }}><div style={{ color: theme.colors.text[0] }}>Get Access</div></Button>
            <Button onClick={() => window.location.href = '/contact'} large style={{ backgroundColor: theme.colors.text[0] }}><div style={{ color: theme.colors.primary[0] }}>Contact</div></Button>
          </Box>

          <p style={{ color: theme.colors.text[5] }}>Take the complication out of trading &amp; simplify your charts with AlgoDemon 🚀</p>
        </Box>

        <img className="home-img" src="/img/home.png" alt="AlgoDemon Indicator" />
      </Box>

      <Box className="container" flexDirection="column" style={{ padding: '4rem 6rem', marginTop: '4rem', backgroundColor: theme.colors.background[1] }} justifyContent="space-around" alignItems="center" spacing="1.6rem">
        <h5 style={{ color: theme.colors.text[6], fontWeight: 500, textAlign: 'center' }}>TRUSTED BY THOUSANDS OF TRADERS</h5>

        <Box spacing="2rem" className="brands">
          <img src="/img/stripe.png" alt="Stripe" />
          <img src="/img/tradingview.png" alt="TradingView" />
        </Box>
      </Box>

      <Box className="container" flexDirection="column" style={{ padding: '2rem 6rem', marginTop: '4rem', paddingBottom: '6rem' }} spacing="1.6rem">
        <h1 className="reasons-text" style={{ marginBottom: '2rem' }}><span style={{ color: theme.colors.primary[0] }}>Reasons</span> to choose <br />AlgoDemon</h1>

        <Box display="grid" className="reasons" spacing="1.2rem">
          <Box flexDirection="column">
            <Icon icon={IconEnum.money} style={{ backgroundColor: theme.colors.primary[0], borderRadius: theme.rounded, padding: '0.2rem', marginBottom: '1.2rem' }} size={36} />
            <h5 style={{ fontWeight: 500 }}>Increase Profits</h5>
            <p style={{ color: theme.colors.text[5], textAlign: 'left' }}>Our trading tool can help you increase your profitability with simple buy &amp; sell signals.</p>
          </Box>

          <Box flexDirection="column">
            <Icon icon={IconEnum.accessibility} style={{ backgroundColor: theme.colors.primary[0], borderRadius: theme.rounded, padding: '0.2rem', marginBottom: '1.2rem' }} size={36} />
            <h5 style={{ fontWeight: 500 }}>All Markets</h5>
            <p style={{ color: theme.colors.text[5], textAlign: 'left' }}>AlgoDemon works in any market and any timeframe. Perfect for day traders, swing traders and scalpers!</p>
          </Box>

          <Box flexDirection="column">
            <Icon icon={IconEnum.checkmark} style={{ backgroundColor: theme.colors.primary[0], borderRadius: theme.rounded, padding: '0.2rem', marginBottom: '1.2rem' }} size={36} />
            <h5 style={{ fontWeight: 500 }}>Easy To Use</h5>
            <p style={{ color: theme.colors.text[5], textAlign: 'left' }}>Our indicator is built to be beginner friendly! It is very easy to use and it also includes a tutorial!</p>
          </Box>

          <Box flexDirection="column">
            <Icon icon={IconEnum.calendar} style={{ backgroundColor: theme.colors.primary[0], borderRadius: theme.rounded, padding: '0.2rem', marginBottom: '1.2rem' }} size={36} />
            <h5 style={{ fontWeight: 500 }}>Lifetime Access</h5>
            <p style={{ color: theme.colors.text[5], textAlign: 'left' }}>Say good-bye to annoying monthly payments, AlgoDemon is a life time membership unlike our competitors who offer less value!</p>
          </Box>
        </Box>
      </Box>

      <Box className="container" flexDirection="column" justifyContent="center" alignItems="center" style={{ padding: '4rem 6rem', backgroundColor: theme.colors.primary[0] }} spacing="1.6rem">
        <h2 className="quote" style={{ maxWidth: '50%', textAlign: 'center' }}>“AlgoDemon has changed the way I trade, I am able to utilize the features in the indicator to make consistent profits every day.”</h2>

        <p style={{ margin: 0, lineHeight: 0 }}>@kevintrades</p>
        <small style={{ marginBottom: '3rem', lineHeight: 0 }}>Day Trader</small>
      </Box>

      <Box className="container" style={{ padding: '6rem' }} spacing="2.6rem" justifyContent="center">
        <img className="profits-img" src="/img/profit.png" alt="AlgoDemon Profits" style={{ maxWidth: '500px', borderRadius: theme.rounded }} />

        <Box flexDirection="column" spacing="1.4rem" justifyContent="center">
          <h5 style={{ color: theme.colors.text[6], fontWeight: 500 }}>GET STARTED</h5>
          <h1 style={{ fontWeight: 500 }}>Become A Profitable Trader</h1>
          <p style={{ color: theme.colors.text[5], fontWeight: 100, fontSize: '1.2rem', maxWidth: '25rem' }}>Stop missing out on potential gains in the markets. AlgoDemon catches significant moves to the upside and downside for any market/timeframe.</p>
        </Box>
      </Box>
    </PageStyle>
  );
}

export default HomePage;
