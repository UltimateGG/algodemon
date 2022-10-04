import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Box, Button, Icon, IconEnum, Paper, Progress, TextField, themeDefault } from '../../Jet';


const PageStyle = styled(Box).attrs((props: any) => props)`
  .login-header {
    font-size: 3rem;
  }

  @media (max-width: 760px) {
    .login-header {
      font-size: 2rem;
    }
  }
`;

export const LoginPage = () => {
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;
    setError('');
    setLoading(true);

    const email = (e.target as any).email.value;
    const password = (e.target as any).password.value;

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }).then(res => {
      if (res.status !== 200)
        res.json().then(json => setError(json.message || 'Something went wrong'));
      else {
        res.json().then(json => {
          sessionStorage.setItem('token', json.token);
          window.location.href = '/dashboard';
        });
      }
    }).finally(() => {
      setLoading(false);
    });
  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) window.location.href = '/dashboard';
  }, []);

  return (
    <PageStyle flexDirection="column" justifyContent="center" alignItems="center" spacing="1rem" style={{ margin: '8rem 0', padding: '0 1rem' }}>
      <h5 className="pretitle">Login</h5>

      <Paper elevation={1}>
        <Box flexDirection="column" justifyContent="center" alignItems="center" style={{ padding: '1rem 2rem 0.2rem 2rem' }}>
          <h1 className="login-header">Affiliate Login</h1>

          {error !== '' && (
            <Box justifyContent="center" alignItems="center" style={{ color: 'red', margin: '1rem 0' }} spacing="0.2rem">
              <Icon icon={IconEnum.error} size={24} color={themeDefault.colors.danger[0]} />
              <p style={{ color: themeDefault.colors.danger[0] }}>{error}</p>
            </Box>
          )}

          <form onSubmit={onSubmit}>
            <TextField fullWidth name="email" placeholder="Email" type="email" required style={{ width: '100%' }} />
            <TextField fullWidth name="password" placeholder="Password" type="password" required style={{ width: '100%' }} />
            
            <Button block type="submit" disabled={loading}>Login</Button>
            {loading && <Progress indeterminate />}
          </form>

          <small style={{ float: 'right', width: '100%', marginTop: '1rem' }}>Want to become an affiliate? <a href="/affiliates">Register</a></small>
        </Box>
      </Paper>
    </PageStyle>
  );
}

export default LoginPage;
