'use client';

import '../globals.css';
import theme from '@/style/theme';
import { Header } from '@/containers';
import Footer from '@/containers/footer';
import PlausibleProvider from 'next-plausible';
import useConversionInitiator from '@/hooks/useConversionInitiator';
import { ThemeProviderWrapper } from '@/reuseable-components/theme.provider/theme.provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useConversionInitiator();

  return (
    <html lang="eng">
      <head>
        <PlausibleProvider domain="odigos.io" />
      </head>
      <body style={{ background: theme.colors.secondary }}>
        <ThemeProviderWrapper>
          <Header />
          {children}
          <Footer />
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
