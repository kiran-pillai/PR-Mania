import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DialogDescription } from '@radix-ui/react-dialog';
import { SquarePen } from 'lucide-react';
import { useState } from 'react';
import ChatSearchbar from './ChatSearchbar';

const NewChat = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex justify-end pr-1 pt-2 cursor-pointer">
          <SquarePen />
        </div>
      </DialogTrigger>
      {/* Tech debt: make this more responsive */}
      <DialogContent style={{ height: '60vh', width: '40vw' }}>
        <DialogHeader>
          <div className="flex justify-center">
            <DialogTitle>New Message</DialogTitle>
          </div>
          <ChatSearchbar />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default NewChat;
