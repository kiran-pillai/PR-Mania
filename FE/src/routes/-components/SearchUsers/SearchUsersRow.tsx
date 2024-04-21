import { CommandItem } from '@/components/ui/command';
import { useAuthContext } from '@/context/authContext';
import { Check, Plus } from 'lucide-react';
import { useAddFriendMutation } from './hooks/useAddFriendMutation';

export interface User {
  _id: string;
  email: string;
  name: string;
  _v: number;
}

interface SearchUsersRowProps {
  user: User;
}

const SearchUsersRow = (props: SearchUsersRowProps) => {
  const { user } = props;
  const { userInfo: loggedInUser } = useAuthContext();
  const { addFriendMutation } = useAddFriendMutation();
  return (
    <div key={user?._id} className="flex justify-between">
      <CommandItem>{user?.name}</CommandItem>
      <Plus onClick={() => addFriendMutation(user?._id)} />
    </div>
  );
};
export default SearchUsersRow;
