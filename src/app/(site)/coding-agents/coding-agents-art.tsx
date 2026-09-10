'use client';

import React from 'react';
import styled from 'styled-components';

const Window = styled.figure`
  margin: 0;
  border: 1px solid var(--line-strong);
  border-radius: var(--r-lg);
  overflow: hidden;
  box-shadow: var(--shadow-panel);
  background: var(--paper-2);
  .bar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 17px 22px;
    border-bottom: 1px solid var(--line);
    font-size: 13px;
  }
  .mark {
    color: var(--accent);
    font-family: var(--font-mono), monospace;
    font-weight: 500;
  }
  .example {
    margin-left: auto;
    color: var(--ink-mute);
    font-size: 12px;
  }
  figcaption {
    padding: 16px 22px;
    font-size: 12px;
    line-height: 1.6;
    color: var(--ink-mute);
  }
`;
const Conversation = styled.div`
  padding: 26px 24px;
  .question {
    font-size: 19px;
    line-height: 1.4;
    font-weight: 500;
    letter-spacing: -0.02em;
    margin-bottom: 26px;
  }
  .step {
    border-left: 1px solid var(--line-strong);
    padding: 0 0 22px 20px;
    position: relative;
  }
  .step:last-child {
    padding-bottom: 0;
  }
  .step::before {
    position: absolute;
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--accent);
    top: 5px;
    left: -4px;
  }
  .label {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    font-size: 13px;
    font-weight: 500;
  }
  .source {
    font-weight: 400;
    color: var(--ink-mute);
    font-size: 12px;
  }
  p {
    margin: 8px 0 0;
    font-size: 13px;
    line-height: 1.6;
    color: var(--ink-soft);
  }
  @media (max-width: 450px) {
    padding: 22px 18px;
    .label {
      flex-wrap: wrap;
      gap: 4px;
    }
  }
`;
const Capture = styled.div`
  margin-top: 12px;
  border-radius: 10px;
  background: var(--panel);
  padding: 17px;
  font-family: var(--font-mono), monospace;
  font-size: 12px;
  line-height: 1.8;
  color: var(--panel-ink);
  .method {
    display: block;
    color: #beb4e6;
    overflow-wrap: anywhere;
    margin-bottom: 8px;
  }
  .row {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
  .key {
    color: #a6a6b1;
  }
  .fail {
    color: #ff8ab0;
  }
`;

export const CodingAgentsArt = () => (
  <Window>
    <div className='bar'>
      <span className='mark' aria-hidden>
        {'>_'}
      </span>
      <span>Agent + production context</span>
      <span className='example'>Walkthrough</span>
    </div>
    <Conversation>
      <div className='question'>Why are checkouts failing in eu-west?</div>
      <div className='step'>
        <div className='label'>
          Follow the failed request<span className='source'>Trace backend</span>
        </div>
        <p>Inventory succeeded. The order service rejected the request before payment.</p>
      </div>
      <div className='step'>
        <div className='label'>
          Request the missing evidence<span className='source'>Odigos MCP</span>
        </div>
        <p>Capture the decision inside the Java method.</p>
        <Capture>
          <span className='method'>FulfillmentGate.assessPipelineCoherence</span>
          <div className='row'>
            <span className='key'>region</span>
            <span>eu-west</span>
          </div>
          <div className='row'>
            <span className='key'>replica skew</span>
            <span>47 ms</span>
          </div>
          <div className='row'>
            <span className='key'>threshold</span>
            <span>10 ms</span>
          </div>
          <div className='row'>
            <span className='key'>decision</span>
            <span className='fail'>rejected</span>
          </div>
        </Capture>
      </div>
      <div className='step'>
        <div className='label'>
          Make the fix specific<span className='source'>Repository</span>
        </div>
        <p>The same threshold is applied to both regions. Update the regional policy, then verify checkout after deployment.</p>
      </div>
    </Conversation>
    <figcaption>Adapted from the OdiShop demo. Odigos controls instrumentation; the configured backend provides trace data.</figcaption>
  </Window>
);
