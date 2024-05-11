import { Input } from '@/components/ui/input';
import { useSearchUsers } from '@/routes/-components/SearchUsers/hooks/useSearchUsers';
import NewChatRecipientSearchResults from './NewChatRecipientSearchResults';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Label } from '@/components/ui/label';
import { Autocomplete } from '@/components/ui/autocomplete';
import { Button } from '@/components/ui/button';

const NewChatRecepientSearch = () => {
  const { handleOnInputChange, userData: friendsSearchResults } =
    useSearchUsers('searchFriends');
  return (
    <div className="h-full flex-col">
      <div className="flex items-center border-b">
        <Label className="mr-5">To: </Label>
        <MagnifyingGlassIcon className="mr-1 h-4 w-4 shrink-0 opacity-50" />
        <Input placeholder="Search..." onChange={handleOnInputChange} />
      </div>
      <div className="overflow-y-auto p-2 mt-2 h-5/6 mt-4">
        {friendsSearchResults?.length > 0 ? (
          <NewChatRecipientSearchResults friends={friendsSearchResults} />
        ) : (
          <div className="flex justify-center">No users found</div>
        )}
      </div>
      <Button
        disabled={!friendsSearchResults?.length}
        className="w-full mt-auto p-3">
        Chat
      </Button>
    </div>
  );
};

export default NewChatRecepientSearch;
