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
    width: 432,
  },
  2: {
    animationData: animationData2,
    loop: true,
    autoplay: true,
    width: 382,
  },
  3: {
    animationData: animationData3,
    loop: true,
    autoplay: true,
    width: 413,
  },
  4: {
    animationData: animationData4,
    loop: true,
    autoplay: true,
    width: 600,
  },
  5: {
    animationData: animationData5,
    loop: true,
    autoplay: true,
    width: 661,
  },
};

const AnimationContainer = styled.div`
  position: relative;
  width: 660px;
  height: 3932px;
`;

const AnimatedIllustration = styled.div<{ top: number }>`
  position: absolute;
  top: ${({ top }) => top}px;
  left: 50%;
  transform: translateX(-50%);
`;

const HowItWorksIllustrations = () => {
  function getTop(index: number) {
    switch (index) {
      case 4:
        return index * 900 - 276;
      default:
        return index * 900;
    }
  }

  return (
    <div>
      <AnimationContainer>
        <div style={{ position: 'absolute', top: -16 }}>
          <LottieAnimation animationData={lines} />
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

export default HowItWorksIllustrations;
