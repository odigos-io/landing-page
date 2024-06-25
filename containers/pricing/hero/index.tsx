'use client';
import React from 'react';
import theme from '@/style/theme';
import styled from 'styled-components';

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

const HeroTitle = styled.h1`
  color: ${({ theme }) => theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: clamp(3.5rem, 6vw, 6rem);
  font-weight: 400;
  line-height: 110%;
  letter-spacing: -1.92px;
  @media (max-width: 600px) {
    letter-spacing: -1.12px;
  }
`;

const DividersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
  width: 100%;
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: rgba(249, 249, 249, 0.64);
`;

const PricingHero = () => {
  return (
    <PageContainer>
      <HeroTitle>Simple pricing, no surprises</HeroTitle>
      <DividersContainer>
        {[1, 2, 3, 4].map((_, key) => (
          <Divider key={key} />
        ))}
      </DividersContainer>
    </PageContainer>
  );
};

export default PricingHero;
