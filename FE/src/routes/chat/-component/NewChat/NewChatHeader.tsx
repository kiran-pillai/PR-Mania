import { useTheme } from '@/components/theme-provider';
import { useFetchWithCredentials } from '@/urlHandler';
import { getBorderColor } from '@/utils/tailwindUtils';
import { getAvatarInitials } from '@/utils/utils';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { useQuery } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';

const NewChatHeader = () => {
  const { theme } = useTheme();
  const chatApi = getRouteApi('/chat');
  const fetchWithCredentials = useFetchWithCredentials();
  const searchParams: any = chatApi.useSearch();

  const { data: usersData, isLoading } = useQuery({
    queryKey: ['getUsers', searchParams?.user_id],
    queryFn: async () =>
      await fetchWithCredentials('getUsers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ users: searchParams?.user_id }),
      }),
  });

  return (
    !isLoading && (
      <div
        className={`text-lg font-semibold border-b ${getBorderColor(theme)} p-3`}>
        {usersData?.length === 1 && (
          <Avatar color="white" className="mr-5 border-white">
            <AvatarFallback>
              {getAvatarInitials(usersData?.[0]?.name)}
            </AvatarFallback>
          </Avatar>
        )}

        {usersData?.length === 1
          ? usersData?.[0]?.name
          : usersData.map((user: any) => user.name).join(', ')}
      </div>
    )
  );
};
export default NewChatHeader;
