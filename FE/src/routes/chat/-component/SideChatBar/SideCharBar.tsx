import { useTheme } from '@/components/theme-provider';
import { getBorderColor } from '@/utils/tailwindUtils';
import NewChat from '../NewChat/NewChat';

const SideChatBar = () => {
  const { theme } = useTheme();
  return (
    <div className="flex-col" style={{ borderRight: getBorderColor(theme) }}>
      <NewChat />
      <div className="flex mt-2">
        <strong>Messages</strong>
      </div>
    </div>
  );
};

export default SideChatBar;
