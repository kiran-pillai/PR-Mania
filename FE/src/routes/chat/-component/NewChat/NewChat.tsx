import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearch } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import NewChatHeader from './NewChatHeader';
import { SendHorizonal } from 'lucide-react';

import { useWebSocket } from '../hooks/useWebSocket';
import { urlToURI } from '@/urlHandler';
import { useChatContext } from '../context/ChatContext';
import { useAuthContext } from '@/context/authContext';
import { Avatar } from '@/components/ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { getAvatarInitials } from '@/utils/utils';

const ChatInput = (props: any) => {
  const { setInput, sendMessage, input } = props;
  return (
    <Input
      className="mx-5"
      style={{ border: 'solid rgb(54, 54, 54)', borderRadius: '10px' }}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      value={input}
    />
  );
};

const NewChat = () => {
  const params: any = useSearch({ from: '/chat' });
  const { chatData } = useChatContext();
  const { userInfo } = useAuthContext();
  const [input, setInput] = useState('');
  const { webSocket, socketIsConnected, messages } = useWebSocket(
    urlToURI('base', 'ws'),
    chatData?.messages,
    userInfo?.id as string
  );
  // https://www.instagram.com/direct/t/103057784427575/
  // https://www.instagram.com/direct/t/103057784427575/
  useEffect(() => {}, [params]);
  const sendMessage = () => {
    if (socketIsConnected) {
      webSocket?.emit('message', {
        message: input,
        chat_id: params?.chat_id,
      });
      setInput('');
    } else {
      console.log('WebSocket not connected');
    }
  };
  const findUserName = (id: string) => {
    return chatData?.users?.find((user) => user._id === id)?.name ?? '';
  };

  return (
    <div
      style={{ height: '94%' }}
      className="flex flex-col w-full justify-between ">
      <NewChatHeader />
      <div className="h-full ml-5">
        {messages?.length > 0 && (
          <div className="p-8 max-h-[500px] overflow-y-scroll">
            {messages.map((message: any) => {
              const isUser = message?.sender === userInfo?.id;
              return (
                <div key={message} className="flex mt-3">
                  {chatData?.is_group_chat && !isUser && (
                    <Avatar
                      color="white"
                      className="mr-2 border-2 border-white p-1.5">
                      <AvatarFallback>
                        {getAvatarInitials(
                          findUserName(message?.sender as string)
                        )}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[600px] p-2 ${isUser ? 'ml-auto text-right bg-[#3797F0]' : 'text-left bg-gray-500'} rounded-3xl`}>
                    {message?.content}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="flex flex-row w-full justify-center items-center  mb-5">
        <ChatInput
          setInput={setInput}
          sendMessage={sendMessage}
          input={input}
        />
        <Button variant={'outline'} onClick={sendMessage}>
          <SendHorizonal className="mr-3 h-4 w-4" />
          Send
        </Button>
      </div>
    </div>
  );
};

export default NewChat;
