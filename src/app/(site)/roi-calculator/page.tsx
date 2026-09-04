'use client';

import { LandingCTA, LandingFooter, LandingHeader } from '@/containers/landing';
import { NewRoiCalculator } from '@/containers/new-roi-calculator';

export default function RoiCalculatorPage() {
  return (
    <div className='landing-root'>
      <LandingHeader />
      <main>
        <NewRoiCalculator />
        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
