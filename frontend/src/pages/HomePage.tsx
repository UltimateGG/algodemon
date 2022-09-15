import React, { useContext } from 'react';
import styled from 'styled-components';
import { Box, ThemeContext } from '../Jet';


const PageStyle = styled.div`
  
`;

export const HomePage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <PageStyle theme={theme}>
      <Box style={{ padding: '2rem 6rem', marginTop: '4rem' }} flexDirection="column" justifyContent="center" alignItems="center" spacing="1.6rem">
        <h1>main</h1>
      </Box>
    </PageStyle>
  );
}

export default HomePage;
