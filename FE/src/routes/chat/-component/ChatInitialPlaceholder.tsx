import { Button } from '@/components/ui/button';
import { LargeText } from '@/components/ui/largeText';
import { MutedText } from '@/components/ui/mutedText';
import { useAppContext } from '@/context/appContext';
import { MessageCircleMore } from 'lucide-react';

const ChatInitialPlaceholder = () => {
  const { setNewChatModalOpen } = useAppContext();
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <MessageCircleMore size={60} />
      <LargeText className="mt-2">Your Messages</LargeText>
      <MutedText className="mt-2 mb-4" size="md">
        Send a Message to Chat
      </MutedText>
      <Button onClick={() => setNewChatModalOpen(true)}>Send Message</Button>
    </div>
  );
};

export default ChatInitialPlaceholder;
