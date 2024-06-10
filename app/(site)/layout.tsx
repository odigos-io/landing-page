'use client';

import '../globals.css';
import PlausibleProvider from 'next-plausible';
import ConversionInitiator from '@/components/Conversions/landing.simple.tracking';
import { ThemeProviderWrapper } from '@/reuseable-components/theme.provider/theme.provider';
import { Header } from '@/containers';
import Footer from '@/containers/footer';
import theme from '@/style/theme';

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
      <body style={{ background: theme.colors.secondary }}>
        <ThemeProviderWrapper>
          <ConversionInitiator />
          <Header />
          {children}
          <Footer />
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
