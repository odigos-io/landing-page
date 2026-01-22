'use client';

import React, { useEffect, useState, Component, ReactNode } from 'react';
import { useOnScreen, useWebGLSupport } from '@/hooks';
import styled from 'styled-components';
import dynamic from 'next/dynamic';

// Dynamically import Spline with no SSR and loading disabled
// This prevents Spline from blocking initial page load
const SplineDynamic = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => null,
});

interface Render3DProps {
  scene: string;
  width: number;
  height: number;
  fallback?: ReactNode;
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

// Error boundary to catch any Spline runtime errors silently
interface ErrorBoundaryState {
  hasError: boolean;
}

class SplineErrorBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch() {
    // Silently catch the error - no console logging to keep it "quiet"
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

export const Render3D = ({ scene, width, height, fallback }: Render3DProps) => {
  const webGLSupported = useWebGLSupport();
  const { visibleRef, isVisible } = useOnScreen<HTMLDivElement>(undefined, '512px');
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Only attempt to render if visible and WebGL is supported
    if (isVisible && webGLSupported) {
      setShouldRender(true);
    }
  }, [isVisible, webGLSupported]);

  return (
    <Container ref={visibleRef} $width={width} $height={height}>
      {scene && shouldRender ? (
        <SplineErrorBoundary fallback={fallback}>
          <SplineDynamic scene={scene} renderOnDemand={true} />
        </SplineErrorBoundary>
      ) : (
        fallback || null
      )}
    </Container>
  );
};
