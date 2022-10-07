import React, { useEffect } from 'react';
import { apiGet } from '../api/apiExecutor';
import { User } from '../api/types';


export interface AuthContextProps {
  user?: User;
  users: User[];
  loadUsers: () => void;
  loading: boolean;
  logout: () => void;
}
export const AuthContext = React.createContext<AuthContextProps>({
  user: undefined,
  users: [],
  loadUsers: () => {},
  loading: false,
  logout: () => {}
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = React.useState<User | undefined>(undefined);
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (user) return;
    apiGet('affiliates/user', true).then(res => {
      if (res.error || res.status === 401) return setUser(undefined);
      setUser(res.data);
    });
  });

  const loadUsers = () => {
    if (!user || !user.admin) return;
    setLoading(true);
    apiGet('admin/users', true).then(res => {
      if (res.error) return;
      setUsers(res.data);
    }).finally(() => setLoading(false));
  }

  const logout = () => {
    sessionStorage.removeItem('token');
    setUser(undefined);
  }

  return (
    <AuthContext.Provider value={{ user, users, loadUsers, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => React.useContext(AuthContext);
