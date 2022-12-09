import React, { useEffect } from 'react';
import { apiGet } from '../api/apiExecutor';
import { AppState, APP_STATE_DEFAULT, User } from '../api/types';


export interface AuthContextProps {
  user?: User;
  login: () => Promise<void>;
  users: User[];
  loadUsers: () => void;
  loading: boolean;
  logout: () => void;
  appState: AppState;
}
export const AuthContext = React.createContext<AuthContextProps>({
  user: undefined,
  login: () => Promise.resolve(),
  users: [],
  loadUsers: () => {},
  loading: false,
  logout: () => {},
  appState: APP_STATE_DEFAULT
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = React.useState<User | undefined>(undefined);
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [appState, setAppState] = React.useState<AppState>(APP_STATE_DEFAULT);

  const setState = async () => {
    let resp;
    try {
      const res = await apiGet('state');
      if (res.error || !res.data) return;

      setAppState(res.data);
      resp = res.data;
    } catch (ignored) {}

    if (!resp || !resp.price) setTimeout(setState, 2000);
  }

  useEffect(() => {
    setState();
  }, []); // eslint-disable-line

  useEffect(() => {
    if (!user) login();
  }, []); // eslint-disable-line

  const login = () => {
    return new Promise<void>(async (resolve, reject) => {
      const res = await apiGet('auth/user', true);
      if (res.error || res.status === 401) {
        setUser(undefined);
        resolve();
        return;
      }

      setUser(res.data);
      resolve();
    });
  }

  const loadUsers = () => {
    if (!user || !user.admin) return;
    setLoading(true);
    apiGet('admin/users', true).then(res => {
      if (res.error) return;
      setUsers(res.data);
    }).finally(() => setLoading(false));
  }

  const logout = () => {
    localStorage.removeItem('token');
    setUser(undefined);
  }

  return (
    <AuthContext.Provider value={{ user, login, users, loadUsers, loading, logout, appState }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => React.useContext(AuthContext);
