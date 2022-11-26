import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import ReasonBlock from '../components/ReasonBlock';
import { DISCORD_URL, FREE_TRIALS_ACTIVE, NAME } from '../globals';
import { Box, Button, Icon, IconEnum, ThemeContext } from '../Jet';
import { ReviewsCarousel } from '../components/ReviewsCarousel';


const PageStyle = styled.div.attrs((props: any) => props)`
  #video-header {
    background: url('/img/phone.png') no-repeat center center;
    width: 100%;
    height: 600px;
    object-fit: cover;
    object-position: center;
  }

  .welcome-text {
    font-size: 4rem;
    font-weight: 500;
    margin: 0;
    margin-bottom: 0.4rem;

    span {
      font-weight: 500;
    }
  }

  .action-buttons {
    margin-top: 1rem;
  }

  .text-left {
    text-align: left;
  }

  .reason-sect:nth-child(even) {
    margin-left: auto;
  }

  .stat-text {
    margin: 0;
    text-align: center;

    span {
      font-weight: 500;
    }
  }

  .reasons-text {
    margin: 0;
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
      padding: 1.4rem !important;
    }

    .header-img {
      padding: 0 !important;
    }
  }

  @media (max-width: 900px) {
    .welcome-text {
      font-size: 3rem;
    }

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
    .welcome-text {
      font-size: 2rem;
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
      font-size: 1.8rem;
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
      <Box className="container" id="header" style={{ padding: '1rem 6rem', marginTop: '4.6rem', paddingBottom: '1rem' }} flexDirection="column" justifyContent="center" alignItems="center">
        <h1 className="welcome-text">Become A Profitable Trader with <span className="text-primary">{NAME}</span></h1>
        <p>The most accurate trading indicator. No repainting. No lag. No subscription.</p>

        <div>
          <Box spacing="1rem" className="action-buttons" justifyContent="center">
            <Button onClick={() => window.location.href = '#/pricing'} large glowing>Purchase Now</Button>
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
              <Button color="secondary" large>Discord</Button>
            </a>
          </Box>

          <video id="video-header" src="/img/home.mp4" autoPlay playsInline loop muted style={{ borderRadius: theme.rounded, marginTop: '0.4rem' }} />
        </div>
      </Box>

      <Box className="container" flexDirection="column" style={{ padding: '2rem 6rem', marginTop: '2rem', paddingBottom: '6rem', overflowX: 'hidden' }} spacing="1.6rem">
        <div>
          <h1 className="reasons-text">What makes {NAME} <span className="text-primary">unique</span>?</h1>
          <p style={{ marginBottom: '2rem' }}>{NAME} was created to fill the gap between <strong>overpriced</strong> and <strong>underperforming</strong> indicators on the market.</p>
        </div>

        <Box flexDirection="column" spacing="2rem">
        <Box spacing="1rem" className="reason-sect">
            <img className="reason-img" src="https://i.imgur.com/TQXdpyj.png" alt="Sell signal with 3 take profit points" />
            <ReasonBlock
              title="Realistic"
              description={<p style={{ maxWidth: '25rem' }}>{NAME} works in <u>real time</u>, and does not retract signals, unlike other indicators that show unrealistic results.<br /><br />
              Other indicators fire a signal on the previous candle, which is called "lag" and causes the indicator to look better than it actually is. {NAME} has <u>revolutionized</u> trading by solving this issue with custom code.</p>}
              icon={IconEnum.checkmark}
            />
          </Box>

          <Box spacing="1rem" className="reason-sect">
            <img className="reason-img phone-img" src="/img/phone.png" alt="Mobile Signals" style={{
              transform: 'perspective(700px) rotateX(10deg) rotateY(15deg)',
            }} />
            
            <div>
              <ReasonBlock
                title="Simple"
                description={<p style={{ maxWidth: '25rem' }}>
                  {NAME} can be used by traders of <u>all experience levels</u>. You can even trade from your phone while at work or school.<br /><br />
                  {NAME} will display precise entries through buy/sell signals, and profitable exits using 3 different take profit targets, all while limiting risk with tight built-in stop-losses.
                </p>}
                icon={IconEnum.phone}
              />

              {FREE_TRIALS_ACTIVE && <Button color="secondary" style={{ marginTop: '1rem', marginRight: '1rem' }} onClick={() => window.location.href = '#/pricing'}>Get Free Trial</Button>}
              <Button style={{ marginTop: '1rem' }} onClick={() => window.location.href = '#/pricing'}>Purchase Now</Button>
            </div>
          </Box>

          <Box spacing="1rem" className="reason-sect">
            <img className="reason-img" src="https://i.imgur.com/6nbgdW3.png" alt="Buy signal bull run" />
            <ReasonBlock
              title="Accurate"
              description={<p style={{ maxWidth: '25rem' }}>
                {NAME} has an extremely high win rate, unlike other indicators which achieve their "win rate" by using repainting or lagging code.<br /><br />
                With an extremely tight stop loss and accurate take profit signals, the risk to reward ratio is <u>unmatched</u> by any other indicator.
              </p>}
              icon={IconEnum.money}
            />
          </Box>
          
          <Box spacing="1rem" className="reason-sect">
            <img className="reason-img" src="https://i.imgur.com/UNZWfXv.png" alt="Trading signals" />
            <ReasonBlock
              title="All Markets"
              description={<p style={{ maxWidth: '25rem' }}>{NAME} works on <u>any market</u> (Forex, Crypto, Options, etc), stock, or timeframe, unlike others who offer less value by tuning their indicator for specific markets, and charging a monthly fee.<br /><br />{NAME} is perfect for any trader, regardless of their experience or trading style.</p>}
              icon={IconEnum.accessibility}
            />
          </Box>
        </Box>
      </Box>

      <Box className="container" justifyContent="center" alignItems="center" style={{ padding: '2rem 6rem', paddingBottom: '2rem', overflowX: 'hidden', backgroundColor: theme.colors.background[1] }} spacing="1.6rem">
        <h2 className="stat-text"><span className="text-primary">2,824</span> customers</h2>
        <h2 className="stat-text"><span className="text-primary">92.72%</span> win rate</h2>
        <h2 className="stat-text"><span className="text-primary">0.00%</span> repaint</h2>
        <h2 className="stat-text"><span className="text-primary">0.00%</span> lag</h2>
      </Box>

      <ReviewsCarousel backgroundColor={1} />

      <Box className="container background-primary" flexDirection="column" justifyContent="center" alignItems="center" style={{ padding: '2rem 6rem' }} spacing="1rem">
        <h2 className="quote" style={{ maxWidth: '50%', textAlign: 'center' }}>“{NAME} has changed the way I trade, I am able to make consistent profits every day with minimal risk.”</h2>

        <Box flexDirection="column" alignItems="center">
          <img src="https://i.imgur.com/27ZMmQD.jpg" alt="Profile" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: theme.roundedFull }} />
          <p>Troy Breslin</p>
          <small style={{ textAlign: 'center', display: 'block' }}>Day Trader</small>
        </Box>
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
            <Button onClick={() => {
              window.scrollTo(0, 0);
              setTimeout(() => window.location.href = '#/pricing', 100);
            }}>Purchase</Button>
            <Button color="secondary" onClick={() => {
              window.scrollTo(0, 0);
              setTimeout(() => window.location.href = '#/tutorial', 100);
            }}>Tutorial</Button>
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
