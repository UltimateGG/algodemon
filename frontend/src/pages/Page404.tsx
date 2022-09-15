import React, { useContext } from 'react';
import styled from 'styled-components';
import { Box, Button, ThemeContext } from '../Jet';

const HeaderStyle = styled(Box)`
  background-color: gray;
  height: 100vh;
  background-image: url('/img/home.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  text-align: center;
`;

export const Page404 = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div>
      <HeaderStyle flexDirection="column" justifyContent="center" alignItems="center" theme={theme}>
        <Box className="header-box" flexDirection="column" justifyContent="center" alignItems="center" style={{ zIndex: 3 }}>
          <h1 style={{ fontSize: '6rem' }}>404</h1>
          <h4>The server returned HTTP status code 404. This page was not found.</h4>
          <Button style={{ maxWidth: '50%' }} block variant='outlined' onClick={() => window.location.href = '/'}>Home</Button>
        </Box>
      </HeaderStyle>
    </div>
  );
}

export default Page404;
