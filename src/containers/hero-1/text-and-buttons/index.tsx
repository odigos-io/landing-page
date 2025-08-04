'use client';

import React from 'react';
import { useMobile } from '@/contexts';
import styled, { css } from 'styled-components';
import { QuickstartButton, TextLayers, WatchDemoButton } from '@/components';

const Container = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: ${({ $isMobile }) => ($isMobile ? '32px' : '40px')};
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

export const TextAndButtons = () => {
  const { isMobile, screenWidth } = useMobile();

  return (
    <Container $isMobile={isMobile}>
      <TextLayers
        title='Full Observability without'
        typistTitles={['Performance Overhead', 'Blind Spots', 'Code Changes', 'Vendor Lock-in']}
        titleSettings={{
          extraLargeTitle: true,
          minWidth: isMobile ? 'unset' : '700px',
        }}
        descriptions={['Accelerate OpenTelemetry implementation with Odigos, an eBPF-based solution providing zero-code, zero-performance overhead for deeper tracing']}
      />

      <ContainButtons $isMobile={isMobile} $isSmallestScreen={screenWidth < 420}>
        <QuickstartButton />
        <WatchDemoButton />
      </ContainButtons>
    </Container>
  );
};
