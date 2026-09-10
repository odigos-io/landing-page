'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Container } from '@/containers/landing/primitives';

const Section = styled.section`
  padding: 88px 0;
  background: var(--paper);
  border-bottom: 1px solid var(--line);
  @media (max-width: 850px) {
    padding: 60px 0;
  }
`;
const Head = styled.div`
  max-width: 820px;
  h2 {
    margin: 0;
    max-width: 24ch;
    font-size: clamp(30px, 3.6vw, 46px);
    line-height: 1.08;
    letter-spacing: -0.035em;
    font-weight: 600;
    text-wrap: balance;
  }
  p {
    margin: 24px 0 0;
    max-width: 70ch;
    color: var(--ink-soft);
    font-size: 18px;
    line-height: 1.65;
  }
`;
const Comparison = styled.div`
  margin-top: 44px;
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  border: 1px solid var(--line-strong);
  border-radius: var(--r-lg);
  overflow: hidden;
  > * {
    min-width: 0;
  }
  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    margin-top: 32px;
  }
`;
const Fixed = styled.div`
  padding: 36px;
  background: var(--paper-3);
  h3 {
    margin: 8px 0 30px;
    font-size: 26px;
    line-height: 1.2;
    font-weight: 600;
    letter-spacing: -0.025em;
  }
  .label {
    font-size: 13px;
    color: var(--ink-mute);
  }
  dl {
    margin: 0;
  }
  dl > div {
    padding: 23px 0;
    border-top: 1px solid var(--line-strong);
  }
  dt {
    font-size: 16px;
    font-weight: 600;
  }
  dd {
    margin: 10px 0 0;
    color: var(--ink-soft);
    font-size: 15.5px;
    line-height: 1.65;
  }
  .limit {
    margin: 12px 0 0;
    padding-top: 24px;
    border-top: 1px solid var(--line-strong);
    font-size: 16px;
    line-height: 1.6;
    color: var(--ink-soft);
  }
  .limit strong {
    display: block;
    margin-bottom: 8px;
    color: var(--ink);
    font-weight: 600;
  }
  @media (max-width: 500px) {
    padding: 26px 24px;
  }
`;
const Dynamic = styled.div`
  padding: 36px;
  background: var(--paper-2);
  border-left: 1px solid var(--line-strong);
  .label {
    color: var(--accent);
    font-size: 13px;
  }
  h3 {
    margin: 8px 0 26px;
    font-size: 26px;
    line-height: 1.2;
    font-weight: 600;
    letter-spacing: -0.025em;
  }
  .question {
    margin: 0;
    font-size: 18px;
    font-weight: 500;
    line-height: 1.5;
  }
  .trace {
    margin: 8px 0 24px;
    color: var(--ink-soft);
    font-size: 14px;
    line-height: 1.6;
  }
  ol {
    list-style: none;
    padding: 0 0 0 20px;
    margin: 0;
    border-left: 1px solid #d8d0ff;
  }
  li {
    position: relative;
  }
  li + li {
    margin-top: 24px;
  }
  li::before {
    content: '';
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    left: -24px;
    top: 7px;
    background: var(--accent);
  }
  h4 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
  }
  .function {
    display: block;
    margin-top: 10px;
    font-family: var(--font-mono), monospace;
    font-size: 12px;
    line-height: 1.7;
    color: var(--accent);
    overflow-wrap: anywhere;
  }
  .timing {
    margin: 8px 0 0;
    font-size: 13px;
    line-height: 1.6;
    color: var(--ink-mute);
  }
  .answer {
    margin: 18px 0 0;
    padding: 15px 18px;
    border-radius: 10px;
    background: #e5f5ee;
    color: #176347;
    font-size: 14px;
    line-height: 1.6;
    strong {
      font-weight: 600;
    }
  }
  .source {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    margin-top: 14px;
    font-size: 13px;
    color: var(--ink-soft);
    text-underline-offset: 4px;
  }
  @media (max-width: 850px) {
    border-left: none;
    border-top: 1px solid var(--line-strong);
  }
  @media (max-width: 500px) {
    padding: 26px 24px;
  }
`;
const Evidence = styled.dl`
  margin: 12px 0 0;
  padding: 14px 18px;
  border-radius: 10px;
  background: var(--panel);
  color: var(--panel-ink);
  font-family: var(--font-mono), monospace;
  font-size: 12px;
  line-height: 1.8;
  > div {
    display: flex;
    justify-content: space-between;
    gap: 16px;
  }
  dt {
    color: #bebec7;
  }
  dd {
    margin: 0;
  }
  .rejected {
    color: #f5a1bd;
  }
`;
export const DynamicInstrumentation = () => (
  <Section aria-labelledby='dynamic-title'>
    <Container>
      <Head>
        <h2 id='dynamic-title'>Your AI can change what production captures.</h2>
        <p>
          Manual logs and conventional automatic traces capture what was chosen in advance. When an investigation needs more, dynamic instrumentation lets your
          agent collect new evidence from the running service. No instrumentation release.
        </p>
      </Head>
      <Comparison>
        <Fixed>
          <span className='label'>Predefined coverage</span>
          <h3>Decided before the question.</h3>
          <dl>
            <div>
              <dt>Manual instrumentation</dt>
              <dd>Developers choose which logs, spans and values to add to application code.</dd>
            </div>
            <div>
              <dt>Conventional auto-instrumentation</dt>
              <dd>Integrations provide ready-made traces for supported libraries and operations.</dd>
            </div>
          </dl>
          <p className='limit'>
            <strong>New question. Same capture points.</strong>
            AI can query the telemetry you collect. A missing function or value still needs new instrumentation.
          </p>
        </Fixed>
        <Dynamic>
          <span className='label'>Dynamic instrumentation with Odigos</span>
          <h3>Directed by the investigation.</h3>
          <p className='question'>Which decision rejected this order?</p>
          <p className='trace'>The trace shows checkout failed. Inventory succeeded; payment never ran.</p>
          <ol>
            <li>
              <h4>The agent requests function capture through MCP</h4>
              <code className='function'>
                FulfillmentGate.
                <wbr />
                assessPipelineCoherence
              </code>
            </li>
            <li>
              <h4>The next failed request reveals the values</h4>
              <Evidence>
                <div>
                  <dt>region</dt>
                  <dd>eu-west</dd>
                </div>
                <div>
                  <dt>replica skew</dt>
                  <dd>47 ms</dd>
                </div>
                <div>
                  <dt>threshold in code</dt>
                  <dd>10 ms</dd>
                </div>
                <div>
                  <dt>decision</dt>
                  <dd className='rejected'>rejected</dd>
                </div>
              </Evidence>
              <p className='timing'>Targeted capture on live traffic. Nothing redeployed.</p>
            </li>
          </ol>
          <p className='answer'>
            <strong>47 ms is normal for eu-west.</strong> The code applies the same 10 ms limit to both regions, rejecting healthy checkouts.
          </p>
          <Link className='source' href='/blog/cursormcpblog'>
            From the OdiShop demo · Read the walkthrough
          </Link>
        </Dynamic>
      </Comparison>
    </Container>
  </Section>
);
