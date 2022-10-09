import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { apiPost } from '../../api/apiExecutor';
import ReasonBlock from '../../components/ReasonBlock';
import { useAuth } from '../../contexts/AuthContext';
import { EventType, useSessionTracker } from '../../contexts/SessionTrackerContext';
import { AFFILIATE_PERCENT, NAME, PRICE } from '../../globals';
import { Box, Button, Icon, IconEnum, Progress, TextField, ThemeContext } from '../../Jet';


const HeaderStyle = styled(Box)`
  height: 75vh;
  text-align: center;
  background: url('/img/affiliate.jpg') no-repeat center / cover;

  @media (max-width: 760px) {
    h1 {
      font-size: 3rem !important;
    }

    h4 {
      font-size: 1.2rem;
    }
  }
`;

const PageStyle = styled.div.attrs((props: any) => props)`
  @media (max-width: 1123px) {
    .container {
      flex-direction: column;
      padding: 2rem !important;
    }
  }
`;

export const AffiliatePage = () => {
  const { theme } = useContext(ThemeContext);
  const { user, login } = useAuth();
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { addToQueue } = useSessionTracker();
  const EARN = ((PRICE * 0.2) * (AFFILIATE_PERCENT / 100.0)).toFixed(2);

  useEffect(() => {
    document.title = NAME + ' - Affiliates';
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;
    setError('');

    const email = (e.target as any).email.value;
    const password = (e.target as any).password.value;
    const password2 = (e.target as any).password2.value;

    if (password.trim().length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setError('Invalid email');
      return;
    }

    setLoading(true);
    apiPost('affiliates/register', { email, password }).then(async res => {
      if (res.error) return setError(res.error);
      sessionStorage.setItem('token', res.data.token);
      addToQueue(EventType.SIGNUP, { email, passwordLength: password.length });
      await login();
      window.location.href = '#/dashboard';
    }).finally(() => setLoading(false));
  }

  return (
    <PageStyle>
      <HeaderStyle flexDirection="column" justifyContent="center" alignItems="center" theme={theme}>
        <Box className="header-box" flexDirection="column" justifyContent="center" alignItems="center">
          <h1 style={{ fontSize: '6rem' }}>Earn ${EARN}</h1>
          <h4>Everytime someone clicks your link.</h4>

          <Button style={{ maxWidth: '50%', display: user ? 'none' : 'inline-block' }} block onClick={() => {
            const start = document.querySelector('#start');
            if (start) start.scrollIntoView({ behavior: 'smooth' });
          }}>Get Started</Button>
          <Button style={{ maxWidth: '50%' }} block variant={user ? 'filled' : 'outlined'} onClick={() => window.location.href = '#/login'}>Affiliate Dashboard</Button>
        </Box>
      </HeaderStyle>
    
      <Box className="container" style={{ padding: '2rem 6rem', marginTop: '4rem', paddingBottom: '6rem' }} spacing="1rem">
        <ReasonBlock
          title="How does it work?"
          icon={IconEnum.money}
          description={<>
            When you sign up for an account, you will be given a unique <u>referral code</u>. Put this code in your TikTok bio, and when someone clicks on your link and accesses the indicator, you will earn <strong>${EARN}</strong>.
          </>}
        />

        <ReasonBlock
          title="What do I need to do?"
          icon={IconEnum.clock}
          description={<>
            Simply post a few TikTok videos with your referral code. When someone clicks on your link, you will earn <strong>${EARN}</strong>. You can also post your link on other social media platforms, such as Instagram, Twitter, and Facebook. The more attention you bring, the more you earn.
          </>}
        />

        <ReasonBlock
          title="How do I start?"
          icon={IconEnum.info}
          description={<>
            Sign up to receive your affiliate code below and start earning. You will enter information like your PayPal, your email, etc. Once you sign up, you will be able to access your affiliate dashboard, where you can view your earnings.
          </>}
        />
      </Box>

      <Box id="start" flexDirection="column" className="container" style={{ display: user ? 'none' : '', padding: '2rem 6rem', marginTop: '4rem', paddingBottom: '2rem', backgroundColor: theme.colors.background[1] }} spacing="1rem">
        <h1 style={{ textAlign: 'center' }}>Get started for <div style={{ display: 'inline' }} className="text-primary">FREE</div></h1>

        {error !== '' && (
          <Box justifyContent="center" alignItems="center" spacing="0.2rem">
            <Icon icon={IconEnum.error} size={24} color={theme.colors.danger[0]} />
            <p style={{ color: theme.colors.danger[0] }}>{error}</p>
          </Box>
        )}

        {loading ? (
          <Progress circular indeterminate style={{ margin: '0 auto' }} />
        ) : (
          <form style={{ margin: 'auto' }} onSubmit={handleSubmit}>
            <Box flexDirection="column" spacing="0.8rem">
              <Box flexDirection="column">
                <TextField name="email" placeholder="PayPal Email" type="email" />
                <small>Used to receive payouts &amp; login</small>
              </Box>

              <TextField name="password" placeholder="Password" type="password" />
              <TextField name="password2" placeholder="Confirm Password" type="password" />

              <Button type="submit" glowing>Sign Up</Button>
            </Box>
          </form>
        )}
      </Box>
    </PageStyle>
  );
}

export default AffiliatePage;
