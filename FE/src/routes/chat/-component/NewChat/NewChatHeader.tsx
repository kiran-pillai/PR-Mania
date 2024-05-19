import { useTheme } from '@/components/theme-provider';
import { getBorderColor } from '@/utils/tailwindUtils';
import { getAvatarInitials } from '@/utils/utils';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';

const NewChatHeader = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`text-lg font-semibold border-b ${getBorderColor(theme)} p-3`}>
      <Avatar color="white" className="mr-5 border-white">
        <AvatarFallback>{getAvatarInitials('Kiran Pillai')}</AvatarFallback>
      </Avatar>
      Kiran Pillai
    </div>
  );
};
export default NewChatHeader;
