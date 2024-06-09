'use client';
import React from 'react';
import {
  ColumnContainer,
  FlexContainer,
  IconWrapper,
  SectionContainer,
} from '@/style';
import theme from '@/style/theme';
import styled from 'styled-components';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { DATA } from './data';

const PageContainer = styled(SectionContainer)`
  flex-direction: column;
  @media (max-width: 1100px) {
    gap: 40px;
    height: auto;
    padding: 120px 20px;
    justify-content: flex-start;
  }
`;

const Quote = styled(motion.div)`
  color: ${theme.text.primary};
  max-width: 64%;
  text-align: center;
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: 64px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;

  @media (max-width: 1100px) {
    font-size: 24px;
    max-width: 100%;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 80px;

  @media (max-width: 600px) {
    flex-direction: column-reverse;
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
  }
`;

const Testimonials = () => {
  const [currentItem, setCurrentItem] = React.useState(DATA[0]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [animate, setAnimate] = React.useState(false);

  function handleNext() {
    setAnimate(true);
    setTimeout(() => {
      if (currentIndex === DATA.length - 1) {
        setCurrentItem(DATA[0]);
        setCurrentIndex(0);
      } else {
        setCurrentItem(DATA[currentIndex + 1]);
        setCurrentIndex(currentIndex + 1);
      }
      setAnimate(false);
    }, 500);
  }

  function handlePrevious() {
    setAnimate(true);
    setTimeout(() => {
      if (currentIndex === 0) {
        setCurrentItem(DATA[DATA.length - 1]);
        setCurrentIndex(DATA.length - 1);
      } else {
        setCurrentItem(DATA[currentIndex - 1]);
        setCurrentIndex(currentIndex - 1);
      }
      setAnimate(false);
    }, 500);
  }

  return (
    <PageContainer background={theme.colors.primary}>
      <Quote
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: animate ? 0 : 1, y: animate ? 20 : 0 }}
        transition={{ duration: 0.5 }}
      >{`“${currentItem.testimonial}”`}</Quote>
      <Footer>
        <FlexContainer>
          <IconWrapper>
            <Image
              style={{ transform: 'rotate(180deg)' }}
              src="/icons/common/next.svg"
              alt="previous"
              width={15}
              height={24}
              onClick={handlePrevious}
            />
          </IconWrapper>
          <IconWrapper onClick={handleNext}>
            <Image
              src="/icons/common/next.svg"
              alt="next"
              width={15}
              height={24}
            />
          </IconWrapper>
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
