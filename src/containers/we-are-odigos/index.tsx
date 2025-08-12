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
            miniTitle='VISION'
            title='Pioneering the future of performance monitoring.'
            titleSettings={{
              smallTitle: isMobile,
            }}
          />
        </FlexColumn>
        <ContainImage $isMobile={isMobile}>
          <Image src='/assets/odigos/logo_grid.svg' alt='odigos' priority width={isMobile ? 197 : 481} height={isMobile ? 197 : 481} />
        </ContainImage>
      </Container>
    </ConstrainedWrapper>
  );
};
