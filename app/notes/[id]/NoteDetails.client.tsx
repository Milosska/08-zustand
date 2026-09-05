'use client';
// components
import Loader from '@/components/Loader';
import ErrorMessage from '@/components/ErrorMessage';

// hooks
import { useParams } from 'next/navigation';
import { useFetchNoteById } from '@/hooks/useFetchNoteById';

// helpers
import { handleDateCreated } from '@/lib/helpers';

// styles
import css from './NoteDetails.client.module.css';

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useFetchNoteById({ id });

  const dateCreated = handleDateCreated(note);

  const inProgress = isLoading || isFetching;

  return (
    <>
      {inProgress && <Loader />}
      {isSuccess && !inProgress && note && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.tag}>{note.tag}</p>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>Created date: {dateCreated}</p>
          </div>
        </div>
      )}
      {isError && (
        <ErrorMessage
          error={`Could not fetch note details. ${error?.message}`}
        />
      )}
    </>
  );
};

export default NoteDetailsClient;
