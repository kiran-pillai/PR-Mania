import { Input } from '@/components/ui/input';
import { useSearchUsers } from '@/routes/-components/SearchUsers/hooks/useSearchUsers';
import ChatSearchResults from './ChatSearchResults';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Label } from '@/components/ui/label';
import { Autocomplete } from '@/components/ui/autocomplete';
import { Button } from '@/components/ui/button';

const ChatSearch = () => {
  const { handleOnInputChange, userData } = useSearchUsers('searchFriends');
  return (
    <div className="h-full flex-col">
      <div className="flex items-center border-b">
        <Label className="mr-5">To: </Label>
        <MagnifyingGlassIcon className="mr-1 h-4 w-4 shrink-0 opacity-50" />
        <Input placeholder="Search..." onChange={handleOnInputChange} />
      </div>
      <div className="overflow-y-auto p-2 mt-2 h-5/6 mt-4">
        {userData?.length > 0 ? (
          <ChatSearchResults friends={userData} />
        ) : (
          <div className="flex justify-center">No users found</div>
        )}
      </div>
      <Button disabled={!userData?.length} className="w-full mt-auto p-3">
        Chat
      </Button>
    </div>
  );
};

export default ChatSearch;
