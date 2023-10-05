'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { ThemeProvider } from 'next-themes';
import ToasterContext from '../context/ToastContext';
import { ThemeProviderWrapper } from '@keyval-dev/design-system';
import '../globals.css';

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
            <Header />
            <ToasterContext />
            {children}
            <Footer />
            <ScrollToTop />
          </ThemeProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
