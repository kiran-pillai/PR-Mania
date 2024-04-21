import Portal from '@/components/Portal';
import { useTheme } from '@/components/theme-provider';
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { usePopper } from 'react-popper';

interface SearchUsersItemsProps {
  data: any[];
  referenceElement: Element | null | undefined;
  searchText: string;
}

const SearchUsersPopper = (props: SearchUsersItemsProps) => {
  const { data, referenceElement, searchText } = props;
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
        {data?.length > 0 && (
          <CommandGroup heading="Users">
            {data?.map((item: any) => (
              <div key={item} className="flex">
                <CommandItem>{item?.name}</CommandItem>
                <Check className="ml-auto" />
              </div>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Portal>
  );
};

export default SearchUsersPopper;
