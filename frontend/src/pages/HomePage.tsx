import React, { useContext } from 'react';
import styled from 'styled-components';
import { Box, Button, ThemeContext } from '../Jet';


const PageStyle = styled.div`
  .more-container {
    text-align: center;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    .more-container h1 {
      font-size: 2rem;
    }

    .more-container h2 {
      font-size: 1.5rem;
    }
  }
`;

export const HomePage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <PageStyle theme={theme}>
      <Box style={{ padding: '2rem 6rem', marginTop: '4rem' }} flexDirection="column" justifyContent="center" alignItems="center" spacing="1.6rem">
        <h1>main</h1>
      </Box>
      

      <Box className="more-container" flexDirection="column" justifyContent="center" alignItems="center" style={{ backgroundColor: theme.colors.primary[0], padding: '4em', marginBottom: '2rem' }}>
        <h1>And Many More...</h1>
        <h2>Check out my projects that use these</h2>
        
        <Button onClick={() => window.location.href = '/work'} block style={{ marginTop: '2rem', maxWidth: '18rem', backgroundColor: theme.colors.primary[2] }}>See My Projects</Button>
      </Box>
    </PageStyle>
  );
}

export default HomePage;
