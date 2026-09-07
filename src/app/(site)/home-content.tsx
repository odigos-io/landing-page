'use client';

import React from 'react';
import {
  LandingHeader,
  LandingHero,
  LandingLogos,
  LandingOldWay,
  LandingFeatures,
  LandingPlatform,
  LandingProduct,
  LandingProof,
  LandingHowItWorks,
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
        <LandingPlatform />
        <LandingOldWay />
        <LandingFeatures />
        <LandingHowItWorks />
        <LandingProduct />
        <LandingProof />
        <LandingCTA />
        <LandingBlogs />
      </main>
      <LandingFooter />
    </div>
  );
};

export default HomeContent;
