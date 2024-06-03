'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { ThemeProvider } from 'next-themes';
import '../globals.css';
import PlausibleProvider from 'next-plausible';
import ConversionInitiator from '@/components/Conversions/landing.simple.tracking';
import { ThemeProviderWrapper } from '@/reuseable-components/theme.provider/theme.provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="eng">
      <head>
        <PlausibleProvider domain="odigos.io" />
      </head>
      <body>
        <ThemeProviderWrapper>
          <ConversionInitiator />
          {/* <Header /> */}
          {children}
          {/* <Footer /> */}
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
