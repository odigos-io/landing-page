'use client';

import React from 'react';
import { LandingHeader, LandingFooter, LandingCTA } from '@/containers/landing';
import { PageHero } from '@/containers/landing/page-hero';
import { ObservabilityArt } from './observability-art';
import { ObservabilityPlatform } from './observability-platform';
import { PlatformBridge } from '@/containers/landing/platform-bridge';
import { DynamicInstrumentation } from './dynamic-instrumentation';
export const ObservabilityContent = () => {
  return (
    <div className='landing-root'>
      <LandingHeader />
      <main>
        <PageHero
          eyebrow='Observability on the production context platform'
          title={
            <>
              Wake up to the root cause. <em>Not to the alert.</em>
            </>
          }
          sub={
            <>
              Every service traced from day one, with nothing in your code. When one drifts, Odigos Autofocus captures what the code did while it happens. <b>Your engineers and AI agents open the
              laptop to the answer.</b>
            </>
          }
          visual={<ObservabilityArt />}
        />

        <DynamicInstrumentation />

        <ObservabilityPlatform />
        <PlatformBridge current='observability' id='coding-agents' />
        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  );
};
