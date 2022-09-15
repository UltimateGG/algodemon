import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, Button, Divider, ThemeContext, Tooltip } from '../Jet';

const HeaderStyle = styled(Box)`
  background-color: gray;
  height: 90vh;
  background-image: url('/img/home.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  text-align: center;

  h1 {
    font-size: 4rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    h1 {
      font-size: 2.5rem;
    }
  }
`;

const textArray = [
  'Developer',
  'Designer',
  'Engineer',
  'Analyst',
  'Creator',
  'Innovator',
];

const TextStyle = styled.h4`
  transition: opacity 0.8s ease;
`;

const PageStyle = styled.div`
  .coding-languages {
    grid-template-columns: repeat(4, 1fr);
  }

  .more-container {
    text-align: center;
  }

  @media (max-width: 1500px) {
    .coding-languages {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 1080px) {
    .coding-languages {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    .coding-languages {
      grid-template-columns: repeat(1, 1fr);
    }
    
    .coding-languages-header {
      text-align: center;
      font-size: 1.5rem;
    }

    .coding-languages-header-tt {
      display: block;
      width: 100%;
      text-align: center;
    }

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
  const [text, setText] = useState(textArray[0]);
  const [textRef, setTextRef] = useState<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const index = textArray.indexOf(text);
      const nextIndex = (index + 1) % textArray.length;
      const nextText = textArray[nextIndex];
      if (textRef) textRef.style.opacity = '0';

      setTimeout(() => {
        setText(nextText);
        if (textRef) textRef.style.opacity = '1';
      }, 500);
    }, 2000);
    return () => clearInterval(interval);
  } , [text, textRef]);

  return (
    <PageStyle theme={theme}>
      <HeaderStyle flexDirection="column" justifyContent="center" alignItems="center" theme={theme}>
        <Box className="header-box" flexDirection="column" justifyContent="center" alignItems="center" style={{ zIndex: 3 }}>
          <h1>Blake Fitzsimmons</h1>
          <TextStyle ref={setTextRef}>{text}</TextStyle>
          <Button variant='outlined' glowOnHover onClick={() => window.location.href = '/work'}>View My Work</Button>
        </Box>
      </HeaderStyle>

      <Box style={{ padding: '2rem 6rem' }} flexDirection="column" justifyContent="center" alignItems="center" spacing="1.6rem">
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
