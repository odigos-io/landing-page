import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Montserrat } from 'next/font/google';

const Hero = dynamic(() => import('@/containers/hero'));

const fontFamily = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://odigos.io'),
  title: 'Odigos - Instant Distributed Tracing',
  icons: '/images/logo/logo.png',
  openGraph: {
    title: 'Odigos - Instant Distributed Tracing',
    images: '/images/hero/overview.gif',
  },
};

export default function Home() {
  return (
    <main className={fontFamily.className} style={{ background: '#151515' }}>
      <Hero />
    </main>
  );
}
