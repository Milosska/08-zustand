import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';

// services
import { fetchNotes, INITIAL_PAGE, INITIAL_QUERY } from '@/lib/api';

// components
import FilteredNotesClient from './Notes.client';

interface INotesByCategory {
  params: Promise<{ slug: string[] }>;
}

const NotesByCategory = async ({ params }: INotesByCategory) => {
  const { slug } = await params;
  const currentTag = slug[0].charAt(0).toUpperCase() + slug[0].slice(1);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', INITIAL_PAGE, INITIAL_QUERY, currentTag],
    queryFn: () => fetchNotes(INITIAL_PAGE, INITIAL_QUERY, currentTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FilteredNotesClient tag={currentTag} />
    </HydrationBoundary>
  );
};

export default NotesByCategory;
