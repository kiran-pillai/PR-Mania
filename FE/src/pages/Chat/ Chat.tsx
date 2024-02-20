import { useEffect, useRef, useState } from 'react';
import './Chat.css';
import { useFetchWithCredentials, urlToURI } from '../../urlHandler';
import { useAuthContext } from '../../context/authContext';
const Chat = () => {
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

  async function logout() {
    await fetch(urlToURI('logout'));
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUserIsAuthenticated(false);
  }
  useEffect(() => {
    getHelloWorld();
  }, []);

  useEffect(() => {
    // Define the WebSocket connection
    const ws = new WebSocket('ws://localhost:8000');

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
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginBottom: '2em',
          gap: '1rem',
        }}>
        <input
          onChange={({ currentTarget: { value } }) => setInput(value)}
          value={input}
          onKeyDown={({ key }) => key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send Message</button>
      </div>
      <div className="card">
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
      <h2>Server says {data}</h2>
      <button onClick={getHelloWorld}>Send a req</button>
      <button onClick={logout}>Logout</button>
    </>
  );
};
export default Chat;
