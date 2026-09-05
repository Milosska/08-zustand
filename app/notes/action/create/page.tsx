import css from './page.module.css';

// components
import NoteForm from '@/components/NoteForm/NoteForm';

const CreateNote = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Create note</h1>
      <NoteForm />
    </div>
  );
};

export default CreateNote;
