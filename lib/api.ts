import axios from 'axios';
import type { Note, NewNote, NoteTag } from '@/types/note';
import { isNoteTag } from './helpers';

const API_BASE_URL = 'https://notehub-public.goit.study/api';
const API_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const PER_PAGE = 12;
export const INITIAL_PAGE = 1;
export const INITIAL_QUERY = '';

const notehubAPIInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    accept: 'application/json',
  },
});

interface IFetchNotesRequestParams {
  page: number;
  search: string;
  perPage: number;
  tag?: NoteTag;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  query: string = INITIAL_QUERY,
  tag?: string
): Promise<FetchNotesResponse> => {
  const fetchParams: IFetchNotesRequestParams = {
    page,
    search: query,
    perPage: PER_PAGE,
  };

  if (tag) {
    if (!isNoteTag(tag) && tag !== 'All') {
      throw new Error(`Invalid note tag: ${tag}`);
    }

    if (isNoteTag(tag)) {
      fetchParams.tag = tag;
    }
  }

  const response = await notehubAPIInstance.get<FetchNotesResponse>('/notes', {
    params: fetchParams,
  });

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await notehubAPIInstance.get<Note>(`/notes/${id}`);

  return response.data;
};

export const createNote = async (noteData: NewNote): Promise<Note> => {
  const response = await notehubAPIInstance.post<Note>('/notes', noteData);

  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await notehubAPIInstance.delete<Note>(`/notes/${noteId}`);

  return response.data;
};
