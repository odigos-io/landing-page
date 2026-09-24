'use client';

import React from 'react';
// Import landing pieces directly. The `@/containers/landing` barrel also pulls in
// `@/containers` (via comparison pages), which re-exports Modals and creates a
// cycle that leaves `LandingOldWay` undefined at runtime.
import { LandingAnnouncement } from '@/containers/landing/announcement';
import { LandingHeader } from '@/containers/landing/header';
import { LandingHero } from '@/containers/landing/hero';
import { LandingLogos } from '@/containers/landing/logos';
import { LandingFit } from '@/containers/landing/fit';
import { LandingOldWay } from '@/containers/landing/oldway';
import { LandingDoors } from '@/containers/landing/doors';
import { LandingCTA } from '@/containers/landing/cta';
import { LandingFooter } from '@/containers/landing/footer';

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
