import { Metadata } from 'next';
import theme from '@/style/theme';
import dynamic from 'next/dynamic';
import AboutHero from '@/containers/about/hero';

const Principles = dynamic(() => import('@/containers/about/principles'));
const Team = dynamic(() => import('@/containers/about/team'));
const Investors = dynamic(() => import('@/containers/about/investors'));

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
  return (
    <main style={{ background: theme.colors.secondary }}>
      <AboutHero />
      <Principles />
      <Team />
      <Investors />
    </main>
  );
}
