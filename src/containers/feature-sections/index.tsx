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
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MOBILE_IMAGE_SIZE = 320;
const DESKTOP_IMAGE_SIZE = 486;

const getImageSize = (isMobile: boolean) => (isMobile ? MOBILE_IMAGE_SIZE : DESKTOP_IMAGE_SIZE);

const FEATURES = [
  {
    title: 'See the exact call that broke production.',
    descriptions: [
      'Other tools tell you a request was slow. Odigos uses out-of-process eBPF to show you the function, the query, the call that actually did it, across AI-written code, compiled binaries, and legacy services. Nothing to instrument by hand.',
    ],
    image: '/assets/renders/feature_depth.svg',
  },
  {
    title: 'Get the signal you never collected. After it breaks.',
    descriptions: [
      'Old tools lock in what they capture at deploy time. When that is not enough, your only move is to redeploy while production is down. Odigos turns on any eBPF probe the moment you or an AI asks for it. In real time. No redeploy.',
    ],
    image: '/assets/renders/feature_dynamic.svg',
  },
  {
    title: 'Safe enough to let AI run production.',
    descriptions: [
      'Odigos runs out-of-process in an eBPF sandbox the Linux kernel enforces. Under 1% overhead, no code changes, no restarts. Turn on anything, anywhere, even let an AI drive, and production keeps running at full speed.',
    ],
    image: '/assets/renders/feature_safe.svg',
  },
  {
    title: 'No model can debug evidence nobody collected.',
    descriptions: [
      'Every AI SRE on the market reads dashboards that were built before the incident. When the evidence was never collected, the smartest model money can buy is stuck. Odigos lets the AI ask production for exactly what it needs, the moment it needs it. Better data beats a smarter model.',
    ],
    image: '/assets/renders/feature_ai.svg',
  },
  {
    title: 'Built to run thousands of services.',
    descriptions: [
      'Centralized governance, Kubernetes and Linux VMs, RBAC, SSO, OpenTelemetry native, zero lock-in. The same install scales from ten services to tens of thousands without changing how your teams work.',
    ],
    image: '/assets/renders/feature_scale.svg',
  },
];

export const FeatureSections = () => {
  const { isMobile } = useMobile();
  const size = getImageSize(isMobile);

  return (
    <ConstrainedWrapper $isMobile={isMobile} $paddingTop={32} $paddingBottom={32}>
      <FlexColumn $gap={isMobile ? 32 : 64}>
        {FEATURES.map(({ title, descriptions, image }, i) => (
          <Section key={title} $isMobile={isMobile} $inverted={i % 2 === 1}>
            <TextContent $isMobile={isMobile}>
              <TextLayers title={title} descriptions={descriptions} />
            </TextContent>
            <WrapRender $isMobile={isMobile}>
              <Image src={image} alt='' width={size} height={size} />
            </WrapRender>
          </Section>
        ))}
      </FlexColumn>
    </ConstrainedWrapper>
  );
};
