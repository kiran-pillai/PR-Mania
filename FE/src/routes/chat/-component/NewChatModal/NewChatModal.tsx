import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { SquarePen } from 'lucide-react';
import NewChatRecepientSearch from './NewChatRecipientSearch';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { useChatContext } from '../context/ChatContext';

const NewChatModal = () => {
  const { setNewChatModalOpen, newChatModalOpen, setNewChatRecipients } =
    useChatContext();
  const handleOnOpenChange = (isOpen: boolean) => {
    setNewChatModalOpen(isOpen);
    if (!isOpen) {
      setNewChatRecipients([]);
    }
  };

  return (
    <Dialog open={newChatModalOpen} onOpenChange={handleOnOpenChange}>
      <DialogTrigger asChild>
        <div className="flex justify-end pr-1 pt-2 cursor-pointer">
          <SquarePen />
        </div>
      </DialogTrigger>
      <DialogContent style={{ height: '60vh', width: '40vw' }}>
        <DialogHeader>
          <div className="flex justify-center">
            <DialogTitle>New Message</DialogTitle>
          </div>
          <NewChatRecepientSearch />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default NewChatModal;
