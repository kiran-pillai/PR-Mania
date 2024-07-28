import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

export const useWebSocket = (
  url: string,
  messageHistory: any[],
  sender: string,
  options?: any
) => {
  const [messages, setMessages] = useState<any[]>(messageHistory);
  const wsRef = useRef<any>();
  const [socketIsConnected, setSocketIsConnected] = useState(false);
  useEffect(() => {
    setMessages(messageHistory);
  }, [messageHistory]);

  useEffect(() => {
    if (messageHistory) {
      const accessToken = localStorage.getItem('accessToken');
      wsRef.current = io(url, {
        auth: { token: accessToken },
        ...(options && { ...options }),
      });
      wsRef?.current?.on('connect', () => {
        console.log('socket.io WebSocket Connected', wsRef?.current?.connected);
        setSocketIsConnected(wsRef?.current?.connected);
      });
      wsRef?.current?.on('message', (msg: any) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { content: msg, sender: sender },
        ]);
      });
      wsRef?.current?.on('disconnect', () => {
        console.log('socket.io WebSocket Disconnected');
        setSocketIsConnected(wsRef?.current?.socket?.connected);
      });
      return () => {
        console.log('socket.io WebSocket Disconnected, hit useEffect cleanup');
        wsRef?.current?.close();
        setSocketIsConnected(false);
      };
    }
  }, [url, options]);
  return { webSocket: wsRef?.current, socketIsConnected, messages };
};
