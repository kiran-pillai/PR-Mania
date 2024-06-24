import { useFetchWithCredentials } from '@/urlHandler';
import { useQuery } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import { createContext, useContext, useMemo, useState } from 'react';
export interface FriendData {
  _id: string;
  name: string;
  friends: string[];
  _v: number;
}

export interface ChatMessageData {
  chat: string[];
  content: string;
  createdAt: Date;
  sender: string;
  _v: number;
  _id: string;
}

export interface ChatMessageUserData {
  _id: string;
  name: string;
  email: string;
  _v: number;
}

interface ChatData {
  messages: ChatMessageData[];
  users: ChatMessageUserData[];
}

interface ChatContextValues {
  newChatModalOpen: boolean;
  setNewChatModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newChatRecipients: FriendData[];
  setNewChatRecipients: React.Dispatch<React.SetStateAction<FriendData[]>>;
  chatData: ChatData;
  chatDataIsLoading: boolean;
}
const ChatContext = createContext<ChatContextValues | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatContextProvider');
  }
  return context;
};

export const ChatContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [newChatModalOpen, setNewChatModalOpen] = useState(false);
  const [newChatRecipients, setNewChatRecipients] = useState<FriendData[]>([]);
  const chatApi = getRouteApi('/chat');
  const fetchWithCredentials = useFetchWithCredentials();

  const searchParams: any = chatApi.useSearch();

  const { data: chatData, isLoading: chatDataIsLoading } = useQuery({
    queryKey: ['chatMessages', searchParams?.chat_id],
    queryFn: async () => {
      if (!searchParams?.chat_id) return;
      const url =
        import.meta.env.VITE_API_URL + '/message/' + searchParams?.chat_id;
      const res = await fetchWithCredentials(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return res?.data;
    },
  });
  const values = useMemo(
    () => ({
      setNewChatModalOpen,
      newChatRecipients,
      setNewChatRecipients,
      newChatModalOpen,
      chatData,
      chatDataIsLoading,
    }),
    [
      setNewChatModalOpen,
      newChatRecipients,
      setNewChatRecipients,
      newChatModalOpen,
      chatData,
      chatDataIsLoading,
    ]
  );

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
};
