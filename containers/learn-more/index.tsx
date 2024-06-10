'use client';
import React from 'react';
import { SectionContainer } from '@/style';
import { Button, SectionTitle, UnderlineText } from '@/reuseable-components';
import styled from 'styled-components';
import LearnMoreList from '@/components/learn-more-list';
import Link from 'next/link';
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

const MobileButtonWrapper = styled.div`
  display: none;
  @media (max-width: 1000px) {
    display: flex;
    margin-top: 40px;
  }
`;

const MobileShowAllButton = styled(Button)`
  display: none;
  background: ${({ theme }) => theme.colors.secondary};
  @media (max-width: 1000px) {
    display: flex;
  }
`;

const SectionTitleWrapper = styled.div`
  padding: 0px 64px 40px 64px;
  @media (max-width: 1000px) {
    padding: 24px 20px;
  }
`;

const DesktopDiv = styled.div`
  display: flex;
  @media (max-width: 1000px) {
    display: none;
  }
`;

const Blog = () => {
  return (
    <>
      <SectionTitleWrapper>
        <SectionTitle
          headerInfo={{ title: 'LEARN MORE', subtitle: '', description: '' }}
        />
      </SectionTitleWrapper>
      <HeaderWrapper>
        <TitleWrapper>
          <Title>Need text here</Title>
          <DesktopDiv>
            <Link legacyBehavior href={'/blog'}>
              <ShowAllButton>
                <UnderlineText size={20}>SHOW ALL</UnderlineText>
              </ShowAllButton>
            </Link>
          </DesktopDiv>
        </TitleWrapper>
      </HeaderWrapper>
      <Container>
        <LearnMoreList />
        <MobileButtonWrapper>
          <Link legacyBehavior href={'/blog'}>
            <MobileShowAllButton>
              <UnderlineText size={16}>SHOW ALL</UnderlineText>
            </MobileShowAllButton>
          </Link>
        </MobileButtonWrapper>
      </Container>
    </>
  );
};

export default Blog;
