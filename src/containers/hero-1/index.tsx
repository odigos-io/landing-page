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

const Relative = styled.div`
  position: relative;
`;

const Absolute = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Hero1 = () => {
  const { isMobile, screenWidth } = useMobile();
  const divider = isMobile ? 1.25 : 2.25;
  const size = screenWidth / divider;

  return (
    <ConstrainedWrapper $isMobile={isMobile} $paddingTop={0}>
      <Content $isMobile={isMobile}>
        <TextAndButtons width={isMobile ? undefined : 500} />

        <Relative>
          <Image src='/assets/renders/landing_bg.png' alt='' width={size} height={size} priority />
          <Absolute>
            <Image src='/assets/renders/landing_fg.svg' alt='' width={size} height={size} priority />
          </Absolute>
        </Relative>
      </Content>
    </ConstrainedWrapper>
  );
};
