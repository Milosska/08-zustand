import css from './NotePreview.module.css';
import { handleDateCreated } from '@/lib/helpers';
import type { Note } from '@/types/note';

interface INotePreview {
  note: Note;
  onNoteClose: () => void;
}

const NotePreview = ({ note, onNoteClose }: INotePreview) => {
  const dateCreated = handleDateCreated(note);

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>Created date: {dateCreated}</p>
        <button type="button" className={css.backBtn} onClick={onNoteClose}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotePreview;
