'use client';
import { useState } from 'react';

// components
import NoteList from '@/components/NoteList';
import Pagination from '@/components/Pagination';
import Loader from '@/components/Loader';
import SearchBox from '@/components/SearchBox';

// hooks
import { useDebouncedCallback } from 'use-debounce';
import { useFetchNotes } from '@/hooks/useFetchNotes';

// services
import { INITIAL_PAGE, INITIAL_QUERY } from '@/lib/api';

// styles
import css from './Notes.client.module.css';

interface IFilteredNotesClient {
  tag: string;
}

const FilteredNotesClient = ({ tag }: IFilteredNotesClient) => {
  const [page, setPage] = useState(INITIAL_PAGE);
  const [query, setQuery] = useState(INITIAL_QUERY);

  const { isLoading, isError, notes, totalPages } = useFetchNotes({
    page,
    query,
    tag,
  });

  const handleSearchQueryChange = useDebouncedCallback((newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  }, 300);

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox onSearchChange={handleSearchQueryChange} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            setCurrentPage={setPage}
          />
        )}
      </div>
      {isLoading && <Loader />}
      {!isError && notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
};

export default FilteredNotesClient;
