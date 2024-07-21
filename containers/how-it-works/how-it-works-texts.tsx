import React from 'react';
import { DATA } from './data';
import styled from 'styled-components';
import { ParagraphComponent } from '@/reuseable-components';

const TextContainer = styled.div`
  position: relative;
  width: 40vw;
  height: 2860px;
`;

const AnimatedText = styled.div<{ top: number }>`
  position: absolute;
  top: ${({ top }) => top}px;
`;

export const HowItWorksTexts = () => {
  function getTop(index: number) {
    switch (index) {
      case 0:
        return 120;
      case 1:
        return 750;
      case 2:
        return 1450;
      case 3:
        return 2150;
      case 4:
        return 2600;
      default:
        return 260;
    }
  }

  return (
    <div>
      <TextContainer>
        {DATA.map((data, index) => (
          <AnimatedText key={index} top={getTop(index)}>
            <ParagraphComponent
              title={data.title}
              paragraphs={data.paragraphs}
            />
          </AnimatedText>
        ))}
      </TextContainer>
    </div>
  );
};
