'use client';
import React from 'react';
import theme from '@/style/theme';
import styled from 'styled-components';
import { DATA } from './data';
import { ColumnContainer, SectionContainer } from '@/style';
import { ParagraphComponent, SectionTitle, Text } from '@/reuseable-components';

const Container = styled(SectionContainer)`
  height: auto;
  padding: 160px 64px;

  @media (max-width: 800px) {
    padding: 80px 20px;
  }
`;

const PageBody = styled(ColumnContainer)``;

const TitleWrapper = styled.div`
  margin-top: 40px;
  margin-bottom: 300px;
`;

const PageTitle = styled.span`
  color: ${theme.text.primary};
  font-family: ${({ theme }) => theme.text.secondary};
  font-size: 56px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
  @media (max-width: 800px) {
    font-size: 28px;
  }
`;

const HowItWorks = () => {
  return (
    <Container
      justify={'flex-start'}
      alignments={'flex-start'}
      background={theme.colors.primary}
    >
      <PageBody>
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
        <ColumnContainer gap={260}>
          {DATA.map((data, index) => (
            <ParagraphComponent
              key={index}
              title={data.title}
              paragraphs={data.paragraphs}
            />
          ))}
        </ColumnContainer>
      </PageBody>
    </Container>
  );
};

export default HowItWorks;
