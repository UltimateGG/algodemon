import React, { useContext } from 'react';
import styled from 'styled-components';
import { Box, Icon, IconEnum, ThemeContext } from '../Jet';


const FooterStyle = styled(Box)`
  min-height: 2.8rem;
  padding: 1rem 2rem;
  margin: 0 auto;
  border: none;
  background-color: ${props => props.theme.colors.background[3]};
  z-index: 2;
`;

const IconWrapperStyle = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;

  p {
    transition: color 0.2s ease-in-out;
  }

  path {
    transition: fill 0.2s ease-in-out;
  }

  &:hover {
    text-decoration: none;

    p {
      color: ${props => props.theme.colors.primary[0]};
    }

    path {
      fill: ${props => props.theme.colors.primary[0]};
    }
  }
`;

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <FooterStyle justifyContent="space-around" alignItems="center" theme={theme}>
      <p>Copyright &copy; AlgoDemon 2022. All Rights Reserved. AlgoDemon and its affiliates are not registered financial advisors. AlgoDemon and its site is for educational purposes only and should not be construed as financial advise.</p>

      <Box spacing="1rem">
        <IconWrapperStyle href="https://github.com/UltimateGG" target="_blank" rel="noopener noreferrer" theme={theme}>
          <Icon icon={IconEnum.github} />
          <p>GitHub</p>
        </IconWrapperStyle>

{/* TODO - add real link, or possibly remove? */}
        <IconWrapperStyle href="/resume" theme={theme}>
          <Icon icon={IconEnum.file} />
          <p>Resume</p>
        </IconWrapperStyle>
      </Box>
    </FooterStyle>
  );
}

export default Footer;
