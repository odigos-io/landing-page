'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useMobile } from '@/contexts';
import type { BlogPost } from '@/types';
import { FlexColumn, FlexRow } from '@/styles';
import { Button, Tags, Text } from '@/components';
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
  margin: 0;
`;

const DEFAULT_AUTHOR_IMAGE = '/assets/odigos/logo_white_filled.svg';
const DEFAULT_BLOG_IMAGE = getPlaceholderImage();

export const BlogHead = ({ blog }: BlogHeadProps) => {
  const { isMobile } = useMobile();

  const [authorImage, setAuthorImage] = useState(blog.authorImage || DEFAULT_AUTHOR_IMAGE);
  const [authorImageInvalid, setAuthorImageInvalid] = useState(false);

  useEffect(() => {
    if (authorImageInvalid) {
      setAuthorImage(DEFAULT_AUTHOR_IMAGE);
    } else {
      setAuthorImage(blog.authorImage || DEFAULT_AUTHOR_IMAGE);
    }
  }, [authorImageInvalid, blog.authorImage]);

  const [blogImage, setBlogImage] = useState(blog.image || DEFAULT_BLOG_IMAGE);
  const [blogImageInvalid, setBlogImageInvalid] = useState(false);

  useEffect(() => {
    if (blogImageInvalid) {
      setBlogImage(DEFAULT_BLOG_IMAGE);
    } else {
      setBlogImage(blog.image || DEFAULT_BLOG_IMAGE);
    }
  }, [blogImageInvalid, blog.image]);

  const [tags, setTags] = useState<string[]>([]);
  const [indexesOfBoldTags, setIndexesOfBoldTags] = useState<number[]>([]);

  useEffect(() => {
    const arr = [];

    if (blog.boldTag) {
      arr.push(blog.boldTag);
      setIndexesOfBoldTags([arr.length - 1]);
    }

    arr.push(...(blog.tags || []));

    if (!arr.length) {
      arr.push('odigos');
    }

    setTags(arr);
  }, [blog.content, blog.pubDate, blog.boldTag, blog.tags]);

  return (
    <FlexColumn $gap={isMobile ? 24 : 32}>
      <WrapImage $isMobile={isMobile}>
        <Image
          suppressHydrationWarning
          src={blogImage}
          alt={blog.title}
          priority
          fill
          sizes='(max-width: 992px) 100vw, 1080px'
          onError={() => setBlogImageInvalid(true)}
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </WrapImage>
      <Title $isMobile={isMobile}>{blog.title}</Title>
      <FlexRow $gap={12} $align='center'>
        <Image
          src={authorImage}
          alt={blog.author || 'Odigos'}
          width={42}
          height={42}
          onError={() => setAuthorImageInvalid(true)}
          style={{
            borderRadius: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
        <FlexColumn $gap={4}>
          <Text>{blog.author || 'Odigos'}</Text>
          <FlexRow $gap={6} $align='center'>
            <Text fontSize={12}>{new Date(blog.pubDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</Text>
            <Text fontSize={12}>|</Text>
            <Text fontSize={12}>{calculateReadingTime(blog.content || '')}</Text>
          </FlexRow>
        </FlexColumn>
      </FlexRow>
      <FlexRow $gap={32} $align='center'>
        <Tags tags={tags} indexesOfBoldTags={indexesOfBoldTags} fontSize={isMobile ? 12 : 16} doNotPushToBottom />
        {blog.buttonText && blog.buttonLink && <Button href={blog.buttonLink}>{blog.buttonText}</Button>}
      </FlexRow>
    </FlexColumn>
  );
};
