'use client';

import React from 'react';
import styled from 'styled-components';

const Capture = styled.div`
  border-block: 1px solid #34303e;
  background: #101014;
  color: #f4f0fa;
  .function {
    padding: 22px 26px;
    border-bottom: 1px solid #34303e;
    background: #191621;
  }
  .function-label {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 11px;
    color: #c6b4f5;
    font-size: 12px;
    line-height: 1.5;
  }
  .function-name {
    display: block;
    font-family: var(--font-mono), monospace;
    font-size: 14px;
    line-height: 1.65;
    overflow-wrap: anywhere;
  }
  .namespace {
    color: #bbb3cb;
  }
  .arguments {
    padding: 22px 26px 25px;
  }
  .region {
    display: flex;
    align-items: baseline;
    gap: 10px;
    margin: 0;
    font-size: 12px;
    line-height: 1.5;
  }
  .region dt {
    color: #b9b4c5;
  }
  .region dd {
    margin: 0;
    color: #d9caf8;
    font-family: var(--font-mono), monospace;
  }
  .comparison {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 28px minmax(0, 1fr);
    align-items: center;
    gap: 20px;
    margin-top: 22px;
  }
  .measure-label {
    display: block;
    color: #c3becd;
    font-size: 12px;
    line-height: 1.5;
  }
  .number {
    display: block;
    margin-top: 5px;
    color: #f4f0fa;
    font-size: 40px;
    line-height: 1.2;
    font-weight: 500;
    letter-spacing: -0.04em;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  .number small {
    margin-left: 5px;
    font-size: 17px;
    letter-spacing: 0;
    font-weight: 400;
  }
  .observed .number {
    color: #f5b2ca;
  }
  .field {
    display: block;
    margin-top: 7px;
    color: #b9b4c5;
    font-family: var(--font-mono), monospace;
    font-size: 11px;
    line-height: 1.5;
  }
  .greater-than {
    margin-top: 4px;
    color: #a89abc;
    font-size: 26px;
    line-height: 1;
    text-align: center;
  }
  .decision {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 20px 26px;
    border-top: 1px solid #4a3342;
    background: #211820;
  }
  .decision-label {
    margin-bottom: 7px;
    color: #d3b9c5;
    font-size: 12px;
    line-height: 1.5;
  }
  .return-value {
    color: #f4f0fa;
    font-family: var(--font-mono), monospace;
    font-size: 16px;
    line-height: 1.5;
  }
  .return-value b {
    color: #f5b2ca;
    font-weight: 500;
  }
  .reason {
    margin-top: 5px;
    color: #d3b9c5;
    font-family: var(--font-mono), monospace;
    font-size: 12px;
    line-height: 1.5;
    overflow-wrap: anywhere;
  }
  .rejected {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 7px;
    color: #f5b2ca;
    font-size: 12px;
    line-height: 1.5;
  }
  .provenance {
    padding: 12px 26px;
    border-top: 1px solid #34303e;
    color: #b9b4c5;
    font-size: 11px;
    line-height: 1.5;
  }
  @media (max-width: 500px) {
    .function,
    .arguments,
    .decision,
    .provenance {
      padding-inline: 20px;
    }
    .function-name {
      font-size: 12px;
    }
    .comparison {
      gap: 10px;
      grid-template-columns: minmax(0, 1fr) 18px minmax(0, 1fr);
    }
    .number {
      font-size: 34px;
    }
    .number small {
      font-size: 15px;
    }
    .decision {
      align-items: start;
      flex-direction: column;
      gap: 12px;
    }
  }
`;

export const CaptureVisual = () => (
  <Capture role='group' aria-label='OdiShop function capture, recreated for readability'>
    <div className='function'>
      <div className='function-label'>
        <svg width='15' height='15' viewBox='0 0 15 15' fill='none' aria-hidden>
          <path d='M5 2H2v3m8-3h3v3M2 10v3h3m5 0h3v-3M5.5 7.5h4m-2-2v4' stroke='currentColor' strokeWidth='1.2' strokeLinecap='round' />
        </svg>
        Captured function
      </div>
      <code className='function-name'>
        <span className='namespace'>FulfillmentGate.</span>
        <wbr />
        assessPipelineCoherence
      </code>
    </div>
    <div className='arguments'>
      <dl className='region'>
        <dt>Captured region</dt>
        <dd>eu-west</dd>
      </dl>
      <div className='comparison'>
        <div className='observed'>
          <span className='measure-label'>Replica skew</span>
          <span className='number'>47<small>ms</small></span>
          <code className='field'>replicaSkewMs</code>
        </div>
        <span className='greater-than'>&gt;</span>
        <div>
          <span className='measure-label'>Limit in code</span>
          <span className='number'>10<small>ms</small></span>
          <code className='field'>thresholdMs</code>
        </div>
      </div>
    </div>
    <div className='decision'>
      <div>
        <div className='decision-label'>Returned decision</div>
        <code className='return-value'>allowed = <b>false</b></code>
        <div className='reason'>Reason: skew exceeded</div>
      </div>
      <span className='rejected'>
        <svg width='15' height='15' viewBox='0 0 15 15' fill='none' aria-hidden>
          <circle cx='7.5' cy='7.5' r='6' stroke='currentColor' strokeWidth='1.2' />
          <path d='m5.5 5.5 4 4m0-4-4 4' stroke='currentColor' strokeWidth='1.2' strokeLinecap='round' />
        </svg>
        Checkout rejected
      </span>
    </div>
    <div className='provenance'>Recreated from the OdiShop capture</div>
  </Capture>
);
