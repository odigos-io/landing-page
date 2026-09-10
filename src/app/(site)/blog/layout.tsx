import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Odigos',
  description: 'Read the latest articles on OpenTelemetry, eBPF, observability, and distributed tracing from the Odigos team.',
  openGraph: {
    title: 'Blog | Odigos',
    description: 'Read the latest articles on OpenTelemetry, eBPF, observability, and distributed tracing from the Odigos team.',
    url: 'https://odigos.io/blog',
    type: 'website',
    siteName: 'Odigos',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Odigos',
    description: 'Read the latest articles on OpenTelemetry, eBPF, observability, and distributed tracing from the Odigos team.',
  },
  alternates: {
    canonical: 'https://odigos.io/blog',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
