import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import ReasonBlock from '../components/ReasonBlock';
import { NAME } from '../globals';
import { Box, Button, Icon, IconEnum, ThemeContext } from '../Jet';


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

  .profits-img {
    max-width: 700px;
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
    .trusted-title {
      font-size: 1.0rem;
    }

    .brands {
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
      padding: 2rem 0 !important;
    }
  }
`;

export const HomePage = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.title = `${NAME} - The Ultimate Trading Indicator`;

    // Affiliates query
    const urlParams = new URLSearchParams(window.location.search);
    const affiliate = urlParams.get('r');

    if (affiliate) localStorage.setItem('ref', affiliate);
  });

  return (
    <PageStyle theme={theme}>
      <Box className="container" style={{ padding: '2rem 6rem', marginTop: '4rem', paddingBottom: '4rem' }} justifyContent="space-around" alignItems="center" spacing="1.6rem">
        <Box flexDirection="column" spacing="1.8rem">
          <div>
            <h1 className="welcome-text">Welcome to</h1>
            <h1 className="welcome-text text-primary">{NAME}</h1>
          </div>

          <p>The ultimate trading tool to help you gain an edge in the markets.</p>

          <Box spacing="1rem" className="action-buttons">
            <Button className="background-primary" onClick={() => window.location.href = '#/pricing'} large glowing><div style={{ color: theme.colors.text[0] }}>Get Access</div></Button>
            <Button onClick={() => window.location.href = '#/contact'} large style={{ backgroundColor: theme.colors.text[0] }}><div style={{ color: theme.colors.primary[0] }}>Contact</div></Button>
          </Box>

          <p>Take the complication out of trading &amp; simplify your charts with {NAME} 🚀</p>
        </Box>

        <img className="header-img" src="/img/home.png" alt={NAME + " Indicator"} style={{ borderRadius: theme.rounded, padding: '6rem 0' }} />
      </Box>

      <Box className="container" flexDirection="column" style={{ padding: '4rem 6rem', marginTop: '4rem', backgroundColor: theme.colors.background[1] }} justifyContent="space-around" alignItems="center" spacing="1.6rem">
        <h5 className="pretitle trusted-title">Trusted by Thousands of Traders</h5>

        <Box spacing="2rem" className="brands">
          <img src="/img/paypal.png" alt="PayPal" />
          <img src="/img/tradingview.png" alt="TradingView" />
        </Box>
      </Box>

      <Box className="container" flexDirection="column" style={{ padding: '2rem 6rem', marginTop: '4rem', paddingBottom: '6rem' }} spacing="1.6rem">
        <h1 className="reasons-text"><span className="text-primary">Reasons</span> to choose <br />{NAME}</h1>

        <Box display="grid" className="reasons" spacing="1.2rem">
          <ReasonBlock
            title="Increase Profits"
            description="Our trading tool can help you increase your profitability with simple buy &amp; sell signals."
            icon={IconEnum.money}
          />

          <ReasonBlock
            title="All Markets"
            description={NAME + " works in any market and any timeframe (Forex, Crypto, Options, etc). Perfect for day traders, swing traders and scalpers."}
            icon={IconEnum.accessibility}
          />

          <ReasonBlock
            title="Easy To Use"
            description="Our indicator is built to be beginner friendly, it is very easy to use and it also includes a tutorial."
            icon={IconEnum.checkmark}
          />

          <ReasonBlock
            title="Lifetime Access"
            description={`Say good-bye to annoying monthly payments, ${NAME} is a life time membership unlike our competitors who offer less value.`}
            icon={IconEnum.calendar}
          />
        </Box>
      </Box>

      <Box className="container background-primary" flexDirection="column" justifyContent="center" alignItems="center" style={{ padding: '4rem 6rem' }} spacing="1rem">
        <h2 className="quote" style={{ maxWidth: '50%', textAlign: 'center' }}>“{NAME} has changed the way I trade, I am able to utilize the features in the indicator to make consistent profits every day.”</h2>

        <div>
          <p>@Excluded</p>
          <small style={{ textAlign: 'center', display: 'block' }}>Day Trader</small>
        </div>
      </Box>

      <Box className="container" style={{ padding: '6rem' }} spacing="1rem" justifyContent="center">
        <Box flexDirection="column" spacing="1rem">
          <h5 className="pretitle" style={{ textAlign: 'left' }}>Features</h5>
          <h1>More Helpful Features 😉</h1>
          <p style={{ marginBottom: '1rem' }}>Take advantage of the many features {NAME} has to offer (all included in the one time payment)</p>

          <Box alignItems="center" spacing="1rem">
            <Icon className="background-primary" icon={IconEnum.checkmark_circle} style={{ borderRadius: theme.rounded, padding: '0.4rem' }} size={36} />
            <p>Automatic Support/Resistance</p>
          </Box>

          <Box alignItems="center" spacing="1rem">
            <Icon className="background-primary" icon={IconEnum.info} style={{ borderRadius: theme.rounded, padding: '0.4rem' }} size={36} />
            <p>Energy Cloud</p>
          </Box>
        </Box>
        <img className="header-img" src="https://i.imgur.com/irQgl4P.png" alt={NAME + "features"} />
      </Box>

      <Box className="container" style={{ padding: '6rem', backgroundColor: theme.colors.background[1] }} spacing="4.6rem" justifyContent="center">
        <img className="profits-img" src="/img/profit.png" alt={NAME + " Profits"} />

        <Box flexDirection="column" spacing="1.4rem" justifyContent="center">
          <h5 className="pretitle" style={{ textAlign: 'left' }}>Get Started</h5>
          <h1>Become A Profitable Trader</h1>
          <p style={{ maxWidth: '25rem' }}>Stop missing out on potential gains in the markets. {NAME} catches significant moves to the upside and downside for any market/timeframe.</p>
        </Box>
      </Box>
    </PageStyle>
  );
}

export default HomePage;
