import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FriendData, useAppContext } from '@/context/appContext';
import { useEffect, useState } from 'react';

interface ChatSearchResultProps {
  friend: FriendData;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

const NewChatSearchResult = (props: ChatSearchResultProps) => {
  const { friend, setInputValue } = props;
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

  const handleCheckboxChange = (friend: FriendData) => {
    setNewChatRecipients((prevState) => [...prevState, friend]);
    setInputValue('');
  };

  return (
    <div key={friend?._id} className="flex items-center">
      <Label className="mr-auto" htmlFor={friend?._id}>
        {friend?.name}
      </Label>
      <Checkbox
        onCheckedChange={() => handleCheckboxChange(friend)}
        checked={isChecked}
        className="ml-auto"
        id={friend?._id}
      />
    </div>
  );
};

export default NewChatSearchResult;
