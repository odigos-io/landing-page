'use client';

import React from 'react';
import { FAQ } from '@/constants';
import { FaqCard } from './faq-card';
import { useMobile } from '@/contexts';
import { TextLayers } from '@/components';
import { ConstrainedWrapper, FlexColumn } from '@/styles';

export const Faq = () => {
  const { isMobile } = useMobile();

  return (
    <ConstrainedWrapper $isMobile={isMobile} $paddingTop={isMobile ? 64 : 128}>
      <FlexColumn $gap={isMobile ? 32 : 64}>
        <TextLayers
          miniTitle='LEARN MORE'
          title='Frequently Asked Questions'
          titleSettings={{
            largeTitle: true,
          }}
        />

        <FlexColumn $gap={12} $align='center'>
          {FAQ.map((card) => (
            <FaqCard key={`card-${card.title}`} {...card} />
          ))}
        </FlexColumn>
      </FlexColumn>
    </ConstrainedWrapper>
  );
};
