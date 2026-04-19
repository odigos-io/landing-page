'use client';

import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useMobile } from '@/contexts';
import { Button, TextLayers } from '@/components';
import { ConstrainedWrapper, FlexColumn } from '@/styles';

const FEATURES = [
  {
    title: 'Unmatched Visibility',
    descriptions: [
      'Automatic context propagation across the full request path, including AI-generated code, legacy systems, compiled languages, third-party apps, messaging pipelines, and databases.',
    ],
    imageSrc: '/assets/renders/home_section_1.svg',
  },
  {
    title: 'Dynamic Observability',
    descriptions: ['Turn instrumentation on where it creates value, improve signal quality, reduce noise, and adapt in real time as production changes.'],
    imageSrc: '/assets/renders/home_section_2.svg',
  },
  {
    title: 'Frictionless',
    descriptions: ['Instrument any service at runtime using out-of-process eBPF. Zero code changes. Zero restarts. Less than 1% overhead. Vendor agnostic and OpenTelemetry native.'],
    imageSrc: '/assets/renders/home_section_3.svg',
  },
  {
    title: 'Enterprise Grade',
    descriptions: ['Built for large-scale production environments with centralized governance, Kubernetes and Linux VM support, RBAC, SSO, and the ability to scale across thousands of services.'],
    imageSrc: '/assets/renders/home_section_4.svg',
  },
  {
    title: 'OpenTelemetry, Supercharged',
    descriptions: ['Take control of your telemetry with flexible pipelines that route, enrich, and send data anywhere to any backend without lock-in.'],
    imageSrc: '/assets/renders/home_section_5.svg',
  },
];

const Section = styled.section<{ $isMobile: boolean; $inverted: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: ${({ $isMobile, $inverted }) => ($isMobile ? 'column-reverse' : $inverted ? 'row-reverse' : 'row')};
  align-items: ${({ $isMobile }) => ($isMobile ? 'flex-start' : 'center')};
  justify-content: space-between;
  gap: ${({ $isMobile }) => ($isMobile ? 12 : 40)}px;
`;

const TextContent = styled.div<{ $isMobile: boolean }>`
  max-width: ${({ $isMobile }) => ($isMobile ? '100%' : '514px')};
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const WrapRender = styled.div<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? '100%' : 'unset')};
  display: ${({ $isMobile }) => ($isMobile ? 'flex' : 'unset')};
  justify-content: ${({ $isMobile }) => ($isMobile ? 'center' : 'unset')};
  align-items: ${({ $isMobile }) => ($isMobile ? 'center' : 'unset')};
`;

export const FeatureSections = () => {
  const { isMobile } = useMobile();

  return (
    <ConstrainedWrapper $isMobile={isMobile}>
      <FlexColumn $gap={isMobile ? 32 : 64}>
        {FEATURES.map(({ title, descriptions, imageSrc }, i) => (
          <Section key={title} $isMobile={isMobile} $inverted={i % 2 === 1}>
            <TextContent $isMobile={isMobile}>
              <TextLayers title={title} descriptions={descriptions} />
            </TextContent>

            <WrapRender $isMobile={isMobile}>{imageSrc && <Image src={imageSrc} alt={title} width={isMobile ? 300 : 486} height={isMobile ? 300 : 486} />}</WrapRender>
          </Section>
        ))}
      </FlexColumn>
    </ConstrainedWrapper>
  );
};
