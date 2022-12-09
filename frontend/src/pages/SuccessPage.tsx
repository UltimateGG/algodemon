import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { DISCORD_URL, NAME } from '../globals';
import { Box, ThemeContext } from '../Jet';


const HeaderStyle = styled(Box)`
  height: 100vh;
  text-align: center;

  .header-box {
    padding: 2rem;

    h1 {
      font-size: 6rem;
      margin-top: 6rem;
    }
  }

  @media (max-width: 768px) {
    .header-box {
      h1 {
        font-size: 4rem;
      }

      h4 {
        font-size: 1.4rem;
      }
    }
  }

  @media (max-width: 420px) {
    .header-box {
      h1 {
        font-size: 2.6rem;
      }

      h4 {
        font-size: 1.2rem;
      }
    }
  }
`;

export const SuccessPage = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.title = NAME + ' - Thank You!';
  });

  return (
    <div>
      <HeaderStyle flexDirection="column" justifyContent="center" alignItems="center" theme={theme}>
        <Box className="header-box" flexDirection="column" justifyContent="center" alignItems="center">
          <h1>Thank You!</h1>
          <h4>Your order has been confirmed. You should see the indicator under "Invite Only Scripts" shortly.</h4>
          <p><strong>You should now see the indicator under "invite only scripts"</strong> If you do not, <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">join our Discord</a> and message a staff member with your order ID and TradingView username.</p>
        </Box>
      </HeaderStyle>
    </div>
  );
}

export default SuccessPage;
