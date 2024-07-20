import { useTheme } from '@/components/theme-provider';
import { getBorderColor } from '@/utils/tailwindUtils';
import NewChatModal from '../NewChatModal/NewChatModal';
import { useChatContext } from '../context/ChatContext';
import ChatParticipant from './ChatParticipant';

const SideChatBar = () => {
  const { theme } = useTheme();
  const { allChatsData } = useChatContext();
  return (
    <div className="flex-col" style={{ borderRight: getBorderColor(theme) }}>
      <NewChatModal />
      <div className="flex-col mt-2 p-4">
        <strong className="mb-4">Messages</strong>
        <div className="flex-col mt-4">
          {allChatsData?.map((chat: any) => (
            <ChatParticipant key={chat?._id} chat={chat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideChatBar;
