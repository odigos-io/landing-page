'use client';

import React from 'react';
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
