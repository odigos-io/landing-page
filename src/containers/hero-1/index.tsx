'use client';

import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useMobile } from '@/contexts';
import { ConstrainedWrapper } from '@/styles';
import { TextAndButtons } from './text-and-buttons';

const Content = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column-reverse' : 'row')};
  align-items: center;
  justify-content: center;
  gap: 64px;
  width: 100%;
`;

export const Hero1 = () => {
  const { isMobile, screenWidth } = useMobile();
  const divider = isMobile ? 1.25 : 2.25;

  return (
    <ConstrainedWrapper $isMobile={isMobile} $paddingTop={0}>
      <Content $isMobile={isMobile}>
        <TextAndButtons width={isMobile ? undefined : 500} />
        <Image src='/assets/renders/landing.svg' alt='' width={screenWidth / divider} height={screenWidth / divider} />
      </Content>
    </ConstrainedWrapper>
  );
};
