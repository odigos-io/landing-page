import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Security | Odigos',
  description:
    'See which functions ran, what data moved, and where trust broke across services. Odigos captures function-level evidence in live production with out-of-process eBPF, at under 1% CPU.',
  alternates: { canonical: 'https://odigos.io/security' },
  openGraph: {
    title: 'Odigos Security',
    description: 'See which functions ran, what data moved, and where trust broke across services.',
    url: 'https://odigos.io/security',
  },
};

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
