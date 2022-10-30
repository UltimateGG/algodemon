import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { NAME } from '../globals';
import { Box, ThemeContext } from '../Jet';


const PageStyle = styled.div.attrs((props: any) => props)`
  .container {
    padding: 2rem 6rem;
    margin-top: 8rem;
  }

  .title {
    word-break: break-word;
  }

  h2 {
    margin-top: 2rem;
    text-align: left;
  }

  img {
    margin-bottom: 4rem;
  }

  @media (max-width: 1026px) {
    .title {
      font-size: 3rem !important;
    }

    .main-img, .energy-cloud {
      max-width: 100% !important;
    }
  }

  @media (max-width: 690px) {
    .container {
      padding: 2rem;
    }

    .title {
      font-size: 2.4rem !important;
    }
  }
`;

export const TutorialPage = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.title = NAME + ' - Tutorial';
  });

  return (
    <PageStyle theme={theme}>
      <Box className="container" flexDirection="column" spacing="1.6rem">
        <Box flexDirection="column">
          <h1 className="title" style={{ textAlign: 'center' }}>{NAME} Tutorial/Starter Guide</h1>
          <small style={{ fontSize: '1rem', marginBottom: '2rem', textAlign: 'center' }}>October 29, 2022</small>
        </Box>

        <img className="main-img" src="/img/tutorial.png" alt={NAME + " Indicator"} style={{ maxWidth: '900px', margin: '0 auto' }} />

        <h2>Locating {NAME}</h2>
        <p>First, you want to go to tradingview.com and launch a chart.
          <br />Once you have your chart open, click on the indicators tab --&gt; invite only scripts --&gt; and click on the "{NAME}" indicator</p>
        
        <p>If the indicator does not show up after 24 hours, please <a href="#/contact">contact us</a> with your TradingView username and order ID.</p>

        <h2>Setup</h2>
        <p>{NAME} is built for any stock (SPY, NFLX, AMZN, etc.) and any timeframe. For the highest accuracy, you should use <u>Heikin Ashi</u> candles. To enable this on TradingView, click on the candle icon in the top center of the screen and select Heikin Ashi. For mobile users, click the three dots in the bottom right of a chart, and click "Chart Type"</p>

        <p>The indicator comes pre-configured with the most accurate settings, and you do not need to adjust them. If you do want to adjust them, the "Trend Length" and "Trend Sensitivity" control when buy and sell signals fire, and the "TP Sensitivity" controls when take profit signals fire. The "TP Magnitude" only affects take profit signals for <strong>sell</strong> orders.</p>
        <img className="energy-cloud" src="https://i.imgur.com/Rvi4s8D.png" alt="Indicator Settings" style={{ maxWidth: '300px' }} />

        <h2>Signals</h2>
        <p>{NAME} will give you three types of signals: buy, sell, and take profit. Buy signals are green, sell signals are red, and take profit signals color vary based on the current signal. The line near the signal is the stop loss line, If the price closes past the stop loss, the trade will turn gray and be cancelled out. A signal may also turn gray if no take profit signals were fired before a new signal fired.</p>
        <p>The image below shows a sell trade that was stopped out.</p>
        <img className="energy-cloud" src="/img/stop.png" alt="Stop loss" style={{ maxWidth: '200px' }} />


        <h2>Confirmation</h2>
        <p>You should always confirm signals with other indicators. {NAME} is a great indicator, but it is not perfect. You should always confirm signals with other indicators of your choice such as RSI, MACD, etc. You may enter a trade as soon as you see a buy or sell signal, as {NAME} is non-lagging. You may scale out on take profit signals as much as you want (Ex: 12 contracts on TP1, 3 contracts on TP2). If the stop loss is hit, (gray signal, or candle close past stop line) you should close out your entire position immediately to minimize your loss.</p>
      </Box>
    </PageStyle>
  );
}

export default TutorialPage;
