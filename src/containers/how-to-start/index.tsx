'use client';

import React from 'react';
import styled from 'styled-components';
import { useMobile } from '@/contexts';
import { HOW_TO_START } from '@/constants';
import { Card, TextLayers } from '@/components';
import { ConstrainedWrapper, FlexColumn } from '@/styles';

const CardsContainer = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  align-items: ${({ $isMobile }) => ($isMobile ? 'center' : 'flex-start')};
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
`;

export const HowToStart = () => {
  const { isMobile } = useMobile();

  return (
    <ConstrainedWrapper $isMobile={isMobile} $paddingTop={isMobile ? 64 : 128}>
      <FlexColumn $gap={isMobile ? 32 : 64}>
        <TextLayers
          miniTitle='HOW TO START'
          title='Implementation in 3 easy steps'
          titleSettings={{
            largeTitle: true,
          }}
          descriptions={['Odigos uses OpenTelemetry and eBPF to build agnostic observability pipelines for all applications.']}
        />

        <CardsContainer $isMobile={isMobile}>
          {HOW_TO_START.map((card) => (
            <Card key={`card-${card.title}`} {...card} largeTitle />
          ))}
        </CardsContainer>
      </FlexColumn>
    </ConstrainedWrapper>
  );
};
