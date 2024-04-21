import Portal from '@/components/Portal';
import { useTheme } from '@/components/theme-provider';
import {
  CommandEmpty,
  CommandGroup,
  CommandList,
} from '@/components/ui/command';
import { useState } from 'react';
import { usePopper } from 'react-popper';
import SearchUsersRow, { User } from './SearchUsersRow';

interface SearchUsersPopperProps {
  userData: User[] | [];
  referenceElement: Element | null | undefined;
  searchText: string;
}

const SearchUsersPopper = (props: SearchUsersPopperProps) => {
  const { userData, referenceElement, searchText } = props;
  const [popperElement, setPopperElement] = useState<any>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
  });
  const { theme } = useTheme();
  const bg = theme === 'dark' ? 'bg-black' : 'bg-white';
  return (
    <Portal id={'search'}>
      <CommandList
        ref={setPopperElement}
        style={{
          ...styles.popper,
          width: referenceElement?.clientWidth,
        }}
        {...attributes.popper}
        className={bg}>
        {searchText && <CommandEmpty>No results found.</CommandEmpty>}
        {userData?.length > 0 && (
          <CommandGroup heading="Users">
            {userData?.map((user: any) => (
              <SearchUsersRow key={user._id} user={user} />
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Portal>
  );
};

export default SearchUsersPopper;
