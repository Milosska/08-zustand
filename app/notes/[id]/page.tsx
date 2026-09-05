// global
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import type { Metadata } from 'next';
import { WEBSITE_BASE_URL, IMAGE_URL } from '@/lib/metadata';

// services
import { fetchNoteById } from '@/lib/api';

// components
import NoteDetailsClient from './NoteDetails.client';

interface INoteDetailsProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: INoteDetailsProps): Promise<Metadata> {
  const { id } = await params;

  const noteData = await fetchNoteById(id);

  const baseMetadataValues = {
    title: `${noteData.title} - NoteHub`,
    description: noteData.content.slice(0, 150),
  };

  return {
    ...baseMetadataValues,
    openGraph: {
      ...baseMetadataValues,
      url: `${WEBSITE_BASE_URL}/notes/${id}`,
      siteName: 'NoteHub',
      images: [
        {
          url: IMAGE_URL,
          width: 1200,
          height: 630,
          alt: 'NoteHub Logo',
        },
      ],
      type: 'article',
    },
    twitter: {
      ...baseMetadataValues,
      card: 'summary_large_image',
      images: [IMAGE_URL],
    },
  };
}

const NoteDetails = async ({ params }: INoteDetailsProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
