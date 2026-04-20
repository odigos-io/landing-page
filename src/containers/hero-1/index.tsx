'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useMobile } from '@/contexts';
import { ConstrainedWrapper } from '@/styles';
import { ParticleSphere } from './particle-sphere';
import { TextAndButtons } from './text-and-buttons';

const Relative = styled.div`
  position: relative;
`;

const Content = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column-reverse' : 'row')};
  align-items: center;
  justify-content: center;
  gap: 64px;
  width: 100%;
  position: relative;
  z-index: 1;
`;

const FgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Hero1 = () => {
  const { isMobile, screenWidth } = useMobile();
  const divider = isMobile ? 1.25 : 2.75;
  const size = screenWidth / divider;
  const fgRef = useRef<HTMLDivElement>(null);

  return (
    <Relative>
      <ParticleSphere
        targetRef={fgRef}
        colors={[
          [80, 246, 232],
          [106, 42, 255],
        ]}
        rotationFrames={8000}
        particlesPerFrame={100}
        particleSize={0.3}
        sphereRadius={size * (isMobile ? 0.45 : 0.3)}
        driftSpeed={0.005}
        exitSpeed={0.0005}
        exitChance={0.4}
      />
      <ConstrainedWrapper $isMobile={isMobile} $paddingTop={0}>
        <Content $isMobile={isMobile}>
          <TextAndButtons width={isMobile ? undefined : 500} />

          <FgContainer ref={fgRef}>
            <Image src='/assets/renders/landing_fg.svg' alt='' width={size} height={size} priority />
          </FgContainer>
        </Content>
      </ConstrainedWrapper>
    </Relative>
  );
};
