'use client';

import React from 'react';
import styled from 'styled-components';
import { useEvents, useMobile } from '@/contexts';
import { Button, EventCard, TextLayers } from '@/components';
import { ConstrainedWrapper, FlexColumn, FlexRow } from '@/styles';

interface LearnMoreEventsProps {
  title?: string;
}

const CardsContainer = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  align-items: ${({ $isMobile }) => ($isMobile ? 'center' : 'flex-start')};
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
`;

export const LearnMoreEvents = ({ title = 'Discover Latest Events' }: LearnMoreEventsProps) => {
  const { events } = useEvents();
  const { isMobile } = useMobile();

  return (
    <ConstrainedWrapper $isMobile={isMobile} $paddingTop={isMobile ? 64 : 128}>
      <FlexColumn $gap={isMobile ? 32 : 64}>
        <TextLayers
          miniTitle='LEARN MORE'
          title={title}
          titleSettings={{
            largeTitle: true,
          }}
        />

        <CardsContainer $isMobile={isMobile}>
          {events.slice(0, 3).map((event) => (
            <EventCard key={event.slug} {...event} />
          ))}
        </CardsContainer>

        <FlexRow $fullWidth $align='center' $justify='center'>
          <Button rightIconSrc='/assets/icons/arrow.svg' href='/event'>
            Show All
          </Button>
        </FlexRow>
      </FlexColumn>
    </ConstrainedWrapper>
  );
};
