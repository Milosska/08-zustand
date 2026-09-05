import { NOTE_TAGS } from '@/types/note';
import type { NoteTag, Note } from '@/types/note';

export const isNoteTag = (tag: string): tag is NoteTag => {
  return NOTE_TAGS.includes(tag as NoteTag);
};

export const handleDateCreated = (note: Note | undefined) =>
  new Date(note?.createdAt ?? '').toLocaleDateString('en-GB');
