import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

export const useWebSocket = (
  url: string,
  messageHistory: any[],
  options?: any
) => {
  const [messages, setMessages] = useState<any[]>(messageHistory);
  const wsRef = useRef<any>();
  const [socketIsConnected, setIsSocketConnected] = useState(false);
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
        setIsSocketConnected(wsRef?.current?.connected);
      });
      wsRef?.current?.on('message', (msg: any) => {
        setMessages((prevMessages) => [...prevMessages, { content: msg }]);
      });
      wsRef?.current?.on('disconnect', () => {
        setIsSocketConnected(wsRef?.current?.socket?.connected);
      });
      return () => {
        wsRef?.current?.close();
        setIsSocketConnected(false);
      };
    }
  }, [url, options]);
  return { webSocket: wsRef?.current, socketIsConnected, messages };
};
