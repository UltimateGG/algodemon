import React, { useContext } from 'react';
import styled from 'styled-components';
import { PRICE } from '../globals';
import { Box, Button, Divider, ThemeContext } from '../Jet';


const AdvertStyle = styled(Box)`
  @media (max-width: 1050px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  @media (max-width: 500px) {
    align-items: flex-start;
    text-align: left;
    padding: 2rem !important;
  }
`;

const FooterStyle = styled(Box)`
  min-height: 2.8rem;
  padding: 1rem 2rem;
  margin: 0 auto;
  border: none;
  z-index: 2;
`;

const WrapperStyle = styled.div.attrs((props: any) => props)`
  a {
    color: ${props => props.theme.colors.text[0]};
    font-size: 1.2rem;
  }

  @media (max-width: 580px) {
    .footer-links {
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding: 2rem;
      gap: 1.2rem;
    }
  }
`;

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <WrapperStyle theme={theme}>
      <AdvertStyle className="more-container" justifyContent="space-around" alignItems="center" style={{ backgroundColor: theme.colors.primary[0], padding: '4rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontWeight: 500 }}>Get Access Today</h1>
          <p>Get life time access for a one time payment of ${PRICE}</p>
        </div>
        
        <Button onClick={() => window.location.href = '/buy'} block style={{ marginTop: '2rem', maxWidth: '18rem', backgroundColor: theme.colors.text[0] }}><div style={{ color: theme.colors.primary[0] }}>Click Here To Get Access</div></Button>
      </AdvertStyle>

      <Box justifyContent="space-around" style={{ paddingBottom: '2.8rem' }} className="footer-links">
        <img src="/img/logo.png" alt="AlgoDemon" style={{ maxHeight: '60px', maxWidth: '250px' }} />

        <Box spacing="1rem">
          <Box flexDirection="column" spacing="0.6rem">
            <a href="/">Home</a>
            <a href="/buy">Pricing</a>
            <a href="/contact">Contact</a>
          </Box>

          <a href="/tos">Disclaimer / Terms</a>
        </Box>
      </Box>

      <Divider />
      <FooterStyle flexDirection="column" justifyContent="space-around" alignItems="center" spacing="2.4rem" theme={theme}>
        <small>Copyright &copy; AlgoDemon 2022. All Rights Reserved. AlgoDemon and its affiliates are not registered financial advisors. AlgoDemon and its site is for educational purposes only and should not be construed as financial advise.</small>
      </FooterStyle>
    </WrapperStyle>
  );
}

export default Footer;
