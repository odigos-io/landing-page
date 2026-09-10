'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Container } from './primitives';

const Section = styled.section`
  background: var(--paper);
  border-bottom: 1px solid var(--line);
`;
const Inner = styled(Container)`
  padding-block: 72px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  > * {
    min-width: 0;
  }
  h2 {
    margin: 0;
    max-width: 22ch;
    font-size: clamp(30px, 3.8vw, 48px);
    line-height: 1.08;
    letter-spacing: -0.035em;
    font-weight: 600;
    text-wrap: balance;
  }
  p {
    margin: 0;
    max-width: 54ch;
    font-size: 18px;
    line-height: 1.65;
    color: var(--ink-soft);
  }
  a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    margin-top: 12px;
    color: var(--accent);
    font-size: 15px;
    text-underline-offset: 4px;
  }
  @media (max-width: 850px) {
    padding-block: 48px;
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const LandingFit = () => (
  <Section aria-labelledby='investigation-title'>
    <Inner>
      <h2 id='investigation-title'>Give AI the power to investigate production.</h2>
      <div>
        <p>
          Your agent has a question. The answer isn’t in your telemetry yet. Odigos lets it collect the missing evidence from running code—without waiting for
          an instrumentation release.
        </p>
        <Link href='/technology'>See how it works</Link>
      </div>
    </Inner>
  </Section>
);
