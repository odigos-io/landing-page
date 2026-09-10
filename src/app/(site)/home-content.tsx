'use client';

import React from 'react';
import { LandingHeader, LandingHero, LandingLogos, LandingOldWay, LandingFit, LandingDoors, LandingCTA, LandingFooter } from '@/containers/landing';

const HomeContent = () => {
  return (
    <div className='landing-root'>
      <LandingHeader />
      <main>
        <LandingHero />
        <LandingLogos />
        <LandingFit />
        <LandingOldWay />
        <LandingDoors />
        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  );
};

export default HomeContent;
