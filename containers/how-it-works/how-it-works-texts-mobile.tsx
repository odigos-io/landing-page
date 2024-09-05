import React from 'react';
import { DATA } from './data';
import styled from 'styled-components';
import { ParagraphComponent } from '@/reuseable-components';

const TextContainer = styled.div`
  position: relative;
  width: 100%;
  /* height: 3932px; */
`;

const AnimatedText = styled.div<{ top: number }>`
  position: absolute;
  top: ${({ top }) => top}px;
  z-index: 999;
`;

export const HowItWorksTextsMobile = () => {
  function getTop(index: number) {
    switch (index) {
      case 0:
        return -130;
      case 1:
        return 500;
      case 2:
        return 1200;
      case 3:
        return 1900;
      case 4:
        return 2290;
      default:
        return 260;
    }
  }

  return (
    <TextContainer>
      {DATA.map((data, index) => (
        <AnimatedText key={index} top={getTop(index)}>
          <ParagraphComponent
            title={data.title}
            paragraphs={data.paragraphs}
            style={{ padding: '32px 0' }}
          />
        </AnimatedText>
      ))}
    </TextContainer>
  );
};
