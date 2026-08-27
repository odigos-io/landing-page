import type { Metadata } from 'next';
import Script from 'next/script';
import { Geist, Geist_Mono } from 'next/font/google';

const display = Geist({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-display', display: 'swap' });
const mono = Geist_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono', display: 'swap' });

const URI = 'https://odigos.io',
  LOGO = '/assets/odigos/logo_white_filled.svg',
  TITLE = 'Odigos - Ask Production Anything',
  DESCRIPTION = 'Odigos is the runtime context platform. Your engineers and your AI agents ask production a question, and our own eBPF runtime captures the exact data that answers it, live, with no code change and no redeploy. Any function, any query, any language, in seconds instead of a deploy cycle. Under 1% overhead, exported as OpenTelemetry, never locked in.',
  KEYWORDS = ['runtime context', 'runtime context platform', 'AI observability', 'production context', 'eBPF', 'OpenTelemetry', 'observability', 'distributed tracing', 'runtime security', 'AI SRE', 'incident resolution'];

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
    <html lang='en' suppressHydrationWarning className={`${display.variable} ${mono.variable}`}>
      <head>
        <link rel='icon' href={LOGO} type='image/svg+xml' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <meta name='description' content={metadata.description as string} />
        <title>{metadata.title as string}</title>

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
      </head>

      <body
        suppressHydrationWarning={true}
        style={{
          width: '100%',
          maxWidth: '100vw',
          overflowX: 'clip',
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
