'use client';

import React from 'react';
import { useMobile } from '@/contexts';
import styled, { css } from 'styled-components';
import { ContactUsButton, QuickstartButton, TextLayers } from '@/components';

const Container = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: ${({ $isMobile }) => ($isMobile ? '32px' : '64px')};
`;

const ContainButtons = styled.div<{ $isMobile: boolean; $isSmallestScreen: boolean }>`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
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
        title={"You can't fix\nwhat you can't see"}
        titleSettings={{
          largeTitle: true,
          center: true,
        }}
      />

      <ContainButtons $isMobile={isMobile} $isSmallestScreen={screenWidth < 420}>
        <QuickstartButton />
        <ContactUsButton variant='secondary' label='Contact Sales' rightIconSrc='/assets/icons/chat.svg' />
      </ContainButtons>
    </Container>
  );
};
