import Head from 'next/head';
import { Metadata } from 'next';
import theme from '@/style/theme';
import dynamic from 'next/dynamic';
import Hero from '@/containers/hero';

const LandingPageBody = dynamic(() => import('@/containers/landing-page-body'));

export const metadata: Metadata = {
  metadataBase: new URL('https://odigos.io'),
  title: 'Odigos - Instant Distributed Tracing',
  icons: '/icons/brand/icon-png.png',
  description:
    'Distributed tracing without code changes. Instantly monitor any application using OpenTelemetry and eBPF',
  openGraph: {
    title: 'Odigos - Instant Distributed Tracing',
    images: '/icons/brand/icon-png.png',
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
      <LandingPageBody />
    </main>
  );
}
