'use client';

import React from 'react';
import styled from 'styled-components';
import { useMobile } from '@/contexts';
import { BlogHead } from './blog-head';
import type { BlogPost } from '@/types';
import { MarkdownPreview } from '@/components';
import { SocialButtons } from './social-buttons';
import { ConstrainedWrapper, FlexColumn } from '@/styles';

interface BlogSingleProps {
  blog: BlogPost;
}

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.grey};
`;

export const BlogSingle = ({ blog }: BlogSingleProps) => {
  const { isMobile } = useMobile();

  return (
    <ConstrainedWrapper $isMobile={isMobile}>
      <FlexColumn $gap={isMobile ? 32 : 64}>
        <BlogHead blog={blog} />
        <MarkdownPreview content={blog.content} />
        <Divider />
        <SocialButtons slug={blog.slug} />
      </FlexColumn>
    </ConstrainedWrapper>
  );
};
