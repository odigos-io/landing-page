'use client';

import React from 'react';
import { Text } from '../text';
import { useMobile } from '@/contexts';
import styled, { useTheme } from 'styled-components';
import { TypeAnimation } from 'react-type-animation';

interface TitleSettingProps {
  smallTitle?: boolean;
  largeTitle?: boolean;
  extraLargeTitle?: boolean;
  minWidth?: string;
  maxWidth?: string;
  center?: boolean;
}

interface TextLayersProps {
  miniTitle?: string;
  title?: string;
  typistTitles?: string[];
  titleSettings?: TitleSettingProps;
  descriptions?: string[];
  bullets?: string[];
}

const getTitleFontSize = (isMobile: boolean, isSmall?: boolean, isLarge?: boolean, isExtraLarge?: boolean) => {
  return isMobile ? (isSmall ? '20px' : isExtraLarge ? '40px' : '32px') : isSmall ? '32px' : isExtraLarge ? '60px' : isLarge ? '56px' : '48px';
};

const Container = styled.div<{ $center?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${({ $center }) => ($center ? 'center' : 'flex-start')};
  align-self: stretch;
  gap: 24px;
`;

const Titles = styled.div<{ $isMobile: boolean; $minWidth?: string; $maxWidth?: string; $center?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $center }) => ($center ? 'center' : 'flex-start')};
  gap: 10px;
  min-width: ${({ $minWidth }) => $minWidth || 'unset'};
  max-width: ${({ $maxWidth }) => $maxWidth || 'unset'};
`;

const MiniTitle = styled(Text)<{ $isMobile: boolean }>`
  font-weight: 500;
  font-size: ${({ $isMobile }) => ($isMobile ? '14px' : '18px')};
  line-height: 24px;
  text-transform: uppercase;
`;

const Title = styled(Text)<{
  $isMobile: boolean;
  $isSmall?: boolean;
  $isLarge?: boolean;
  $isExtraLarge?: boolean;
  $center?: boolean;
}>`
  font-weight: 600;
  font-size: ${({ $isMobile, $isSmall, $isLarge, $isExtraLarge }) => getTitleFontSize($isMobile, $isSmall, $isLarge, $isExtraLarge)};
  line-height: 110%;
  letter-spacing: ${({ $isMobile }) => ($isMobile ? '-0.8px' : '-1.72px')};
  text-align: ${({ $center }) => ($center ? 'center' : 'start')};
`;

const DescriptionsWrapper = styled.div<{ $isMobile: boolean }>`
  max-width: ${({ $isMobile }) => ($isMobile ? 'unset' : '50vw')};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  gap: ${({ $isMobile }) => ($isMobile ? '12px' : '16px')};
`;

const Description = styled(Text)<{ $isMobile: boolean }>`
  color: ${({ theme }) => theme.colors.off_white};
  font-size: ${({ $isMobile }) => ($isMobile ? '16px' : '18px')};
  line-height: ${({ $isMobile }) => ($isMobile ? '28px' : '32px')};
  letter-spacing: ${({ $isMobile }) => ($isMobile ? '0.3px' : '0.4px')};
`;

const BulletsWrapper = styled.ul`
  list-style: disc;
  list-style-position: outside;
  margin: 0;
  padding-left: 24px;
  color: ${({ theme }) => theme.colors.off_white};
`;

const Bullet = styled.li``;

export const TextLayers = ({ miniTitle, title, typistTitles, titleSettings, descriptions, bullets }: TextLayersProps) => {
  const theme = useTheme();
  const { isMobile } = useMobile();

  return (
    <Container $center={titleSettings?.center}>
      {miniTitle || title ? (
        <Titles $isMobile={isMobile} $minWidth={titleSettings?.minWidth} $maxWidth={titleSettings?.maxWidth} $center={titleSettings?.center}>
          {miniTitle && <MiniTitle $isMobile={isMobile}>{miniTitle}</MiniTitle>}
          {title && (
            <Title $isMobile={isMobile} $isSmall={titleSettings?.smallTitle} $isLarge={titleSettings?.largeTitle} $isExtraLarge={titleSettings?.extraLargeTitle} $center={titleSettings?.center}>
              {title}
            </Title>
          )}

          {typistTitles?.length ? (
            <TypeAnimation
              sequence={typistTitles.map((title) => [title, 2000]).flat()}
              repeat={Infinity}
              cursor={true}
              wrapper='span'
              style={{
                fontSize: getTitleFontSize(isMobile, titleSettings?.smallTitle, titleSettings?.largeTitle, titleSettings?.extraLargeTitle),
                fontWeight: 600,
                background: `linear-gradient(90deg, ${theme.colors.cyan} 0.48%, ${theme.colors.purple} 47.12%, ${theme.colors.pink} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: titleSettings?.center ? 'center' : 'start',
              }}
            />
          ) : null}
        </Titles>
      ) : null}

      {descriptions?.length ? (
        <DescriptionsWrapper $isMobile={isMobile}>
          {descriptions.map((text) => (
            <Description key={`desc-${text}`} $isMobile={isMobile}>
              {text}
            </Description>
          ))}
        </DescriptionsWrapper>
      ) : null}

      {bullets?.length ? (
        <BulletsWrapper>
          {bullets.map((bullet) => (
            <Bullet key={`bullet-${bullet}`}>
              <Description $isMobile={isMobile} fontWeight={200}>
                {bullet}
              </Description>
            </Bullet>
          ))}
        </BulletsWrapper>
      ) : null}
    </Container>
  );
};
