'use client';

import React from 'react';
import { useMobile } from '@/contexts';
import styled, { css } from 'styled-components';
import { ContactUsButton, TextLayers, WatchDemoButton } from '@/components';

const Container = styled.div<{ $isMobile: boolean; $width?: number }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: ${({ $isMobile }) => ($isMobile ? '32px' : '40px')};
  width: ${({ $width }) => ($width ? `${$width}px` : 'unset')};
`;

const ContainButtons = styled.div<{ $isMobile: boolean; $isSmallestScreen: boolean }>`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: ${({ $isMobile }) => ($isMobile ? 'center' : 'flex-start')};
  gap: ${({ $isMobile }) => ($isMobile ? '12px' : '32px')};

  ${({ $isSmallestScreen }) =>
    $isSmallestScreen &&
    css`
      & button {
        width: calc(100vw - 32px);
      }
    `}
`;

export const TextAndButtons = ({ width }: { width?: number }) => {
  const { isMobile, screenWidth } = useMobile();

  return (
    <Container $isMobile={isMobile} $width={width}>
      <TextLayers
        title='Stop Guessing in Production'
        titleSettings={{
          extraLargeTitle: true,
          minWidth: isMobile ? 'unset' : `${width}px`,
          center: isMobile,
        }}
        descriptions={[
          'Outages start in the gaps others miss. See across the hardest parts of your system and capture more context when it matters most, so engineers and AI can resolve issues faster.',
        ]}
        descriptionSettings={{
          center: isMobile,
        }}
      />

      <ContainButtons $isMobile={isMobile} $isSmallestScreen={screenWidth < 420}>
        <ContactUsButton rightIconSrc='/assets/icons/arrow.svg' />
        <WatchDemoButton />
      </ContainButtons>
    </Container>
  );
};
