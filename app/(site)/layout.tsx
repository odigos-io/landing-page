'use client';

import '../globals.css';
import theme from '@/style/theme';
import dynamic from 'next/dynamic';
import { Header } from '@/containers';
import { useEffect, useState } from 'react';

import PlausibleProvider from 'next-plausible';
import useConversionInitiator from '@/hooks/useConversionInitiator';
import { ThemeProviderWrapper } from '@/reuseable-components/theme.provider/theme.provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useConversionInitiator();
  const Footer = isClient
    ? dynamic(() => import('@/containers/footer'), { ssr: true })
    : () => null;
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
