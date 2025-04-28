import { Metadata } from 'next';
import theme from '@/style/theme';
import dynamic from 'next/dynamic';
import PricingHero from '@/containers/pricing/hero';
import PricingTable from '@/containers/pricing/pricing-table/pricing-table';

const CTASection = dynamic(() => import('@/containers/cta'));
const FAQComponent = dynamic(() => import('@/containers/pricing/faq'));
const PricingComponent = dynamic(() => import('@/containers/pricing/pricing-table'));
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
      <PricingTable />

      <FAQComponent />
      <CTASection />
    </main>
  );
}
