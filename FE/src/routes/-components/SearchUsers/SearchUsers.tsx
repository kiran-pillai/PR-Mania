import { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { useQuery } from '@tanstack/react-query';
import { useFetchWithCredentials } from '@/urlHandler';
import { Command, CommandInput } from '@/components/ui/command';

import SearchUsersItems from './SearchUsersItems';
const SearchUsers = () => {
  const [searchText, setSearchText] = useState('');
  const fetchWithCredentials = useFetchWithCredentials();
  const [referenceElement, setReferenceElement] = useState<any>(null);
  const { data, isLoading } = useQuery({
    queryKey: ['users_search', searchText],
    queryFn: async () => {
      if (searchText) {
        const response = await fetchWithCredentials('searchUsers', undefined, {
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
          className=""
          placeholder="Search Users..."
          ref={(_ref) => {
            setReferenceElement(_ref);
            commandInputRef.current = _ref;
          }}
          onClick={() => setOpen(true)}
        />
        {open && (
          <SearchUsersItems
            referenceElement={referenceElement}
            data={['Calendar', 'Search Emoji', 'Calculator']}
          />
        )}
      </Command>
    </div>
  );
};

export default SearchUsers;
