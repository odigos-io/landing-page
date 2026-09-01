import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing | Odigos',
  description: 'Start free with open source Odigos and scale to Enterprise. Plans compared line by line, plus answers on eBPF overhead, language support and data governance.',
  alternates: { canonical: 'https://odigos.io/pricing' },
  openGraph: { title: 'Pricing | Odigos', description: 'Start free with open source Odigos and scale to Enterprise. Plans compared line by line, plus answers on eBPF overhead, language support and data governance.', url: 'https://odigos.io/pricing' },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
