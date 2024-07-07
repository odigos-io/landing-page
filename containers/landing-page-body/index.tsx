'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

export default function LandingPageBody() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const HowItWorks = isClient
    ? dynamic(() => import('@/containers/how-it-works'))
    : () => null;
  const HowToStart = isClient
    ? dynamic(() => import('@/containers/how-to-start'))
    : () => null;
  const Testimonials = isClient
    ? dynamic(() => import('@/containers/testimonials'))
    : () => null;
  const CTA = isClient ? dynamic(() => import('@/containers/cta')) : () => null;
  const LearnMore = isClient
    ? dynamic(() => import('@/containers/learn-more'))
    : () => null;
  const HowWeDo = isClient
    ? dynamic(() => import('@/containers/how-we-do'))
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
