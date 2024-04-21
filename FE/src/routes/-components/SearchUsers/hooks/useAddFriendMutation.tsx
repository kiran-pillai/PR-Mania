import { useFetchWithCredentials } from '@/urlHandler';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddFriendMutation = () => {
  const fetchWithCredentials = useFetchWithCredentials();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (friendId: string) => {
      let res = await fetchWithCredentials('addFriend', {
        method: 'POST',
        body: JSON.stringify({ friendId: friendId }),
      });
      if (!res.ok) {
        throw new Error('Error adding friend');
      }
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userSearch'] });
    },
    onError: (error) => {
      console.error('Error adding friend:', error);
    },
  });
  return { addFriendMutation: mutate };
};
