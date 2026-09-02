import type { Metadata } from 'next';
import Script from 'next/script';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import { ORGANIZATION_LD, WEBSITE_LD, ldScript } from '@/constants';

const display = Geist({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-display', display: 'swap' });
const mono = Geist_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono', display: 'swap' });
const body = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-body', display: 'swap' });

const URI = 'https://odigos.io',
  ICON = '/icon.png',
  OG = '/og.png',
  TITLE = 'Odigos · Dynamic telemetry for AI agents',
  DESCRIPTION = 'Ask production a question nobody set it up to answer. Odigos reads the arguments and return values of any function in a live service, in seconds, with no code change.',
  KEYWORDS = ['dynamic telemetry', 'dynamic instrumentation', 'eBPF', 'AI SRE', 'AI agents', 'production debugging', 'OpenTelemetry', 'observability', 'distributed tracing', 'incident resolution', 'runtime context'];

export const metadata: Metadata = {
  metadataBase: new URL(URI),
  title: TITLE,
  applicationName: 'Odigos',
  description: DESCRIPTION,
  icons: { icon: ICON, apple: '/apple-icon.png' },
  keywords: KEYWORDS,
  robots: 'index, follow',
  alternates: { types: { 'application/rss+xml': `${URI}/feed.xml` } },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: OG, width: 1200, height: 630, alt: TITLE }],
    type: 'website',
    url: URI,
    siteName: 'Odigos',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG],
  },
};

type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' suppressHydrationWarning className={`${display.variable} ${mono.variable} ${body.variable}`}>
      <body
        suppressHydrationWarning={true}
        style={{
          width: '100%',
          maxWidth: '100vw',
          overflowX: 'clip',
          minHeight: '100vh',
          margin: 0,
          padding: 0,
        }}
      >
        <script type='application/ld+json' dangerouslySetInnerHTML={ldScript(ORGANIZATION_LD)} />
        <script type='application/ld+json' dangerouslySetInnerHTML={ldScript(WEBSITE_LD)} />

        <Script
          id='consent-defaults'
          strategy='beforeInteractive'
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}

              // Strict denial for regions that legally require consent before tracking
              // (EU/EEA under GDPR, UK under UK DPA, Switzerland under FADP)
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied',
                'wait_for_update': 500,
                'region': ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IS','IE','IT','LV','LI','LT','LU','MT','NL','NO','PL','PT','RO','SK','SI','ES','SE','GB','CH']
              });

              // Permissive default for all other regions: analytics granted,
              // ads still denied until the user opts in via CookieYes
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'granted'
              });

              // Advanced Consent Mode: send cookieless pings and redact ad data
              // for visitors who deny, so GA4 can model the missing traffic
              gtag('set', 'url_passthrough', true);
              gtag('set', 'ads_data_redaction', true);
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
