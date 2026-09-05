'use client';
// components
import Modal from '@/components/Modal';
import NotePreview from '@/components/NotePreview';
import Loader from '@/components/Loader';
import ErrorMessage from '@/components/ErrorMessage';

// hooks
import { useParams, useRouter } from 'next/navigation';
import { useFetchNoteById } from '@/lib/hooks/useFetchNoteById';

const ModalNotePreviewClient = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useFetchNoteById({ id });

  const inProgress = isLoading || isFetching;

  return (
    <Modal callback={() => router.back()}>
      {inProgress && <Loader />}
      {isSuccess && note && (
        <NotePreview note={note} onNoteClose={() => router.back()} />
      )}
      {isError && (
        <ErrorMessage
          error={`Could not fetch note details. ${error?.message}`}
        />
      )}
    </Modal>
  );
};

export default ModalNotePreviewClient;
