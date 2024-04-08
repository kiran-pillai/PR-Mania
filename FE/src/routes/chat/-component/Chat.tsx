import { useEffect, useRef, useState } from 'react';
import '../Chat.css';
import { Button } from '@/components/ui/button';
import { useFetchWithCredentials } from '@/urlHandler';

function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const webSocket = useRef<any>(null);

  useEffect(() => {
    let refreshToken = localStorage.getItem('refreshToken');
    // Define the WebSocket connection
    let queryParams = encodeURIComponent(`Bearer ${refreshToken}`);
    const ws = new WebSocket(`ws://localhost:8000?token=${queryParams}`);
    ws.onopen = () => console.log('WebSocket Connected');
    ws.onclose = () => console.log('WebSocket Disconnected');
    ws.onmessage = ({ data }) => {
      // Append the new message to the messages array
      setMessages((prevMessages) => [...prevMessages, data]);
    };
    webSocket.current = ws;

    // Clean up function
    return () => {
      webSocket.current.close();
    };
  }, []);

  const sendMessage = () => {
    if (
      webSocket?.current &&
      webSocket?.current?.readyState === WebSocket.OPEN
    ) {
      webSocket?.current?.send(input);
      setInput('');
    } else {
      console.log('WebSocket not connected');
    }
  };
  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <div className="flex flex-row w-full justify-center items-center gap-x-3 mb-5">
        <input
          onChange={({ currentTarget: { value } }) => setInput(value)}
          value={input}
          onKeyDown={({ key }) => key === 'Enter' && sendMessage()}
          className="text-black h-9"
        />
        <Button onClick={sendMessage}>Send Message</Button>
      </div>
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
  );
}

export default Chat;
