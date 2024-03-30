import { useEffect, useRef, useState } from 'react';
import '../Chat.css';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/context/authContext';
import { urlToURI, useFetchWithCredentials } from '@/urlHandler';

function Chat() {
  const { setUserIsAuthenticated } = useAuthContext();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [data, setData] = useState('');
  const webSocket = useRef<any>(null);
  const fetchWithCredentials = useFetchWithCredentials();
  async function getHelloWorld() {
    const text = await fetchWithCredentials('base', (response: any) =>
      response.text()
    );
    setData(text);
  }

  useEffect(() => {
    getHelloWorld();
  }, []);

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
    <div
      className="flex flex-col w-full h-full justify-center items-center"
      // style={{
      //   width: '100%',
      //   justifyContent: 'center',
      //   alignItems: 'center',
      //   display: 'flex',
      //   flexDirection: 'column',
      // }}
    >
      <div
        className="flex flex-row w-full justify-center items-center gap-x-3 mb-5"
        // style={{
        //   display: 'flex',
        //   flexDirection: 'row',
        //   marginBottom: '2em',
        //   gap: '1rem',
        // }}
      >
        <input
          onChange={({ currentTarget: { value } }) => setInput(value)}
          value={input}
          onKeyDown={({ key }) => key === 'Enter' && sendMessage()}
          className="text-black"
        />
        <Button onClick={sendMessage}>Send Message</Button>
      </div>
      <div className="p-8 border border-white max-h-[500px] overflow-y-scroll">
        <em>Messages:</em>
        {messages.map((message) => (
          <div
            key={message}
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: '7px',
            }}>
            <div style={{ marginRight: '10px' }}>Client:</div>
            <div
              style={{ width: '350px', textAlign: 'left' }}>{`${message}`}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chat;
