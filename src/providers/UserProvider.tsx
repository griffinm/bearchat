import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../utils/types';
import { getToken } from '../utils/LocalStorage';


interface Props {
  children: React.ReactNode;
}

interface UserContextProps {
  user?: User,
  token?: string,
  loading: boolean,
  setToken?: (token: string) => void,
  setUser: (user: User) => void,
}

export const UserContext = createContext<UserContextProps>({
  user: undefined,
  loading: false,
  setUser: () => {},
});

export function UserProvider({
  children,
}: Props) {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string>();

  // Read the initial token from local storage
  useEffect(() => {
    const token = getToken()
    if (token) {
      setToken(token)
    }
  }, []);

  const handleSetToken = (token: string) => {
    setToken(token);
    localStorage.setItem('token', token);
  }

  return (
    <UserContext.Provider value={{
      user,
      loading,
      token,
      setToken: handleSetToken,
      setUser,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
