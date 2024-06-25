import { Metadata } from 'next';
import theme from '@/style/theme';
import dynamic from 'next/dynamic';

const PricingHero = dynamic(() => import('@/containers/pricing/hero'));
const CTASection = dynamic(() => import('@/containers/cta'));
const PricingComponent = dynamic(
  () => import('@/containers/pricing/pricing-table')
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

export default function PricingPage() {
  return (
    <main style={{ background: theme.colors.secondary }}>
      <PricingHero />
      <PricingComponent />
      <CTASection />
    </main>
  );
}
