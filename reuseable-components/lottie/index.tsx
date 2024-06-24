'use client';
import React from 'react';
import Lottie from 'react-lottie';
import { Options } from 'react-lottie';

interface LottieAnimationProps {
  animationData: any;
  loop?: boolean;
  autoplay?: boolean;
  height?: number | string;
  width?: number | string;
}

export const LottieAnimation: React.FC<LottieAnimationProps> = ({
  animationData,
  loop = true,
  autoplay = true,
  height = '100%',
  width = '100%',
}) => {
  const defaultOptions: Options = {
    loop,
    autoplay,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return <Lottie options={defaultOptions} height={height} width={width} />;
};
