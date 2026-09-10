import type { Metadata } from 'next';
import { getComparisonBySlug } from '@/constants/comparisons';

const comparison = getComparisonBySlug('odigos-vs-obi');

export const metadata: Metadata = {
  title: `${comparison?.title ?? 'Odigos vs OBI'} | Odigos`,
  description: comparison?.description,
  openGraph: {
    title: `${comparison?.title ?? 'Odigos vs OBI'} | Odigos`,
    description: comparison?.description,
    url: 'https://odigos.io/comparisons/odigos-vs-obi',
    type: 'website',
    siteName: 'Odigos',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${comparison?.title ?? 'Odigos vs OBI'} | Odigos`,
    description: comparison?.description,
  },
  alternates: {
    canonical: 'https://odigos.io/comparisons/odigos-vs-obi',
  },
};

export default function OdigosVsObiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
