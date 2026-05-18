'use client';

import React, { useMemo, useRef } from 'react';
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
  gap: ${({ $isMobile }) => ($isMobile ? '24px' : '64px')};
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
  const sphereColors = useMemo<[number, number, number][]>(
    () => [
      [80, 246, 232],
      [106, 42, 255],
    ],
    [],
  );

  return (
    <Relative>
      <ParticleSphere
        targetRef={fgRef}
        colors={sphereColors}
        rotationFrames={8000}
        particlesPerFrame={10}
        particleSize={0.4}
        sphereRadius={size * (isMobile ? 0.45 : 0.3)}
        driftSpeed={0.005}
        exitSpeed={0.0005}
        exitChance={0.4}
      />
      <ConstrainedWrapper $isMobile={isMobile} $paddingTop={isMobile ? 28 : 64}>
        <Content $isMobile={isMobile}>
          <TextAndButtons width={isMobile ? undefined : 500} />

          <FgContainer ref={fgRef}>
            <Image src='/assets/renders/landing_fg.svg' alt='' width={size} height={size} priority style={{ maxWidth: '100%', height: 'auto' }} />
          </FgContainer>
        </Content>
      </ConstrainedWrapper>
    </Relative>
  );
};
