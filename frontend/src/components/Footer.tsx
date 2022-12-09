import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { DISCORD_URL, NAME } from '../globals';
import { Box, Button, Divider, ThemeContext } from '../Jet';


const WrapperStyle = styled.div.attrs((props: any) => props)`
  .access-btn {
    margin-top: 2rem;
    max-width: 18rem;
    background-color: ${props => props.theme.colors.text[0]};

    &:hover {
      background-color: ${props => props.theme.colors.text[0]};
    }
  }

  .footer-images {
    align-items: center;
  }

  .footer-img {
    max-width: 100%;
    height: auto;
  }

  .footer-links {
    padding-bottom: 2.8rem;

    img {
      max-height: 60px;
      max-width: 250px;
    }

    a {
      color: ${props => props.theme.colors.text[0]};
      font-size: 1.2rem;
    }
  }

  @media (max-width: 580px) {
    .footer-images {
      flex-direction: column;
      align-items: flex-start;
    }

    .footer-links {
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding: 2rem;
      gap: 1.2rem;
    }
  }
`;

const BannerStyle = styled(Box).attrs((props: any) => props)`
  background-color: ${props => props.theme.colors.primary[0]};
  padding: 4rem;
  margin-bottom: 2rem;

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

const CopyrightStyle = styled(Box)`
  min-height: 2.8rem;
  padding: 1rem 2rem;
`;

/* eslint-disable */
const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const { appState } = useAuth();

  const navigate = (path: string) => {
    window.scrollTo(0, 0);
    setTimeout(() => window.location.href = path, 100); // wait for scroll to top animation to finish
  }

  return (
    <WrapperStyle theme={theme}>
      {location.pathname !== '/admin/dashboard' && location.pathname !== '/success' && (
        <BannerStyle justifyContent="space-around" alignItems="center" theme={theme}>
          <div>
            <h1>Get Access Today</h1>
            <p>See the results for yourself{appState.freeTrialsEnabled ? '. Start your free trial today!' : ' with a single payment.'}</p>
          </div>
          
          <Button className="access-btn" glowing color="secondary" onClick={() => navigate('#/pricing')} block>
            <div className="text-primary">Purchase Full Access</div>
          </Button>
        </BannerStyle>
      )}

      <Box className="footer-links" justifyContent="space-around">
        <Box className="footer-images" spacing="1rem">
          <div>
            <div><img className="footer-img" src="/img/logo.png" alt={NAME} /></div>
            <div><img className="footer-img" src="/img/tradingview.png" alt="TradingView" /></div>
          </div>
          <div>
            <img className="footer-img" src="/img/paypal.png" alt="PayPal" />
          </div>
        </Box>

        <Box spacing="1rem">
          <Box flexDirection="column" spacing="0.6rem">
            <a onClick={() => navigate('#/')}>Home</a>
            <a onClick={() => navigate('#/pricing')}>Pricing</a>
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">Discord</a>
          </Box>

          <Box flexDirection="column" spacing="0.6rem">
            <a onClick={() => navigate('#/tutorial')}>Tutorial</a>
            <a onClick={() => navigate('#/admin/login')}>Admin Login</a>
            <a onClick={() => navigate('#/tos')}>Disclaimer / Terms</a>
          </Box>
        </Box>
      </Box>

      <Divider />

      <CopyrightStyle flexDirection="column" justifyContent="space-around" alignItems="center" spacing="2.4rem" theme={theme}>
        <small>Copyright &copy; {NAME} 2022. All Rights Reserved. {NAME} and its affiliates are not registered financial advisors. {NAME} and its site is for educational purposes only and should not be construed as financial advise.</small>
      </CopyrightStyle>
    </WrapperStyle>
  );
}

export default Footer;
