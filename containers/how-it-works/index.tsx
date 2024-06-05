'use client';
import React from 'react';
import styled from 'styled-components';
import { SectionContainer } from '@/style';
import { SectionTitle } from '@/reuseable-components';
import theme from '@/style/theme';

const Container = styled(SectionContainer)``;
const HowItWorks = () => {
  return (
    <Container
      justify={'flex-start'}
      alignments={'flex-start'}
      background={theme.colors.primary}
    >
      <SectionTitle
        headerInfo={{
          title: 'How It Works',
          subtitle: 'Subtitle',
          description: 'Description',
        }}
      />
    </Container>
  );
};

export default HowItWorks;
