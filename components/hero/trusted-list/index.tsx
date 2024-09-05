'use client';
import React from 'react';
import styled from 'styled-components';
import { GridContainer } from '@/style';
import { LazyImage } from '@/reuseable-components';

const Title = styled.h1`
  color: ${({ theme }) => theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.secondary};
  font-weight: 500;
  opacity: 0.8;
  margin-bottom: 16px;
  line-height: normal;
`;

const Wrapper = styled.div`
  margin-top: 20%;
  @media (max-width: 1200px) {
    margin-top: 18%;
  }
  @media (max-width: 800px) {
    margin-top: 80px;
  }
`;

export const TrustedList = () => {
  return (
    <Wrapper>
      <Title>TRUSTED BY</Title>
      <GridContainer>
        {/* <LazyImage
          width={110}
          height={26}
          src="/images/hero/walmart.svg"
          alt="walmart"
        /> */}
        <LazyImage
          width={110}
          height={26}
          src="/images/hero/access.svg"
          alt="access-bank"
        />
        <LazyImage width={26} height={26} src="/images/hero/hp.svg" alt="hp" />
      </GridContainer>
    </Wrapper>
  );
};
