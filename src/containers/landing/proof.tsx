'use client';

import React from 'react';
import styled from 'styled-components';
import { Container, Eyebrow, Reveal } from './primitives';

/* The numbers. Measured, not claimed. Dark band, so it lands with weight
   between the use cases and the customer quote. */

const Section = styled.section`
  background: var(--paper);
  border-bottom: 1px solid var(--line);
`;

const Inner = styled(Container)`
  padding-top: 96px;
  padding-bottom: 96px;
  @media (max-width: 1000px) {
    padding-top: 64px;
    padding-bottom: 64px;
  }
`;

const Slab = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 26px;
  background: linear-gradient(160deg, var(--panel) 0%, var(--panel-2) 100%);
  box-shadow: var(--shadow-panel);
  padding: 52px 56px;
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 48px;
  align-items: center;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    gap: 34px;
    padding: 36px 26px;
  }
`;

const Glow = styled.div`
  position: absolute;
  inset: -40% 40% 40% -20%;
  pointer-events: none;
  background: radial-gradient(closest-side, rgba(123, 93, 255, 0.28), transparent 72%);
`;

const Copy = styled.div`
  position: relative;
  h2 {
    margin: 14px 0 0;
    font-size: clamp(28px, 3.6vw, 46px);
    line-height: 1.1;
    letter-spacing: -0.032em;
    font-weight: 600;
    color: var(--panel-ink);
    .mute {
      color: var(--panel-mute);
    }
  }
  p {
    margin: 18px 0 0;
    font-size: 16px;
    line-height: 1.62;
    color: var(--panel-mute);
    max-width: 460px;
  }
`;

const Stats = styled.div`
  position: relative;
  display: grid;
  gap: 2px;
  background: var(--panel-line);
  border: 1px solid var(--panel-line);
  border-radius: var(--r);
  overflow: hidden;
`;

const Stat = styled.div`
  background: var(--panel-2);
  padding: 22px 24px;
  display: grid;
  grid-template-columns: 132px 1fr;
  align-items: baseline;
  gap: 20px;
  @media (max-width: 620px) {
    grid-template-columns: 1fr;
    gap: 4px;
    padding: 18px 20px;
  }
  .n {
    font-size: clamp(26px, 3vw, 34px);
    font-weight: 600;
    letter-spacing: -0.03em;
    color: var(--panel-ink);
    font-variant-numeric: tabular-nums;
  }
  .n em {
    font-style: normal;
    color: var(--signal-bright);
  }
  .t {
    font-size: 13.5px;
    line-height: 1.5;
    color: var(--panel-mute);
    b {
      color: var(--panel-ink);
      font-weight: 500;
    }
  }
`;

const Note = styled.p`
  position: relative;
  grid-column: 1 / -1;
  margin: 4px 0 0;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 11.5px;
  letter-spacing: 0.02em;
  color: var(--panel-mute);
`;

export const LandingProof = () => {
  return (
    <Section>
      <Inner>
        <Reveal>
          <Slab>
            <Glow />
            <Copy>
              <Eyebrow $light>Benchmarked by a customer</Eyebrow>
              <h2>
                A Fortune 500 measured it on a million cores. <span className='mute'>Cheaper at peak than the bytecode agent it replaced.</span>
              </h2>
              <p>A customer built its own regression-finding AI agent on the same record.</p>
            </Copy>

            <Stats>
              <Stat>
                <span className='n'>
                  &lt; <em>1%</em>
                </span>
                <span className='t'>
                  CPU. <b>Left on across all of production.</b>
                </span>
              </Stat>
              <Stat>
                <span className='n'>
                  up to <em>27.6%</em>
                </span>
                <span className='t'>
                  less CPU. <b>Same traces, their hardware.</b>
                </span>
              </Stat>
            </Stats>
            <Note>// 11 enterprises in production</Note>
          </Slab>
        </Reveal>
      </Inner>
    </Section>
  );
};
