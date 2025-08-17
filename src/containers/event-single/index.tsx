'use client';

import React from 'react';
import styled from 'styled-components';
import { useMobile } from '@/contexts';
import type { EventPost } from '@/types';
import { EventForm } from './event-form';
import { EventTable } from './event-table';
import { getPlaceholderImage } from '@/functions';
import { ConstrainedWrapper, FlexColumn } from '@/styles';
import { BannerImage, MarkdownPreview, Text } from '@/components';

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

const DEFAULT_EVENT_IMAGE = getPlaceholderImage();

export const EventSingle = ({ event }: EventSingleProps) => {
  const { isMobile } = useMobile();

  return (
    <ConstrainedWrapper $isMobile={isMobile}>
      <FlexColumn $gap={isMobile ? 48 : 64}>
        <BannerImage src={event.image || ''} alt={event.title} fallbackImage={DEFAULT_EVENT_IMAGE} />

        <WrapContent $isMobile={isMobile}>
          <FlexColumn $gap={isMobile ? 32 : 48}>
            <Text fontSize={isMobile ? 20 : 28} fontWeight={isMobile ? 400 : 600} lineHeight='130%'>
              {event.title}
            </Text>
            <EventTable event={event} />
            {event.content && <MarkdownPreview content={event.content} />}
          </FlexColumn>

          <FlexColumn $gap={isMobile ? 32 : 48}>
            <EventForm />
          </FlexColumn>
        </WrapContent>
      </FlexColumn>
    </ConstrainedWrapper>
  );
};
