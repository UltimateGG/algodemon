import React, { useContext } from 'react';
import styled from 'styled-components';
import { Box, Button, ThemeContext } from '../Jet';

const HeaderStyle = styled(Box)`
  height: 100vh;
  text-align: center;
`;

export const Page404 = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div>
      <HeaderStyle flexDirection="column" justifyContent="center" alignItems="center" theme={theme}>
        <Box className="header-box" flexDirection="column" justifyContent="center" alignItems="center">
          <h1 style={{ fontSize: '6rem' }}>404</h1>
          <h4>Sorry, this page could not be found.</h4>
          <Button style={{ maxWidth: '50%' }} block variant='outlined' onClick={() => window.location.href = '/'}>Home</Button>
        </Box>
      </HeaderStyle>
    </div>
  );
}

export default Page404;
