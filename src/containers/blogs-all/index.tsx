'use client';

import React from 'react';
import styled from 'styled-components';
import { BlogCard, Text } from '@/components';
import { FilterByTag } from './filter-by-tag';
import { useBlogs, useMobile } from '@/contexts';
import { ALL_TAG, useFilterStore } from '@/store';
import { ConstrainedWrapper, FlexRow } from '@/styles';

const Title = styled(Text)<{ $isMobile: boolean }>`
  max-width: ${({ $isMobile }) => ($isMobile ? 'unset' : '50vw')};
  font-size: ${({ $isMobile }) => ($isMobile ? '40px' : '64px')};
  font-weight: 600;
  line-height: 110%;
  letter-spacing: ${({ $isMobile }) => ($isMobile ? '-0.8px' : '-1.28px')};
`;

export const BlogsAll = () => {
  const { blogs } = useBlogs();
  const { isMobile } = useMobile();
  const { filterByTag } = useFilterStore();
  const filteredBlogs = blogs.filter((blog) => filterByTag === ALL_TAG || blog.tags?.includes(filterByTag));

  return (
    <div>
      <ConstrainedWrapper $isMobile={isMobile} $paddingTop={isMobile ? 64 : 128}>
        <Title $isMobile={isMobile}>Discover our latest articles and insights.</Title>
      </ConstrainedWrapper>

      <FilterByTag blogs={blogs} />

      <ConstrainedWrapper $isMobile={isMobile}>
        <FlexRow $gap={12} $wrap='wrap' $justify='center'>
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog.slug} {...blog} />
          ))}
        </FlexRow>
      </ConstrainedWrapper>
    </div>
  );
};
