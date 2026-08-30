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
  LandingHowItWorks,
  LandingTestimonial,
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
        <LandingFeatures />
        <LandingProduct />
        <LandingProof />
        <LandingHowItWorks />
        <LandingTestimonial />
        <LandingBlogs />
        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  );
};

export default HomeContent;
