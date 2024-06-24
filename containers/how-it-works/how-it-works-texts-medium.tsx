import React from 'react';
import { DATA } from './data';
import styled from 'styled-components';
import { ParagraphComponent } from '@/reuseable-components';

const TextContainer = styled.div`
  position: relative;
  width: 100%;
  height: 5832px;
`;

const AnimatedText = styled.div<{ top: number }>`
  position: absolute;
  top: ${({ top }) => top}px;
  z-index: 999;
`;

export const HowItWorksTextsMedium = () => {
  function getTop(index: number) {
    switch (index) {
      case 0:
        return 700;
      case 1:
        return 2000;
      case 2:
        return 3200;
      case 3:
        return 4600;
      case 4:
        return 5500;
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
            style={{
              padding: '64px 0',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          />
        </AnimatedText>
      ))}
    </TextContainer>
  );
};
