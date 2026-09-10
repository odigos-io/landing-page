'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Container } from './primitives';

const Section = styled.section`
  background: var(--paper);
  border-bottom: 1px solid var(--line);
  scroll-margin-top: 90px;
`;
const Inner = styled(Container)`
  padding-block: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  h2 {
    margin: 0;
    font-size: 24px;
    line-height: 1.25;
    font-weight: 600;
    letter-spacing: -0.025em;
  }
  p {
    margin: 10px 0 0;
    max-width: 65ch;
    color: var(--ink-soft);
    font-size: 15px;
    line-height: 1.6;
  }
  a {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    color: var(--accent);
    font-size: 14px;
    text-underline-offset: 4px;
  }
  @media (max-width: 750px) {
    flex-direction: column;
    align-items: start;
    gap: 12px;
  }
`;
const NEXT = {
  observability: {
    title: 'Found the cause? Help your agent fix it.',
    body: 'Carry the function, values and failure path into a targeted code change. Then verify the deployed fix against fresh traffic.',
    href: '/coding-agents',
    label: 'Explore coding agents',
  },
  security: {
    title: 'Deep visibility. Outside the application.',
    body: 'See how DeepBPF inspects running applications from the outside, with kernel-enforced constraints and capture controls for your team.',
    href: '/technology',
    label: 'Explore the technology',
  },
  'coding-agents': {
    title: 'Give the next investigation a head start.',
    body: 'See how automatic coverage and Autofocus bring more evidence into your telemetry before an agent asks for it.',
    href: '/observability',
    label: 'Explore observability',
  },
};
export const PlatformBridge = ({ current = 'observability', id }: { current?: keyof typeof NEXT; id?: string }) => {
  const next = NEXT[current];
  return (
    <Section id={id}>
      <Inner>
        <div>
          <h2>{next.title}</h2>
          <p>{next.body}</p>
        </div>
        <Link href={next.href}>{next.label}</Link>
      </Inner>
    </Section>
  );
};
