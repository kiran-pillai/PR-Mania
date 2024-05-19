import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FriendData, useAppContext } from '@/context/appContext';
import { useEffect, useState } from 'react';

interface ChatSearchResultsProps {
  friends: FriendData[];
}

const NewChatSearchResult = (props: any) => {
  const { friend } = props;
  const { setNewChatRecipients, newChatRecipients } = useAppContext();
  const isCheckedFunc = (friend: FriendData) => {
    return Boolean(
      newChatRecipients?.find((_friend) => friend?._id === _friend?._id)
    );
  };
  const [isChecked, setIsChecked] = useState(isCheckedFunc(friend));

  useEffect(() => {
    setIsChecked(isCheckedFunc(friend));
  }, [newChatRecipients]);

  const handleCheckboxChange = (checked: boolean, friend: FriendData) => {
    checked
      ? setNewChatRecipients((prevState) => [...prevState, friend])
      : setNewChatRecipients((prevState) =>
          prevState?.filter((_friend) => friend?._id !== _friend?._id)
        );
  };

  return (
    <div key={friend?._id} className="flex items-center">
      <Label className="mr-auto" htmlFor={friend?._id}>
        {friend?.name}
      </Label>
      <Checkbox
        onCheckedChange={(checked: boolean) =>
          handleCheckboxChange(checked, friend)
        }
        checked={isChecked}
        className="ml-auto"
        id={friend?._id}
      />
    </div>
  );
};

const NewChatRecipientSearchResults = (props: ChatSearchResultsProps) => {
  const { friends } = props;

  return (
    <div className="flex-col space-y-5">
      {friends?.map((friend: any) => (
        <NewChatSearchResult key={friend._id} friend={friend} />
      ))}
    </div>
  );
};

export default NewChatRecipientSearchResults;
