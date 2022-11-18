import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import ReasonBlock from '../components/ReasonBlock';
import { DISCORD_URL, FREE_TRIALS_ACTIVE, NAME } from '../globals';
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

  .reason-sect:nth-child(even) {
    margin-left: auto;
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
    max-width: 500px;
  }

  .brands img {
    max-height: 50px;
  }

  @media (max-width: 1400px) {
    .container {
      flex-direction: column;
      padding: 2rem !important;
    }

    .header-img {
      padding: 0 !important;
    }
  }

  @media (max-width: 900px) {
    .quote {
      max-width: 70% !important;
    }

    .reason-sect {
      flex-direction: column;

      p {
        max-width: 100% !important;
      }
    }

    .phone-img {
      max-height: 400px;
      object-fit: contain;
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

    .reasons-text {
      font-size: 2rem;
    }

    .quote {
      max-width: 95% !important;
      font-size: 1.4rem !important;
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
    document.title = NAME + ' - Accurate Buy & Sell Signals';

    // Affiliates query
    const urlParams = new URLSearchParams(window.location.search);
    const affiliate = urlParams.get('r');

    if (affiliate) localStorage.setItem('ref', affiliate);
  });

  return (
    <PageStyle theme={theme}>
      <Box className="container" style={{ padding: '1rem 6rem', marginTop: '4rem', paddingBottom: '1rem' }} justifyContent="space-around" alignItems="center" spacing="1.6rem">
        <Box flexDirection="column" spacing="1.8rem">
          <div>
            <h1 className="welcome-text">Welcome to</h1>
            <h1 className="welcome-text text-primary">{NAME}</h1>
          </div>

          <p>The most accurate real time trading indicator.</p>
          {FREE_TRIALS_ACTIVE && <p>Try it <u>free</u> for 7 days.</p>}

          <Box spacing="1rem" className="action-buttons">
            <Button className="background-primary" onClick={() => window.location.href = '#/pricing'} large glowing><div style={{ color: theme.colors.text[0] }}>{FREE_TRIALS_ACTIVE ? 'Free Trial' : 'Get Access'}</div></Button>
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
              <Button large style={{ backgroundColor: theme.colors.text[0] }}><div style={{ color: theme.colors.primary[0] }}>Discord</div></Button>
            </a>
          </Box>
        </Box>

        <img className="header-img" src="/img/home.png" alt={NAME + " Indicator"} style={{ borderRadius: theme.rounded, padding: '6rem 0' }} />
      </Box>

      <Box className="container" flexDirection="column" style={{ padding: '4rem 6rem', marginTop: '1rem', backgroundColor: theme.colors.background[1] }} justifyContent="space-around" alignItems="center" spacing="1.6rem">
        <Box spacing="2rem" className="brands">
          <img src="/img/paypal.png" alt="PayPal" />
          <img src="/img/tradingview.png" alt="TradingView" />
        </Box>
      </Box>

      <Box className="container" flexDirection="column" style={{ padding: '2rem 6rem', marginTop: '4rem', paddingBottom: '6rem', overflowX: 'hidden' }} spacing="1.6rem">
        <h1 className="reasons-text"><span className="text-primary">Reasons</span> to choose {NAME}</h1>

        <Box flexDirection="column" spacing="2rem">
          <Box spacing="1rem" className="reason-sect">
            <img className="reason-img phone-img" src="/img/phone.png" alt="Mobile Signals" style={{
              transform: 'perspective(700px) rotateX(10deg) rotateY(15deg)',
            }} />
            <ReasonBlock
              title="Simple"
              description={<p style={{ maxWidth: '25rem' }}>
                {NAME} will display precise entries through buy/sell signals, and profitable exits using 3 different take profit targets, all while limiting risk with tight built-in stop-losses. {NAME} can be used by traders of all experience levels. You can even trade from your phone while at work or school. 
              </p>}
              icon={IconEnum.phone}
            />
          </Box>

          <Box spacing="1rem" className="reason-sect">
            <img className="reason-img" src="https://i.imgur.com/6nbgdW3.png" alt="Buy signal bull run" />
            <ReasonBlock
              title="Accurate"
              description={<p style={{ maxWidth: '25rem' }}>
                {NAME} has an extremely high win rate and works in real time, unlike many indicators which lag or repaint. With an extremely tight stop loss and accurate take profit signals, the risk to reward ratio is unmatched by any other indicator.
              </p>}
              icon={IconEnum.money}
            />
          </Box>
          
          <Box spacing="1rem" className="reason-sect">
            <img className="reason-img" src="https://i.imgur.com/TQXdpyj.png" alt="Sell signal with 3 take profit points" />
            <ReasonBlock
              title="Realistic"
              description={<p style={{ maxWidth: '25rem' }}>{NAME} works in real time. The dotted red line you see is when the signal fired. Signals and take profit points fire on the next candle's <strong>open</strong>, not close, unlike many indicators that show unrealistic results. {NAME} does not retract signals, so once a candle opens and you see a signal, it is already confirmed for you, and you are not lagging by one candle.</p>}
              icon={IconEnum.checkmark}
            />
          </Box>
          
          <Box spacing="1rem" className="reason-sect">
            <img className="reason-img" src="https://i.imgur.com/UNZWfXv.png" alt="Trading signals" />
            <ReasonBlock
              title="All Markets"
              description={<p style={{ maxWidth: '25rem' }}>{NAME}  works on any market (Forex, Crypto, Options, etc), stock, or timeframe. Perfect for any trader, regardless of their experience or trading style.</p>}
              icon={IconEnum.accessibility}
            />
          </Box>
        </Box>
      </Box>

      <Box className="container background-primary" flexDirection="column" justifyContent="center" alignItems="center" style={{ padding: '4rem 6rem' }} spacing="1rem">
        <h2 className="quote" style={{ maxWidth: '50%', textAlign: 'center' }}>“{NAME} has changed the way I trade, I am able to make consistent profits every day with minimal risk.”</h2>

        <div>
          <p>@Excluded</p>
          <small style={{ textAlign: 'center', display: 'block' }}>Day Trader</small>
        </div>
      </Box>

      <Box className="container" style={{ padding: '6rem' }} spacing="1rem" justifyContent="center">
        <Box flexDirection="column" spacing="1rem">
          <h5 className="pretitle" style={{ textAlign: 'left' }}>Features</h5>
          <h1>All Features</h1>
          <p style={{ marginBottom: '1rem' }}>Take advantage of the amazing features {NAME} has to offer.</p>

          <Box alignItems="center" spacing="1rem">
            <Icon className="background-primary" icon={IconEnum.checkmark_circle} style={{ borderRadius: theme.rounded, padding: '0.4rem' }} size={36} />
            <p>Buy/Sell Signals</p>
          </Box>

          <Box alignItems="center" spacing="1rem">
            <Icon className="background-primary" icon={IconEnum.info} style={{ borderRadius: theme.rounded, padding: '0.4rem' }} size={36} />
            <p>3 Take Profit Points</p>
          </Box>

          <Box alignItems="center" spacing="1rem">
            <Icon className="background-primary" icon={IconEnum.lock} style={{ borderRadius: theme.rounded, padding: '0.4rem' }} size={36} />
            <p>Tight Stop Loss</p>
          </Box>

          <Box alignItems="center" spacing="1rem">
            <Icon className="background-primary" icon={IconEnum.clock} style={{ borderRadius: theme.rounded, padding: '0.4rem' }} size={36} />
            <p>Constant Updates</p>
          </Box>
          
          <Box alignItems="center" spacing="1rem">
            <Button color="secondary" onClick={() => {
              window.scrollTo(0, 0);
              setTimeout(() => window.location.href = '#/tutorial', 100);
            }}>See Tutorial</Button>
          </Box>
        </Box>

        <img className="header-img" src="https://i.imgur.com/RwluSq8.png" style={{ maxHeight: '330px', maxWidth: '550px' }} alt={NAME + " Features"} />
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
