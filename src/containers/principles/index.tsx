'use client';

import React from 'react';
import { useMobile } from '@/contexts';
import { PRINCIPLES } from '@/constants';
import { TextLayers } from '@/components';
import { PrincipleCard } from './principle-card';
import { ConstrainedWrapper, FlexColumn, FlexRow } from '@/styles';

export const Principles = () => {
  const { isMobile } = useMobile();

  return (
    <ConstrainedWrapper $isMobile={isMobile}>
      <FlexColumn $gap={isMobile ? 32 : 64}>
        <TextLayers miniTitle='PRINCIPLES' title='Our Principles' />

        <FlexRow $gap={isMobile ? 12 : 24} $wrap='wrap' $align='center' $justify='center'>
          {PRINCIPLES.map((item) => (
            <PrincipleCard key={item.title} {...item} />
          ))}
        </FlexRow>
      </FlexColumn>
    </ConstrainedWrapper>
  );
};
