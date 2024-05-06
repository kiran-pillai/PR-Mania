import { useFetchWithCredentials } from '@/urlHandler';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { debounce } from 'lodash';

export const useSearchUsers = (url: string) => {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useCallback(
    debounce((value: string) => setSearchText(value), 500),
    []
  );
  const handleOnInputChange = (e: any) => {
    debouncedSearchText(e.target.value);
  };
  const fetchWithCrenderials = useFetchWithCredentials();
  const { data: userData, isLoading } = useQuery({
    queryKey: ['userSearch', searchText],
    queryFn: async () => {
      if (searchText) {
        const response = await fetchWithCrenderials(url, {
          method: 'POST',
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
  return { userData, isLoading, handleOnInputChange, searchText };
};
