'use client';

import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useMobile } from '@/contexts';
import { TextLayers } from '@/components';
import { INFO_SECTIONS_2 } from '@/constants';
import { ConstrainedWrapper, FlexColumn } from '@/styles';

const Section = styled.section<{ $isMobile: boolean; $inverted: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: ${({ $isMobile, $inverted }) => ($isMobile ? 'column-reverse' : $inverted ? 'row-reverse' : 'row')};
  align-items: ${({ $isMobile }) => ($isMobile ? 'flex-start' : 'center')};
  justify-content: space-between;
  gap: 12px;
`;

const WrapImage = styled.div<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? '100%' : 'unset')};
  display: ${({ $isMobile }) => ($isMobile ? 'flex' : 'unset')};
  justify-content: ${({ $isMobile }) => ($isMobile ? 'center' : 'unset')};
  align-items: ${({ $isMobile }) => ($isMobile ? 'center' : 'unset')};
`;

export const InfoSections2 = () => {
  const { isMobile } = useMobile();

  return (
    <ConstrainedWrapper $isMobile={isMobile}>
      <FlexColumn $gap={isMobile ? 32 : 64}>
        {INFO_SECTIONS_2.map(({ title, descriptions, bullets, imageSrc }, i) => (
          <Section key={`section-${title}`} $isMobile={isMobile} $inverted={i % 2 === 1}>
            <TextLayers title={title} descriptions={descriptions} bullets={bullets} />

            <WrapImage $isMobile={isMobile}>
              <Image src={imageSrc} alt={title} width={isMobile ? 300 : 580} height={isMobile ? 300 : 580} />
            </WrapImage>
          </Section>
        ))}
      </FlexColumn>
    </ConstrainedWrapper>
  );
};
