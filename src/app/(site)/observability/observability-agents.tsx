'use client';

import React from 'react';
import styled from 'styled-components';
import { Container, Eyebrow, Reveal } from '@/containers/landing/primitives';

/* Coding agents are a reader of the same record, not a product. One short
   section, anchored so the home door can land here. */

const Section = styled.section`
  background: var(--paper);
  border-bottom: 1px solid var(--line);
  scroll-margin-top: 84px;
`;

const Inner = styled(Container)`
  padding-top: 96px;
  padding-bottom: 96px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
  > * {
    min-width: 0;
  }
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    gap: 36px;
    padding-top: 64px;
    padding-bottom: 64px;
  }
`;

const Copy = styled.div`
  h2 {
    margin: 18px 0 0;
    font-size: clamp(28px, 3.6vw, 46px);
    line-height: 1.05;
    font-weight: 600;
    letter-spacing: -0.035em;
    color: var(--ink);
  }
  h2 .mute {
    display: block;
    color: var(--ink-faint);
  }
  p {
    margin: 20px 0 0;
    max-width: 560px;
    font-size: 18px;
    line-height: 1.6;
    color: var(--ink-soft);
  }
  .tools {
    margin-top: 22px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .tools span {
    font-family: var(--font-mono), monospace;
    font-size: 11.5px;
    letter-spacing: 0.02em;
    color: var(--ink-mute);
    padding: 6px 11px;
    border-radius: 999px;
    border: 1px solid var(--line-strong);
    background: var(--paper-2);
  }
`;

const Prompt = styled.div`
  border-radius: var(--r-lg);
  overflow: hidden;
  border: 1px solid var(--panel-line);
  background: var(--panel);
  box-shadow: var(--shadow-panel);
  padding: 22px 24px 20px;
  font-family: var(--font-mono), monospace;
  .q {
    display: flex;
    gap: 10px;
    font-size: 13.5px;
    line-height: 1.55;
    color: #fff;
  }
  .q .pmt {
    color: var(--accent);
    flex: none;
  }
  .a {
    margin-top: 14px;
    display: flex;
    gap: 10px;
    font-size: 13px;
    line-height: 1.55;
    color: var(--panel-mute);
  }
  .a .pmt {
    color: var(--signal-bright);
    flex: none;
  }
  .a b {
    color: var(--panel-ink);
    font-weight: 500;
  }
  .t {
    margin-top: 16px;
    padding-top: 14px;
    border-top: 1px solid var(--panel-line);
    font-size: 10.5px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--panel-mute);
  }
`;

export const ObservabilityAgents = () => (
  <Section id='coding-agents'>
    <Inner>
      <Reveal>
        <Copy>
          <Eyebrow>For coding agents</Eyebrow>
          <h2>
            Wrote it at 14:30. <span className='mute'>Checked it at 14:31.</span>
          </h2>
          <p>
            Claude Code, Cursor, Copilot and the agents you build ship faster than anyone can watch. After each deploy they ask the same record what their change did on real requests, so the fix
            is in the next commit, not the next incident. Same approvals, masking and audit as an engineer.
          </p>
          <div className='tools'>
            <span>Claude Code</span>
            <span>Cursor</span>
            <span>Copilot</span>
            <span>your own agents</span>
          </div>
        </Copy>
      </Reveal>
      <Reveal delay={80}>
        <Prompt>
          <div className='q'>
            <span className='pmt' aria-hidden>❯</span>
            <span>Did the retry change I shipped at 14:30 do what I meant?</span>
          </div>
          <div className='a'>
            <span className='pmt' aria-hidden>✓</span>
            <span>
              <b>No. Every failed payment now retries against the slow region.</b> Latency on payments-api is 3x since the deploy. Revert one flag.
            </span>
          </div>
          <div className='t'>checked against live production · 14:31</div>
        </Prompt>
      </Reveal>
    </Inner>
  </Section>
);
