import { SquarePen } from 'lucide-react';
import { useState } from 'react';

const NewChat = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-end pr-1 pt-2 cursor-pointer">
      <SquarePen onClick={() => setOpen(true)} />
    </div>
  );
};

export default NewChat;
