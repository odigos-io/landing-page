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
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Odigos - Instant Distributed Tracing',
  icons: '/images/logo/logo.png',
  openGraph: {
    title: 'Odigos - Instant Distributed Tracing',
    images: "/images/hero/overview.gif",
  },
};

export default function Home() {
  return (
    <main>
      <Script
        defer
        data-domain="odigos.io"
        src="https://plausible.io/js/script.js"
      />
      <Hero />
      <Feature />
      <FeaturesTab />
      <Integration />
      <Brands />
      <CTA />
      <FAQ />
      {/* <Testimonial /> */}
      <Blog />
    </main>
  );
}
