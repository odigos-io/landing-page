import type { Metadata } from 'next';
import HomeContent from './home-content';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://odigos.io',
  },
};

export default function Home() {
  return <HomeContent />;
}
