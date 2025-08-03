'use client';

import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { BlogCard, Text } from '@/components';
import { useBlogs, useMobile } from '@/contexts';
import { ConstrainedWrapper, FlexRow } from '@/styles';
import { ALL_TAG, FilterByTag } from './filter-by-tag';

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
  const [selectedTag, setSelectedTag] = useState(ALL_TAG);

  const filteredBlogs = useMemo(() => blogs.filter((blog) => selectedTag === ALL_TAG || blog.tags?.includes(selectedTag)), [blogs, selectedTag]);

  return (
    <div>
      <ConstrainedWrapper $isMobile={isMobile} $paddingTop={isMobile ? 64 : 128}>
        <Title $isMobile={isMobile}>Discover our latest articles and insights.</Title>
      </ConstrainedWrapper>

      <FilterByTag selectedTag={selectedTag} setSelectedTag={setSelectedTag} />

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
