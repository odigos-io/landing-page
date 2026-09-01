import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Odigos',
  description: 'Odigos builds the runtime context layer for software that writes itself, on eBPF and OpenTelemetry.',
  alternates: { canonical: 'https://odigos.io/about' },
  openGraph: { title: 'About | Odigos', description: 'Odigos builds the runtime context layer for software that writes itself, on eBPF and OpenTelemetry.', url: 'https://odigos.io/about' },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
