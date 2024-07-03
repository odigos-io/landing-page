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
  padding: 160px 64px 120px 64px;
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
    <PageContainer>
      <TextHero text="Simple pricing, no surprises" />
    </PageContainer>
  );
};

export default PricingHero;
