'use client';

import React from 'react';
import { Text } from '@/components';
import { useMobile } from '@/contexts';
import styled from 'styled-components';
import { ConstrainedWrapper, FlexColumn } from '@/styles';
import { TESTIMONIAL_AUTHOR_NAME, TESTIMONIAL_AUTHOR_POSITION, TESTIMONIAL_QUOTE } from '@/constants';

const Quote = styled(Text)<{ $isMobile: boolean }>`
  text-align: center;
  font-size: ${({ $isMobile }) => ($isMobile ? '18px' : '36px')};
  line-height: 140%;
`;

const AuthorName = styled(Text)<{ $isMobile: boolean }>`
  font-size: ${({ $isMobile }) => ($isMobile ? '16px' : '32px')};
  text-align: center;
  line-height: 140%;
  text-transform: uppercase;
`;

const AuthorPosition = styled(Text)<{ $isMobile: boolean }>`
  color: ${({ theme }) => theme.colors.grey};
  font-size: ${({ $isMobile }) => ($isMobile ? '12px' : '18px')};
  text-align: center;
  line-height: 140%;
  text-transform: uppercase;
`;

export const Testimonial = () => {
  const { isMobile } = useMobile();

  return (
    <ConstrainedWrapper $isMobile={isMobile} $overrideMaxWidth={1440}>
      <FlexColumn $gap={isMobile ? 32 : 64} $align='center'>
        <Quote $isMobile={isMobile}>{TESTIMONIAL_QUOTE}</Quote>
        <FlexColumn>
          <AuthorName $isMobile={isMobile}>{TESTIMONIAL_AUTHOR_NAME}</AuthorName>
          <AuthorPosition $isMobile={isMobile}>{TESTIMONIAL_AUTHOR_POSITION}</AuthorPosition>
        </FlexColumn>
      </FlexColumn>
    </ConstrainedWrapper>
  );
};
