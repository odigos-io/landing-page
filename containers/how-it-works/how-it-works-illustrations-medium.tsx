'use client';
import React from 'react';
import { DATA } from './data';
import styled from 'styled-components';
import { LottieAnimation } from '@/reuseable-components';

import animationData1 from '../../public/lotties/Odigos-1st-animation.json';
import animationData2 from '../../public/lotties/Odigos-2nd-animation.json';
import animationData3 from '../../public/lotties/Odigos-3rd-animation.json';
import animationData4 from '../../public/lotties/Odigos-4th-animation.json';
import animationData5 from '../../public/lotties/Odigos-5th-animation.json';
import lines from '../../public/lotties/main.json';

const LottieMap = {
  1: {
    animationData: animationData1,
    loop: true,
    autoplay: true,
    width: 350,
  },
  2: {
    animationData: animationData2,
    loop: true,
    autoplay: true,
    width: 250,
  },
  3: {
    animationData: animationData3,
    loop: true,
    autoplay: true,
    width: 300,
  },
  4: {
    animationData: animationData4,
    loop: true,
    autoplay: true,
    width: 370,
  },
  5: {
    animationData: animationData5,
    loop: true,
    autoplay: true,
    width: 400,
  },
};

const AnimationContainer = styled.div`
  position: relative;
`;

const AnimatedIllustration = styled.div<{ top: number }>`
  position: absolute;
  top: ${({ top }) => top}px;
  left: 50%;
  transform: translateX(-50%);
`;

const HowItWorksIllustrationsMedium = () => {
  function getTop(index: number) {
    switch (index) {
      case 0:
        return -80;
      case 1:
        return 400;
      case 2:
        return 980;
      case 3:
        return 1580;
      case 4:
        return 2018;
      default:
        return 0;
    }
  }

  return (
    <div>
      <AnimationContainer>
        <div style={{}}>
          <LottieAnimation animationData={lines} width={400} />
        </div>
        {DATA.map((_, index) => (
          <AnimatedIllustration key={index} top={getTop(index)}>
            <LottieAnimation {...LottieMap[index + 1]} />
          </AnimatedIllustration>
        ))}
      </AnimationContainer>
    </div>
  );
};

export default HowItWorksIllustrationsMedium;
