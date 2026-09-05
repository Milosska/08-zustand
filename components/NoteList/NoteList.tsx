'use client';
import Link from 'next/link';
import css from './NoteList.module.css';

// hooks
import { useNotesMutations } from '@/hooks/useNotesMutations';

// types
import type { Note } from '@/types/note';

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  const {
    noteDeleteMutation: {
      mutate: handleNoteDelete,
      isPending,
      variables: removeNoteId,
    },
  } = useNotesMutations();

  return (
    <ul className={css.list}>
      {notes.map(({ id, title, content, tag }) => (
        <li className={css.listItem} key={id}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.content}>{content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{tag}</span>
            <Link href={`/notes/${id}`} className={css.link}>
              View details
            </Link>
            <button
              className={css.button}
              disabled={isPending && removeNoteId === id}
              onClick={() => handleNoteDelete(id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
