import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useQuery } from '@tanstack/react-query';
import { urlToURI, useFetchWithCredentials } from '@/urlHandler';
const SearchUsers = () => {
  const [searchText, setSearchText] = useState('');
  const fetchWithCredentials = useFetchWithCredentials();

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

  const handleSearchUpdate = (e: any) => {
    debouncedSearchText(e.target.value);
  };

  return (
    <div className="flex  ml-4 space-x-2 items-center">
      <div>
        <Search />
      </div>
      <Input
        onChange={handleSearchUpdate}
        className="w-72"
        placeholder="Search Users"
      />
    </div>
  );
};

export default SearchUsers;
