import { CommandItem } from '@/components/ui/command';
import { useAuthContext } from '@/context/authContext';
import { Minus, Plus } from 'lucide-react';
import { useManageFriendMutation } from './hooks/useManageFriendMutation';
import { useAppContext } from '@/context/appContext';

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
  const { manageFriendMutation } = useManageFriendMutation();
  const { friendsListData } = useAppContext();
  return (
    <div key={user?._id} className="flex justify-between">
      <CommandItem>{user?.name}</CommandItem>
      <div style={{ cursor: 'pointer' }}>
        {friendsListData?.[user?._id] ? (
          <Minus
            onClick={() =>
              manageFriendMutation({ friendId: user?._id, type: 'remove' })
            }
          />
        ) : (
          <Plus
            onClick={() =>
              manageFriendMutation({ friendId: user?._id, type: 'add' })
            }
          />
        )}
      </div>
    </div>
  );
};
export default SearchUsersRow;
