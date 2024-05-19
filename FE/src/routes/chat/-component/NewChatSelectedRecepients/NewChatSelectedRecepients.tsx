import { BadgeRemovable } from '@/components/ui/badge';
import { FriendData, useAppContext } from '@/context/appContext';

const NewChatSelectedReceptients = () => {
  const { newChatRecipients, setNewChatRecipients } = useAppContext();
  const handleOnclose = (recipient: FriendData) => {
    setNewChatRecipients((prevState) =>
      prevState?.filter((_friend) => recipient?._id !== _friend?._id)
    );
  };
  return (
    newChatRecipients?.length > 0 && (
      <div className="flex flex-wrap">
        {newChatRecipients?.map((recipient) => (
          <BadgeRemovable
            key={recipient._id}
            className="mr-1 text-sky-500 border-sky-500 bg-sky-100 whitespace-nowrap"
            style={{
              borderRadius: '14px',
            }}
            onClose={() => handleOnclose(recipient)}>
            {recipient?.name}
          </BadgeRemovable>
        ))}
      </div>
    )
  );
};

export default NewChatSelectedReceptients;
