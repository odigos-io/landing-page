'use client';

import React from 'react';
import styled from 'styled-components';
import { useBlogs, useMobile } from '@/contexts';
import { BlogCard, Button, TextLayers } from '@/components';
import { ConstrainedWrapper, FlexColumn, FlexRow } from '@/styles';

interface LearnMoreBlogsProps {
  title?: string;
}

const CardsContainer = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  align-items: ${({ $isMobile }) => ($isMobile ? 'center' : 'flex-start')};
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
`;

export const LearnMoreBlogs = ({ title = 'Discover Latest Blog Posts' }: LearnMoreBlogsProps) => {
  const { blogs } = useBlogs();
  const { isMobile } = useMobile();

  return (
    <ConstrainedWrapper $isMobile={isMobile} $paddingTop={isMobile ? 64 : 128}>
      <FlexColumn $gap={isMobile ? 32 : 64}>
        <TextLayers
          miniTitle='LEARN MORE'
          title={title}
          titleSettings={{
            largeTitle: true,
          }}
        />

        <CardsContainer $isMobile={isMobile}>
          {blogs.slice(0, 3).map((blog) => (
            <BlogCard key={blog.slug} {...blog} />
          ))}
        </CardsContainer>

        <FlexRow $fullWidth $align='center' $justify='center'>
          <Button rightIconSrc='/assets/icons/arrow.svg' href='/blog'>
            Show All
          </Button>
        </FlexRow>
      </FlexColumn>
    </ConstrainedWrapper>
  );
};
