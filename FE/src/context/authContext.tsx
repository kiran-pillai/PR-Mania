import { decodeJwtPayload, urlToURI } from '@/urlHandler';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface UserInfo {
  email: string;
  name: string;
  id: string;
  iat: number;
  exp: number;
}

interface AuthContextValues {
  userIsAuthenticated: boolean | string;
  setUserIsAuthenticated: React.Dispatch<
    React.SetStateAction<boolean | string>
  >;
  userInfo: UserInfo | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
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
  >(false);
  const [userInfo, setUserInfo] = useState<any>(null);
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
        const decodedToken = decodeJwtPayload(token);
        setUserInfo(decodedToken);
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
    if (window.location.pathname !== '/login') {
      revalidateToken();
    }
  }, []);

  const contextValues = useMemo(
    () => ({
      userIsAuthenticated,
      setUserIsAuthenticated,
      userInfo,
      setUserInfo,
    }),
    [userIsAuthenticated, setUserIsAuthenticated, userInfo, setUserInfo]
  );
  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};
