import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { apiPost } from '../../api/apiExecutor';
import { Referral, User } from '../../api/types';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { NAME } from '../../globals';
import { Box, Modal, Progress, TextField, ThemeContext } from '../../Jet';
import EditUserForm from './EditUserForm';


const PageStyle = styled.div.attrs((props: any) => props)`
  margin-top: 6rem;
  margin-bottom: 2rem;
`;

export const AdminPage = () => {
  const { theme } = useContext(ThemeContext);
  const { user, users, loadUsers, loading } = useAuth();
  const [searchFilter, setSearchFilter] = React.useState('');
  const [editingUser, setEditingUser] = React.useState<User | null>(null);
  const { addNotification } = useNotifications();

  useEffect(() => {
    document.title = NAME + ' - Admin Panel';

    if (!user) {
      window.location.href = '#/login';
      return;
    }

    if (!users.length) loadUsers();
  }, [user, users, loadUsers]);

  const getFilteredUsers = () => {
    return users.filter(user =>
      user.affiliateCode?.toLowerCase().includes(searchFilter.toLowerCase())
      || user.email.toLowerCase().includes(searchFilter.toLowerCase())
      || user._id.toLowerCase().includes(searchFilter.toLowerCase())
    );
  }

  interface ReferralLink {
    user: User;
    referral: Referral;
  }
  const getAllUnpaid = () => {
    if (!users) return [];
    const unpaidReferrals: ReferralLink[] = [];

    users.forEach(user => {
      user.referrals.forEach(referral => {
        if (!referral.paidOut) unpaidReferrals.push({
          user: user,
          referral: referral
        });
      });
    });

    return unpaidReferrals;
  }

  const handlePay = (id: string, username: string) => {
    apiPost('admin/pay', {
      id,
      username
    }, true).then(res => {
      if (res.error) return addNotification({ text: res.error, variant: 'danger' });
      addNotification({ text: 'Marked referral as paid', variant: 'success' });
      loadUsers();
    });
  }

  return (
    <PageStyle theme={theme}>
      <div style={{ padding: '0 2rem' }}>
        <h1 style={{ textAlign: 'center' }}>Admin</h1>
      </div>

      <Box style={{ padding: '2rem', paddingTop: 0 }} flexDirection="column">
        <TextField placeholder="Search by id, email, or code" fullWidth value={searchFilter} onChanged={setSearchFilter} />

        {loading ? <Progress circular indeterminate style={{ margin: '0 auto' }} /> : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Affiliate Code</th>
                  <th>Referrals</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {getFilteredUsers().map(muser => (
                  <tr key={muser._id}>
                    <td>{muser.email}</td>
                    <td>{muser.affiliateCode}</td>
                    <td>{muser.referrals.length}</td>
                    <td><a onClick={() => setEditingUser(muser)}>View</a></td>{/* eslint-disable-line */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Box>

      <Box style={{ padding: '2rem', paddingTop: 0 }} flexDirection="column">
        <h1>All Unpaid Referrals - ${(getAllUnpaid().reduce((a: number, b: ReferralLink) => a + b.referral.amount, 0)).toFixed(2)}</h1>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Affiliate</th>
                <th>Code</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {getAllUnpaid().map((unpaid, index) => (
                <tr key={index}>
                  <td>{unpaid.referral.username}</td>
                  <td>{unpaid.user.email}</td>
                  <td>{unpaid.user.affiliateCode}</td>
                  <td>${(unpaid.referral.amount).toFixed(2)}</td>
                  <td><a onClick={() => handlePay(unpaid.user._id, unpaid.referral.username)}>Pay</a></td>{/* eslint-disable-line */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Box>

      <Modal open={editingUser !== null} onClose={() => setEditingUser(null)} title={'Edit ' + editingUser?.email}>
        {editingUser !== null && <EditUserForm onClose={() => setEditingUser(null)} user={editingUser} theme={theme} />}
      </Modal>
    </PageStyle>
  );
}

export default AdminPage;
