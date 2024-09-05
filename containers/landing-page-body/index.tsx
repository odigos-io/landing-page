'use client';

import { NewsletterPopup } from '@/components';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

export default function LandingPageBody() {
  const [isClient, setIsClient] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

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
      {showPopup && <NewsletterPopup />}
    </>
  );
}
