import css from './page.module.css';
import type { Metadata } from 'next';

// constants
import { IMAGE_URL, WEBSITE_BASE_URL } from '@/lib/metadata';

// components
import NoteForm from '@/components/NoteForm/NoteForm';

const baseMetadataValues = {
  title: 'Create a Note - NoteHub',
  description:
    'Create a new personal note in NoteHub. Add a title, content, and category to keep your notes organized.',
};

export const metadata: Metadata = {
  ...baseMetadataValues,
  openGraph: {
    ...baseMetadataValues,
    url: `${WEBSITE_BASE_URL}/notes/action/create`,
    siteName: 'NoteHub',
    images: [
      {
        url: IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'NoteHub Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    ...baseMetadataValues,
    card: 'summary_large_image',
    images: [IMAGE_URL],
  },
};

const CreateNote = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Create note</h1>
      <NoteForm />
    </div>
  );
};

export default CreateNote;
