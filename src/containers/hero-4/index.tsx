'use client';

import React from 'react';
import styled from 'styled-components';
import { useMobile } from '@/contexts';
import { Render3D } from '@/components';
import { ProductPreview } from '../product-preview';
import { TextAndButtons } from './text-and-buttons';

const Relative = styled.div<{ $isMobile: boolean }>`
  position: relative;
  overflow: ${({ $isMobile }) => ($isMobile ? 'unset' : 'hidden')};
`;

const Absolute = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const MainContent = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 64px;
  height: calc(100% - ${({ $isMobile }) => ($isMobile ? '12px' : '64px')});
  width: 100%;
  padding: ${({ $isMobile }) => ($isMobile ? '12px' : '64px')} 0 0 0;
`;

const MobileContentPushedDown = styled.div`
  padding: 32px 20px 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SCENE = 'https://prod.spline.design/F6y0lrsCMuCH9jCH/scene.splinecode';
const ASPECT_RATIO = 1440 / 800;

export const Hero4 = () => {
  const { isMobile, screenWidth } = useMobile();

  return (
    <>
      <Relative $isMobile={isMobile}>
        <Render3D scene={SCENE} width={screenWidth} height={screenWidth / ASPECT_RATIO} />

        <Absolute>
          <MainContent $isMobile={isMobile}>
            <TextAndButtons />
            {!isMobile && <ProductPreview />}
          </MainContent>
        </Absolute>
      </Relative>

      {isMobile && (
        <MobileContentPushedDown>
          <ProductPreview />
        </MobileContentPushedDown>
      )}
    </>
  );
};
