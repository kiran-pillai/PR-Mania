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
  const trimLastMessage = (message: string) => {
    if (message.length > 50) {
      return message.slice(0, 50) + '...';
    }
    return message;
  };
  return (
    <Button
      onClick={onNavigate}
      variant={'ghost'}
      key={chat?._id}
      style={{ width: '100%', height: '50px' }}
      className={`flex items-center cursor-pointer ${params?.chat_id === chat?._id ? 'bg-accent' : ''}`}>
      <div className="flex flex-col items-start text-left w-full">
        <div>
          {chat?.participants?.length > 1
            ? chat.participants
                .map((participant: any) => participant.name)
                .join(', ')
            : chat.participants[0].name}
        </div>
        <p className="text-xs text-muted-foreground">
          {trimLastMessage(chat?.last_message?.content)}
        </p>
      </div>
    </Button>
  );
}

export default ChatParticipant;
