import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearch } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import NewChatHeader from './NewChatHeader';
import { SendHorizonal } from 'lucide-react';

import { useWebSocket } from '../hooks/useWebSocket';

const NewChat = () => {
  const params: any = useSearch({ from: '/chat' });
  const [input, setInput] = useState('');
  const { webSocket, socketIsConnected, messages } = useWebSocket(
    'ws://localhost:8000',
    []
  );
  useEffect(() => {}, [params]);

  const sendMessage = () => {
    if (socketIsConnected) {
      webSocket?.emit('message', input);
      setInput('');
    } else {
      console.log('WebSocket not connected');
    }
  };
  return (
    <div
      style={{ height: '94%' }}
      className="flex flex-col w-full justify-between ">
      <NewChatHeader />
      <div className="w-full h-full ml-5">
        {' '}
        {messages?.length > 0 && (
          <>
            <em>Messages:</em>
            <div className="p-8 border border-white max-h-[500px] overflow-y-scroll">
              {messages.map((message) => (
                <div key={message} className="flex mt-3 normal">
                  <div className="mr-7">Client:</div>
                  <div
                    style={{
                      width: '350px',
                      textAlign: 'left',
                    }}>{`${message}`}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="flex flex-row w-full justify-center items-center  mb-5">
        <Input
          className="mx-5"
          style={{ border: 'solid rgb(54, 54, 54)', borderRadius: '10px' }}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          value={input}
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
