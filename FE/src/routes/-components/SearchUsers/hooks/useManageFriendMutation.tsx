import { useFetchWithCredentials } from '@/urlHandler';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ManageFriendMutationArgs {
  friendId: string;
  type: 'add' | 'remove';
}

export const useManageFriendMutation = () => {
  const fetchWithCredentials = useFetchWithCredentials();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (args: ManageFriendMutationArgs) => {
      const { friendId, type } = args;
      let res = await fetchWithCredentials(
        type === 'add' ? 'addFriend' : 'removeFriend',
        {
          method: type === 'add' ? 'POST' : 'DELETE',
          body: JSON.stringify({ friendId: friendId }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return res?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friendsList'] });
    },
    onError: (error) => {
      console.error('Error adding friend:', error);
    },
  });
  return { manageFriendMutation: mutate };
};
