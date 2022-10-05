import React from 'react';
import { Box, Button, Checkbox, TextField } from '../../Jet';


export interface CreateUserFormProps {
  onClose: () => void;
}
export const CreateUserForm = ({ onClose }: CreateUserFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const email = (e.target as any).email.value;
    const password = (e.target as any).password.value;
    const affiliateCode = (e.target as any).affiliateCode.value;
    const admin = (e.target as any).admin.checked;

    if (!email || !password || !affiliateCode) {
      alert('Please fill out all fields');
      return;
    }

    fetch('/api/admin/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      },
      body: JSON.stringify({
        email,
        password,
        affiliateCode,
        admin
      })
    }).then(res => res.json()).then(data => {
      if (data.error) {
        alert(data.message);
      } else {
        alert('User created!');
        window.location.href = '/dashboard';
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box spacing="1rem">
        <TextField name="email" type="email" placeholder="Email" />
        <TextField name="password" type="password" placeholder="Password" />
        <TextField name="affiliateCode" placeholder="Affiliate Code" />
        <Checkbox name="admin" label="Admin" />
      </Box>

      <Box spacing="1rem">
        <Button onClick={onClose} variant="outlined">Cancel</Button>
        <Button type="submit">Create</Button>
      </Box>
    </form>
  );
}

export default CreateUserForm;
