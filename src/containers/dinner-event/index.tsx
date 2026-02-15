'use client';

import React from 'react';
import styled from 'styled-components';
import type { DinnerEvent as DinnerEventType } from '@/types';
import { HeroSection } from './hero-section';
import { WhyAttend } from './why-attend';
import { WhoShouldAttend } from './who-should-attend';
import { HubspotFormSection } from './hubspot-form';

const PageWrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

interface DinnerEventProps {
  event: DinnerEventType;
}

export const DinnerEvent = ({ event }: DinnerEventProps) => {
  return (
    <PageWrapper>
      <HeroSection event={event} />
      {event.whyAttend && event.whyAttend.length > 0 && <WhyAttend items={event.whyAttend} />}
      {event.roles && event.roles.length > 0 && <WhoShouldAttend roles={event.roles} />}
      <HubspotFormSection event={event} />
    </PageWrapper>
  );
};
