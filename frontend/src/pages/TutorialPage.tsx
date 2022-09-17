import React, { useContext } from 'react';
import styled from 'styled-components';
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

  return (
    <PageStyle theme={theme}>
      <Box className="container" style={{ padding: '2rem 6rem', marginTop: '8rem' }} flexDirection="column" spacing="1.6rem">
        <Box flexDirection="column">
          <h1 className="title" style={{ textAlign: 'center' }}>AlgoDemon Tutorial/Starter Guide</h1>
          <small style={{ fontSize: '1rem', marginBottom: '2rem', textAlign: 'center' }}>April 16, 2022</small>
        </Box>

        <img className="main-img" src="https://i.imgur.com/7MdvZ5Q.png" alt="AlgoDemon Indicator" style={{ maxWidth: '900px', margin: '0 auto', marginBottom: '4rem' }} />

        <h2>Locating AlgoDemon</h2>
        <p>First, you want to go to tradingview.com and launch a chart.
          <br />Once you have your chart open, click on the indicators tab --&gt; invite only scripts --&gt; and click on the "AlgoDemon" indicator</p>
        
        <p>If the indicator does not show up after 24 hours, please <a href="/contact">contact us</a> with your tradingview username and order ID.</p>

        <h2 style={{ marginTop: '2rem' }}>Features / Energy Cloud</h2>
        <p>There are many ways to use the Energy Cloud to your advantage. One way is to buy or sell the security when the Energy Cloud crosses colors. For example, if the energy cloud crosses over from red to green, that is indicating that there is a chance that the trend is changing and you may want to buy. Another way you can use the Energy Cloud to your advantage is by treating it as a support or resistance level and playing the bounces. For example, if the ticker is in a strong up trend you would want to buy the dip/play the bounce every time it retraces back over to the green energy cloud.</p>

        <img className="energy-cloud" src="https://i.imgur.com/0YujqaS.png" alt="Energy Cloud" style={{ maxWidth: '500px', marginBottom: '4rem' }} />
      </Box>
    </PageStyle>
  );
}

export default TutorialPage;
