import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Montserrat } from 'next/font/google';

const Hero = dynamic(() => import('@/containers/hero'));
const Brands = dynamic(() => import('@/components/Brands'));
const Feature = dynamic(() => import('@/components/Features'));
const FeaturesTab = dynamic(() => import('@/components/FeaturesTab'));
const Integration = dynamic(() => import('@/components/Integration'));
const CTA = dynamic(() => import('@/components/CTA'));
const FAQ = dynamic(() => import('@/components/FAQ'));
const Blog = dynamic(() => import('@/components/Blog'));
const Testimonial = dynamic(() => import('@/components/Testimonial'));
const Performance = dynamic(() => import('@/components/Performance'));
const Overview = dynamic(() => import('@/components/Overview'));
const FloatingParagraph = dynamic(
  () => import('@/components/FloatingParagraph')
);
const HowItWork = dynamic(() => import('@/components/HowItWork'));

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
