'use client';

import React from 'react';
import { useMobile } from '@/contexts';
import styled, { css } from 'styled-components';
import type { DinnerEvent } from '@/constants/dinner-events';

const HeroWrapper = styled.div<{ $backgroundImage: string; $backgroundImageIsBright?: boolean; $isMobile: boolean }>`
  position: relative;
  width: 100%;
  min-height: ${({ $isMobile }) => ($isMobile ? 'auto' : '500px')};
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${({ $backgroundImage }) => $backgroundImage});
  background-size: cover;
  background-position: center;
  padding: ${({ $isMobile }) => ($isMobile ? '80px 0 40px' : '100px 20px 64px')};
  overflow: hidden;
  box-sizing: border-box;

  ${({ $backgroundImageIsBright }) =>
    $backgroundImageIsBright &&
    css`
      // Overlay to make white text readable when the image is too bright
      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 0;
      }
      & > * {
        position: relative;
        z-index: 1;
      }
    `}
`;

const ContentWrapper = styled.div<{ $isMobile: boolean }>`
  max-width: ${({ $isMobile }) => ($isMobile ? '100%' : '800px')};
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ $isMobile }) => ($isMobile ? 16 : 32)}px;
  padding: ${({ $isMobile }) => ($isMobile ? '0 16px' : '0')};
  box-sizing: border-box;
`;

const Label = styled.span<{ $isMobile: boolean }>`
  font-size: ${({ $isMobile }) => ($isMobile ? 12 : 14)}px;
  font-weight: 600;
  letter-spacing: ${({ $isMobile }) => ($isMobile ? 1.5 : 2)}px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.cyan};
`;

const Title = styled.h1<{ $isMobile: boolean }>`
  font-size: ${({ $isMobile }) => ($isMobile ? 32 : 64)}px;
  font-weight: 600;
  line-height: 110%;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  font-family: Inter, sans-serif;
  font-style: normal;
  margin: 0;
`;

const Subtitle = styled.p<{ $isMobile: boolean }>`
  font-size: ${({ $isMobile }) => ($isMobile ? 14 : 22)}px;
  line-height: 150%;
  color: ${({ theme }) => theme.colors.grey_lighter};
  margin: 0;
  max-width: ${({ $isMobile }) => ($isMobile ? '100%' : '700px')};
  padding: ${({ $isMobile }) => ($isMobile ? '0 8px' : '0')};
`;

const BadgesWrapper = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  align-items: center;
  gap: ${({ $isMobile }) => ($isMobile ? 12 : 32)}px;
  margin-top: ${({ $isMobile }) => ($isMobile ? 16 : 24)}px;
`;

const Badge = styled.div<{ $isMobile: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ $isMobile }) => ($isMobile ? 8 : 10)}px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ $isMobile }) => ($isMobile ? 14 : 16)}px;
`;

const BadgeIcon = styled.span`
  color: ${({ theme }) => theme.colors.cyan};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Divider = styled.span<{ $isMobile: boolean }>`
  display: ${({ $isMobile }) => ($isMobile ? 'none' : 'block')};
  width: 1px;
  height: 24px;
  background: rgba(255, 255, 255, 0.3);
`;

// Simple SVG icons as components
const CalendarIcon = () => (
  <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
    <rect x='3' y='4' width='18' height='18' rx='2' ry='2' />
    <line x1='16' y1='2' x2='16' y2='6' />
    <line x1='8' y1='2' x2='8' y2='6' />
    <line x1='3' y1='10' x2='21' y2='10' />
  </svg>
);

const ClockIcon = () => (
  <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
    <circle cx='12' cy='12' r='10' />
    <polyline points='12 6 12 12 16 14' />
  </svg>
);

const VenueIcon = () => (
  <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
    <path d='M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2' />
    <path d='M7 2v20' />
    <path d='M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7' />
  </svg>
);

interface HeroSectionProps {
  event: DinnerEvent;
}

export const HeroSection = ({ event }: HeroSectionProps) => {
  const { isMobile } = useMobile();

  return (
    <HeroWrapper $backgroundImage={event.heroImage} $backgroundImageIsBright={event.heroImageIsBright} $isMobile={isMobile}>
      <ContentWrapper $isMobile={isMobile}>
        <Label $isMobile={isMobile}>Exclusive Executive Dinner</Label>
        <Title $isMobile={isMobile}>{event.title}</Title>
        <Subtitle $isMobile={isMobile}>{event.subtitle}</Subtitle>

        <BadgesWrapper $isMobile={isMobile}>
          <Badge $isMobile={isMobile}>
            <BadgeIcon>
              <CalendarIcon />
            </BadgeIcon>
            {event.date}
          </Badge>
          <Divider $isMobile={isMobile} />
          <Badge $isMobile={isMobile}>
            <BadgeIcon>
              <ClockIcon />
            </BadgeIcon>
            {event.time}
          </Badge>
          <Divider $isMobile={isMobile} />
          <Badge $isMobile={isMobile}>
            <BadgeIcon>
              <VenueIcon />
            </BadgeIcon>
            {event.venue}
          </Badge>
        </BadgesWrapper>
      </ContentWrapper>
    </HeroWrapper>
  );
};
