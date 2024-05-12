import { useTheme } from '@/components/theme-provider';
import { getBorderColor } from '@/utils/tailwindUtils';
import NewChatModal from '../NewChatModal/NewChatModal';

const SideChatBar = () => {
  const { theme } = useTheme();
  return (
    <div className="flex-col" style={{ borderRight: getBorderColor(theme) }}>
      <NewChatModal />
      <div className="flex mt-2">
        <strong>Messages</strong>
      </div>
    </div>
  );
};

export default SideChatBar;
