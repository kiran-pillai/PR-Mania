import { useEffect, useRef, useState } from 'react';

import { Command, CommandInput } from '@/components/ui/command';
import SearchUsersPopper from './SearchUsersPopper';
import { useSearchUsers } from './hooks/useSearchUsers';

export enum SearchUsersVariant {
  SEARCH_USERS = 'search_users',
  SEARCH_USERS_CHAT = 'search_users_chat',
}

interface SearchUsersProps {
  variant: SearchUsersVariant;
}

const SearchUsers = (props: SearchUsersProps) => {
  const { variant } = props;
  const inputClassName =
    variant === SearchUsersVariant.SEARCH_USERS
      ? 'w-full sm:w-100 md:w-150 lg:w-150'
      : '';
  const [referenceElement, setReferenceElement] = useState<any>(null);
  const { userData, isLoading, handleSearchUpdate, searchText } =
    useSearchUsers();
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
    <div className="flex ml-4 space-x-2 items-center">
      <Command className="relative overflow-y-visible overflow-x-visible">
        <CommandInput
          placeholder="Search Users..."
          onInput={handleSearchUpdate}
          ref={(_ref) => {
            setReferenceElement(_ref);
            commandInputRef.current = _ref;
          }}
          className={inputClassName}
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
