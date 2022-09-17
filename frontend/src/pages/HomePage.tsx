import React, { useContext } from 'react';
import styled from 'styled-components';
import ReasonBlock from '../components/ReasonBlock';
import { Box, Button, IconEnum, ThemeContext } from '../Jet';


const PageStyle = styled.div.attrs((props: any) => props)`
  .welcome-text {
    font-size: 4rem;
    font-weight: 500;
    margin: 0;
  }

  .text-left {
    text-align: left;
  }

  .reasons-text {
    margin: 0;
    margin-bottom: 2rem;
    font-size: 3rem;
    font-weight: 500;

    span {
      font-weight: 500;
    }
  }
  
  .header-img {
    max-width: 100%;
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
      grid-template-columns: 1fr;
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

    .profits-img {
      max-width: 300px !important;
    }
  }
`;

export const HomePage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <PageStyle theme={theme}>
      <Box className="container" style={{ padding: '2rem 6rem', marginTop: '4rem', paddingBottom: '4rem' }} justifyContent="space-around" alignItems="center" spacing="1.6rem">
        <Box flexDirection="column" spacing="1.8rem">
          <div>
            <h1 className="welcome-text">Welcome to</h1>
            <h1 className="welcome-text text-primary">Algo Demon</h1>
          </div>

          <p>The ultimate trading tool to help you gain an edge in the markets.</p>

          <Box spacing="1rem" className="action-buttons">
            <Button className="background-primary" onClick={() => window.location.href = '/pricing'} large glowing><div style={{ color: theme.colors.text[0] }}>Get Access</div></Button>
            <Button onClick={() => window.location.href = '/contact'} large style={{ backgroundColor: theme.colors.text[0] }}><div style={{ color: theme.colors.primary[0] }}>Contact</div></Button>
          </Box>

          <p>Take the complication out of trading &amp; simplify your charts with AlgoDemon 🚀</p>
        </Box>

        <img className="header-img" src="/img/home.png" alt="AlgoDemon Indicator" />
      </Box>

      <Box className="container" flexDirection="column" style={{ padding: '4rem 6rem', marginTop: '4rem', backgroundColor: theme.colors.background[1] }} justifyContent="space-around" alignItems="center" spacing="1.6rem">
        <h5 className="pretitle">Trusted by Thousands of Traders</h5>

        <Box spacing="2rem" className="brands">
          <img src="/img/stripe.png" alt="Stripe" />
          <img src="/img/tradingview.png" alt="TradingView" />
        </Box>
      </Box>

      <Box className="container" flexDirection="column" style={{ padding: '2rem 6rem', marginTop: '4rem', paddingBottom: '6rem' }} spacing="1.6rem">
        <h1 className="reasons-text"><span className="text-primary">Reasons</span> to choose <br />AlgoDemon</h1>

        <Box display="grid" className="reasons" spacing="1.2rem">
          <ReasonBlock
            title="Increase Profits"
            description="Our trading tool can help you increase your profitability with simple buy &amp; sell signals."
            icon={IconEnum.money}
          />

          <ReasonBlock
            title="All Markets"
            description="AlgoDemon works in any market and any timeframe. Perfect for day traders, swing traders and scalpers!"
            icon={IconEnum.accessibility}
          />

          <ReasonBlock
            title="Easy To Use"
            description="Our indicator is built to be beginner friendly! It is very easy to use and it also includes a tutorial!"
            icon={IconEnum.checkmark}
          />

          <ReasonBlock
            title="Lifetime Access"
            description="Say good-bye to annoying monthly payments, AlgoDemon is a life time membership unlike our competitors who offer less value!"
            icon={IconEnum.calendar}
          />
        </Box>
      </Box>

      <Box className="container background-primary" flexDirection="column" justifyContent="center" alignItems="center" style={{ padding: '4rem 6rem' }} spacing="1em">
        <h2 className="quote" style={{ maxWidth: '50%', textAlign: 'center' }}>“AlgoDemon has changed the way I trade, I am able to utilize the features in the indicator to make consistent profits every day.”</h2>

        <div>
          <p>@Excluded</p>
          <small style={{ textAlign: 'center', display: 'block' }}>Day Trader</small>
        </div>
      </Box>

      <Box className="container" style={{ padding: '6rem' }} spacing="2.6rem" justifyContent="center">
        <img className="profits-img" src="/img/profit.png" alt="AlgoDemon Profits" style={{ maxWidth: '500px', borderRadius: theme.rounded }} />

        <Box flexDirection="column" spacing="1.4rem" justifyContent="center">
          <h5 className="pretitle" style={{ textAlign: 'left' }}>Get Started</h5>
          <h1>Become A Profitable Trader</h1>
          <p style={{ maxWidth: '25rem' }}>Stop missing out on potential gains in the markets. AlgoDemon catches significant moves to the upside and downside for any market/timeframe.</p>
        </Box>
      </Box>
    </PageStyle>
  );
}

export default HomePage;
