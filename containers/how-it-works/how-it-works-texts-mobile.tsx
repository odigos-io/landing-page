import React from 'react';
import { DATA } from './data';
import styled from 'styled-components';
import { ParagraphComponent } from '@/reuseable-components';

const TextContainer = styled.div`
  position: relative;
  width: 100%;
  height: 3932px;
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
        return -140;
      case 1:
        return 600;
      case 2:
        return 1850;
      case 3:
        return 2800;
      case 4:
        return 3600;
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
            style={{ padding: '20px 0' }}
          />
        </AnimatedText>
      ))}
    </TextContainer>
  );
};
