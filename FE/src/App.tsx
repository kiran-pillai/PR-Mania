import { useEffect, useRef, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const webSocket = useRef<any>(null);
  useEffect(() => {
    fetch('http://localhost:8000/')
      .then((response) => {
        // Checking if the response is successful
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text(); // or response.json() if the server responds with JSON
      })
      .then((data) => {
        // Printing the response data to the screen
        setData(data);
      })
      .catch((error) => {
        // Handling any errors that occur during the fetch
        console.error(
          'There has been a problem with your fetch operation:',
          error
        );
      });
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
      console.log('hit the clean up');
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
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <input
          onChange={({ currentTarget: { value } }) => setInput(value)}
          value={input}
          onKeyDown={({ key }) => key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send Message</button>
      </div>
      <h2>Server says {data}</h2>
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
    </>
  );
}

export default App;
