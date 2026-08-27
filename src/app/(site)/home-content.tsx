'use client';

import React from 'react';
import {
  LandingHeader,
  LandingHero,
  LandingLogos,
  LandingValue,
  LandingOldWay,
  LandingHowItWorks,
  LandingFeatures,
  LandingMidFlow,
  LandingOutcomes,
  LandingProof,
  LandingTestimonial,
  LandingIntegrations,
  LandingFaq,
  LandingCTA,
  LandingFooter,
} from '@/containers/landing';

const HomeContent = () => {
  return (
    <div className='landing-root'>
      <LandingHeader />
      <main>
        <LandingHero />
        <LandingLogos />
        <LandingValue />
        <LandingOldWay />
        <LandingHowItWorks />
        <LandingFeatures />
        <LandingMidFlow />
        <LandingOutcomes />
        <LandingProof />
        <LandingTestimonial />
        <LandingIntegrations />
        <LandingFaq />
        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  );
};

export default HomeContent;
