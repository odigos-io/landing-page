import Head from 'next/head';
import { Metadata } from 'next';
import theme from '@/style/theme';
import dynamic from 'next/dynamic';
import Hero from '@/containers/hero';

// const Hero = dynamic(() => import('@/containers/hero'), { ssr: true });
const HowWeDo = dynamic(() => import('@/containers/how-we-do'), { ssr: true });
const LandingPageBody = dynamic(
  () => import('@/containers/landing-page-body'),
  {
    ssr: true,
  }
);

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
      <Head>
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          as="style"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Kode+Mono:wght@400;700&display=swap"
          as="style"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;700&display=swap"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Kode+Mono:wght@400;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;700&display=swap"
        />
        <link rel="preload" href="../../public/lotties/hero.json" as="image" />
      </Head>
      <Hero />
      <HowWeDo />
      <LandingPageBody />
    </main>
  );
}
