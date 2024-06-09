'use client';
import React from 'react';
import { SectionContainer } from '@/style';
import { Button, UnderlineText } from '@/reuseable-components';
import styled from 'styled-components';
import LearnMoreList from '@/components/learn-more-list';
const Container = styled(SectionContainer)`
  height: auto;
  display: block;
  @media (max-width: 1000px) {
    padding: 64px 20px;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 40px;
  padding: 0px 64px 0px 64px;
  @media (max-width: 1000px) {
    padding: 0px 20px;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: 56px;
  font-weight: 300;
  line-height: 130%;
  @media (max-width: 1000px) {
    font-size: 28px;
  }
`;

const ShowAllButton = styled(Button)`
  background: ${({ theme }) => theme.colors.secondary};
  width: 160px;
  @media (max-width: 1000px) {
    display: none;
  }
`;

const Blog = async () => {
  return (
    <>
      <HeaderWrapper>
        <TitleWrapper>
          <Title>Need text here</Title>
          <div>
            <ShowAllButton>
              <UnderlineText>SHOW ALL</UnderlineText>
            </ShowAllButton>
          </div>
        </TitleWrapper>
      </HeaderWrapper>
      <Container>
        <LearnMoreList />
      </Container>
    </>
  );
};

export default Blog;
