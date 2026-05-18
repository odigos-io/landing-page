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
          title='Backed by infrastructure investors'
          descriptions={['The funds that backed the last generation of infrastructure companies are backing the one that replaces them.']}
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
