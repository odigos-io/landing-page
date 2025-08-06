'use client';

import React from 'react';
import { useMobile } from '@/contexts';
import { Render3D } from '@/components';

const SCENE = 'https://prod.spline.design/72Op65NkGH8lFzOm/scene.splinecode';
const ASPECT_RATIO = 1440 / 600;

export const Hero2 = () => {
  const { screenWidth } = useMobile();

  return <Render3D scene={SCENE} width={screenWidth} height={screenWidth / ASPECT_RATIO} />;
};
