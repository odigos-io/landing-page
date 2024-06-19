'use client';
import React from 'react';
import theme from '@/style/theme';
import styled from 'styled-components';
import { SectionTitle } from '@/reuseable-components';
import { HowItWorksTexts } from './how-it-works-texts';
import HowItWorksIllustrations from './how-it-works-illustrations';

const TitleWrapper = styled.div`
  margin-top: 40px;
  margin-bottom: 300px;
`;

const PageTitle = styled.span`
  color: ${theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: 56px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
  @media (max-width: 800px) {
    font-size: 28px;
  }
`;

const Container = styled.div`
  padding: 160px 64px;

  @media (max-width: 800px) {
    padding: 80px 20px;
  }
`;

const Body = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const HowItWorks2 = () => {
  return (
    <Container style={{ background: theme.colors.primary }}>
      <SectionTitle
        headerInfo={{
          title: 'HOW IT WORKS',
          subtitle: '',
          description: '',
        }}
      />
      <TitleWrapper>
        <PageTitle>Observability made easy</PageTitle>
      </TitleWrapper>
      <Body>
        <HowItWorksTexts />
        <HowItWorksIllustrations />
      </Body>
    </Container>
  );
};

export default HowItWorks2;
