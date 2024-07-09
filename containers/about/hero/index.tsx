'use client';
import React from 'react';
import styled from 'styled-components';
import { ColumnContainer, MaxWidthContainer } from '@/style';
import { SectionTitle, Typewriter } from '@/reuseable-components';
import theme from '@/style/theme';
import TextHero from '@/components/text-hero';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
  background: ${theme.colors.secondary};
  padding: 160px 64px;
  @media (max-width: 800px) {
    padding: 24px 20px;
  }
  @media (max-width: 600px) {
    padding-top: 84px;
    gap: 32px;
  }
`;

const VisionContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 40px;
  padding: 60px 0 0 0;
  @media (max-width: 800px) {
    margin-top: 8px;
    padding: 0px 0 80px 0;
  }
`;

const TextBody = styled.div`
  display: flex;
  justify-content: flex-start;
  text-align: left;
  div {
    min-height: auto;
  }
`;

const AboutHero = () => {
  const text = `Pioneering the future 
  of performance monitoring.`;

  return (
    <MaxWidthContainer>
      <PageContainer>
        <TextHero text="We’re Odigos" />
        <VisionContainer>
          <SectionTitle
            headerInfo={{
              title: 'VISION',
              subtitle: '',
              description: '',
            }}
          />
          <TextBody>
            <Typewriter text={text}></Typewriter>
          </TextBody>
        </VisionContainer>
      </PageContainer>
    </MaxWidthContainer>
  );
};

export default AboutHero;
