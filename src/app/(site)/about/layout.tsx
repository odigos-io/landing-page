import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Odigos',
  description: 'Odigos is the production context platform: one record of what ran inside every service, kept by Odigos DeepBPF with nothing in your code.',
  alternates: { canonical: 'https://odigos.io/about' },
  openGraph: { title: 'About | Odigos', description: 'Odigos is the production context platform: one record of what ran inside every service, kept by Odigos DeepBPF with nothing in your code.', url: 'https://odigos.io/about' },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
