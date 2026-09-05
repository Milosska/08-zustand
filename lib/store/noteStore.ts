import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { NewNote } from '@/types/note';

interface INoteStore {
  draft: NewNote;
  setDraft: (note: NewNote) => void;
  clearDraft: () => void;
}

const initialDraft: NewNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteStore = create<INoteStore>()(
  persist(
    set => ({
      draft: initialDraft,
      setDraft: (note: NewNote) => set(state => ({ ...state, draft: note })),
      clearDraft: () => set(state => ({ ...state, draft: initialDraft })),
    }),
    { name: 'note-draft', partialize: state => ({ draft: state.draft }) }
  )
);
