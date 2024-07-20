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
      style={{ width: '100%', height: '50px' }}
      className="cursor-pointer">
      <div className="mr-auto">
        {chat?.participants?.length > 1
          ? chat.participants.join(', ')
          : chat.participants[0].name}
      </div>
    </Button>
  );
}

export default ChatParticipant;
