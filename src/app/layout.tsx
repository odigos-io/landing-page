import type { Metadata } from 'next';
import Script from 'next/script';

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
