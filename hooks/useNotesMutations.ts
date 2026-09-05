import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createNote, deleteNote } from '@/lib/api';

// types
import type { NewNote } from '@/types/note';
import type { FormikState } from 'formik';

export const useNotesMutations = () => {
  const queryClient = useQueryClient();

  type CreateNoteMutationVariables = {
    noteData: NewNote;
    formResetCallback: (nextState?: Partial<FormikState<NewNote>>) => void;
  };

  const noteCreateMutation = useMutation({
    mutationFn: ({ noteData }: CreateNoteMutationVariables) =>
      createNote(noteData),
    onSuccess: (_, { formResetCallback }) => {
      formResetCallback();
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: error => toast.error(`Failed to create note. ${error}`),
  });

  const noteDeleteMutation = useMutation({
    mutationFn: (noteId: string) => deleteNote(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: error => toast.error(`Failed to remove note. ${error}`),
  });

  return { noteCreateMutation, noteDeleteMutation };
};
