'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Lines from '@/components/Lines';
import ScrollToTop from '@/components/ScrollToTop';

import { ThemeProvider } from 'next-themes';

import '../globals.css';

import AuthProvider from '../context/AuthContext';
import ToasterContext from '../context/ToastContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="eng">
      <body className={`dark:bg-black`}>
        <ThemeProvider
          enableSystem={false}
          attribute="class"
          defaultTheme="light"
        >
          <AuthProvider>
            <Lines />
            <Header />
            <ToasterContext />
            {children}
            <Footer />
            <ScrollToTop />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
