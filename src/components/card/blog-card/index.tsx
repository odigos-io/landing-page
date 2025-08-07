'use client';

import React, { useMemo, useState } from 'react';
import { Card } from '..';
import type { BlogPost } from '@/types';
import { calculateReadingTime, getPlaceholderImage } from '@/functions';

export const BlogCard = ({ slug, image, title, description, content, pubDate, boldTag }: BlogPost) => {
  const [imageInvalid, setImageInvalid] = useState(false);
  const blogCover = (!imageInvalid && image) || getPlaceholderImage();

  const blogTags = useMemo(() => {
    const arr = [];

    if (content) arr.push(calculateReadingTime(content));
    if (pubDate) arr.push(new Date(pubDate).toDateString());
    if (boldTag) arr.push(boldTag);

    return arr;
  }, [content, pubDate, boldTag]);

  return (
    <Card
      image={blogCover}
      onImageError={() => setImageInvalid(true)}
      title={title}
      description={description.substring(0, 200) + (description.length > 200 ? '...' : '')}
      tags={blogTags}
      indexesOfBoldTags={!!boldTag ? [blogTags.length - 1] : undefined}
      href={`/blog/${slug}`}
    />
  );
};
