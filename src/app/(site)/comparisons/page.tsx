'use client';

import React from 'react';
import { LandingHeader, LandingComparisonsHub, LandingCTA, LandingFooter } from '@/containers/landing';

const Comparisons = () => {
  return (
    <div className='landing-root'>
      <LandingHeader />
      <main>
        <LandingComparisonsHub />
        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  );
};

export default Comparisons;
