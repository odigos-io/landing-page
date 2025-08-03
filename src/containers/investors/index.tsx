'use client';

import React from 'react';
import { useMobile } from '@/contexts';
import { INVESTORS } from '@/constants';
import { TextLayers } from '@/components';
import { InvestorCard } from './investor-card';
import { ConstrainedWrapper, FlexColumn, FlexRow } from '@/styles';

export const Investors = () => {
  const { isMobile } = useMobile();

  return (
    <ConstrainedWrapper $isMobile={isMobile} $paddingTop={isMobile ? 64 : 128}>
      <FlexColumn $gap={isMobile ? 32 : 64}>
        <TextLayers
          miniTitle='INVESTORS'
          title='Backing Our Vision'
          descriptions={['Explore the investors who believe in our potential and are helping us achieve our goals through strategic support and funding.']}
        />

        <FlexRow $gap={48} $wrap='wrap' $align='flex-start' $justify='space-between'>
          {INVESTORS.map((item) => (
            <InvestorCard key={item.name} {...item} />
          ))}
        </FlexRow>
      </FlexColumn>
    </ConstrainedWrapper>
  );
};
