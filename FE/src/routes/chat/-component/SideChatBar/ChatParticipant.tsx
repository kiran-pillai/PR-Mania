import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/context/authContext';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { cloneDeep } from 'lodash';
interface ChatParticipantProps {
  chat: any;
}

function ChatParticipant(props: ChatParticipantProps) {
  const { chat } = props;
  const { userInfo } = useAuthContext();
  const navigate = useNavigate();
  const params: any = useSearch({ from: '/chat' });
  const onNavigate = () => {
    navigate({ to: `/chat`, search: { chat_id: chat?._id } });
  };
  const trimLastMessage = (message: any) => {
    const clonedMessage = cloneDeep(message);
    if (clonedMessage?.sender === userInfo?.id)
      clonedMessage.content = 'You: ' + clonedMessage.content;
    if (clonedMessage?.content?.length > 50) {
      return clonedMessage.content.slice(0, 50) + '...';
    }
    return clonedMessage?.content;
  };
  return (
    <Button
      onClick={onNavigate}
      variant={'ghost'}
      key={chat?._id}
      style={{ width: '100%', height: '50px' }}
      className={`flex items-center cursor-pointer ${params?.chat_id === chat?._id ? 'bg-accent' : ''}`}>
      <div className="flex flex-col items-start text-left w-full">
        <p>
          {chat?.participants?.length > 1
            ? chat.participants
                .map((participant: any) => participant.name)
                .join(', ')
            : chat.participants[0].name}
        </p>
        <p className="text-xs text-muted-foreground">
          {trimLastMessage(chat?.last_message)}
        </p>
      </div>
    </Button>
  );
}

export default ChatParticipant;
