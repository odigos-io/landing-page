'use client';

import React from 'react';
import { LandingAnnouncement, LandingHeader, LandingHero, LandingLogos, LandingOldWay, LandingFit, LandingDoors, LandingCTA, LandingFooter } from '@/containers/landing';

const HomeContent = () => {
  return (
    <div className='landing-root'>
      <LandingAnnouncement />
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
