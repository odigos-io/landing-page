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
              <Eyebrow $light>Measured in production</Eyebrow>
              <h2>
                Cheaper than the agent <span className='mute'>you are already running.</span>
              </h2>
              <p>eBPF runs outside your process, so depth stops costing you throughput. One Fortune 500 customer benchmarked us against their legacy bytecode agent on the same traces, across 1.04 million cores. Another, one of the largest retailers in the world, built its own regression agent in-house on this data.</p>
            </Copy>

            <Stats>
              <Stat>
                <span className='n'>
                  &lt; <em>1%</em>
                </span>
                <span className='t'>
                  CPU overhead, out of process. <b>Safe to leave on across all of production.</b>
                </span>
              </Stat>
              <Stat>
                <span className='n'>
                  <em>27.6%</em>
                </span>
                <span className='t'>
                  less CPU than their legacy bytecode agent at the top of the range they measured, <b>on identical traces</b>, on their own hardware.
                </span>
              </Stat>
              <Stat>
                <span className='n'>
                  <em>1.04M</em>
                </span>
                <span className='t'>
                  cores under measurement when they ran it. <b>Zero code changes to capture something new.</b>
                </span>
              </Stat>
            </Stats>
            <Note>// 11 enterprises in production, SOC 2 audited</Note>
          </Slab>
        </Reveal>
      </Inner>
    </Section>
  );
};
