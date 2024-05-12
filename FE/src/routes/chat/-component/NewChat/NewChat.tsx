import { Button } from '@/components/ui/button';
import { useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';

const NewChat = () => {
  const params: any = useSearch({ from: '/chat' });

  useEffect(() => {}, [params]);

  //

  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <div className="flex flex-row w-full justify-center items-center gap-x-3 mb-5">
        <input
          // onChange={({ currentTarget: { value } }) => setInput(value)}
          // value={input}
          // onKeyDown={({ key }) => key === 'Enter' && sendMessage()}
          className="text-black h-9"
        />
        <Button
        //   onClick={sendMessage}
        >
          Send Message
        </Button>
      </div>
      {/* {messages?.length > 0 && (
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
