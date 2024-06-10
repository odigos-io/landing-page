import { Metadata } from 'next';
import theme from '@/style/theme';
import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('@/containers/hero'));
const HowWeDo = dynamic(() => import('@/containers/how-we-do'));
const HowItWorks = dynamic(() => import('@/containers/how-it-works'));
const HowToStart = dynamic(() => import('@/containers/how-to-start'));
const Testimonials = dynamic(() => import('@/containers/testimonials'));
const CTA = dynamic(() => import('@/containers/cta'));
const LearnMore = dynamic(() => import('@/containers/learn-more'));
const Footer = dynamic(() => import('@/containers/footer'));

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
      <Hero />
      <HowWeDo />
      <HowItWorks />
      <HowToStart />
      <Testimonials />
      <CTA />
      <LearnMore />
    </main>
  );
}
