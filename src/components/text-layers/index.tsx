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
}

interface TextLayersProps {
  miniTitle?: string;
  title?: string;
  typistTitles?: string[];
  titleSettings?: TitleSettingProps;
  descriptions?: string[];
}

const getTitleFontSize = (isMobile: boolean, isSmall?: boolean, isLarge?: boolean, isExtraLarge?: boolean) => {
  return isMobile ? (isSmall ? '20px' : isExtraLarge ? '40px' : '32px') : isSmall ? '32px' : isExtraLarge ? '60px' : isLarge ? '56px' : '48px';
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-self: stretch;
  gap: 24px;
`;

const Titles = styled.div<{ $isMobile: boolean; $minWidth?: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  min-width: ${({ $minWidth }) => $minWidth || 'unset'};
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
}>`
  font-weight: 600;
  font-size: ${({ $isMobile, $isSmall, $isLarge, $isExtraLarge }) => getTitleFontSize($isMobile, $isSmall, $isLarge, $isExtraLarge)};
  line-height: 110%;
  letter-spacing: ${({ $isMobile }) => ($isMobile ? '-0.8px' : '-1.72px')};
`;

const DescriptionsWrapper = styled.div<{
  $isMobile: boolean;
}>`
  max-width: ${({ $isMobile }) => ($isMobile ? 'unset' : '50vw')};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  gap: ${({ $isMobile }) => ($isMobile ? '12px' : '16px')};
`;

const Description = styled(Text)<{ $isMobile: boolean }>`
  color: ${({ theme }) => theme.colors.off_white};
  font-weight: 400;
  font-size: ${({ $isMobile }) => ($isMobile ? '16px' : '18px')};
  line-height: ${({ $isMobile }) => ($isMobile ? '28px' : '32px')};
  letter-spacing: ${({ $isMobile }) => ($isMobile ? '0.3px' : '0.4px')};
`;

export const TextLayers = ({ miniTitle, title, typistTitles, titleSettings, descriptions }: TextLayersProps) => {
  const theme = useTheme();
  const { isMobile } = useMobile();

  return (
    <Container>
      {miniTitle || title ? (
        <Titles $isMobile={isMobile} $minWidth={titleSettings?.minWidth}>
          {miniTitle && <MiniTitle $isMobile={isMobile}>{miniTitle}</MiniTitle>}
          {title && (
            <Title $isMobile={isMobile} $isSmall={titleSettings?.smallTitle} $isLarge={titleSettings?.largeTitle} $isExtraLarge={titleSettings?.extraLargeTitle}>
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
    </Container>
  );
};
