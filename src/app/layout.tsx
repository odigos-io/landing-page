import type { Metadata } from 'next';

const URI = 'https://odigos.io',
  LOGO = '/favicon.ico',
  TITLE = 'Odigos - Enterprise Grade OpenTelemetry',
  DESCRIPTION = 'Accelerate OpenTelemetry implementation with Odigos, an eBPF-based solution providing zero-code, zero-performance overhead for deeper tracing',
  KEYWORDS = ['OpenTelemetry', 'eBPF', 'Observability', 'Monitoring', 'Distributed Tracing', 'Tracing', 'Traces', 'Metrics', 'Logs'];

export const metadata: Metadata = {
  metadataBase: new URL(URI),
  title: TITLE,
  applicationName: TITLE,
  description: DESCRIPTION,
  icons: LOGO,
  keywords: KEYWORDS,
  robots: 'index, follow',
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: LOGO,
    type: 'website',
    url: URI,
    siteName: TITLE,
    locale: 'en_US',
  },
};

type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.ico' type='image/x-icon' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <meta name='description' content={metadata.description as string} />
        <title>{metadata.title as string}</title>
      </head>

      <body
        suppressHydrationWarning={true}
        style={{
          width: '100vw',
          minHeight: '100vh',
          margin: 0,
          padding: 0,
          backgroundColor: '#0F0F0F',
        }}
      >
        {children}
      </body>
    </html>
  );
}
