import { Metadata } from 'next';
import theme from '@/style/theme';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  metadataBase: new URL('https://odigos.io'),
  title: 'Odigos - Instant Distributed Tracing',
  icons: '/icons/brand/black-icon.svg',
  openGraph: {
    title: 'Odigos - Instant Distributed Tracing',
    images: '/icons/brand/black-icon.svg',
  },
};

export default function Home() {
  return <main style={{ background: theme.colors.secondary }}></main>;
}
