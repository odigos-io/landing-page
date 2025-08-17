'use client';

import React from 'react';
import styled from 'styled-components';
import { useMobile } from '@/contexts';
import { EventMap } from './event-map';
import { EventForm } from './event-form';
import { EventTable } from './event-table';
import { EventHeader } from './event-header';
import type { EventPost } from '@/types';
import { MarkdownPreview, Text } from '@/components';
import { ConstrainedWrapper, FlexColumn } from '@/styles';

interface EventSingleProps {
  event: EventPost;
}

const WrapContent = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  align-items: ${({ $isMobile }) => ($isMobile ? 'center' : 'flex-start')};
  gap: ${({ $isMobile }) => ($isMobile ? 32 : 48)}px;

  & > div {
    flex: 0.5;
  }
`;

export const EventSingle = ({ event }: EventSingleProps) => {
  const { isMobile } = useMobile();

  return (
    <ConstrainedWrapper $isMobile={isMobile}>
      <FlexColumn $gap={isMobile ? 48 : 64}>
        <EventHeader event={event} />

        <WrapContent $isMobile={isMobile}>
          <FlexColumn $gap={isMobile ? 32 : 48}>
            <Text fontSize={isMobile ? 20 : 28} fontWeight={isMobile ? 400 : 600} lineHeight='130%'>
              {event.title}
            </Text>
            <EventTable event={event} />
            {event.content && <MarkdownPreview content={event.content} />}
          </FlexColumn>

          <FlexColumn $gap={isMobile ? 32 : 48}>
            <EventForm eventName={event.title} />
            <EventMap location={event.location} />
          </FlexColumn>
        </WrapContent>
      </FlexColumn>
    </ConstrainedWrapper>
  );
};
