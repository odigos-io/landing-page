'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Container } from '@/containers/landing/primitives';

const Section = styled.section`
  background: var(--paper-3);
  border-bottom: 1px solid var(--line);
`;
const Inner = styled(Container)`
  padding-block: 88px;
  @media (max-width: 850px) {
    padding-block: 64px;
  }
`;
const EvidenceLoop = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 72px;
  align-items: center;
  .label {
    color: var(--accent);
    font-size: 14px;
    font-weight: 500;
  }
  h2 {
    margin: 16px 0 0;
    font-size: clamp(30px, 3.5vw, 44px);
    line-height: 1.1;
    letter-spacing: -0.035em;
    font-weight: 600;
    text-wrap: balance;
  }
  p {
    margin: 22px 0 0;
    font-size: 17px;
    line-height: 1.65;
    color: var(--ink-soft);
  }
  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;
const Sequence = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
  border: 1px solid var(--line-strong);
  border-radius: var(--r-lg);
  overflow: hidden;
  background: var(--paper-2);
  li {
    display: grid;
    grid-template-columns: 24px 1fr;
    gap: 20px;
    padding: 26px 30px;
  }
  li + li {
    border-top: 1px solid var(--line);
  }
  svg {
    color: var(--accent);
    margin-top: 2px;
  }
  strong {
    font-size: 17px;
    font-weight: 600;
  }
  p {
    margin: 7px 0 0;
    font-size: 15px;
    line-height: 1.6;
  }
  li:last-child {
    background: var(--accent-soft);
  }
  @media (max-width: 500px) {
    li {
      padding: 24px;
      gap: 15px;
    }
  }
`;
const Operations = styled.div`
  margin-top: 64px;
  padding-top: 36px;
  border-top: 1px solid var(--line-strong);
  h3 {
    margin: 0;
    font-size: 25px;
    font-weight: 600;
    letter-spacing: -0.025em;
    line-height: 1.25;
  }
  dl {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 32px;
    margin: 28px 0 18px;
  }
  dt {
    font-size: 16px;
    font-weight: 600;
  }
  dd {
    margin: 10px 0 0;
    font-size: 15px;
    line-height: 1.65;
    color: var(--ink-soft);
  }
  a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    font-size: 14px;
    color: var(--accent);
    text-underline-offset: 4px;
  }
  @media (max-width: 750px) {
    dl {
      grid-template-columns: 1fr;
      gap: 24px;
    }
  }
`;
const Proactive = styled.div`
  margin-top: 40px;
  padding: 26px 30px;
  border-left: 3px solid var(--accent);
  background: var(--accent-soft);
  h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.02em;
  }
  p {
    margin: 12px 0 0;
    max-width: 92ch;
    font-size: 15.5px;
    line-height: 1.65;
    color: var(--ink-soft);
  }
  @media (max-width: 500px) {
    padding: 24px;
  }
`;
const DemoLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  margin-top: 18px;
  color: var(--accent);
  font-size: 14px;
  text-underline-offset: 4px;
`;
const Pulse = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' aria-hidden>
    <path d='M2 12h5l3-7 4 14 3-7h5' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);
const Capture = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' aria-hidden>
    <path d='M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5M8 12h8m-4-4v8' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
  </svg>
);
const Evidence = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' aria-hidden>
    <path d='M5 3h10l4 4v14H5zM9 11h6m-6 4h6' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

export const ObservabilityPlatform = () => (
  <Section>
    <Inner>
      <EvidenceLoop>
        <div>
          <span className='label'>OdiMall demo · Dynatrace workflows + Odigos MCP</span>
          <h2>Go deeper during the incident. Return to baseline after.</h2>
          <p>
            Your incident automation can ask Odigos for more evidence, too. In the OdiMall demo, a Dynatrace workflow added temporary capture when a problem
            opened and removed it when the problem closed.
          </p>
          <p>
            New failing traces carried payloads and code context into the same backend. Detailed capture lasted for the investigation. This demo used configured
            automation, with no LLM in the loop.
          </p>
          <DemoLink href='/blog/mcp-based-auto-remediation-davis-ai-to-odigos-mcp-server-and-back-again'>See the Dynatrace + Odigos demonstration</DemoLink>
        </div>
        <Sequence aria-label='Documented OdiMall incident automation example'>
          <li>
            <Pulse />
            <div>
              <strong>Problem opens in Dynatrace</strong>
              <p>A workflow calls a webhook that requests temporary instrumentation through Odigos MCP.</p>
            </div>
          </li>
          <li>
            <Capture />
            <div>
              <strong>New traces carry the missing detail</strong>
              <p>HTTP payloads, messaging payloads and supported code attributes appear without restarting pods.</p>
            </div>
          </li>
          <li>
            <Evidence />
            <div>
              <strong>Problem closes. Temporary rules come off.</strong>
              <p>The workflow removes the rules through MCP. Capture returns to its baseline.</p>
            </div>
          </li>
        </Sequence>
      </EvidenceLoop>
      <Proactive>
        <h3>Autofocus can start before an agent asks.</h3>
        <p>
          Odigos Autofocus deepens capture when a service’s behavior changes, collecting functions, arguments and return values on the affected path. Engineers
          and agents can begin investigating as that extra evidence arrives in the backend.
        </p>
      </Proactive>
      <Operations>
        <h3>Keep your stack. Give it deeper evidence.</h3>
        <dl>
          <div>
            <dt>Automatic coverage to start</dt>
            <dd>Discover and instrument running services without adding instrumentation to application code. Follow requests across supported runtimes.</dd>
          </div>
          <div>
            <dt>Your existing telemetry backend</dt>
            <dd>Send traces, metrics and logs as OpenTelemetry. Keep the dashboards, alerts and investigation tools your team already uses.</dd>
          </div>
          <div>
            <dt>Your team controls the capture</dt>
            <dd>
              Set scope, permissions and masking centrally. Review capture activity and remove temporary instrumentation when it has answered the question.
            </dd>
          </div>
        </dl>
        <Link href='/technology'>Explore runtime coverage and capture controls</Link>
      </Operations>
    </Inner>
  </Section>
);
