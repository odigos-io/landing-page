import React from 'react';
import { DATA } from './data';
import styled from 'styled-components';
import { ParagraphComponent } from '@/reuseable-components';

const TextContainer = styled.div`
  position: relative;
  width: 100%;
  height: 2060px;
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
        return 0;
      case 1:
        return 480;
      case 2:
        return 1000;
      case 3:
        return 1620;
      case 4:
        return 2018;
      default:
        return 0;
    }
  }
  return (
    <TextContainer>
      {DATA.map((data, index) => (
        <AnimatedText key={index} top={getTop(index)}>
          <ParagraphComponent
            title={data.title}
            titleStyle={{
              fontSize: 28,
            }}
            paragraphStyle={{ fontSize: 16 }}
            paragraphs={data.paragraphs}
          />
        </AnimatedText>
      ))}
    </TextContainer>
  );
};
