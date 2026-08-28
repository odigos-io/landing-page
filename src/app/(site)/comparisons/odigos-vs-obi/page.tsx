'use client';

import React from 'react';
import { getComparisonBySlug } from '@/constants';
import { LandingHeader, LandingComparison, LandingCTA, LandingFooter } from '@/containers/landing';

const comparison = getComparisonBySlug('odigos-vs-obi');

const OdigosVsObi = () => {
  if (!comparison) return null;

  return (
    <div className='landing-root'>
      <LandingHeader />
      <main>
        <LandingComparison comparison={comparison} />
        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  );
};

export default OdigosVsObi;
