import type { Metadata } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { Footer } from '@/components/layouts/Footer';
import { Header } from '@/components/layouts/Header';
import { ThemeProvider } from '@/components/layouts/ThemeProvider';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'SUMMARIZE',
    template: '%s | SUMMARIZE',
  },
  description: 'GitHub ベースのニュースメディア SUMMARIZE',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <NuqsAdapter>
          <ThemeProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
