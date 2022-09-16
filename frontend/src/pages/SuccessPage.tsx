import React, { useContext } from 'react';
import styled from 'styled-components';
import { Box, Button, ThemeContext } from '../Jet';

const HeaderStyle = styled(Box)`
  height: 100vh;
  text-align: center;
`;

export const SuccessPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div>
      <HeaderStyle flexDirection="column" justifyContent="center" alignItems="center" theme={theme}>
        <Box className="header-box" flexDirection="column" justifyContent="center" alignItems="center" style={{ zIndex: 3 }}>
          <h1 style={{ fontSize: '6rem' }}>Thank You!</h1>
          <h4>Your order has been confirmed. You should see the indicator under "Invite Only Scripts" shortly.</h4>
          <p><strong>Please wait up to 24 hours.</strong> If you do not see the indicator by then, <a href="/contact">contact us</a> with your order ID and TradingView username.</p>
          <Button style={{ maxWidth: '50%' }} block variant='outlined' onClick={() => window.location.href = '/'}>Home</Button>
        </Box>
      </HeaderStyle>
    </div>
  );
}

export default SuccessPage;
