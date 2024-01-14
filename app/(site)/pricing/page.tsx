import { Metadata } from 'next';
import Pricing from '@/components/Pricing';

export const metadata: Metadata = {
  metadataBase: new URL('https://odigos.io'),
  title: 'Odigos - Instant Distributed Tracing',
  icons: '/images/logo/logo.png',
  openGraph: {
    title: 'Odigos - Instant Distributed Tracing',
    images: '/images/hero/overview.gif',
  },
};

export default function PricingPage() {
  return <Pricing />;
}
