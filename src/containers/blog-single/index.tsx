'use client';

import React from 'react';
import { useMobile } from '@/contexts';
import { BlogHead } from './blog-head';
import type { BlogPost } from '@/types';
import { SocialButtons } from './social-buttons';
import styled, { useTheme } from 'styled-components';
import MarkdownPreview from '@uiw/react-markdown-preview';
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
  const theme = useTheme();
  const { isMobile } = useMobile();

  return (
    <ConstrainedWrapper $isMobile={isMobile}>
      <FlexColumn $gap={isMobile ? 32 : 64}>
        <BlogHead blog={blog} />

        <div>
          <MarkdownPreview
            source={blog.content}
            style={{
              background: theme.colors.black,
              color: theme.colors.off_white,
            }}
          />
        </div>

        <Divider />
        <SocialButtons slug={blog.slug} />
      </FlexColumn>
    </ConstrainedWrapper>
  );
};
