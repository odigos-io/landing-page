'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

export default function LandingPageBody() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const HowItWorks = isClient
    ? dynamic(() => import('@/containers/how-it-works'), { ssr: true })
    : () => null;
  const HowToStart = isClient
    ? dynamic(() => import('@/containers/how-to-start'), { ssr: true })
    : () => null;
  const Testimonials = isClient
    ? dynamic(() => import('@/containers/testimonials'), { ssr: true })
    : () => null;
  const CTA = isClient
    ? dynamic(() => import('@/containers/cta'), { ssr: true })
    : () => null;
  const LearnMore = isClient
    ? dynamic(() => import('@/containers/learn-more'), { ssr: true })
    : () => null;
  const HowWeDo = isClient
    ? dynamic(() => import('@/containers/how-we-do'), { ssr: true })
    : () => null;
  return (
    <>
      <HowWeDo />
      <HowItWorks />
      <HowToStart />
      <Testimonials />
      <CTA />
      <LearnMore />
    </>
  );
}
