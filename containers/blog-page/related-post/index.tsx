'use client';
import React from 'react';
import theme from '@/style/theme';
import styled from 'styled-components';
import BlogItem from '@/components/Blog/BlogItem';
import { SectionTitle } from '@/reuseable-components';
import { ColumnContainer, SectionContainer } from '@/style';

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7.5 xl:gap-10">
          {posts.length > 0 &&
            getRandomItemsFromArray(posts, 3).map((post, key) => (
              <BlogItem key={key} blog={post} />
            ))}
        </div>
      </PageBody>
    </Container>
  );
};

export default RelatedPosts;
