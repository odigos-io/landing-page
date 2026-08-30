'use client';

import React from 'react';
import {
  LandingHeader,
  LandingHero,
  LandingLogos,
  LandingValue,
  LandingOldWay,
  LandingFeatures,
  LandingProduct,
  LandingProof,
  LandingOutcomes,
  LandingHowItWorks,
  LandingTestimonial,
  LandingBlogs,
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
        <LandingFeatures />
        <LandingProduct />
        <LandingProof />
        <LandingOutcomes />
        <LandingHowItWorks />
        <LandingTestimonial />
        <LandingBlogs />
        <LandingFaq />
        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  );
};

export default HomeContent;
