'use client';
import React from 'react';
import theme from '@/style/theme';
import styled from 'styled-components';
import BlogItem from '@/components/blog/BlogItem';
import { SectionTitle } from '@/reuseable-components';
import { ColumnContainer, GridContainer, SectionContainer } from '@/style';

const Container = styled(SectionContainer)`
  height: auto;
  padding: 160px 64px;
  @media (max-width: 800px) {
    padding: 80px 20px;
  }
`;

const PageBody = styled(ColumnContainer)`
  max-width: fit-content;
`;

const TitleWrapper = styled.div`
  margin-top: 40px;
  margin-bottom: 80px;
  @media (max-width: 800px) {
    margin-bottom: 64px;
  }
`;

const PageTitle = styled.span`
  color: ${theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: 56px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
  @media (max-width: 800px) {
    font-size: 28px;
  }
`;

const BlogGridWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const BlogGrid = styled(GridContainer)`
  width: 80%;
  @media (max-width: 1300px) {
    width: 100%;
  }
  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const BlogGridItem = styled.div`
  min-width: 320px;
  @media (max-width: 1100px) {
    flex: 1 1 100%;
    max-width: 100%;
  }
`;

const RelatedPosts = ({ posts }) => {
  function getRandomItemsFromArray(originalArray, numItems) {
    if (numItems >= originalArray.length) {
      return originalArray.slice(); // Return a shallow copy of the original array if numItems is greater or equal to the array's length
    }

    const shuffledArray = originalArray.slice().sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, numItems);
  }

  return (
    <Container
      justify={'flex-start'}
      alignments={'flex-start'}
      background={theme.colors.primary}
    >
      <PageBody>
        <SectionTitle
          headerInfo={{
            title: 'LEARN MORE',
            subtitle: '',
            description: '',
          }}
        />
        <TitleWrapper>
          <PageTitle>Related articles</PageTitle>
        </TitleWrapper>
        <BlogGridWrapper>
          <BlogGrid gap={24}>
            {posts.length > 0 &&
              getRandomItemsFromArray(posts, 3).map((blog, key) => (
                <BlogGridItem key={key}>
                  <BlogItem blog={blog} />
                </BlogGridItem>
              ))}
          </BlogGrid>
        </BlogGridWrapper>
      </PageBody>
    </Container>
  );
};

export default RelatedPosts;
