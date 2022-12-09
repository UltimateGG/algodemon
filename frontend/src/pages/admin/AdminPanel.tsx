import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { User } from '../../api/types';
import { useAuth } from '../../contexts/AuthContext';
import { NAME } from '../../globals';
import { Box, Button, Modal, Progress, TextField, ThemeContext } from '../../Jet';
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

  useEffect(() => {
    if (!user || !user.admin) {
      window.location.href = '#/admin/login';
      return;
    }
  });

  useEffect(() => {
    document.title = NAME + ' - Admin Panel';

    if (!users.length) loadUsers();
  }, [user, users, loadUsers]);

  const getFilteredUsers = () => {
    return users.filter(user =>
      user.email.toLowerCase().includes(searchFilter.toLowerCase())
      || user._id.toLowerCase().includes(searchFilter.toLowerCase())
    );
  }

  return (
    <PageStyle theme={theme}>
      <Box justifyContent="space-between" style={{ padding: '0 2rem' }}>
        <h1 style={{ textAlign: 'center' }}>Accounts</h1>
        <Button onClick={() => window.location.href = '/#/admin/sessions'}>Session Explorer</Button>
      </Box>

      <Box style={{ padding: '2rem', paddingTop: 0 }} flexDirection="column">
        <TextField placeholder="Search by id, email, or code" fullWidth value={searchFilter} onChanged={setSearchFilter} />

        {loading ? <Progress circular indeterminate style={{ margin: '0 auto' }} /> : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Email</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {getFilteredUsers().map(muser => (
                  <tr key={muser._id}>
                    <td>{muser.email}</td>
                    <td><a onClick={() => setEditingUser(muser)}>View</a></td>{/* eslint-disable-line */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Box>

      <Modal open={editingUser !== null} onClose={() => setEditingUser(null)} title={'Edit ' + editingUser?.email}>
        {editingUser !== null && <EditUserForm onClose={() => setEditingUser(null)} user={editingUser} theme={theme} />}
      </Modal>
    </PageStyle>
  );
}

export default AdminPage;
