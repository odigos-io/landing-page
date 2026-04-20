'use client';

import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useMobile } from '@/contexts';
import { TextLayers } from '@/components';
import { ConstrainedWrapper, FlexColumn } from '@/styles';

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

const Relative = styled.div`
  position: relative;
`;

const Absolute = styled.div<{ $topOffset?: number; $leftOffset?: number }>`
  position: absolute;
  top: calc(50% + ${({ $topOffset }) => $topOffset || 0}px);
  left: calc(50% + ${({ $leftOffset }) => $leftOffset || 0}px);
  transform: translate(-50%, -50%);
`;

const MOBILE_IMAGE_SIZE = 300;
const DESKTOP_IMAGE_SIZE = 486;

const getImageSize = (isMobile: boolean, divider?: number) => {
  return (isMobile ? MOBILE_IMAGE_SIZE : DESKTOP_IMAGE_SIZE) / (divider || 1);
};

const FEATURES = [
  {
    title: 'Unmatched Visibility',
    descriptions: [
      'Automatic context propagation across the full request path, including AI-generated code, legacy systems, compiled languages, third-party apps, messaging pipelines, and databases.',
    ],
    render: (isMobile: boolean) => <Image src='/assets/renders/home_section_1.png' alt='' width={getImageSize(isMobile)} height={getImageSize(isMobile)} />,
  },
  {
    title: 'Dynamic Observability',
    descriptions: ['Turn instrumentation on where it creates value, improve signal quality, reduce noise, and adapt in real time as production changes.'],
    render: (isMobile: boolean) => (
      <Relative>
        <Image src='/assets/renders/home_section_2_bg.png' alt='' width={getImageSize(isMobile)} height={getImageSize(isMobile)} />
        <Absolute $topOffset={4} $leftOffset={4}>
          <Image src='/assets/renders/home_section_2_fg.svg' alt='' width={getImageSize(isMobile, 1.65)} height={getImageSize(isMobile, 1.65)} />
        </Absolute>
      </Relative>
    ),
  },
  {
    title: 'Frictionless',
    descriptions: ['Instrument any service at runtime using out-of-process eBPF. Zero code changes. Zero restarts. Less than 1% overhead. Vendor agnostic and OpenTelemetry native.'],
    render: (isMobile: boolean) => <Image src='/assets/renders/home_section_3.png' alt='' width={getImageSize(isMobile)} height={getImageSize(isMobile)} />,
  },
  {
    title: 'Enterprise Grade',
    descriptions: ['Built for large-scale production environments with centralized governance, Kubernetes and Linux VM support, RBAC, SSO, and the ability to scale across thousands of services.'],
    render: (isMobile: boolean) => (
      <Relative>
        <Image src='/assets/renders/home_section_4_bg.png' alt='' width={getImageSize(isMobile)} height={getImageSize(isMobile)} />
        <Absolute>
          <Image src='/assets/renders/home_section_4_fg.svg' alt='' width={getImageSize(isMobile, 1.25)} height={getImageSize(isMobile, 1.25)} />
        </Absolute>
      </Relative>
    ),
  },
  {
    title: 'OpenTelemetry, Supercharged',
    descriptions: ['Take control of your telemetry with flexible pipelines that route, enrich, and send data anywhere to any backend without lock-in.'],
    render: (isMobile: boolean) => <Image src='/assets/renders/home_section_5.png' alt='' width={getImageSize(isMobile)} height={getImageSize(isMobile)} />,
  },
];

export const FeatureSections = () => {
  const { isMobile } = useMobile();

  return (
    <ConstrainedWrapper $isMobile={isMobile} $paddingTop={32} $paddingBottom={32}>
      <FlexColumn $gap={isMobile ? 32 : 64}>
        {FEATURES.map(({ title, descriptions, render }, i) => (
          <Section key={title} $isMobile={isMobile} $inverted={i % 2 === 1}>
            <TextContent $isMobile={isMobile}>
              <TextLayers title={title} descriptions={descriptions} />
            </TextContent>
            <WrapRender $isMobile={isMobile}>{render(isMobile)}</WrapRender>
          </Section>
        ))}
      </FlexColumn>
    </ConstrainedWrapper>
  );
};
