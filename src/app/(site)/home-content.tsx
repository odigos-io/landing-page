'use client';

import React from 'react';
import {
  LandingHeader,
  LandingHero,
  LandingLogos,
  LandingValue,
  LandingOldWay,
  LandingRoutes,
  LandingHowItWorks,
  LandingProduct,
  LandingFeatures,
  LandingIntegrations,
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
        <LandingRoutes />
        <LandingHowItWorks />
        <LandingProduct />
        <LandingFeatures />
        <LandingIntegrations />
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
