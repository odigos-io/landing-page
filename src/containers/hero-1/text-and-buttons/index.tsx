'use client';

import React from 'react';
import { useMobile } from '@/contexts';
import styled, { css } from 'styled-components';
import { QuickstartButton, TextLayers, WatchDemoButton } from '@/components';

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
        title='Deeper Observability to'
        typistTitles={['see more', 'fix faster', 'spend less', 'ship safely']}
        titleSettings={{
          extraLargeTitle: true,
          minWidth: isMobile ? 'unset' : `${width}px`,
          center: isMobile,
        }}
        descriptions={['Accelerate OpenTelemetry implementation with Odigos, an eBPF-based solution providing zero-code, zero-performance overhead for deeper tracing']}
        descriptionSettings={{
          center: isMobile,
        }}
      />

      <ContainButtons $isMobile={isMobile} $isSmallestScreen={screenWidth < 420}>
        <QuickstartButton />
        <WatchDemoButton />
      </ContainButtons>
    </Container>
  );
};
