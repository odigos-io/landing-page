'use client';

import React from 'react';
import styled from 'styled-components';
import { useMobile } from '@/contexts';
import { Render3D } from '@/components';
import { ProductPreview } from '../product-preview';
import { TextAndButtons } from './text-and-buttons';
import { ConstrainedWrapper } from '@/styles';

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

const DesktopContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 200px;
  height: 85%;
  width: 100%;
`;

const MobileContent = styled.div`
  padding: 24px 20px 40px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SCENE = 'https://prod.spline.design/6CWMZMloAJo3I3Z3/scene.splinecode';
const ASPECT_RATIO = 1440 / 710;

export const Hero1 = () => {
  const { isMobile, screenWidth } = useMobile();

  return (
    <>
      <Relative>
        <Render3D scene={SCENE} width={screenWidth} height={screenWidth / ASPECT_RATIO} />

        <Absolute>
          {!isMobile ? (
            <ConstrainedWrapper $isMobile={isMobile}>
              <DesktopContent>
                <TextAndButtons width={500} />
                <ProductPreview />
              </DesktopContent>
            </ConstrainedWrapper>
          ) : (
            <MobileContent>
              <ProductPreview />
            </MobileContent>
          )}
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
