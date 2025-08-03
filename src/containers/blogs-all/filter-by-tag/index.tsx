'use client';

import React, { type Dispatch, type SetStateAction, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Button, Text } from '@/components';
import { aggregateTags } from '@/functions';
import { useBlogs, useMobile } from '@/contexts';
import { ConstrainedWrapper, FlexColumn, FlexRow, hexOpacity } from '@/styles';

interface FilterByTagProps {
  selectedTag: string;
  setSelectedTag: Dispatch<SetStateAction<string>>;
}

export const ALL_TAG = 'EXPLORE ALL';

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

export const FilterByTag = ({ selectedTag, setSelectedTag }: FilterByTagProps) => {
  const { blogs } = useBlogs();
  const { isMobile } = useMobile();
  const aggregatedTags = useMemo(() => aggregateTags(blogs), [blogs]);

  const [showMore, setShowMore] = useState(false);

  return (
    <Container $isMobile={isMobile}>
      <ConstrainedWrapper $isMobile={isMobile}>
        <FlexColumn $gap={isMobile ? 24 : 42}>
          <FlexRow $gap={isMobile ? 12 : 24} $wrap='wrap' $justify='center'>
            {[{ tag: ALL_TAG, count: blogs.length }].concat(showMore ? aggregatedTags : aggregatedTags.slice(0, isMobile ? 7 : 11)).map(({ tag, count }) => (
              <FlexRow key={tag} $gap={isMobile ? 4 : 12} $align='center' onClick={() => setSelectedTag((prev) => (prev === tag ? ALL_TAG : tag))}>
                <Tag $isMobile={isMobile} $isSelected={selectedTag === tag}>
                  {tag}
                </Tag>
                <Count $isMobile={isMobile} $isSelected={selectedTag === tag}>
                  {count}
                </Count>
              </FlexRow>
            ))}
          </FlexRow>

          <FlexRow $justify='flex-end'>
            <Button variant='transparent' rightIconSrc={`/assets/icons/${showMore ? 'minus' : 'plus'}.svg`} onClick={() => setShowMore((prev) => !prev)}>
              Show {showMore ? 'Less' : 'More'}
            </Button>
          </FlexRow>
        </FlexColumn>
      </ConstrainedWrapper>
    </Container>
  );
};
