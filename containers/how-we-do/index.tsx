'use client';
import React from 'react';
import styled from 'styled-components';
import { SectionContainer } from '@/style';
import { SectionTitle, Typewriter } from '@/reuseable-components';

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
  @media (max-width: 1200px) {
    padding: 64px 40px;
  }
  @media (max-width: 800px) {
    border-radius: 48px 48px 0px 0px;
  }
`;

const Container = styled(SectionContainer)`
  height: auto;
  @media (max-width: 1000px) {
    height: auto;
    margin-top: 80px;
  }
`;
const HowWeDo = () => {
  const multilineText = `Odigos instantly delivers deeper
  observability by leveraging 
  eBPF and OpenTelemetry 
  for effortless implementation.`;

  return (
    <Container padding="0">
      <PageBorder>
        <InnerBorder>
          <Body>
            <SectionTitle
              headerInfo={{
                title: 'HOW WE DO',
                subtitle: 'Subtitle',
                description: 'Description',
              }}
            />
            <Typewriter textAlignment={'center'} text={multilineText} />
          </Body>
        </InnerBorder>
      </PageBorder>
    </Container>
  );
};

export default HowWeDo;
