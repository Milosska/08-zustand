import type { Metadata } from 'next';
import css from './page.module.css';
import { WEBSITE_BASE_URL, IMAGE_URL } from '@/lib/metadata';

const baseMetadataValues = {
  title: 'Page Not Found - NoteHub',
  description:
    'The page you are looking for could not be found. Return to NoteHub to browse and manage your notes.',
};

export const metadata: Metadata = {
  ...baseMetadataValues,
  openGraph: {
    ...baseMetadataValues,
    url: `${WEBSITE_BASE_URL}/}`,
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

const NotFoundPage = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFoundPage;
