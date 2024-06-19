'use client';
import React, { useEffect, useRef, useState } from 'react';
import HowItWorks from '.';
import { SectionTitle } from '@/reuseable-components';
import theme from '@/style/theme';
import styled from 'styled-components';
import { HowItWorksTexts } from './how-it-works-texts';
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
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={
            {
              // height: 3932,
              // display: 'flex',
              // flexDirection: 'column',
              // justifyContent: 'space-between',
            }
          }
        >
          <HowItWorksTexts />
        </div>
        <HowItWorks />
      </div>
    </Container>
  );
};

export default HowItWorks2;
