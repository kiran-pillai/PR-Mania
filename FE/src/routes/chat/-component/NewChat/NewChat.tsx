import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { SquarePen } from 'lucide-react';
import { useAppContext } from '@/context/appContext';
import ChatSearch from './ChatSearch';

const NewChat = () => {
  const { setNewChatModalOpen, newChatModalOpen } = useAppContext();
  const toggleModal = () => setNewChatModalOpen(!newChatModalOpen);

  return (
    <Dialog open={newChatModalOpen} onOpenChange={setNewChatModalOpen}>
      <div className="flex justify-end pr-1 pt-2 cursor-pointer">
        <SquarePen onClick={toggleModal} />
      </div>
      <DialogContent style={{ height: '60vh', width: '40vw' }}>
        <DialogHeader>
          <div className="flex justify-center">
            <DialogTitle>New Message</DialogTitle>
          </div>
          <ChatSearch />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default NewChat;
