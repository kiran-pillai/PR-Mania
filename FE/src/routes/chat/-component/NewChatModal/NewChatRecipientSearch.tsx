import { Input } from '@/components/ui/input';
import { useSearchUsers } from '@/routes/-components/SearchUsers/hooks/useSearchUsers';
import NewChatRecipientSearchResults from './NewChatRecipientSearchResults';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { useAppContext } from '@/context/appContext';
import NewChatSelectedReceptients from '../NewChatSelectedRecepients/NewChatSelectedRecepients';
import {} from 'react';
const NewChatRecepientSearch = () => {
  const handleInputChange = () => {};
  const { handleOnInputChange, userData: friendsSearchResults } =
    useSearchUsers('searchFriends');
  const navigate = useNavigate();

  const { newChatRecipients, setNewChatModalOpen } = useAppContext();
  const handleStartNewChat = () => {
    //check to see if the user is already in a chat with the selected user(s)
    //if they are, grab chat id and redirect to chat
    //if they are not, create a new chat and redirect to chat with /new?user_id=123&user_id=456

    setNewChatModalOpen(false);
    navigate({
      to: '/chat',
      search: { new: true, user_id: newChatRecipients.map((user) => user._id) },
    });
  };
  return (
    <div className="h-full flex-col">
      <div className="flex items-center border-b">
        <Label className="mr-5">To: </Label>

        <div className={`flex flex-wrap items-center w-full`}>
          <NewChatSelectedReceptients />
          <div className="flex items-center w-40">
            <MagnifyingGlassIcon className="mr-1 h-4 w-4 shrink-0 opacity-50" />
            <Input
              className="w-full"
              placeholder={'Search...'}
              onChange={handleOnInputChange}
            />
          </div>
        </div>
      </div>
      <div className="overflow-y-auto p-2 mt-2 h-5/6 mt-4">
        {friendsSearchResults?.length > 0 ? (
          <NewChatRecipientSearchResults friends={friendsSearchResults} />
        ) : (
          <div className="flex justify-center">No users found</div>
        )}
      </div>
      <Button
        disabled={!newChatRecipients?.length}
        className="w-full mt-auto p-3"
        onClick={handleStartNewChat}>
        Chat
      </Button>
    </div>
  );
};

export default NewChatRecepientSearch;
