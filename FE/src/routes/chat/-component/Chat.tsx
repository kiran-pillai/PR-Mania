import { useEffect, useRef, useState } from 'react';
import '../Chat.css';
import SideChatBar from './SideChatBar/SideChatbar';
import ChatPlaceholder from './ChatInitialPlaceholder';
import { useSearch } from '@tanstack/react-router';
import NewChat from './NewChat/NewChat';

function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const webSocket = useRef<any>(null);
  const params: any = useSearch({ from: '/chat' });
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
    <div className="flex w-full">
      <SideChatBar />
      {!params?.new ? (
        <div className="flex justify-center items-center w-full">
          <ChatPlaceholder />
        </div>
      ) : (
        <NewChat />
      )}
    </div>
  );
}

export default Chat;
