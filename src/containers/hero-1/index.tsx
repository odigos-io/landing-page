'use client';

import React from 'react';
import styled from 'styled-components';
import { useMobile } from '@/contexts';
import { Render3D } from '@/components';
import { ConstrainedWrapper } from '@/styles';
import { ProductPreview } from '../product-preview';
import { TextAndButtons } from './text-and-buttons';

const Relative = styled.div`
  position: relative;
  overflow: hidden;
`;

const Absolute = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const DesktopContent = styled.div<{ $isMobile: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 128px;
  width: 100%;
  margin-top: ${({ $isMobile }) => ($isMobile ? 0 : 50)}px;
`;

const MobileContent = styled.div`
  padding: 24px 20px 40px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SCENE = 'https://prod.spline.design/NM0xpAU8t09KHPuW/scene.splinecode';
const ASPECT_RATIO = 1440 / 710;

export const Hero1 = () => {
  const { isMobile, screenWidth } = useMobile();
  const divider = isMobile ? 0.75 : 1;

  return (
    <>
      <Relative>
        <Render3D scene={SCENE} width={screenWidth / divider} height={screenWidth / ASPECT_RATIO / divider} />

        <Absolute>
          <ConstrainedWrapper $isMobile={isMobile}>
            <DesktopContent $isMobile={isMobile}>
              {!isMobile && <TextAndButtons width={500} />}
              <ProductPreview />
            </DesktopContent>
          </ConstrainedWrapper>
        </Absolute>
      </Relative>

      {isMobile && (
        <MobileContent>
          <TextAndButtons />
        </MobileContent>
      )}
    </>
  );
};
