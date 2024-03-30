import { createFileRoute } from '@tanstack/react-router';
import Chat from './-component/Chat';

export const Route = createFileRoute('/chat')({
  component: Chat,
});
