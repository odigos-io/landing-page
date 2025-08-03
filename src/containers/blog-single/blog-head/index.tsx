'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useMobile } from '@/contexts';
import type { BlogPost } from '@/types';
import { Button, Tags } from '@/components';
import { FlexColumn, FlexRow } from '@/styles';
import { calculateReadingTime, getPlaceholderImage } from '@/functions';

interface BlogHeadProps {
  blog: BlogPost;
}

const WrapImage = styled.div<{ $isMobile: boolean }>`
  position: relative;
  width: 100%;
  height: ${({ $isMobile }) => ($isMobile ? '150px' : '250px')};
  padding: 24px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 32px;
  border: none;
  background-color: ${({ theme }) => theme.colors.black_lighter};
  overflow: hidden;
`;

const Title = styled.h1<{ $isMobile: boolean }>`
  color: ${({ theme }) => theme.colors.off_white};
  font-size: ${({ $isMobile }) => ($isMobile ? '40px' : '64px')};
  font-weight: 600;
  line-height: 110%;
`;

export const BlogHead = ({ blog }: BlogHeadProps) => {
  const { isMobile } = useMobile();

  const [image, setImage] = useState(blog.image || '');
  const [imageInvalid, setImageInvalid] = useState(false);

  useEffect(() => {
    if (imageInvalid) {
      setImage(getPlaceholderImage());
    } else {
      setImage(blog.image || '');
    }
  }, [imageInvalid, blog.image]);

  const [tags, setTags] = useState<string[]>([]);
  const [indexesOfBoldTags, setIndexesOfBoldTags] = useState<number[]>([]);

  useEffect(() => {
    const arr = [];

    if (blog.content) arr.push(calculateReadingTime(blog.content));
    if (blog.pubDate) arr.push(new Date(blog.pubDate).toDateString());
    if (blog.boldTag) {
      arr.push(blog.boldTag);
      setIndexesOfBoldTags([arr.length - 1]);
    }
    arr.push(...(blog.tags || []));

    setTags(arr);
  }, [blog.content, blog.pubDate, blog.boldTag, blog.tags]);

  return (
    <FlexColumn $gap={32}>
      <WrapImage $isMobile={isMobile}>
        <Image suppressHydrationWarning src={image} alt={blog.title} fill objectFit='cover' objectPosition='center' onError={() => setImageInvalid(true)} />
      </WrapImage>

      <Title $isMobile={isMobile}>{blog.title}</Title>

      <FlexRow $gap={32} $align='center'>
        <Tags tags={tags} indexesOfBoldTags={indexesOfBoldTags} fontSize={isMobile ? 12 : 16} doNotPushToBottom />
        {blog.buttonText && blog.buttonLink && <Button href={blog.buttonLink}>{blog.buttonText}</Button>}
      </FlexRow>
    </FlexColumn>
  );
};
