import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product | Odigos',
  description: 'Capture any function’s arguments and return values in a live service with out-of-process eBPF, govern the pipeline end to end, and export as OpenTelemetry.',
  alternates: { canonical: 'https://odigos.io/product' },
  openGraph: { title: 'Product | Odigos', description: 'Capture any function’s arguments and return values in a live service with out-of-process eBPF, govern the pipeline end to end, and export as OpenTelemetry.', url: 'https://odigos.io/product' },
};

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return children;
}
