'use client';
import React, { useState } from 'react';
import theme from '@/style/theme';
import styled from 'styled-components';
import { FlexContainer, MaxWidthContainer } from '@/style';
import useIsMobile from '@/hooks/useIsMobile';
import { Text, UnderlineText, LazyImage } from '@/reuseable-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1440px;
  padding: 120px 64px;
  @media (max-width: 800px) {
    padding: 40px 20px;
  }
`;

const TagsContainer = styled.div<{ expanded: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 32px 48px;
  max-height: ${(props) => (props.expanded ? 'none' : 'calc(2 * 48px + 32px)')};
  overflow: hidden;
  transition: max-height 0.5s ease;
  @media (max-width: 800px) {
    max-height: ${(props) =>
      props.expanded ? 'none' : 'calc(4 * 48px + 32px)'};
  }
`;

const ExpandButton = styled.button`
  align-self: center;
  background: ${theme.colors.primary};
  color: ${theme.colors.secondary};
  border: none;
  cursor: pointer;
  font-size: 18px;
  :hover {
    text-decoration: underline;
  }
`;

const ExpandButtonWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  gap: 8px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const NavItem = styled.div<{ selected?: boolean }>`
  position: relative;
  display: flex;
  align-items: end;
  gap: 8px;
  opacity: ${({ selected }) => (selected ? 1 : 0.4)};
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.64;
  }
  &.group {
    cursor: pointer;
  }
`;

const BlogFilter = ({ posts, selectedItems, setSelectedItems }) => {
  const [expanded, setExpanded] = useState(false);

  const handleTagClick = (tag) => {
    if (tag === 'EXPLORE ALL') {
      if (selectedItems.includes('EXPLORE ALL')) {
        setSelectedItems([]);
      } else {
        setSelectedItems(['EXPLORE ALL', ...Object.keys(tagCounts)]);
      }
    } else {
      if (selectedItems.includes(tag)) {
        setSelectedItems(selectedItems.filter((item) => item !== tag));
      } else {
        setSelectedItems([...selectedItems, tag]);
      }
    }
  };

  // Function to group tags
  const groupTags = (posts) => {
    const tagCount = {};
    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        if (tagCount[tag]) {
          tagCount[tag] += 1;
        } else {
          tagCount[tag] = 1;
        }
      });
    });
    return tagCount;
  };

  const tagCounts = groupTags(posts);
  const isMobile = useIsMobile();

  return (
    <MaxWidthContainer style={{ background: theme.colors.primary }}>
      <PageContainer>
        <TagsContainer expanded={expanded}>
          <FlexContainer
            onClick={() => handleTagClick('EXPLORE ALL')}
            alignments="flex-end"
            key="explore-all"
            gap={12}
            style={{ cursor: 'pointer' }}
          >
            <NavItem
              selected={
                selectedItems.includes('EXPLORE ALL') ||
                Object.keys(tagCounts).length === selectedItems.length
              }
            >
              <UnderlineText size={isMobile ? 20 : 32}>
                EXPLORE ALL
              </UnderlineText>
              <div style={{ paddingBottom: 4 }}>
                <Text
                  color={
                    selectedItems.includes('EXPLORE ALL')
                      ? theme.text.off_white
                      : 'rgba(249, 249, 249, 0.32)'
                  }
                  fontFam={theme.font_family.secondary}
                  size={14}
                >
                  {posts.length}
                </Text>
              </div>
            </NavItem>
          </FlexContainer>
          {Object.keys(tagCounts).map((tag) => (
            <FlexContainer
              onClick={() => handleTagClick(tag)}
              alignments="flex-end"
              key={tag}
              gap={12}
              style={{ cursor: 'pointer' }}
            >
              <NavItem selected={selectedItems.includes(tag)}>
                <UnderlineText size={isMobile ? 20 : 32}>{tag}</UnderlineText>
                <div style={{ paddingBottom: 4 }}>
                  <Text fontFam={theme.font_family.secondary} size={14}>
                    {tagCounts[tag]}
                  </Text>
                </div>
              </NavItem>
            </FlexContainer>
          ))}
        </TagsContainer>
        <ExpandButtonWrapper>
          <LazyImage
            src="/icons/common/expand.svg"
            width={15}
            height={15}
            alt="arrow"
            style={{ transform: !expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
          <ExpandButton onClick={() => setExpanded(!expanded)}>
            <Text
              color={theme.text.off_white}
              fontFam={theme.font_family.secondary}
              size={14}
            >
              {expanded ? 'Show Less' : 'Show More'}
            </Text>
          </ExpandButton>
        </ExpandButtonWrapper>
      </PageContainer>
    </MaxWidthContainer>
  );
};

export default BlogFilter;
