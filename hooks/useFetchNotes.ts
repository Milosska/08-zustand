import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { fetchNotes } from '@/lib/api';

interface IUseFetchNotes {
  page: number;
  query: string;
  tag?: string;
}

export const useFetchNotes = ({ page, query, tag }: IUseFetchNotes) => {
  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ['notes', page, query, tag],
    queryFn: () => fetchNotes(page, query, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const { notes, totalPages } = data || { notes: [], totalPages: 0 };

  useEffect(() => {
    if (isSuccess && totalPages === 0) {
      toast.error(`No notes found for current request.`);
    }
  }, [totalPages, isSuccess, query]);

  useEffect(() => {
    if (isError) {
      toast.error(`${error}`);
    }
  }, [isError, error]);

  return {
    isLoading,
    isSuccess,
    isError,
    error,
    notes,
    totalPages,
  };
};
