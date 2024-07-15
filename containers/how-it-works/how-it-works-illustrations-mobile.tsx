'use client';
import { DATA } from './data';
import styled from 'styled-components';
import lottie, { AnimationItem } from 'lottie-web';
import { LottieAnimation } from '@/reuseable-components';
import React, { useEffect, useRef, useState } from 'react';

import animationData1 from '../../public/lotties/Odigos-1st-animation.json';
import animationData2 from '../../public/lotties/Odigos-2nd-animation.json';
import animationData3 from '../../public/lotties/Odigos-3rd-animation.json';
import animationData4 from '../../public/lotties/Odigos-4th-animation.json';
import animationData5 from '../../public/lotties/Odigos-5th-animation.json';
import linesMobile from '../../public/lotties/Odigos-bg-lines-mobile.json';
import { BlurFade } from '@/components';

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
    width: 335,
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
  const animationRefs = useRef<(any | null)[]>([]);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const lottieInstance = useRef<AnimationItem | null>(null);
  const [isLinesVisible, setIsLinesVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const animationDelay = 800; // Delay in milliseconds

  useEffect(() => {
    // Handle special case for 3rd animation
    const animation3 = animationRefs.current[2];
    if (animation3 && typeof animation3.addEventListener === 'function') {
      const handleComplete = () => {
        if (animation3 && typeof animation3.goToAndPlay === 'function') {
          animation3.goToAndPlay(5000);
        }
      };
      animation3.addEventListener('complete', handleComplete);

      return () => {
        if (
          animation3 &&
          typeof animation3.removeEventListener === 'function'
        ) {
          animation3.removeEventListener('complete', handleComplete);
        }
      };
    }

    // IntersectionObserver to detect when lines animation is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsLinesVisible(true);
            observer.disconnect(); // Stop observing once it becomes visible
          }
        });
      },
      { threshold: 0.1 } // Adjust threshold as needed
    );

    if (backgroundRef.current) {
      observer.observe(backgroundRef.current);
    }

    return () => {
      if (backgroundRef.current) {
        observer.unobserve(backgroundRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 100); // Adjust timeout as needed
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isLinesVisible && backgroundRef.current) {
      lottieInstance.current = lottie.loadAnimation({
        container: backgroundRef.current,
        animationData: linesMobile,
        renderer: 'svg',
        loop: false,
        autoplay: false,
      });

      return () => {
        if (lottieInstance.current) {
          lottieInstance.current.destroy();
        }
      };
    }
  }, [isLinesVisible]);

  useEffect(() => {
    if (isLinesVisible && lottieInstance.current) {
      if (isScrolling) {
        setTimeout(() => {
          if (lottieInstance.current && isScrolling) {
            lottieInstance.current.play();
          }
        }, animationDelay);
      } else if (lottieInstance.current) {
        lottieInstance.current.pause();
      }
    }
  }, [isScrolling, isLinesVisible, animationDelay]);

  function getTop(index: number) {
    switch (index) {
      case 0:
        return -370;
      case 1:
        return 200;
      case 2:
        return 980;
      case 3:
        return 1780;
      case 4:
        return 2418;
      default:
        return 0;
    }
  }

  return (
    <>
      <div style={{ position: 'absolute', top: -390 }} ref={backgroundRef} />
      {DATA.map((data, index) => (
        <AnimatedIllustration key={index} top={getTop(index)}>
          <LottieAnimation
            ref={(el) => (animationRefs.current[index] = el)}
            {...LottieMap[index + 1]}
          />
        </AnimatedIllustration>
      ))}
    </>
  );
};

export default HowItWorksIllustrationsMobile;
