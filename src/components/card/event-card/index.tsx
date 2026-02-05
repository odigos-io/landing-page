'use client';

import React, { useMemo, useState } from 'react';
import { Card } from '..';
import type { EventPost } from '@/types';
import { formatEventDateRange, getPlaceholderImage } from '@/functions';

export const EventCard = ({ slug, image, title, eventStartDate, eventEndDate, location, booth }: EventPost) => {
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
      description={`${location ? `<strong>Location:</strong>\n${location}` : ''}\n\n${booth ? `<strong>Booth:</strong>\n${booth}` : ''}`}
      tags={eventTags}
      href={`/events/${slug}`}
    />
  );
};
