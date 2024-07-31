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
import linesMobile2 from '../../public/lotties/main-mobile.json';

const LottieMap = {
  1: {
    animationData: animationData1,
    loop: true,
    autoplay: true,
    width: 200,
  },
  2: {
    animationData: animationData2,
    loop: true,
    autoplay: true,
    width: 220,
  },
  3: {
    animationData: animationData3,
    loop: true,
    autoplay: true,
    width: 220,
  },
  4: {
    animationData: animationData4,
    loop: true,
    autoplay: true,
    width: 305,
  },
  5: {
    animationData: animationData5,
    loop: true,
    autoplay: true,
    width: 335,
  },
};

const AnimatedIllustration = styled.div<{ top: number }>`
  position: absolute;
  top: ${({ top }) => top}px;
  left: 50%;
  transform: translateX(-50%);
`;

const HowItWorksIllustrationsMobile = () => {
  function getTop(index: number) {
    switch (index) {
      case 0:
        return -370;
      case 1:
        return 220;
      case 2:
        return 916;
      case 3:
        return 1600;
      case 4:
        return 2178;
      default:
        return 0;
    }
  }

  return (
    <>
      <div style={{ position: 'absolute', top: -360 }}>
        <LottieAnimation
          animationData={linesMobile2}
          loop={true}
          autoplay={true}
        />
      </div>
      {DATA.map((data, index) => (
        <AnimatedIllustration key={index} top={getTop(index)}>
          <LottieAnimation {...LottieMap[index + 1]} />
        </AnimatedIllustration>
      ))}
    </>
  );
};

export default HowItWorksIllustrationsMobile;
