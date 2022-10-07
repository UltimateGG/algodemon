import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { NAME } from '../../globals';
import { Box, TextField, ThemeContext } from '../../Jet';
import EditUserForm from './EditUserForm';


const PageStyle = styled.div.attrs((props: any) => props)`
  margin-top: 6rem;
  margin-bottom: 2rem;
`;

export const AdminPage = ({ user }: any) => {
  const { theme } = useContext(ThemeContext);
  const [searchFilter, setSearchFilter] = React.useState('');
  const [users, setUsers] = React.useState<any>(undefined);
  const [viewingUser, setViewingUser] = React.useState<any>(undefined);

  useEffect(() => {
    document.title = NAME + ' - Admin Panel';

    if (!user) {
      window.location.href = '#/login';
      return;
    }

    if (!users) getUsers();
  }, [user, users]);

  const getUsers = () => {
    fetch('/api/admin/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      }
    }).then(res => res.json()).then(data => setUsers(data));
  }

  if (!user) return null;

  const getFilteredUsers = () => {
    if (!users) return [];

    return users.filter((user: any) => {
      return user.affiliateCode?.toLowerCase().includes(searchFilter.toLowerCase()) || user.email.toLowerCase().includes(searchFilter.toLowerCase()) || user._id.toLowerCase().includes(searchFilter.toLowerCase());
    });
  }

  const getAllUnpaid = () => {
    if (!users) return [];
    const arr: any = [];

    users.forEach((user: any) => {
      user.referrals.forEach((referral: any) => {
        if (!referral.paidOut) arr.push({
          user: user,
          referral: referral
        });
      });
    });

    return arr;
  }

  const handlePay = (id: string, username: string) => {
    fetch('/api/admin/pay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      },
      body: JSON.stringify({
        id: id,
        username: username,
      })
    }).then(res => res.json()).then(data => {
      if (data.error)
        alert(data.error);
      else {
        alert('Successfully paid out for referring ' + username);
        window.location.reload();
      }
    });
  }

  return (
  <PageStyle theme={theme}>
    <div style={{ padding: '0 2rem' }}>
      <h1 style={{ textAlign: 'center' }}>Admin</h1>
    </div>

    <Box style={{ padding: '2rem', paddingTop: 0 }} flexDirection="column">
      {viewingUser ? (<EditUserForm onClose={() => setViewingUser(undefined)} user={viewingUser} />)
      : (<>
        <TextField placeholder="Search by id, email, or code" fullWidth value={searchFilter} onChanged={setSearchFilter} />

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
              {getFilteredUsers().map((muser: any) => (
                <tr key={muser._id}>
                  <td>{muser.email}</td>
                  <td>{muser.affiliateCode}</td>
                  <td>{muser.referrals.length}</td>
                  <td><a onClick={() => setViewingUser(muser)}>View</a></td>{/* eslint-disable-line */}
                </tr>
              ))}
            </tbody>
          </table>
        </div></>)}
    </Box>

    <Box style={{ padding: '2rem', paddingTop: 0 }} flexDirection="column">
      <h1>All Unpaid Referrals - ${(getAllUnpaid().reduce((a: any, b: any) => a + b.referral.amount, 0)).toFixed(2)}</h1>

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
            {getAllUnpaid().map((up: any) => (
              <tr key={up.user._id}>
                <td>{up.referral.username}</td>
                <td>{up.user.email}</td>
                <td>{up.user.affiliateCode}</td>
                <td>${(up.referral.amount).toFixed(2)}</td>
                <td><a onClick={() => handlePay(up.user._id, up.referral.username)}>Pay</a></td>{/* eslint-disable-line */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Box>
  </PageStyle>
  );
}

export default AdminPage;
