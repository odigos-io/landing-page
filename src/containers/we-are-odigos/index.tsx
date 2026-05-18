'use client';

import React from 'react';
import Image from 'next/image';
import { ConstrainedWrapper, FlexColumn } from '@/styles';
import { useMobile } from '@/contexts';
import { Text, TextLayers } from '@/components';
import styled, { css } from 'styled-components';

const Container = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column-reverse' : 'row')};
  align-items: center;
  justify-content: center;
  gap: ${({ $isMobile }) => ($isMobile ? 32 : 32)}px;
`;

const Title = styled(Text)<{ $isMobile: boolean }>`
  font-size: ${({ $isMobile }) => ($isMobile ? '40px' : '86px')};
  font-weight: 600;
  line-height: 110%;
  letter-spacing: ${({ $isMobile }) => ($isMobile ? '-0.8px' : '-1.72px')};
`;

const ContainImage = styled.div<{ $isMobile: boolean }>`
  ${({ $isMobile, theme }) =>
    $isMobile &&
    css`
      width: 100%;
      padding: 8px;
      border-radius: 32px;
      background-color: ${theme.colors.black_lighter};
      display: flex;
      align-items: center;
      justify-content: center;
    `}
`;

export const WeAreOdigos = () => {
  const { isMobile } = useMobile();

  return (
    <ConstrainedWrapper $isMobile={isMobile}>
      <Container $isMobile={isMobile}>
        <FlexColumn $gap={isMobile ? 16 : 32}>
          <Title $isMobile={isMobile}>We’re Odigos</Title>
          <TextLayers
            miniTitle='OUR MISSION'
            title='We brought observability to AI.'
            titleSettings={{
              smallTitle: isMobile,
            }}
            descriptions={[
              'AI writes the code now, and it ships to production faster than any team can watch it. The tools meant to catch it were built twenty years ago, for software people typed by hand.',
              'So we rebuilt the layer underneath. Out-of-process eBPF that sees inside any running service, captures any signal on demand, and physically cannot take production down. Deep, safe, and dynamic at the same time, for the first time.',
              'Every AI that runs production will need this. We built it first, and it already runs inside some of the most demanding production environments on earth.',
            ]}
          />
        </FlexColumn>
        <ContainImage $isMobile={isMobile}>
          <Image src='/assets/odigos/logo_grid.svg' alt='odigos' priority width={isMobile ? 197 : 481} height={isMobile ? 197 : 481} />
        </ContainImage>
      </Container>
    </ConstrainedWrapper>
  );
};
