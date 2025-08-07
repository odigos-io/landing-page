'use client';

import React from 'react';
import Image from 'next/image';
import { TEAM } from '@/constants';
import { Text } from '@/components';
import styled from 'styled-components';
import { TeamCard } from './team-card';
import { useMobile } from '@/contexts';
import { ConstrainedWrapper, FlexColumn, FlexRow } from '@/styles';

const MiniTitle = styled(Text)<{ $isMobile: boolean }>`
  font-weight: 500;
  font-size: ${({ $isMobile }) => ($isMobile ? '14px' : '18px')};
  line-height: 24px;
  text-transform: uppercase;
`;

const Title = styled(Text)<{ $isMobile: boolean }>`
  font-size: ${({ $isMobile }) => ($isMobile ? '20px' : '32px')};
  line-height: ${({ $isMobile }) => ($isMobile ? '130%' : '140%')};
`;

export const Team = () => {
  const { isMobile } = useMobile();

  return (
    <ConstrainedWrapper $isMobile={isMobile} $paddingTop={isMobile ? 64 : 128}>
      <FlexColumn $gap={isMobile ? 32 : 64}>
        <FlexColumn $gap={isMobile ? 24 : 32}>
          <MiniTitle $isMobile={isMobile}>THE TEAM</MiniTitle>
          <FlexRow $gap={32}>
            {!isMobile && (
              <Image
                src='/assets/odigos/logo_white_filled.svg'
                alt='logo'
                width={142}
                height={142}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            )}
            <Title $isMobile={isMobile}>From the minds shaping OpenTelemetry and eBPF, the Odigos team makes your entire system observable in minutes.</Title>
          </FlexRow>
        </FlexColumn>

        <FlexRow $gap={isMobile ? 12 : 24} $wrap='wrap' $align='center' $justify='center'>
          {TEAM.map((item) => (
            <TeamCard key={item.title} {...item} />
          ))}
        </FlexRow>
      </FlexColumn>
    </ConstrainedWrapper>
  );
};
