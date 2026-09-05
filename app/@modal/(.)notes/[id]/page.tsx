// global
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';

// services
import { fetchNoteById } from '@/lib/api';

// components
import ModalNotePreviewClient from './NotePreview.client';

interface IModalNotePreview {
  params: Promise<{ id: string }>;
}

const ModalNotePreview = async ({ params }: IModalNotePreview) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ModalNotePreviewClient />
    </HydrationBoundary>
  );
};

export default ModalNotePreview;
