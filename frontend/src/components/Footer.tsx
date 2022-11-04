import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
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

  const navigate = (path: string) => {
    window.scrollTo(0, 0);
    setTimeout(() => window.location.href = path, 100); // wait for scroll to top animation to finish
  }

  return (
    <WrapperStyle theme={theme}>
      {/* TODO: Temp */}
      {false && location.pathname !== '/affiliates' && location.pathname !== '/dashboard' && ( 
        <BannerStyle justifyContent="center" alignItems="center" style={{ backgroundColor: theme.colors.background[1], marginBottom: 0 }} theme={theme}>
          <div>
            <h1>Become an Affiliate</h1>
            <p>Earn money through social media with {NAME}</p>
            <Button color="secondary" onClick={() => navigate('#/affiliates')} block>Learn More</Button>
          </div>
        </BannerStyle>
      )}

      {location.pathname !== '/dashboard' && location.pathname !== '/success' && (
        <BannerStyle justifyContent="space-around" alignItems="center" theme={theme}>
          <div>
            <h1>Get Access Today</h1>
            <p>Get life time access for a one time payment</p>
            <p>and up to 80% off using a referral code</p>
          </div>
          
          <Button className="access-btn" onClick={() => navigate('#/pricing')} block>
            <div className="text-primary">Click Here To Get Access</div>
          </Button>
        </BannerStyle>
      )}

      <Box className="footer-links" justifyContent="space-around">
        <img className="footer-img" src="/img/logo.png" alt={NAME} />

        <Box spacing="1rem">
          <Box flexDirection="column" spacing="0.6rem">
            <a onClick={() => navigate('#/')}>Home</a>
            <a onClick={() => navigate('#/pricing')}>Pricing</a>
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">Discord</a>
          </Box>

          <Box flexDirection="column" spacing="0.6rem">
            <a onClick={() => navigate('#/affiliates')}>Affiliates</a>
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
