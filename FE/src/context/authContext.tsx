import { createContext, useContext, useMemo, useState } from 'react';

interface AuthContextValues {
  userIsAuthenticated: boolean;
  setUserIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [userIsAuthenticated, setUserIsAuthenticated] =
    useState<boolean>(false);

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
