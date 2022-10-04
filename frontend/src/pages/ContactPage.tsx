import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Box, Button, Icon, IconEnum, Progress, TextArea, TextField, ThemeContext } from '../Jet';
import { NAME } from '../globals';


const ContactPageStyle = styled(Box).attrs((props: any) => props)`
  height: 100%;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding-top: 3rem;
    
    #contact-form > div {
      flex-direction: column;
      grid-gap: 0.2rem;
    }
  }
`;

const ContactPage = () => {
  const { theme } = useContext(ThemeContext);
  const [name, setName] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [messageError, setMessageError] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [error, setError] = React.useState('');

  useEffect(() => {
    document.title = NAME + ' - Contact';
  });

  const requiredValidator = (errorSetter: (error: string) => void, value: string) => {
    const condition = value.trim().length === 0;
    errorSetter(condition ? 'This field is required' : '');
    return !condition;
  }

  const lengthValidator = (errorSetter: (error: string) => void, value: string, maxLength: number) => {
    const condition = value.length > maxLength;
    errorSetter(condition ? `Max length: ${maxLength}. Current: ${value.length}` : '');
    return !condition;
  }

  const emailValidator = (errorSetter: (error: string) => void, value: string) => {
    const condition = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
    errorSetter(condition ? 'Invalid email' : '');
    return !condition;
  }

  const validateName = () => {
    return requiredValidator(setNameError, name) && lengthValidator(setNameError, name, 100);
  }

  const validateEmail = () => {
    return requiredValidator(setEmailError, email) && lengthValidator(setEmailError, email, 100) && emailValidator(setEmailError, email);
  }

  const validateMessage = () => {
    return requiredValidator(setMessageError, message) && lengthValidator(setMessageError, message, 2000);
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateName() || !validateEmail() || !validateMessage()) return;
    setIsSubmitting(true);
    setName('');
    setEmail('');
    setMessage('');
    setError('');

    const json = {
      name,
      email,
      message
    };

    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json)
    }).then(res => {
      setIsSubmitted(true);
      setIsSubmitting(false);

      if (res.status !== 200)
        res.json().then(json => setError(json.message || 'Something went wrong'));
    }).catch(err => {
      setIsSubmitted(true);
      setIsSubmitting(false);

      setError(err.response.data.message);
    });
  }

  return (
    <ContactPageStyle flexDirection="column" justifyContent="center" alignItems="center" theme={theme}>
      {isSubmitted ? error !== '' ? (
        <Box flexDirection="column" justifyContent="center" alignItems="center">
          <h1 style={{ color: theme.colors.danger[0], fontSize: '3rem' }}><Icon icon={IconEnum.error} size={36} color={theme.colors.danger[0]} /> Error</h1>
          <p>{error}</p>
          <Button onClick={() => window.location.href = '/'}>Home</Button>
      </Box>
      ) : (
        <Box flexDirection="column" justifyContent="center" alignItems="center">
          <h1>Thank you for contacting us!</h1>
          <p>We will get back to you as soon as possible.</p>
          <Button onClick={() => window.location.href = '/tutorial'}>Tutorial</Button>
        </Box>
      ) : isSubmitting ? <Box flexDirection="column" justifyContent="center" alignItems="center">
        Submitting...
        <Progress indeterminate circular />
      </Box> : (
        <form id="contact-form" onSubmit={onSubmit}>
          <h1 style={{ fontSize: '3.4rem' }}>Contact Us</h1>

          <Box spacing="1rem">
            <TextField placeholder="Name" fullWidth value={name} onChanged={setName} onBlur={validateName} error={nameError} />
            <TextField placeholder="Email" fullWidth onChanged={setEmail} onBlur={validateEmail} error={emailError} />
          </Box>

          <TextArea placeholder="Message" rows={4} fullWidth value={message} onChanged={setMessage} onBlur={validateMessage} error={messageError} />

          <Button type="submit" style={{ fontWeight: 'inherit', float: 'right' }} disabled={nameError !== '' || emailError !== '' || messageError !== ''}>Send</Button>
        </form>
      )}
    </ContactPageStyle>    
  );
}

export default ContactPage;
