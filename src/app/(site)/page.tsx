import type { Metadata } from 'next';
import HomeContent from './home-content';
import { SOFTWARE_LD, ldScript } from '@/constants';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://odigos.io',
  },
};

export default function Home() {
  return (
    <>
      <script type='application/ld+json' dangerouslySetInnerHTML={ldScript(SOFTWARE_LD)} />
      <HomeContent />
    </>
  );
}
