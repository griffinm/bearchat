import { createContext, useContext, useState } from 'react';
import { User } from '../utils/types';


interface Props {
  children: React.ReactNode;
}

interface UserContext {
  user?: User,
  loading: boolean,
}

export const UserContext = createContext<UserContext>({
  user: undefined,
  loading: false,
});

export function UserProvider({
  children,
}: Props) {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  return (
    <UserContext.Provider value={{ user, loading }}>
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
