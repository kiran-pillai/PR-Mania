import { createFileRoute } from '@tanstack/react-router';
import ChatComponent from './-component/Chat';
import { ChatContextProvider } from './-component/context/ChatContext';

const Chat = () => {
  return (
    <ChatContextProvider>
      <ChatComponent />
    </ChatContextProvider>
  );
};

export const Route = createFileRoute('/chat')({
  component: Chat,
});
