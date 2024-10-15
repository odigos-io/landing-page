'use client';
import React from 'react';
import theme from '@/style/theme';
import styled from 'styled-components';
import TextHero from '@/components/text-hero';
import { MaxWidthContainer } from '@/style';
import { useAnnouncementStore } from '@/store/announcementStore';

const PageContainer = styled.div<{ largePadding: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 80px;
  background: ${theme.colors.secondary};
  padding: 160px 64px 64px;
  width: 100%;
  max-width: 1440px;
  @media (max-width: 800px) {
    padding: 24px 20px;
  }
  @media (max-width: 600px) {
    padding-top: ${({ largePadding }) => (largePadding ? '200px' : '84px')};
    gap: 32px;
  }
`;

const BlogHero = () => {
  const { isOpen } = useAnnouncementStore();
  return (
    <MaxWidthContainer>
      <PageContainer largePadding={isOpen}>
        <TextHero text="Discover our latest articles and insights." />
      </PageContainer>
    </MaxWidthContainer>
  );
};

export default BlogHero;
