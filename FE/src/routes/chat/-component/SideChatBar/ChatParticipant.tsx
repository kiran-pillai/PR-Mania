import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';

interface ChatParticipantProps {
  chat: any;
}

function ChatParticipant(props: ChatParticipantProps) {
  const { chat } = props;
  const navigate = useNavigate();

  const onNavigate = () => {
    navigate({ to: `/chat`, search: { chat_id: chat?._id } });
  };

  return (
    <Button
      onClick={onNavigate}
      variant={'ghost'}
      key={chat?._id}
      className="mb-4 cursor-pointer">
      {chat?.participants?.length > 1
        ? chat.participants.join(', ')
        : chat.participants[0].name}
    </Button>
  );
}

export default ChatParticipant;
