import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { GridContainer } from '@/style';

const Title = styled.h1`
  color: ${({ theme }) => theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.secondary};
  font-weight: 500;
  opacity: 0.8;
  margin-bottom: 16px;
  line-height: normal;
`;

const Wrapper = styled.div`
  margin-top: 100px;
`;

export const TrustedList = () => {
  return (
    <Wrapper>
      <Title>TRUSTED BY</Title>
      <GridContainer>
        <Image
          width={110}
          height={26}
          src="/images/hero/walmart.svg"
          alt="walmart"
        />
        <Image
          width={110}
          height={26}
          src="/images/hero/access.svg"
          alt="walmart"
        />
        <Image width={26} height={26} src="/images/hero/hp.svg" alt="walmart" />
      </GridContainer>
    </Wrapper>
  );
};
