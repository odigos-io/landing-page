'use client';
import React from 'react';
import styled from 'styled-components';
import {
  Center,
  ColumnContainer,
  FlexContainer,
  SectionContainer,
} from '@/style';
import { Button, UnderlineText } from '@/reuseable-components';
import Image from 'next/image';

const HeroTitle = styled.h1`
  color: ${({ theme }) => theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: clamp(2.5rem, 8vw, 6rem);
  font-weight: 400;
  line-height: 110%;
  letter-spacing: -1.92px;
`;

const HeroSubTitle = styled.h2`
  color: ${({ theme }) => theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: clamp(1rem, 3vw, 1.875rem);
  font-weight: 200;
  line-height: 40px;
  opacity: 0.8;
  margin-top: 40px;
`;

const Hero = () => {
  return (
    <SectionContainer>
      <ColumnContainer>
        <FlexContainer gap={40}>
          <HeroTitle>Deeper</HeroTitle>
          <Button
            containerStyle={{ marginTop: 12 }}
            onClick={() => console.log('Hello World')}
          >
            <UnderlineText size={20}>WATCH DEMO</UnderlineText>
          </Button>
        </FlexContainer>
        <HeroTitle>Observability </HeroTitle>
        <HeroSubTitle>
          Resolve incidents faster with deeper distributed tracing for all your
          backend architecture without any code changes.
        </HeroSubTitle>
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
