import theme from '@/style/theme';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('@/containers/hero'));
const HowWeDo = dynamic(() => import('@/containers/how-we-do'));
export const metadata: Metadata = {
  metadataBase: new URL('https://odigos.io'),
  title: 'Odigos - Instant Distributed Tracing',
  icons: '/images/logo/logo-dark.svg',
  openGraph: {
    title: 'Odigos - Instant Distributed Tracing',
    images: '/images/logo/logo-dark.svg',
  },
};

export default function Home() {
  return (
    <main style={{ background: theme.colors.primary }}>
      <Hero />
      <HowWeDo />
    </main>
  );
}
