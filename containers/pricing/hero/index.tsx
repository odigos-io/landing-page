'use client';
import React from 'react';
import theme from '@/style/theme';
import styled from 'styled-components';
import TextHero from '@/components/text-hero';
import { MaxWidthContainer } from '@/style';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
  width: 100%;
  max-width: 1440px;
  background: ${theme.colors.secondary};
  padding: 160px 64px;
  @media (max-width: 800px) {
    padding: 24px 20px;
  }
  @media (max-width: 600px) {
    padding-top: 84px;
    gap: 32px;
  }
`;

const PricingHero = () => {
  return (
    <MaxWidthContainer>
      <PageContainer>
        <TextHero text="Simple pricing, no surprises" />
      </PageContainer>
    </MaxWidthContainer>
  );
};

export default PricingHero;
