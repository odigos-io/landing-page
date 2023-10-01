import { Metadata } from 'next';
import Pricing from '@/components/Pricing';

export const metadata: Metadata = {
  title: 'Odigos',
  icons: '/images/logo/logo.png',
};

export default function PricingPage() {
  return <Pricing />;
}
