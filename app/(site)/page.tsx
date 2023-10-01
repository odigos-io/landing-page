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

export const metadata: Metadata = {
  title: 'Odigos',
  icons: '/images/logo/logo.png',
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Feature />
      <FeaturesTab />
      <Integration />
      <Brands />
      <CTA />
      <FAQ />
      <Testimonial />
      <Blog />
    </main>
  );
}
