'use client';

import React from 'react';
import styled from 'styled-components';
import { useMobile } from '@/contexts';
import { WebinarForm } from './webinar-form';
import { WebinarHeader } from './webinar-header';
import { WebinarDetails } from './webinar-details';
import { WebinarSpeakers } from './webinar-speakers';
import type { WebinarPost } from '@/types';
import { MarkdownPreview, Text } from '@/components';
import { ConstrainedWrapper, FlexColumn } from '@/styles';

interface WebinarSingleProps {
  webinar: WebinarPost;
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

export const WebinarSingle = ({ webinar }: WebinarSingleProps) => {
  const { isMobile } = useMobile();

  return (
    <ConstrainedWrapper $isMobile={isMobile}>
      <FlexColumn $gap={isMobile ? 48 : 64}>
        <WebinarHeader webinar={webinar} />

        <WrapContent $isMobile={isMobile}>
          <FlexColumn $gap={isMobile ? 32 : 48}>
            <Text fontSize={isMobile ? 20 : 28} fontWeight={isMobile ? 400 : 600} lineHeight='130%'>
              {webinar.title}
            </Text>
            <WebinarDetails webinar={webinar} />
            {webinar.content && <MarkdownPreview content={webinar.content} />}
            {webinar.speakers && webinar.speakers.length > 0 && <WebinarSpeakers speakers={webinar.speakers} />}
          </FlexColumn>

          <FlexColumn $gap={isMobile ? 32 : 48}>
            <WebinarForm riversideEventId={webinar.riversideEventId} />
          </FlexColumn>
        </WrapContent>
      </FlexColumn>
    </ConstrainedWrapper>
  );
};
