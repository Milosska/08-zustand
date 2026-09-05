import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import type { Metadata } from 'next';
import { WEBSITE_BASE_URL, IMAGE_URL } from '@/lib/metadata';

// services
import { fetchNotes, INITIAL_PAGE, INITIAL_QUERY } from '@/lib/api';

// components
import FilteredNotesClient from './Notes.client';

interface INotesByCategory {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: INotesByCategory): Promise<Metadata> {
  const { slug } = await params;
  const currentTag = slug[0].charAt(0).toUpperCase() + slug[0].slice(1);

  const baseMetadataValues = {
    title: `Filtered Notes: ${currentTag} - NoteHub`,
    description:
      currentTag === 'All'
        ? 'Browse all notes in NoteHub and explore the complete collection of your notes.'
        : `Browse notes filtered by ${currentTag} tag  in NoteHub. View only the notes that match the selected tag.`,
  };

  return {
    ...baseMetadataValues,
    openGraph: {
      ...baseMetadataValues,
      url: `${WEBSITE_BASE_URL}/notes/filter/${slug.join('/')}`,
      siteName: 'NoteHub',
      images: [
        {
          url: IMAGE_URL,
          width: 1200,
          height: 630,
          alt: 'NoteHub Logo',
        },
      ],
      type: 'website',
    },
    twitter: {
      ...baseMetadataValues,
      card: 'summary_large_image',
      images: [IMAGE_URL],
    },
  };
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
