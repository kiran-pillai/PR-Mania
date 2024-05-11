import { useFetchWithCredentials } from '@/urlHandler';
import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, useMemo, useState } from 'react';

interface AppContextValues {
  friendsListData: Record<string, boolean>;
  friendsListIsLoading: boolean;
  newChatModalOpen: boolean;
  setNewChatModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
  const fetchWithCredentials = useFetchWithCredentials();
  const [newChatModalOpen, setNewChatModalOpen] = useState(false);
  const { data: friendsListData, isLoading: friendsListIsLoading } = useQuery({
    queryKey: ['friendsList'],
    staleTime: Infinity,
    queryFn: async () => {
      const response = await fetchWithCredentials('getFriendsListIds');
      return response;
    },
    placeholderData: {},
  });
  const contextValues = useMemo(
    () => ({
      friendsListData,
      friendsListIsLoading,
      newChatModalOpen,
      setNewChatModalOpen,
    }),
    [
      friendsListData,
      friendsListIsLoading,
      newChatModalOpen,
      setNewChatModalOpen,
    ]
  );
  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};
