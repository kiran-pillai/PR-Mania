import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';
import NewChatHeader from './NewChatHeader';
import { SendHorizonal } from 'lucide-react';
const NewChat = () => {
  const params: any = useSearch({ from: '/chat' });

  useEffect(() => {}, [params]);

  return (
    <div
      style={{ height: '94%' }}
      className="flex flex-col w-full justify-between ">
      <NewChatHeader />
      <div className="w-full h-full ml-5">Chat History</div>
      <div className="flex flex-row w-full justify-center items-center gap-x-3 mb-5">
        <Input
          className="mx-5"
          style={{ border: 'solid rgb(54, 54, 54)', borderRadius: '10px' }}
        />
        <Button
          variant={'outline'}
          //   onClick={sendMessage}
        >
          <SendHorizonal className="mr-3 h-4 w-4" />
          Send
        </Button>
      </div>
      {/* {messages?.length > 0 && (t
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
      )} */}
    </div>
  );
};

export default NewChat;
