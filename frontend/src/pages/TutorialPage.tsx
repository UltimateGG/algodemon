import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { NAME } from '../globals';
import { Box, ThemeContext } from '../Jet';


const PageStyle = styled.div.attrs((props: any) => props)`
  .title {
    word-break: break-word;
  }

  h2 {
    text-align: left;
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
      padding: 2rem !important;
    }

    .title {
      font-size: 2.4rem !important;
    }
  }
`;

export const TutorialPage = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.title = `${NAME} - Tutorial`;
  });

  return (
    <PageStyle theme={theme}>
      <Box className="container" style={{ padding: '2rem 6rem', marginTop: '8rem' }} flexDirection="column" spacing="1.6rem">
        <Box flexDirection="column">
          <h1 className="title" style={{ textAlign: 'center' }}>{NAME} Tutorial/Starter Guide</h1>
          <small style={{ fontSize: '1rem', marginBottom: '2rem', textAlign: 'center' }}>April 16, 2022</small>
        </Box>

        <img className="main-img" src="https://i.imgur.com/7MdvZ5Q.png" alt={NAME + " Indicator"} style={{ maxWidth: '900px', margin: '0 auto', marginBottom: '4rem' }} />

        <h2>Locating {NAME}</h2>
        <p>First, you want to go to tradingview.com and launch a chart.
          <br />Once you have your chart open, click on the indicators tab --&gt; invite only scripts --&gt; and click on the "{NAME}" indicator</p>
        
        <p>If the indicator does not show up after 24 hours, please <a href="/contact">contact us</a> with your tradingview username and order ID.</p>

        <h2 style={{ marginTop: '2rem' }}>Features / Energy Cloud</h2>
        <p>There are many ways to use the Energy Cloud to your advantage. One way is to buy or sell the security when the Energy Cloud crosses colors. For example, if the energy cloud crosses over from red to green, that is indicating that there is a chance that the trend is changing and you may want to buy. Another way you can use the Energy Cloud to your advantage is by treating it as a support or resistance level and playing the bounces. For example, if the ticker is in a strong up trend you would want to buy the dip/play the bounce every time it retraces back over to the green energy cloud.</p>

        <img className="energy-cloud" src="https://i.imgur.com/0YujqaS.png" alt="Energy Cloud" style={{ maxWidth: '500px', marginBottom: '4rem' }} />



        <h2 style={{ marginTop: '2rem' }}>Features / Automated Support &amp; Resistance</h2>
        <p>Support and Resistance lines are values unique to every ticker/market. These values are identified if the market of interest has "touched" this value multiple times. "Touch" means that the market has either bounced off a value, has had a hard time breaking a certain value/price, or when the market has broken and retested this value. We then use these Support and Resistance lines or "S&amp;R" lines to help us break up the market into channels allowing us to know how much the market can move and when is the optimal time to enter/exit the market. However, this takes a long time to manually identify and draw you S&amp;R lines. The Dynamic Support and Resistance Indicator will automate all of that process for you. It is adaptive which means as the market moves the Indicator will calculate any new lines or change Support and Resistance Lines as they are broken.
        <br /><br />We have color coded the Lines to quickly show if they are a Support line or a resistance line.</p>

        <ul style={{ marginLeft: '1.2rem' }}>
          <li>Resistance Lines are Red</li>
          <li>Resistance lines are above our candles. Once Candles break our above resistance it turns into a support</li>
          <li>Support Lines are Green</li>
          <li>Support lines are below our current candles. Once Candles break below our Support and the line is then above our Candles it is then classified as a resistance line.</li>
        </ul>

        <img className="energy-cloud" src="https://i.imgur.com/G1kojVJ.png" alt="Auto SR Levels" style={{ maxWidth: '500px', marginBottom: '4rem' }} />
      </Box>
    </PageStyle>
  );
}

export default TutorialPage;
