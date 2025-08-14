'use client';

import React from 'react';
import { useMobile } from '@/contexts';
import { Render3D } from '@/components';

const SCENE = 'https://prod.spline.design/RChqtOgxTvYt3a4t/scene.splinecode';
const ASPECT_RATIO = 1440 / 600;

const SCENE_MOBILE = 'https://prod.spline.design/q2bYtVXGW-fTHb-h/scene.splinecode';
const ASPECT_RATIO_MOBILE = 375 / 340;

export const Hero2 = () => {
  const { isMobile, screenWidth } = useMobile();

  if (isMobile) {
    return <Render3D scene={SCENE_MOBILE} width={screenWidth} height={screenWidth / ASPECT_RATIO_MOBILE} />;
  }

  return <Render3D scene={SCENE} width={screenWidth} height={screenWidth / ASPECT_RATIO} />;
};
