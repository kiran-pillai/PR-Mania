import { Input } from '@/components/ui/input';
import { useSearchUsers } from '@/routes/-components/SearchUsers/hooks/useSearchUsers';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { useAppContext } from '@/context/appContext';
import NewChatSelectedReceptients from '../NewChatSelectedRecepients/NewChatSelectedRecepients';
import { useState } from 'react';
import NewChatSearchResult from './NewChatRecipientSearchResults';
import { useFetchWithCredentials } from '@/urlHandler';
import { useChatContext } from '../context/ChatContext';
const NewChatRecepientSearch = () => {
  const { setNewChatRecipients, newChatRecipients, setNewChatModalOpen } =
    useChatContext();
  const fetchWithCredentials = useFetchWithCredentials();
  const [value, setValue] = useState<string>('');
  const {
    handleOnInputChange: handleSearchChange,
    userData: friendsSearchResults,
  } = useSearchUsers('searchFriends');
  const navigate = useNavigate();
  const handleInputChange = (e: any) => {
    setValue(e.target.value);
    handleSearchChange(e);
  };
  const clearSearch = () => {
    setValue('');
    handleSearchChange({ target: { value: '' } });
  };

  const handleStartNewChat = async () => {
    //check to see if the user is already in a chat with the selected user(s)
    //if they are, grab chat id and redirect to chat
    //if they are not, create a new chat and redirect to chat with created chat_id
    try {
      let res = await fetchWithCredentials('chatExists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          users: newChatRecipients.map((user) => user._id),
        }),
      });
      // Create new chat if chat does not exist
      if (res?.status === 404) {
        let resNewChat = await fetchWithCredentials('chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            users: newChatRecipients.map((user) => user._id),
          }),
        });
        if (!resNewChat?.ok) {
          //@ts-ignore
          throw {
            res: resNewChat,
            error: new Error('error creating new chat'),
          };
        }
        navigate({ to: '/chat', search: { chat_id: resNewChat?._id } });
      }
      if (!res?.ok && res?.status !== 404) {
        throw { res, error: new Error('error checking if chat exists') };
      }
      // Chat exists, navigate to chat
      navigate({ to: '/chat', search: { chat_id: res?.data?._id } });
      setNewChatModalOpen(false);
      setNewChatRecipients([]);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="h-full flex-col">
      <div className="flex items-center border-b">
        <Label className="mr-5">To: </Label>

        <div className={`flex flex-wrap items-center w-full`}>
          <NewChatSelectedReceptients />
          <div className="flex items-center w-50">
            <MagnifyingGlassIcon className="h-4 w-4 shrink-0 opacity-50" />
            <Input
              className="w-full"
              placeholder={'Search...'}
              onChange={handleInputChange}
              value={value}
            />
          </div>
        </div>
      </div>
      <div className="overflow-y-auto p-2 mt-2 h-5/6 mt-4">
        {friendsSearchResults?.length > 0 ? (
          <div className="flex-col space-y-5">
            {friendsSearchResults?.map((friend: any) => (
              <NewChatSearchResult
                key={friend._id}
                friend={friend}
                setInputValue={clearSearch}
              />
            ))}
          </div>
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
