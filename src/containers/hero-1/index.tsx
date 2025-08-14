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

const DesktopContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 128px;
  height: 85%;
  width: 100%;
  margin-top: 50px;
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
  const divider = isMobile ? 0.75 : 1.2;

  return (
    <>
      <Relative>
        <Render3D scene={SCENE} width={screenWidth / divider} height={screenWidth / ASPECT_RATIO / divider} />

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
