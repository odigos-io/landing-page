'use client';
import React from 'react';
import theme from '@/style/theme';
import styled from 'styled-components';
import { DATA } from './data';
import { ColumnContainer, SectionContainer } from '@/style';
import { ParagraphComponent, SectionTitle, Text } from '@/reuseable-components';

const Container = styled(SectionContainer)`
  height: auto;
`;

const PageBody = styled(ColumnContainer)``;

const TitleWrapper = styled.div`
  margin-top: 40px;
  margin-bottom: 300px;
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
          <Text weight={400} size={54}>
            Observability made easy
          </Text>
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
