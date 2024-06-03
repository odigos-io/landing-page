'use client';
import React from 'react';
import styled from 'styled-components';
import {
  Center,
  ColumnContainer,
  FlexContainer,
  SectionContainer,
} from '@/style';
import Image from 'next/image';
import { TrustedList, WatchDemoBtn } from '@/components';

const HeroTitle = styled.h1`
  color: ${({ theme }) => theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: clamp(3.5rem, 6vw, 6rem);
  font-weight: 400;
  line-height: 110%;
  letter-spacing: -1.92px;
  @media (max-width: 600px) {
    letter-spacing: -1.12px;
  }
`;

const HeroSubTitle = styled.h2`
  color: ${({ theme }) => theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: clamp(1.1rem, 3vw, 1.875rem);
  font-weight: 200;
  line-height: 133%;
  opacity: 0.8;
  margin-top: 40px;

  @media (max-width: 600px) {
    line-height: 155%;
  }
`;

const Hero = () => {
  return (
    <SectionContainer>
      <ColumnContainer>
        <FlexContainer gap={40}>
          <HeroTitle>Deeper</HeroTitle>
          <WatchDemoBtn />
        </FlexContainer>
        <HeroTitle>Observability </HeroTitle>
        <HeroSubTitle>
          Resolve incidents faster with deeper distributed tracing for all your
          backend architecture without any code changes.
        </HeroSubTitle>
        <TrustedList />
      </ColumnContainer>
      <Center>
        <Image
          width={600}
          height={600}
          src="/images/hero/hero.svg"
          alt="overview"
        />
      </Center>
    </SectionContainer>
  );
};

export default Hero;
