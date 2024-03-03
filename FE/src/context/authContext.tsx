import { urlToURI } from '@/urlHandler';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface AuthContextValues {
  userIsAuthenticated: boolean | string;
  setUserIsAuthenticated: React.Dispatch<
    React.SetStateAction<boolean | string>
  >;
}

const AuthContext = createContext<AuthContextValues | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthContextProvider');
  }
  return context;
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState<
    boolean | string
  >('idle');
  async function revalidateToken() {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setUserIsAuthenticated(false);
      return;
    }
    try {
      let res: Response = await fetch(urlToURI('revalidate'), {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setUserIsAuthenticated(true);
      } else {
        throw Error;
      }
    } catch {
      setUserIsAuthenticated(false);
      console.error('token is invalid');
    }
  }

  useEffect(() => {
    revalidateToken();
  }, []);

  const contextValues = useMemo(
    () => ({
      userIsAuthenticated,
      setUserIsAuthenticated,
    }),
    [userIsAuthenticated, setUserIsAuthenticated]
  );
  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};
