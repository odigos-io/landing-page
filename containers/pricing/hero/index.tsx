'use client';
import React from 'react';
import theme from '@/style/theme';
import styled, { keyframes, css } from 'styled-components';

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

const slide = keyframes`
  0% {
    transform: translateX(-100%);
    height: 0;
  }

  1% {
    opacity: 1;
  }

  20% {
    height: 4px;
  }

  40% {
    height: 10px;
  }

  60% {
    height: 6px;
  }

  80% {
    height: 4px;
  }

  100% {
    transform: translateX(calc(100vw - 250px));
    height: 0px;
  }
`;

const slide2 = keyframes`
  0% {
    transform: translateX(-50%);
    height: 0;
  }

  1% {
    opacity: 1;
  }

  20% {
    height: 4px;
  }

  40% {
    height: 10px;
  }

  60% {
    height: 6px;
  }

  80% {
    height: 4px;
  }

  100% {
    transform: translateX(calc(100vw - 250px));
    height: 0px;
    
  }
`;

const slide3 = keyframes`
  0% {
    transform: translateX(0%);
    height: 0;
  }

  1% {
    opacity: 1;
  }

  20% {
    height: 4px;
  }

  40% {
    height: 10px;
  }

  60% {
    height: 6px;
  }

  80% {
    height: 4px;
  }

  100% {
    transform: translateX(calc(100vw - 180px));
    height: 0px;
    
  }
`;

const Span = styled.div<{ delay: number }>`
  width: 100px;
  background: rgba(249, 249, 249, 0.64);
  background: ${({ theme }) => theme.colors.white};
  opacity: 0;
  animation: ${slide} 1.5s forwards;
  ${({ delay }) =>
    delay &&
    css`
      animation-delay: ${delay}s;
    `}
`;

const Span2 = styled.div<{ delay: number }>`
  width: 200px;
  background: rgba(249, 249, 249, 0.64);
  background: ${({ theme }) => theme.colors.white};
  animation: ${slide2} 1s forwards;
  ${({ delay }) =>
    delay &&
    css`
      animation-delay: 0.5s;
    `}
`;

const Span3 = styled.div<{ delay: number }>`
  width: 150px;
  background: rgba(249, 249, 249, 0.64);
  background: ${({ theme }) => theme.colors.white};
  animation: ${slide3} 1s forwards;
  ${({ delay }) =>
    delay &&
    css`
      animation-delay: 0.3s;
    `}
`;

const PricingHero = () => {
  return (
    <PageContainer>
      <HeroTitle>Simple pricing, no surprises</HeroTitle>
      <DividersContainer>
        {[1, 2, 3, 4].map((_, key) => (
          <div key={key}>
            {key === 0 && (
              <Span className="slide-span" delay={key > 0 ? key * 0.2 : 0} />
            )}
            {key === 2 && (
              <Span2 className="slide-span" delay={key > 0 ? key * 0.2 : 0} />
            )}
            {key === 3 && (
              <Span3 className="slide-span" delay={key > 0 ? key * 0.2 : 0} />
            )}
            <Divider />
          </div>
        ))}
      </DividersContainer>
    </PageContainer>
  );
};

export default PricingHero;
