'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Container } from './primitives';
import { CaptureVisual } from './capture-visual';

const Section = styled.section`
  background: var(--paper);
  border-bottom: 1px solid var(--line);
`;
const Inner = styled(Container)`
  padding-block: 96px;
  @media (max-width: 850px) {
    padding-block: 64px;
  }
`;
const Head = styled.div`
  max-width: 820px;
  h2 {
    margin: 0;
    max-width: 23ch;
    font-size: clamp(30px, 3.8vw, 48px);
    line-height: 1.08;
    letter-spacing: -0.035em;
    font-weight: 600;
    text-wrap: balance;
  }
  p {
    margin: 22px 0 0;
    max-width: 65ch;
    font-size: 18px;
    line-height: 1.65;
    color: var(--ink-soft);
  }
`;
const Investigation = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 56px;
  margin-top: 48px;
  align-items: start;
  > * {
    min-width: 0;
  }
  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;
const Steps = styled.ol`
  grid-column: 1;
  grid-row: 1;
  @media (max-width: 960px) {
    grid-row: 2;
  }
  margin: 0;
  padding: 0;
  list-style: none;
  counter-reset: steps;
  li {
    position: relative;
    padding: 0 0 28px 42px;
    counter-increment: steps;
  }
  li:not(:last-child)::after {
    content: '';
    position: absolute;
    left: 12px;
    top: 30px;
    bottom: 7px;
    width: 1px;
    background: var(--line-strong);
  }
  li::before {
    content: counter(steps);
    position: absolute;
    left: 0;
    top: 0;
    width: 26px;
    height: 26px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    color: var(--accent);
    background: var(--accent-soft);
    font-size: 13px;
    font-weight: 600;
  }
  h3 {
    margin: 0;
    font-size: 19px;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.4;
  }
  p {
    margin: 9px 0 0;
    font-size: 15.5px;
    line-height: 1.65;
    color: var(--ink-soft);
  }
`;
const Proof = styled.figure`
  grid-column: 2;
  grid-row: 1;
  @media (max-width: 960px) {
    grid-column: 1;
  }
  margin: 0;
  border: 1px solid var(--line-strong);
  border-radius: var(--r-lg);
  overflow: hidden;
  background: var(--paper-2);
  .intro {
    padding: 28px 30px 24px;
  }
  .label {
    font-size: 13px;
    color: var(--ink-mute);
  }
  h3 {
    margin: 12px 0 0;
    font-size: 25px;
    line-height: 1.2;
    font-weight: 600;
    letter-spacing: -0.025em;
    text-wrap: balance;
  }
  figcaption {
    padding: 22px 30px 26px;
  }
  p {
    margin: 0;
    font-size: 15px;
    line-height: 1.65;
    color: var(--ink-soft);
  }
  strong {
    color: var(--ink);
    font-weight: 600;
  }
  .proof-links {
    display: flex;
    flex-wrap: wrap;
    column-gap: 22px;
  }
  .source {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    margin-top: 8px;
    color: var(--accent);
    font-size: 14px;
    text-underline-offset: 4px;
  }
  @media (max-width: 500px) {
    .intro,
    figcaption {
      padding: 24px;
    }
  }
`;
const Deployment = styled.div`
  margin-top: 28px;
  padding-top: 28px;
  border-top: 1px solid var(--line-strong);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  p {
    margin: 0;
    max-width: 75ch;
    font-size: 15px;
    line-height: 1.65;
    color: var(--ink-soft);
  }
  strong {
    color: var(--ink);
    font-weight: 600;
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
    align-items: start;
    flex-direction: column;
    gap: 8px;
  }
`;

export const LandingFit = () => (
  <Section aria-labelledby='investigation-title'>
    <Inner>
      <Head>
        <h2 id='investigation-title'>Give AI the power to investigate production.</h2>
        <p>
          Your agent has a question. The answer isn’t in your telemetry yet. Odigos lets it collect the missing evidence from running code—without waiting for
          an instrumentation release.
        </p>
      </Head>
      <Investigation>
        <Proof>
          <div className='intro'>
            <span className='label'>Inside the OdiShop demo · Cursor + Odigos + Jaeger</span>
            <h3>A failed checkout. One function. The missing answer.</h3>
          </div>
          <CaptureVisual />
          <figcaption>
            <p>
              <strong>A global 10 ms limit was rejecting healthy EU orders.</strong> The agent requested this capture through Odigos. The next failed request
              exposed the region, the 47 ms skew and the decision that stopped checkout.
            </p>
            <div className='proof-links'>
              <Link className='source' href='/blog/cursormcpblog'>
                See the capture, code change and verified fix
              </Link>
              <a className='source' href='/assets/blogs/cursormcpblog/jaeger-trace-step-7.png' target='_blank' rel='noopener noreferrer'>
                View the original capture
              </a>
            </div>
          </figcaption>
        </Proof>
        <Steps>
          <li>
            <h3>The agent decides what to investigate.</h3>
            <p>It follows a trace, reads the code and identifies the function or value it needs to see.</p>
          </li>
          <li>
            <h3>Odigos changes what gets captured.</h3>
            <p>
              Through MCP, the agent requests targeted instrumentation. Odigos DeepBPF uses eBPF to capture selected function arguments and return values on
              subsequent matching traffic.
            </p>
          </li>
          <li>
            <h3>The evidence comes back through your tools.</h3>
            <p>
              Evidence arrives as matching requests run. New spans go to your telemetry backend as OpenTelemetry, where the agent can read them and continue.
            </p>
          </li>
        </Steps>
      </Investigation>
      <Deployment>
        <p>
          <strong>Your agent. Your backend. Odigos in between.</strong> Deploy Odigos alongside your workloads and connect its Enterprise MCP server to your
          agent. Your team sets the capture scope and permissions.
        </p>
        <Link href='/technology'>See how it connects</Link>
      </Deployment>
    </Inner>
  </Section>
);
