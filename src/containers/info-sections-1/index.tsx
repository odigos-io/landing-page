'use client';

import React from 'react';
import styled from 'styled-components';
import { useMobile } from '@/contexts';
import { INFO_SECTIONS_1 } from '@/constants';
import { ConstrainedWrapper, FlexColumn } from '@/styles';
import { Button, Render3D, TextLayers } from '@/components';

const Section = styled.section<{ $isMobile: boolean; $inverted: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: ${({ $isMobile, $inverted }) => ($isMobile ? 'column-reverse' : $inverted ? 'row-reverse' : 'row')};
  align-items: ${({ $isMobile }) => ($isMobile ? 'flex-start' : 'center')};
  justify-content: space-between;
  gap: ${({ $isMobile }) => ($isMobile ? 12 : 48)}px;
`;

const Wrap3D = styled.div<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? '100%' : 'unset')};
  display: ${({ $isMobile }) => ($isMobile ? 'flex' : 'unset')};
  justify-content: ${({ $isMobile }) => ($isMobile ? 'center' : 'unset')};
  align-items: ${({ $isMobile }) => ($isMobile ? 'center' : 'unset')};
`;

export const InfoSections1 = () => {
  const { isMobile } = useMobile();

  return (
    <ConstrainedWrapper $isMobile={isMobile}>
      <FlexColumn $gap={isMobile ? 32 : 64}>
        {INFO_SECTIONS_1.map(({ title, descriptions, threeDAsset, buttonText, buttonHref }, i) => (
          <Section key={`section-${title}`} $isMobile={isMobile} $inverted={i % 2 === 1}>
            <FlexColumn $gap={24}>
              <TextLayers title={title} descriptions={descriptions} />
              <Button rightIconSrc='/assets/icons/arrow.svg' href={buttonHref}>
                {buttonText}
              </Button>
            </FlexColumn>

            <Wrap3D $isMobile={isMobile}>
              <Render3D scene={threeDAsset} width={isMobile ? 300 : 550} height={isMobile ? 300 : 550} />
            </Wrap3D>
          </Section>
        ))}
      </FlexColumn>
    </ConstrainedWrapper>
  );
};
