import { useTheme } from '@/components/theme-provider';
import { getBorderColor } from '@/utils/tailwindUtils';
import { getAvatarInitials } from '@/utils/utils';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { useChatContext } from '../context/ChatContext';

const NewChatHeader = () => {
  const { theme } = useTheme();
  const { chatData, chatDataIsLoading } = useChatContext();
  return (
    !chatDataIsLoading && (
      <div
        className={`text-lg font-semibold border-b ${getBorderColor(theme)} p-3`}>
        {chatData?.users?.length === 1 && (
          <Avatar color="white" className="mr-5 ">
            <AvatarFallback>
              {getAvatarInitials(chatData?.users?.[0]?.name)}
            </AvatarFallback>
          </Avatar>
        )}

        {chatData?.users?.length === 1
          ? chatData?.users?.[0]?.name
          : chatData?.users?.map((user: any) => user.name).join(', ')}
      </div>
    )
  );
};
export default NewChatHeader;
