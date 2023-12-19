'use client';

import { ThemeProviderWrapper } from '@keyval-dev/design-system';
import PlausibleProvider from 'next-plausible';

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
      <body className={`dark:bg-black`}>
        <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
      </body>
    </html>
  );
}