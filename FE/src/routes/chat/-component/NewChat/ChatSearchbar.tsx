import { Input } from '@/components/ui/input';
import { useSearchUsers } from '@/routes/-components/SearchUsers/hooks/useSearchUsers';
import ChatSearchResults from './ChatSearchResults';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Label } from '@/components/ui/label';

const ChatSearchbar = () => {
  const { handleOnInputChange, userData } = useSearchUsers('searchFriends');
  return (
    <>
      <div className="flex items-center border-b">
        <Label className="mr-5">To: </Label>
        <MagnifyingGlassIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <Input placeholder="Search..." onChange={handleOnInputChange} />
      </div>

      {userData?.length > 0 ? (
        <ChatSearchResults friends={userData} />
      ) : (
        <div className="flex justify-center">No users found</div>
      )}
    </>
  );
};

export default ChatSearchbar;
