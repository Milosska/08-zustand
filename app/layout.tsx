import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';

// components
import TanStackProvider from '@/components/TanStackProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// styles
import 'modern-normalize';
import './globals.css';

export const metadata: Metadata = {
  title: 'Notehub',
  description: 'Notehub Next.js app',
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
