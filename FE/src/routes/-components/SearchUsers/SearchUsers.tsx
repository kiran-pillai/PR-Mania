import { useCallback, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { useQuery } from '@tanstack/react-query';
import { useFetchWithCredentials } from '@/urlHandler';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { usePopper } from 'react-popper';

import { createPortal } from 'react-dom';
const SearchUsers = () => {
  const [searchText, setSearchText] = useState('');
  const fetchWithCredentials = useFetchWithCredentials();
  const [referenceElement, setReferenceElement] = useState<any>(null);
  const [popperElement, setPopperElement] = useState<any>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
  });
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
    },
  });

  const debouncedSearchText = useCallback(
    debounce((value: string) => setSearchText(value), 500),
    []
  );
  const commandInputRef = useRef<any>(null);
  const handleSearchUpdate = (e: any) => {
    debouncedSearchText(e.target.value);
  };
  const [open, setOpen] = useState(false);

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
        {/* <Input
          onChange={handleSearchUpdate}
          className="w-72"
          placeholder="Search Users"
          ref={(_ref) => {
            setReferenceElement(_ref);
            commandInputRef.current = _ref;
          }}
        /> */}
        {open &&
          createPortal(
            <CommandList
              ref={setPopperElement}
              style={{
                ...styles.popper,
                width: commandInputRef.current?.clientWidth,
              }}
              {...attributes.popper}
              className="bg-black">
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>Calendar</CommandItem>
                <CommandItem>Search Emoji</CommandItem>
                <CommandItem>Calculator</CommandItem>
              </CommandGroup>
            </CommandList>,
            document.getElementById('search') as HTMLElement
          )}
      </Command>
    </div>
  );
};

export default SearchUsers;
