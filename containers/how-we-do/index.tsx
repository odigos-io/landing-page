'use client';
import React from 'react';
import styled from 'styled-components';
import { Typewriter } from '@/reuseable-components';
import { MaxWidthContainer, SectionContainer } from '@/style';

const PageBorder = styled.div`
  margin-top: 40px;
  padding: 0px 80px;
  width: 100%;
  border-radius: 120px 120px 0px 0px;
  border: 1px dashed #f9f9f949;
  border-bottom: 0;

  @media (max-width: 800px) {
    margin-top: 0px;
    padding: 0px;
    border-radius: 48px 48px 0px 0px;
  }
`;

const InnerBorder = styled.div`
  padding: 0px 80px;
  width: 100%;
  height: 100%;
  border-radius: 120px 120px 0px 0px;
  border: 1px dashed #f9f9f98f;
  border-bottom: 0;
  @media (max-width: 800px) {
    padding: 0px 20px;
    border-radius: 48px 48px 0px 0px;
  }
`;

const Body = styled.div`
  display: flex;
  padding: 80px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 40px;
  align-self: stretch;
  border-radius: 120px 120px 0px 0px;
  height: 100%;
  border: 1px solid #f9f9f9;
  border-bottom: 0;
  @media (max-width: 1300px) {
    padding: 64px 40px 0;
  }
  @media (max-width: 800px) {
    border-radius: 48px 48px 0px 0px;
    padding: 64px 40px;
  }
`;

const Container = styled(SectionContainer)`
  height: auto;
  width: 100%;
  max-width: 1440px;
  @media (max-width: 1000px) {
    height: auto;
    margin-top: 80px;
  }
`;
const HowWeDo = () => {
  const multilineText = `The only solution to generate 100%
  accurate distributed tracing 
  using eBPF-based context
  propagation across all applications.`;

  return (
    <MaxWidthContainer>
      <Container padding="0">
        <PageBorder>
          <InnerBorder>
            <Body>
              <Typewriter textAlignment={'center'} text={multilineText} />
            </Body>
          </InnerBorder>
        </PageBorder>
      </Container>
    </MaxWidthContainer>
  );
};

export default HowWeDo;
