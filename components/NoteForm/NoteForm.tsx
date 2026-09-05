'use client';
import * as Yup from 'yup';

// constants
import { NOTE_TAGS } from '@/types/note';

// hooks
import { useState } from 'react';
import { useNotesMutations } from '@/hooks/useNotesMutations';
import { useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

// components
import FormErrorMessage from '@/components/FormErrorMessage';

// css
import css from './NoteForm.module.css';

// types
import type { NewNote } from '@/types/note';

const NoteForm = () => {
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({
    title: null,
    content: null,
    tag: null,
  });

  const router = useRouter();

  const {
    noteCreateMutation: {
      mutate: handleNoteCreate,
      isPending: isNoteCreatePending,
    },
  } = useNotesMutations();

  const initialFormValues: NewNote = {
    title: '',
    content: '',
    tag: 'Todo',
  };

  const noteFormValidationSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, 'Title should be 3 symbols or longer.')
      .max(50, 'Title should not exceed 50 symbols.')
      .required('Title is required'),
    content: Yup.string().max(500, 'Content should not exceed 500 symbols.'),
    tag: Yup.string().oneOf(NOTE_TAGS).required('Tag is required'),
  });

  const handleChange = useDebouncedCallback(
    async (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = event.target;

      try {
        await noteFormValidationSchema.validateAt(name, {
          [name]: value,
        });
        setErrors(prevErrors => ({
          ...prevErrors,
          [name]: null,
        }));
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          setErrors(prevErrors => ({
            ...prevErrors,
            [name]: error.message,
          }));
        }
      }
    },
    300
  );

  const handleSubmit = (formData: FormData) => {
    handleNoteCreate({
      noteData: Object.fromEntries(formData) as unknown as NewNote,
      formResetCallback: () => router.push('/notes/filter/all'),
    });
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          defaultValue={initialFormValues.title}
          onChange={handleChange}
        />
        {errors.title && <FormErrorMessage error={errors.title} />}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          defaultValue={initialFormValues.content}
          onChange={handleChange}
        />
        {errors.content && <FormErrorMessage error={errors.content} />}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          defaultValue={initialFormValues.tag}
          onChange={handleChange}
        >
          {NOTE_TAGS.map(tag => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
        {errors.tag && <FormErrorMessage error={errors.tag} />}
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          // onClick={() => setIsModalOpen(false)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={isNoteCreatePending}
        >
          Create note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
