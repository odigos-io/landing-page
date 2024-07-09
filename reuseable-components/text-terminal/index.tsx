'use client';
import React from 'react';
import styled, { keyframes } from 'styled-components';

interface TypewriterProps {
  text: string;
  textAlignment?: string;
}

const grow = keyframes`
  0% {
    max-height: var(--lineHeight);
  }
  100% {
    max-height: calc(var(--lineHeight) * var(--lines));
  }
`;

const type = keyframes`
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
`;

const blink = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
`;

const TypewriterWrapper = styled.div`
  --lines: 1000;
  --timePerLine: 1s;
  --time: calc(var(--lines) * var(--timePerLine));
  animation: ${grow} var(--time) steps(var(--lines)) forwards;
  background: var(--bgColor);
  line-height: var(--lineHeight);
  max-height: var(--lineHeight);
  overflow: hidden;
  position: relative;
  width: var(--width);
  min-height: 40vh;

  @media (max-width: 1200px) {
    min-height: 30vh;
  }

  @media (max-width: 900px) {
    min-height: 20vh;
  }
`;

const TextBody = styled.div<{ delay: number; textAlignment?: string }>`
  color: ${({ theme }) => theme.text.primary};
  text-align: ${(props) => props.textAlignment || 'left'};
  font-family: 'Inter Tight';
  font-size: 64px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;

  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  animation: ${type} 1.2s steps(40) ${(props) => props.delay}s 1 normal both;
  position: relative;

  @media (max-width: 1200px) {
    font-size: 44px;
  }
  @media (max-width: 1000px) {
    font-size: 30px;
  }
  @media (max-width: 800px) {
    font-size: 24px;
  }
`;

const Cursor = styled.span`
  display: inline-block;
  background-color: ${({ theme }) => theme.text.primary};
  width: 2px;
  height: 1em;
  margin-left: 2px;
  animation: ${blink} 1s step-end infinite;
`;

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  textAlignment,
}) => {
  const lines = text.split('\n');

  return (
    <TypewriterWrapper>
      {lines.map((line, index) => {
        return (
          <React.Fragment key={index}>
            <TextBody textAlignment={textAlignment} delay={index * 1}>
              {line}
              {index === lines.length - 1 ? <Cursor /> : null}
            </TextBody>
          </React.Fragment>
        );
      })}
    </TypewriterWrapper>
  );
};
