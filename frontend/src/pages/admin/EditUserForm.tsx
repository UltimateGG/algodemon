import React from 'react';
import { apiPost } from '../../api/apiExecutor';
import { User } from '../../api/types';
import { useNotifications } from '../../contexts/NotificationContext';
import ReferralList from '../../components/ReferralList';
import { Box, Button, Checkbox, Icon, IconEnum, Modal, TextField, Theme } from '../../Jet';
import { useAuth } from '../../contexts/AuthContext';


export interface EditUserFormProps {
  onClose: () => void;
  user: User;
  theme: Theme;
}
export const EditUserForm = ({ onClose, user, theme }: EditUserFormProps) => {
  const [email, setEmail] = React.useState(user.email);
  const [password, setPassword] = React.useState<string | undefined>(undefined);
  const [affiliateCode, setAffiliateCode] = React.useState(user.affiliateCode);
  const [isAdmin, setIsAdmin] = React.useState(user.admin);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const { addNotification } = useNotifications();
  const { loadUsers } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const email = (e.target as any).email.value;
    const password = (e.target as any).password.value;
    const affiliateCode = (e.target as any).affiliateCode.value;
    const admin = (e.target as any).admin.checked;

    if (!email) {
      addNotification({ text: 'Email is required', variant: 'danger' });
      return;
    }

    apiPost('admin/edit', {
      id: user._id,
      email,
      password,
      affiliateCode,
      admin
    }, true).then(res => {
      if (res.error) return addNotification(res.error);
      addNotification({ text: 'User updated', variant: 'success' });
      loadUsers();
      onClose();
    });
  }

  const handleDelete = () => {
    apiPost('admin/delete', { id: user._id }, true).then(res => {
      if (res.error) return addNotification(res.error);
      addNotification({ text: 'User deleted', variant: 'success' });
      loadUsers();
      onClose();
    });
  }

  return (
    <>
      <Box justifyContent="space-between" alignItems="center">
        <p>Referrals: {user.referrals.length}</p>
        <Icon icon={IconEnum.trash} color={theme.colors.danger[0]} size={32} style={{ cursor: 'pointer' }} onClick={() => setShowConfirm(true)} />
      </Box> 

      <form onSubmit={handleSubmit}>
        <Box spacing="1rem" flexDirection="column">
          <TextField fullWidth name="email" type="email" placeholder="Email" value={email} onChanged={setEmail} />
          <TextField fullWidth name="password" placeholder="Password" value={password} onChanged={setPassword} />
          <TextField fullWidth name="affiliateCode" placeholder="Affiliate Code" value={affiliateCode} onChanged={setAffiliateCode} />
          <Checkbox name="admin" label="Admin" checked={isAdmin} onCheck={setIsAdmin} style={{ justifyContent: 'flex-start'}} />
        </Box>

        <Box spacing="1rem">
          <Button onClick={onClose} variant="outlined">Cancel</Button>
          <Button type="submit">Save</Button>
        </Box>
      </form>

      <Modal open={showConfirm} title="Delete User?">
        <p>Are you sure you want to delete this user? (<strong>{user.email}</strong>)<br />This action cannot be undone.</p>
        <Box spacing="1rem">
          <Button color="secondary" onClick={() => setShowConfirm(false)} variant="outlined">Cancel</Button>
          <Button color="danger" onClick={() => handleDelete()}>Delete</Button>
        </Box>
      </Modal>

      <h1 style={{ marginTop: '2rem' }}>User's Referrals</h1>
      <ReferralList user={user} />
    </>
  );
}

export default EditUserForm;
