'use client';
import React from 'react';
import theme from '@/style/theme';
import styled from 'styled-components';
import TextHero from '@/components/text-hero';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
  background: ${theme.colors.secondary};
  padding: 160px 64px 64px 64px;
  @media (max-width: 800px) {
    padding: 24px 20px;
    padding-top: 160px;
  }
  @media (max-width: 600px) {
    gap: 32px;
  }
`;

const BlogHero = () => {
  return (
    <PageContainer>
      <TextHero text="Discover our latest articles and insights." />
    </PageContainer>
  );
};

export default BlogHero;
