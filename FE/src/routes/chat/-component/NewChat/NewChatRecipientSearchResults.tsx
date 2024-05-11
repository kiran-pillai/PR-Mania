import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FriendData, useAppContext } from '@/context/appContext';
import { useEffect } from 'react';

interface ChatSearchResultsProps {
  friends: FriendData[];
}

const NewChatRecipientSearchResults = (props: ChatSearchResultsProps) => {
  const { friends } = props;
  const { newChatRecipients, setNewChatRecipients } = useAppContext();
  const handleCheckboxChange = (checked: boolean, friend: FriendData) => {
    checked
      ? setNewChatRecipients((prevState) => [...prevState, friend])
      : setNewChatRecipients((prevState) =>
          prevState?.filter((_friend) => friend?._id !== _friend?._id)
        );
  };
  useEffect(() => {
    console.log('newChatReciepients', newChatRecipients);
  }, [newChatRecipients]);

  return (
    <div className="flex-col space-y-5">
      {friends?.map((friend: any) => (
        <div key={friend?._id} className="flex items-center">
          <Label className="mr-auto" htmlFor={friend?._id}>
            {friend?.name}
          </Label>
          <Checkbox
            onCheckedChange={(checked: boolean) =>
              handleCheckboxChange(checked, friend)
            }
            className="ml-auto"
            id={friend?._id}
          />
        </div>
      ))}
    </div>
  );
};

export default NewChatRecipientSearchResults;
