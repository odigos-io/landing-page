import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://odigos.io/product',
  },
};

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return children;
}
