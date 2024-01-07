import { Metadata } from 'next';
import Hero from '@/components/Hero';
import Brands from '@/components/Brands';
import Feature from '@/components/Features';
import FeaturesTab from '@/components/FeaturesTab';
import Integration from '@/components/Integration';
import CTA from '@/components/CTA';
import FAQ from '@/components/FAQ';
import Blog from '@/components/Blog';
import Testimonial from '@/components/Testimonial';

import Performance from '@/components/Performance';
import Overview from '@/components/Overview';
import FloatingParagraph from '@/components/FloatingParagraph';
import { Montserrat } from 'next/font/google';
import HowItWork from '@/components/HowItWork';

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
    <main className={fontFamily.className} style={{ background: '#060606' }}>
      <Overview />
      {/* <FloatingParagraph />
      <Feature />
      <Performance />
      <HowItWork />
      <Integration />
      <CTA />
      <FAQ />
      <Testimonial />
      <Blog /> */}
    </main>
  );
}
