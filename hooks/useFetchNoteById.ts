import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';

interface IUseFetchNoteById {
  id: string;
}

export const useFetchNoteById = ({ id }: IUseFetchNoteById) => {
  const { data, isLoading, isFetching, isSuccess, isError, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return {
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    data,
  };
};
