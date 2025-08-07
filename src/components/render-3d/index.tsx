'use client';

import React from 'react';
import { useOnScreen } from '@/hooks';
import styled from 'styled-components';
import Spline from '@splinetool/react-spline';

interface Render3DProps {
  scene: string;
  width: number;
  height: number;
}

const Container = styled.div<{ $width: number; $height: number }>`
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;

  & > div {
    width: ${({ $width }) => $width}px;
    height: ${({ $height }) => $height}px;

    & > canvas {
      width: ${({ $width }) => $width}px !important;
      height: ${({ $height }) => $height}px !important;
    }
  }
`;

export const Render3D = ({ scene, width, height }: Render3DProps) => {
  const { visibleRef, isVisible } = useOnScreen<HTMLDivElement>();

  return (
    <Container ref={visibleRef} $width={width} $height={height}>
      {/*
        !! renderOnDemand={false} is important to prevent WebGL errors, for example:
        "WebGL: INVALID_FRAMEBUFFER_OPERATION: Framebuffer is incomplete: Attachment has zero size."
      */}
      {scene && isVisible && <Spline scene={scene} renderOnDemand={false} />}
    </Container>
  );
};
