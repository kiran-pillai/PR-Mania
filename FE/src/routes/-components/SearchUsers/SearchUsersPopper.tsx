import Portal from '@/components/Portal';
import { useTheme } from '@/components/theme-provider';
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useState } from 'react';
import { usePopper } from 'react-popper';

interface SearchUsersItemsProps {
  data: any[];
  referenceElement: Element | null | undefined;
}

const SearchUsersPopper = (props: SearchUsersItemsProps) => {
  const { data, referenceElement } = props;
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
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {data.map((item: any) => (
            <CommandItem key={item}>{item}</CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Portal>
  );
};

export default SearchUsersPopper;
