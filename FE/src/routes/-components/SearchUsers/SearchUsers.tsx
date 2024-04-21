import { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { useQuery } from '@tanstack/react-query';
import { useFetchWithCredentials } from '@/urlHandler';
import { Command, CommandInput } from '@/components/ui/command';

import SearchUsersPopper from './SearchUsersPopper';
const SearchUsers = () => {
  const [searchText, setSearchText] = useState('');
  const fetchWithCredentials = useFetchWithCredentials();
  const [referenceElement, setReferenceElement] = useState<any>(null);
  const { data: userData, isLoading } = useQuery({
    queryKey: ['users_search', searchText],
    queryFn: async () => {
      if (searchText) {
        const response = await fetchWithCredentials('searchUsers', {
          method: 'POST',
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ search_query: searchText }),
        });
        return response;
      }
      return null;
    },
    placeholderData: [],
  });
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

  const debouncedSearchText = useCallback(
    debounce((value: string) => setSearchText(value), 500),
    []
  );
  const commandInputRef = useRef<any>(null);
  const handleSearchUpdate = (e: any) => {
    debouncedSearchText(e.target.value);
  };

  return (
    <div className="flex ml-4 space-x-2 items-center">
      <Command className="relative overflow-y-visible overflow-x-visible">
        <CommandInput
          style={{ width: '30rem' }}
          placeholder="Search Users..."
          onInput={handleSearchUpdate}
          ref={(_ref) => {
            setReferenceElement(_ref);
            commandInputRef.current = _ref;
          }}
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
