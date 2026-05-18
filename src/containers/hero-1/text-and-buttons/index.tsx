'use client';

import React from 'react';
import { useMobile } from '@/contexts';
import styled, { css } from 'styled-components';
import { ContactUsButton, TextLayers, TrialButton } from '@/components';

const Container = styled.div<{ $isMobile: boolean; $width?: number }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: ${({ $isMobile }) => ($isMobile ? '32px' : '40px')};
  width: ${({ $isMobile, $width }) => ($isMobile ? '100%' : $width ? `${$width}px` : 'unset')};
  max-width: 100%;
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
        title={'Ask production\nanything.'}
        titleSettings={{
          extraLargeTitle: true,
          minWidth: isMobile ? 'unset' : `${width}px`,
          center: isMobile,
        }}
        descriptions={[
          'AI ships code to production faster than anyone can watch it. Odigos lets you see exactly what it does there: any service, any signal, on demand, with zero overhead and no redeploy.',
        ]}
        descriptionSettings={{
          center: isMobile,
        }}
      />

      <ContainButtons $isMobile={isMobile} $isSmallestScreen={screenWidth < 420}>
        <TrialButton rightIconSrc='/assets/icons/arrow.svg' />
        <ContactUsButton variant='secondary' label='Get a demo' />
      </ContainButtons>
    </Container>
  );
};
