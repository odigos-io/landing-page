'use client';

import React from 'react';
import styled from 'styled-components';
import type { WebinarPost } from '@/types';
import { getPlaceholderImage } from '@/functions';
import { BannerImage } from '@/components';

interface WebinarHeaderProps {
  webinar: WebinarPost;
}

const Relative = styled.div`
  position: relative;
`;

const DEFAULT_WEBINAR_IMAGE = getPlaceholderImage();

export const WebinarHeader = ({ webinar }: WebinarHeaderProps) => {
  return (
    <Relative>
      <BannerImage src={webinar.image || ''} alt={webinar.title} fallbackImage={DEFAULT_WEBINAR_IMAGE} />
    </Relative>
  );
};
