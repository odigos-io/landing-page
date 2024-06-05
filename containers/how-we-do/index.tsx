'use client';
import React from 'react';
import styled from 'styled-components';
import { SectionContainer } from '@/style';
import { SectionTitle } from '@/reuseable-components';

const PageBorder = styled.div`
  margin: 0 4px;
  padding: 0px 80px;
  width: 100%;
  border-radius: 120px 120px 0px 0px;
  border: 1px dashed #f9f9f949;
  border-bottom: 0;

  @media (max-width: 800px) {
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
  padding: 0px 80px;
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

const TextBody = styled.span`
  color: ${({ theme }) => theme.text.primary};
  text-align: center;
  font-family: 'Inter Tight';
  font-size: 64px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 89.6px */
  @media (max-width: 1200px) {
    font-size: 44px;
  }
  @media (max-width: 1000px) {
    font-size: 30px;
  }
  @media (max-width: 800px) {
    font-size: 24px;
  }
`;

const Container = styled(SectionContainer)`
  @media (max-width: 1000px) {
    height: auto;
    margin-top: 80px;
  }
`;
const HowWeDo = () => {
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
            <TextBody>
              {`Odigos instantly delivers deeper observability by leveraging eBPF and OpenTelemetry for effortless implementation. |`}
            </TextBody>
          </Body>
        </InnerBorder>
      </PageBorder>
    </Container>
  );
};

export default HowWeDo;
