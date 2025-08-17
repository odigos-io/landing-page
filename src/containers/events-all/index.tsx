'use client';

import React from 'react';
import styled from 'styled-components';
import { EventCard, Text } from '@/components';
import { useEvents, useMobile } from '@/contexts';
import { ConstrainedWrapper, FlexRow } from '@/styles';

const Title = styled(Text)<{ $isMobile: boolean }>`
  max-width: ${({ $isMobile }) => ($isMobile ? 'unset' : '50vw')};
  font-size: ${({ $isMobile }) => ($isMobile ? '40px' : '64px')};
  font-weight: 600;
  line-height: 110%;
  letter-spacing: ${({ $isMobile }) => ($isMobile ? '-0.8px' : '-1.28px')};
`;

export const EventsAll = () => {
  const { events } = useEvents();
  const { isMobile } = useMobile();

  return (
    <div>
      <ConstrainedWrapper $isMobile={isMobile} $paddingTop={isMobile ? 64 : 128}>
        <Title $isMobile={isMobile}>Discover our latest events.</Title>
      </ConstrainedWrapper>

      <ConstrainedWrapper $isMobile={isMobile}>
        <FlexRow $gap={12} $wrap='wrap' $justify='center'>
          {events.map((event) => (
            <EventCard key={event.slug} {...event} />
          ))}
        </FlexRow>
      </ConstrainedWrapper>
    </div>
  );
};
