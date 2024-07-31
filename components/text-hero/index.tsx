'use client';
import React from 'react';
import styled, { keyframes, css } from 'styled-components';

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
  gap: 48px;
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
  position: absolute;
  top: -5px;
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
  position: absolute;
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
  position: absolute;
  top: -5px;
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

interface TextHeroProps {
  text: string;
}

const TextHero = ({ text }: TextHeroProps) => {
  return (
    <>
      <HeroTitle>{text}</HeroTitle>
      <DividersContainer>
        {[1, 2, 3, 4].map((_, key) => (
          <div key={key} style={{ position: 'relative' }}>
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
    </>
  );
};

export default TextHero;
