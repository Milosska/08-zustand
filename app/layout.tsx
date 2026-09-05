import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';

// constants
import { IMAGE_URL, WEBSITE_BASE_URL } from '@/lib/metadata';

// components
import TanStackProvider from '@/components/TanStackProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// styles
import 'modern-normalize';
import './globals.css';

const baseMetadataValues = {
  title: 'NoteHub - Personal Notes Manager',
  description:
    'Manage your personal notes with NoteHub. Create, browse, search, and organize your notes in one simple and convenient place.',
};

export const metadata: Metadata = {
  ...baseMetadataValues,
  openGraph: {
    ...baseMetadataValues,
    url: `${WEBSITE_BASE_URL}/`,
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

interface IRootLayout extends LayoutProps<'/'> {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function RootLayout({ children, modal }: IRootLayout) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          <main> {children}</main>
          <Footer />
          {modal}
          <Toaster position="top-right" />
        </TanStackProvider>
      </body>
    </html>
  );
}
