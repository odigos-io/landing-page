'use client';
import React, { useEffect, useState } from 'react';
import { DATA } from './data';
import theme from '@/style/theme';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  ColumnContainer,
  FlexContainer,
  SectionContainer,
  IconWrapper as OriginalIconWrapper,
} from '@/style';
import Image from 'next/image';

const PageContainer = styled(SectionContainer)`
  flex-direction: column;
  padding: 0;
  height: auto;
  justify-content: flex-start;
  padding: 0px 0px 200px;
  @media (max-width: 1100px) {
    height: auto;
    padding: 0px 20px 120px;
  }
`;

const Quote = styled(motion.div)<{ fontSize: number }>`
  color: ${theme.text.primary};
  max-width: 64%;
  margin-top: 200px;
  text-align: center;
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: ${({ fontSize }) => fontSize}px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;

  @media (max-width: 1100px) {
    font-size: 24px;
    max-width: 100%;
    margin-top: 120px;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin-top: 80px;
  @media (max-width: 600px) {
    flex-direction: column-reverse;
    margin-top: 40px;
  }
`;

const GiverName = styled.div`
  color: ${theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.secondary};
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  text-transform: uppercase;
  @media (max-width: 600px) {
    font-size: 16px;
    display: flex;
    text-align: center;
    justify-content: center;
  }
`;

const GiverPosition = styled(GiverName)`
  font-size: 20px;
  opacity: 0.8;
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const TextWrapper = styled(ColumnContainer)`
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const ArrowIconWrapper = styled(OriginalIconWrapper)`
  width: 64px;
  height: 64px;
  padding: 0px;
  div {
    width: 100%;
    height: 100%;
  }
`;

const calculateFontSize = (text) => {
  const baseSize = 64;
  const maxLength = 64;

  return Math.max(baseSize - (text.length - maxLength) / 5, 48);
};

const Testimonials = () => {
  const [currentItem, setCurrentItem] = useState(DATA[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [fontSize, setFontSize] = useState(
    calculateFontSize(currentItem.testimonial)
  );

  useEffect(() => {
    setFontSize(calculateFontSize(currentItem.testimonial));
  }, [currentItem]);

  const handleNext = () => {
    setAnimate(true);
    setTimeout(() => {
      const nextIndex = currentIndex === DATA.length - 1 ? 0 : currentIndex + 1;
      setCurrentItem(DATA[nextIndex]);
      setCurrentIndex(nextIndex);
      setAnimate(false);
    }, 500);
  };

  const handlePrevious = () => {
    setAnimate(true);
    setTimeout(() => {
      const prevIndex = currentIndex === 0 ? DATA.length - 1 : currentIndex - 1;
      setCurrentItem(DATA[prevIndex]);
      setCurrentIndex(prevIndex);
      setAnimate(false);
    }, 500);
  };

  return (
    <PageContainer background={theme.colors.primary}>
      <Quote
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: animate ? 0 : 1, y: animate ? 20 : 0 }}
        transition={{ duration: 0.5 }}
        fontSize={fontSize}
      >{`“${currentItem.testimonial}”`}</Quote>
      <Footer>
        <FlexContainer>
          {/* <ArrowIconWrapper>
            <LazyImage
              style={{ transform: 'rotate(180deg)' }}
              src="/icons/common/next.svg"
              alt="previous"
              width={15}
              height={24}
              onClick={handlePrevious}
            />
          </ArrowIconWrapper>
          <ArrowIconWrapper onClick={handleNext}>
            <LazyImage
              src="/icons/common/next.svg"
              alt="next"
              width={15}
              height={24}
            />
          </ArrowIconWrapper> */}
          <Image
            src="/images/investors/access.jpg"
            alt="access-bank"
            width={46}
            height={46}
            // onClick={handlePrevious}
            style={{ borderRadius: '50%' }}
          />
        </FlexContainer>
        <TextWrapper>
          <GiverName>{currentItem.name}</GiverName>
          <GiverPosition>{currentItem.title}</GiverPosition>
        </TextWrapper>
      </Footer>
    </PageContainer>
  );
};

export default Testimonials;
