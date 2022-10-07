import React from 'react';
import ReferralList from '../../components/ReferralList';
import { Box, Button, Checkbox, Icon, IconEnum, Modal, TextField } from '../../Jet';


export interface EditUserFormProps {
  onClose: () => void;
  user: any;
}
export const EditUserForm = ({ onClose, user }: EditUserFormProps) => {
  const [email, setEmail] = React.useState(user.email);
  const [password, setPassword] = React.useState<any>(undefined);
  const [affiliateCode, setAffiliateCode] = React.useState(user.affiliateCode);
  const [isAdmin, setIsAdmin] = React.useState(user.admin);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const email = (e.target as any).email.value;
    const password = (e.target as any).password.value;
    const affiliateCode = (e.target as any).affiliateCode.value;
    const admin = (e.target as any).admin.checked;

    if (!email || !affiliateCode) {
      alert('Please fill out all fields');
      return;
    }

    fetch('/api/admin/edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      },
      body: JSON.stringify({
        id: user._id,
        email,
        password,
        affiliateCode,
        admin
      })
    }).then(res => res.json()).then(data => {
      if (data.error) {
        alert(data.message);
      } else {
        alert('User edited!');
        window.location.href = '#/dashboard';
      }
    });
  }

  const handleDelete = () => {
    fetch('/api/admin/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      },
      body: JSON.stringify({
        id: user._id
      })
    }).then(res => res.json()).then(data => {
      if (data.error) {
        alert(data.message);
      } else {
        alert('User deleted!');
        window.location.href = '#/dashboard';
      }
    });
  }

  return (
    <>
    <Box spacing="1rem">
      <Button color="secondary" onClick={() => onClose()} style={{ maxWidth: '6rem' }}>
        <Icon icon={IconEnum.left} size={16} />
      </Button>
      <Button color="danger" onClick={() => setShowConfirm(true)} style={{ maxWidth: '6rem' }}>
        <Icon icon={IconEnum.x} size={16} />
      </Button>
      <h1>Viewing {user.email}</h1>
    </Box>
      <form onSubmit={handleSubmit}>
        <p>Referrals: {user.referrals.length}</p>
        <Box spacing="1rem">
          <TextField name="email" type="email" placeholder="Email" value={email} onChanged={setEmail} />
          <TextField name="password" placeholder="Password" value={password} onChanged={setPassword} />
          <TextField name="affiliateCode" placeholder="Affiliate Code" value={affiliateCode} onChanged={setAffiliateCode} />
          <Checkbox name="admin" label="Admin" checked={isAdmin} onCheck={setIsAdmin} />
        </Box>

        <Box spacing="1rem">
          <Button onClick={onClose} variant="outlined">Cancel</Button>
          <Button type="submit">Save</Button>
        </Box>
      </form>

      <Modal open={showConfirm} title="Delete User?">
        <p>Are you sure you want to delete this user? (<strong>{user.email}</strong>) This action cannot be undone.</p>
        <Box spacing="1rem">
          <Button onClick={() => setShowConfirm(false)} variant="outlined">Cancel</Button>
          <Button color="danger" onClick={() => handleDelete()}>Delete</Button>
        </Box>
      </Modal>

      <h1 style={{ marginTop: '2rem' }}>User Referrals</h1>
      <ReferralList user={user} />
    </>
  );
}

export default EditUserForm;
