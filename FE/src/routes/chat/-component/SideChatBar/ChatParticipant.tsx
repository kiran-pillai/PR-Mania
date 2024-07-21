import { Button } from '@/components/ui/button';
import { useNavigate, useSearch } from '@tanstack/react-router';

interface ChatParticipantProps {
  chat: any;
}

function ChatParticipant(props: ChatParticipantProps) {
  const { chat } = props;
  const navigate = useNavigate();
  const params: any = useSearch({ from: '/chat' });
  const onNavigate = () => {
    navigate({ to: `/chat`, search: { chat_id: chat?._id } });
  };
  return (
    <Button
      onClick={onNavigate}
      variant={'ghost'}
      key={chat?._id}
      style={{ width: '100%', height: '50px' }}
      className={`cursor-pointer ${params?.chat_id === chat?._id ? 'bg-accent' : ''}`}>
      <div className="mr-auto">
        {chat?.participants?.length > 1
          ? chat.participants
              .map((participant: any) => participant.name)
              .join(', ')
          : chat.participants[0].name}
      </div>
    </Button>
  );
}

export default ChatParticipant;
