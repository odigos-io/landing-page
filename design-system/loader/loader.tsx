import React from 'react';
import { StyledLoader, LoaderWrapper } from './loader.styled';

interface LoaderProps {
  width?: number;
  height?: number;
}

export function Loader({ width, height }: LoaderProps) {
  return (
    <LoaderWrapper>
      <StyledLoader width={width} height={height} />
    </LoaderWrapper>
  );
}
