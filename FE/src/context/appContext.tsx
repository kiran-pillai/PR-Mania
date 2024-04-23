import {
  decodeJwtPayload,
  urlToURI,
  useFetchWithCredentials,
} from '@/urlHandler';
import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface AppContextValues {
  friendsListData: Record<string, boolean>;
  friendsListIsLoading: boolean;
}

const AppContext = createContext<AppContextValues | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthContextProvider');
  }
  return context;
};

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  console.log('hello from AppContextProvider');
  const fetchWithCredentials = useFetchWithCredentials();
  const { data: friendsListData, isLoading: friendsListIsLoading } = useQuery({
    queryKey: ['friendsList'],
    staleTime: 5,
    queryFn: async () => {
      const response = await fetchWithCredentials('getFriendsList');
      return response;
    },
    placeholderData: {},
  });
  const contextValues = useMemo(
    () => ({
      friendsListData,
      friendsListIsLoading,
    }),
    [friendsListData, friendsListIsLoading]
  );

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};
