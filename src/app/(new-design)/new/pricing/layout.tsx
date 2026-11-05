import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing | Odigos',
  description:
    'Try Odigos Enterprise free for 14 days with deep eBPF observability and multi-cluster control. Contact sales for pricing.',
  alternates: {
    canonical: 'https://odigos.io/new/pricing',
  },
};

export default function NewPricingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
