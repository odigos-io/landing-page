'use client';

import React, { useEffect, useState } from 'react';
import { Button, Text } from '@/components';
import { useMobile } from '@/contexts';
import { TESTIMONIALS } from '@/constants';
import { useTransition } from '@odigos/ui-kit/hooks';
import styled, { keyframes } from 'styled-components';
import { ConstrainedWrapper, FlexColumn, FlexRow } from '@/styles';

const Quote = styled(Text)<{ $isMobile: boolean }>`
  text-align: center;
  font-size: ${({ $isMobile }) => ($isMobile ? '18px' : '28px')};
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

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const Testimonial = () => {
  const { isMobile } = useMobile();
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => setActiveIndex((prev) => prev - 1);
  const handleNext = () => setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));

  useEffect(() => {
    const interval = setInterval(() => handleNext(), 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const Transition = useTransition({
    container: FlexColumn,
    animateIn: fadeIn,
    animateOut: fadeOut,
    duration: 1000,
  });

  return (
    <ConstrainedWrapper $isMobile={isMobile}>
      <FlexColumn $gap={32}>
        {TESTIMONIALS.map(
          ({ quote, authorName, authorPosition }, idx) =>
            activeIndex === idx && (
              <Transition key={authorName} enter $gap={isMobile ? 32 : 64} $align='center'>
                <Quote $isMobile={isMobile}>{quote}</Quote>
                <FlexColumn>
                  <AuthorName $isMobile={isMobile}>{authorName}</AuthorName>
                  <AuthorPosition $isMobile={isMobile}>{authorPosition}</AuthorPosition>
                </FlexColumn>
              </Transition>
            ),
        )}

        <FlexRow $align='center' $justify='center' $gap={32}>
          <Button leftIconSrc='/assets/icons/arrow.svg' variant='secondary' iconSize={20} padding='8px' style={{ transform: 'rotate(180deg)' }} onClick={handlePrev} />
          <Button rightIconSrc='/assets/icons/arrow.svg' variant='secondary' iconSize={20} padding='8px' onClick={handleNext} />
        </FlexRow>
      </FlexColumn>
    </ConstrainedWrapper>
  );
};
