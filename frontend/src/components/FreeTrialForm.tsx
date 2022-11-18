import { useContext, useState } from 'react';
import { Box, Button, Icon, IconEnum, Progress, TextField, ThemeContext } from '../Jet';
import { apiPost } from '../api/apiExecutor';
import { DISCORD_URL } from '../globals';


const FreeTrialForm = ({ onClose }: { onClose: () => any }) => {
  const { theme } = useContext(ThemeContext);
  const [username, setUsername] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const startTrial = () => {
    setSubmitting(true);

    apiPost('payment/trial', { username }).then(res => {
      if (res.error) return setError(res.error);
      setSuccess(true);
    }).finally(() => setSubmitting(false));
  }

  if (success)
    return (
      <>
        <h2>Free Trial Started</h2>
        <p>The indicator should now show up under "invite only scripts"</p>
        <p>From there you will have 7 days before your access expires.</p>
        <p><a href={DISCORD_URL} rel="noopener noreferrer" target="_blank">Join our Discord</a> for help or any questions!</p>

        <Button color="secondary" style={{ float: 'right', marginTop: '1rem' }} onClick={onClose}>Ok</Button>
      </>
    );

  return (
    <>
      <h2 style={{ marginBottom: 0 }}>TradingView</h2>
      <a href="https://tradingview.com/" rel="noopener noreferrer" target="_blank">Create Free TradingView Account</a>
      <TextField
        name="username"
        placeholder="TradingView Username"
        type="text"
        fullWidth
        required
        value={username}
        onChanged={setUsername}
        disabled={submitting}
        style={{ marginBottom: '0.2rem' }}
      />

      {error !== '' && (
        <Box flexDirection="column" justifyContent="center" alignItems="center">
          <h1 style={{ color: theme.colors.danger[0], fontSize: '3rem' }}><Icon icon={IconEnum.error} size={36} color={theme.colors.danger[0]} /> Error</h1>
          <p>{error}</p>
        </Box>
      )}

      
      <Button onClick={startTrial} large block style={{ marginTop: '1rem' }} disabled={submitting || !username.length}>
        Start Free Trial
      </Button>
      {submitting && <Progress indeterminate />}
    </>
  );
}

export default FreeTrialForm;
