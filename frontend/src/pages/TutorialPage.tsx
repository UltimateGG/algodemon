import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { DISCORD_URL, NAME } from '../globals';
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
          <h1 className="title" style={{ textAlign: 'center' }}>{NAME} v3 Tutorial</h1>
          <small style={{ fontSize: '1rem', marginBottom: '2rem', textAlign: 'center' }}>November 10, 2022</small>
        </Box>

        <img className="main-img" src="https://s3.tradingview.com/snapshots/i/iR0pjZRH.png" alt={NAME + " Indicator"} style={{ maxWidth: '900px', margin: '0 auto' }} />

        <h2>Locating {NAME}</h2>
        <p>To install {NAME} onto a chart, use <a href="https://www.tradingview.com/" target="_blank" rel="noreferrer">TradingView</a>. TradingView is a free charting platform that allows you to apply custom indicators and scripts to free real-time market data. Once you have created a free account, you can install {NAME} by following the steps below.
          <br /><br />Go to the products tab, click "Chart +" Click on the the indicators tab at the top (Mobile users: click the + in the bottom toolbar, and click indicators) --&gt; invite only scripts --&gt; finally, click on the "{NAME} Indicator"</p>
        
        <p>If the indicator does not show up under "Invite Only Scripts" after 24 hours, please join our <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">Discord</a> and message a staff member with your TradingView username and order ID.</p>

        <h2>Setup</h2>
        <p>{NAME} is built for any stock (SPY, NFLX, AMZN, etc.) and any timeframe. For the highest accuracy, you should use <u>Heikin Ashi</u> candles. To enable this on TradingView, click on the candle icon in the top center of the screen and select Heikin Ashi. For mobile users, click the three dots in the bottom right of a chart, and click "Chart Type"</p>

        <p>The indicator comes pre-configured with the most accurate settings, and you do not need to adjust them. If you do want to adjust them, the "Trend Length" and "Trend Sensitivity" control when buy and sell signals fire, and the "TP Sensitivity" controls when take profit signals fire. The "TP Magnitude" only affects take profit signals for <strong>sell</strong> orders.</p>
        <img className="energy-cloud" src="https://i.imgur.com/5A3BIdv.png" alt="Indicator Settings" style={{ maxWidth: '300px' }} />

        <h2>Signals</h2>
        <p>{NAME} will give you three types of signals: buy, sell, and take profit. Buy signals are green, sell signals are red, and take profit signals color vary based on the current signal.<br /><br />The solid red line above/below the signal label is the stop loss line, If the price closes past the stop loss, the trade will turn gray and be cancelled out. A signal may also turn gray if no take profit signals were fired before a new signal fired. If you are following a trade and see it turn gray, sell all of your position immediately.<br /><br />The dotted line is the entry price, this shows the realistic point you would have seen the signal at, and entered the trade. It is also where profit is tracked from.</p>
        <p>The image below shows a sell signal. The solid line is the stop loss (shorts/puts gain value when the stock falls, and lose value when the price rises, so for sell signals the stop loss is above the trade, and for buy signals it is below the trade) The red dotted line is the price at which the signal actually fired to the user, and where the take profit points calculate their profit from.</p>
        <img src="https://i.imgur.com/zcwj9sn.png" alt="Stop loss" style={{ maxWidth: '400px' }} />


        <h2>Confirmation</h2>
        <p>You should always confirm signals with other indicators. {NAME} is a great indicator, but it is not perfect. You should always confirm signals with other indicators of your choice such as RSI, MACD, etc. You may enter a trade as soon as you see a buy or sell signal, as {NAME} is non-lagging. You may scale out on take profit signals as much as you want (Ex: 12 contracts on TP1, 3 contracts on TP2). If the stop loss is hit, (gray signal, or candle close past stop line) you should close out your entire position immediately to minimize your loss.</p>

        <h2>Tips</h2>
        <p>Here are some things to know to help you get the most out of {NAME}:</p>

        <ul style={{ marginLeft: '2rem' }}>
          <li>Use Heikin Ashi candles for the highest accuracy</li>
          <li>Set your chart to "Regular Trading Hours"</li>
          <li>Any setting that changes the chart will change when signals fire (ETH/RTH, timeframe, candle type, etc.), but overall, the win rate should be around 80%</li>
          <li>Trade on a security with high volume</li>
        </ul>
      </Box>
    </PageStyle>
  );
}

export default TutorialPage;
