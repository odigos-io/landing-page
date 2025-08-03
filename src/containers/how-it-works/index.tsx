'use client';

import React from 'react';
import styled from 'styled-components';
import { useMobile } from '@/contexts';
import { HOW_IT_WORKS } from '@/constants';
import { ConstrainedWrapper, FlexColumn } from '@/styles';
import { Button, Render3D, TextLayers } from '@/components';

const Section = styled.section<{ $isMobile: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column-reverse' : 'row')};
  align-items: ${({ $isMobile }) => ($isMobile ? 'flex-start' : 'center')};
  gap: 12px;
`;

const Wrap3D = styled.div<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? '100%' : 'unset')};
  display: ${({ $isMobile }) => ($isMobile ? 'flex' : 'unset')};
  justify-content: ${({ $isMobile }) => ($isMobile ? 'center' : 'unset')};
  align-items: ${({ $isMobile }) => ($isMobile ? 'center' : 'unset')};
`;

export const HowItWorks = () => {
  const { isMobile } = useMobile();

  return (
    <ConstrainedWrapper $isMobile={isMobile} $paddingTop={isMobile ? 64 : 128}>
      <FlexColumn $gap={isMobile ? 32 : 64}>
        <TextLayers
          miniTitle='HOW IT WORKS'
          title='Observability made easy'
          titleSettings={{
            largeTitle: true,
          }}
        />

        {HOW_IT_WORKS.map(({ title, descriptions, threeDAsset, buttonText, buttonHref }) => (
          <Section key={`section-${title}`} $isMobile={isMobile}>
            <FlexColumn $gap={24}>
              <TextLayers title={title} descriptions={descriptions} />
              <Button rightIconSrc='/assets/icons/arrow.svg' href={buttonHref}>
                {buttonText}
              </Button>
            </FlexColumn>

            <Wrap3D $isMobile={isMobile}>
              <Render3D scene={threeDAsset} width={isMobile ? 300 : 580} height={isMobile ? 300 : 580} />
            </Wrap3D>
          </Section>
        ))}
      </FlexColumn>
    </ConstrainedWrapper>
  );
};
