import { BadgeRemovable } from '@/components/ui/badge';
import { FriendData, useAppContext } from '@/context/appContext';
import React, { useState } from 'react';
import { set } from 'zod';

interface NewChatSelectedReceptientsProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const NewChatSelectedReceptients = (props: NewChatSelectedReceptientsProps) => {
  const { containerRef } = props;
  const { newChatRecipients, setNewChatRecipients } = useAppContext();
  const handleOnclose = (recipient: FriendData) => {
    setNewChatRecipients((prevState) =>
      prevState?.filter((_friend) => recipient?._id !== _friend?._id)
    );
  };
  return (
    newChatRecipients?.length > 0 && (
      <div className="flex flex-wrap" ref={containerRef}>
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
        <BadgeRemovable
          className="mr-1 text-sky-500 border-sky-500 bg-sky-100 whitespace-nowrap"
          style={{ borderRadius: '14px' }}
          onClose={() => handleOnclose('')}>
          Kiran Pillai
        </BadgeRemovable>
        {/* <BadgeRemovable
          className="mr-1 text-sky-500 border-sky-500 whitespace-nowrap"
          style={{ borderRadius: '14px' }}
          onClose={() => handleOnclose('')}>
          Anitha Panicker
        </BadgeRemovable>
        <BadgeRemovable
          className="mr-1 text-sky-500 border-sky-500 whitespace-nowrap"
          style={{ borderRadius: '14px' }}
          onClose={() => handleOnclose('')}>
          Anitha Panicker
        </BadgeRemovable> */}
      </div>
    )
  );
};

export default NewChatSelectedReceptients;
