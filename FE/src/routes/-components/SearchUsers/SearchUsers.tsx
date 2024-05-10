import { useEffect, useRef, useState } from 'react';

import { Command, CommandInput } from '@/components/ui/command';
import SearchUsersPopper from './SearchUsersPopper';
import { useSearchUsers } from './hooks/useSearchUsers';

export enum SearchUsersVariant {
  SEARCH_USERS = 'search_users',
  SEARCH_USERS_CHAT = 'search_users_chat',
}

const SearchUsers = () => {
  const [referenceElement, setReferenceElement] = useState<any>(null);
  const { userData, handleOnInputChange, searchText } =
    useSearchUsers('searchUsers');
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        commandInputRef.current &&
        !commandInputRef.current.contains(event.target) &&
        !document.getElementById('search')?.contains(event.target) &&
        open
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [open]);

  const commandInputRef = useRef<any>(null);

  return (
    <div className="flex ml-4 space-x-2 items-center w-full">
      <Command className="relative overflow-y-visible overflow-x-visible w-1/3">
        <CommandInput
          placeholder="Search Users..."
          onInput={handleOnInputChange}
          ref={(_ref) => {
            setReferenceElement(_ref);
            commandInputRef.current = _ref;
          }}
          className="w-full"
          onClick={() => setOpen(true)}
        />
        {open && (
          <SearchUsersPopper
            searchText={searchText}
            referenceElement={referenceElement}
            userData={userData}
          />
        )}
      </Command>
    </div>
  );
};

export default SearchUsers;
