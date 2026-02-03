'use client';

import React from 'react';
import { useMobile } from '@/contexts';
import styled from 'styled-components';
import type { EventPost } from '@/types';
import { getPlaceholderImage } from '@/functions';
import { BannerImage, Render3D } from '@/components';

interface EventHeaderProps {
  event: EventPost;
}

const Relative = styled.div`
  position: relative;
`;

const Absolute = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: -1;
`;

const DEFAULT_EVENT_IMAGE = getPlaceholderImage();
const SCENE = 'https://prod.spline.design/8ms3ev7XsGwJPjy0/scene.splinecode';
const ASPECT_RATIO = 1440 / 460;

export const EventHeader = ({ event }: EventHeaderProps) => {
  const { isMobile, screenWidth } = useMobile();

  return (
    <Relative>
      <BannerImage src={event.image || ''} alt={event.title} fallbackImage={DEFAULT_EVENT_IMAGE} />
    </Relative>
  );
};
