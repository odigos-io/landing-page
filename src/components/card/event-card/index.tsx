'use client';

import React, { useMemo, useState } from 'react';
import { Card } from '..';
import type { EventPost } from '@/types';
import { formatEventDateRange, getPlaceholderImage } from '@/functions';

export const EventCard = ({ slug, image, title, content = '', eventStartDate, eventEndDate }: EventPost) => {
  const [imageInvalid, setImageInvalid] = useState(false);
  const eventCover = (!imageInvalid && image) || getPlaceholderImage();

  const eventTags = useMemo(() => {
    const arr = [];

    arr.push(formatEventDateRange(eventStartDate, eventEndDate));

    return arr;
  }, [eventStartDate, eventEndDate]);

  return (
    <Card
      image={eventCover}
      onImageError={() => setImageInvalid(true)}
      title={title}
      description={content.substring(0, 200) + (content.length > 200 ? '...' : '')}
      tags={eventTags}
      href={`/event/${slug}`}
    />
  );
};
