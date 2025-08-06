import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { CAREERS_LINK } from '@/constants';
import { getAllBlogs } from '@/libs/markdown';
import PlausibleProvider from 'next-plausible';

const ThemeProvider = dynamic(() => import('@/styles/theme-provider'));
const MobileProvider = dynamic(() => import('@/contexts/useMobile'));
const BlogsProvider = dynamic(() => import('@/contexts/useBlogs'));

const AnnouncementBanner = dynamic(() => import('@/containers/announcement-banner'));
const Header = dynamic(() => import('@/containers/header'));
const Footer = dynamic(() => import('@/containers/footer'));
const Modals = dynamic(() => import('@/containers/modals'));

const Scripts = dynamic(() => import('@/libs/scripts'));

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
  const blogs = getAllBlogs();

  return (
    <html lang='en'>
      <head>
        {/* <link rel='manifest' href='/manifest.json' /> */}
        <link rel='icon' href='/favicon.ico' type='image/x-icon' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <meta name='description' content={metadata.description as string} />
        <title>{metadata.title as string}</title>
      </head>

      <body
        suppressHydrationWarning={true}
        style={{
          width: '100vw',
          height: '100vh',
          margin: 0,
          padding: 0,
          backgroundColor: '#0F0F0F',
        }}
      >
        <PlausibleProvider domain='odigos.io'>
          <ThemeProvider>
            <MobileProvider>
              <BlogsProvider blogs={blogs}>
                <AnnouncementBanner title='Odigos is hiring!' link={CAREERS_LINK} linkText='Learn more' />
                <Header />
                {children}
                <Footer />
                <Modals />
              </BlogsProvider>
            </MobileProvider>
          </ThemeProvider>
        </PlausibleProvider>
      </body>

      <Scripts />
    </html>
  );
}
