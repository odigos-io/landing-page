'use client';

import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useMobile } from '@/contexts';
import type { BlogPost } from '@/types';
import { Button, Text } from '@/components';
import { aggregateTags } from '@/functions';
import { ALL_TAG, useFilterStore } from '@/store';
import { ConstrainedWrapper, FlexColumn, FlexRow, hexOpacity } from '@/styles';

const Container = styled.div<{ $isMobile: boolean }>`
  background-color: ${({ theme }) => theme.colors.black_lighter};
`;

const Tag = styled(Text)<{ $isMobile: boolean; $isSelected: boolean }>`
  text-transform: uppercase;
  text-decoration: underline;
  font-weight: 500;
  font-size: ${({ $isMobile }) => ($isMobile ? '16px' : '20px')};
  color: ${({ $isSelected, theme }) => ($isSelected ? theme.colors.white : theme.colors.grey + hexOpacity['075'])};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;

const Count = styled(Text)<{ $isMobile: boolean; $isSelected: boolean }>`
  font-weight: 500;
  font-size: ${({ $isMobile }) => ($isMobile ? '10px' : '14px')};
  color: ${({ $isSelected, theme }) => ($isSelected ? theme.colors.white : theme.colors.grey + hexOpacity['075'])};
`;

export const FilterByTag = ({ blogs }: { blogs: BlogPost[] }) => {
  const { isMobile } = useMobile();
  const { filterByTag, setFilterByTag } = useFilterStore();

  const [showMore, setShowMore] = useState(false);
  const aggregatedTags = useMemo(() => aggregateTags(blogs), [blogs]);

  useEffect(() => {
    return () => setFilterByTag(ALL_TAG);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container $isMobile={isMobile}>
      <ConstrainedWrapper $isMobile={isMobile} $paddingTop={24} $paddingBottom={24}>
        <FlexColumn $gap={12}>
          <FlexRow $gap={isMobile ? 12 : 24} $wrap='wrap' $justify='center'>
            {[{ tag: ALL_TAG, count: blogs.length }].concat(showMore ? aggregatedTags : aggregatedTags.slice(0, isMobile ? 3 : 4)).map(({ tag, count }) => (
              <FlexRow key={tag} $gap={isMobile ? 4 : 12} $align='center' onClick={() => setFilterByTag(filterByTag === tag ? ALL_TAG : tag)}>
                <Tag $isMobile={isMobile} $isSelected={filterByTag === tag}>
                  {tag}
                </Tag>
                <Count $isMobile={isMobile} $isSelected={filterByTag === tag}>
                  {count}
                </Count>
              </FlexRow>
            ))}

            <Button variant='transparent' rightIconSrc={`/assets/icons/${showMore ? 'minus' : 'plus'}.svg`} padding='0' onClick={() => setShowMore((prev) => !prev)}>
              Show {showMore ? 'Less' : 'More'}
            </Button>
          </FlexRow>
        </FlexColumn>
      </ConstrainedWrapper>
    </Container>
  );
};
