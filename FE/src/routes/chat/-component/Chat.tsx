import { useEffect, useRef, useState } from 'react';
import '../Chat.css';
import SideChatBar from './SideChatBar/SideChatbar';
import ChatPlaceholder from './ChatInitialPlaceholder';
import { useSearch } from '@tanstack/react-router';
import NewChat from './NewChat/NewChat';

function Chat() {

  const params: any = useSearch({ from: '/chat' });

  return (
    <div className="flex w-full">
      <SideChatBar />
      {!params?.new ? (
        <div className="flex justify-center items-center w-full">
          <ChatPlaceholder />
        </div>
      ) : (
        <NewChat />
      )}
    </div>
  );
}

export default Chat;
