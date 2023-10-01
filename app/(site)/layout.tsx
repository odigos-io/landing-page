'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Lines from '@/components/Lines';
import ScrollToTop from '@/components/ScrollToTop';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
const inter = Inter({ subsets: ['latin'] });
import '../globals.css';

import AuthProvider from '../context/AuthContext';
import ToasterContext from '../context/ToastContext';
import { ThemeProviderWrapper } from '@keyval-dev/design-system';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="eng">
      <body className={`dark:bg-black`}>
        <ThemeProviderWrapper>
          <ThemeProvider
            enableSystem={false}
            attribute="class"
            defaultTheme="dark"
          >
            <AuthProvider>
              {/* <Lines /> */}
              <Header />
              <ToasterContext />
              {children}
              <Footer />
              <ScrollToTop />
            </AuthProvider>
          </ThemeProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
