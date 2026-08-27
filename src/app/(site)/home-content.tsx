'use client';

import React from 'react';
import {
  LandingHeader,
  LandingHero,
  LandingLogos,
  LandingValue,
  LandingOldWay,
  LandingHowItWorks,
  LandingProduct,
  LandingFeatures,
  LandingIntegrations,
  LandingMidFlow,
  LandingOutcomes,
  LandingProof,
  LandingTestimonial,
  LandingFaq,
  LandingBlogs,
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
        <LandingProduct />
        <LandingFeatures />
        <LandingIntegrations />
        <LandingMidFlow />
        <LandingOutcomes />
        <LandingProof />
        <LandingTestimonial />
        <LandingFaq />
        <LandingBlogs />
        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  );
};

export default HomeContent;
