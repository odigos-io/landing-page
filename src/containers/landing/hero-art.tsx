'use client';

import React from 'react';
import styled, { keyframes, css } from 'styled-components';

/* Hero art: a question, and production answering.

   Two exchanges, nothing more. The first answer is useless, which is the
   whole reason the second question exists. The second answer is the money.
   No diagram, no waterfall, no hex. If a VP of engineering cannot read this
   in four seconds it is wrong. */

const T = 8.4;
const p = (s: number) => Math.max(0, Math.min(100, (s / T) * 100));

const fin = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0;transform:translateY(8px)}
  ${p(s + 0.55)}%,100%{opacity:1;transform:translateY(0)}`;

const popIn = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0;transform:scale(.93)}
  ${p(s + 0.5)}%,100%{opacity:1;transform:scale(1)}`;

const drop = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0;transform:scaleY(0)}
  ${p(s + 0.3)}%,100%{opacity:1;transform:scaleY(1)}`;

const float = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}`;
const blink = keyframes`0%,100%{opacity:.35}50%{opacity:1}`;

const reduce = css`
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: none;
  }
`;

const Frame = styled.div`
  animation: ${float} 16s ease-in-out infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Panel = styled.div`
  position: relative;
  border-radius: 20px;
  border: 1px solid rgba(91, 67, 241, 0.16);
  background: var(--paper-2);
  box-shadow: var(--shadow-panel);
  padding: 34px 34px 26px;
  @media (max-width: 1000px) {
    padding: 26px 22px 22px;
  }
`;

const Step = styled.div<{ $t: number }>`
  animation: ${(x) => fin(x.$t)} ${T}s cubic-bezier(0.16, 1, 0.3, 1) both;
  ${reduce}
`;

const Tag = styled.div<{ $tone?: 'ask' | 'back' }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 10.5px;
  letter-spacing: 0.17em;
  text-transform: uppercase;
  color: ${({ $tone }) => ($tone === 'ask' ? 'var(--accent)' : 'var(--ink-faint)')};

  svg {
    flex-shrink: 0;
  }
`;

const Ask = styled.div`
  margin-top: 9px;
  font-size: clamp(17px, 1.65vw, 21px);
  line-height: 1.34;
  letter-spacing: -0.018em;
  font-weight: 550;
  color: var(--ink);
`;

const Flat = styled.div`
  margin-top: 9px;
  font-size: clamp(16px, 1.5vw, 19px);
  line-height: 1.4;
  letter-spacing: -0.012em;
  color: var(--ink-faint);
`;

const Arrow = styled.div<{ $t: number }>`
  margin: 18px 0 18px 4px;
  width: 22px;
  color: rgba(91, 67, 241, 0.55);
  transform-origin: top center;
  animation: ${(x) => drop(x.$t)} ${T}s cubic-bezier(0.16, 1, 0.3, 1) both;
  ${reduce}

  svg {
    display: block;
  }
`;

const Rule = styled.div`
  margin: 26px 0;
  height: 1px;
  background: var(--line);
`;

const Answer = styled.div<{ $t: number }>`
  margin-top: 12px;
  display: flex;
  align-items: baseline;
  gap: 16px;
  flex-wrap: wrap;
  transform-origin: left center;
  animation: ${(x) => popIn(x.$t)} ${T}s cubic-bezier(0.16, 1, 0.3, 1) both;
  ${reduce}

  .val {
    font-size: clamp(40px, 4.4vw, 56px);
    font-weight: 600;
    letter-spacing: -0.045em;
    line-height: 1;
    color: var(--ink);
  }
  .was {
    font-size: clamp(14px, 1.3vw, 16px);
    color: var(--hot-ink);
    text-decoration: line-through;
    text-decoration-color: rgba(201, 52, 106, 0.5);
  }
`;

const Blast = styled.div`
  margin-top: 14px;
  font-size: clamp(15.5px, 1.45vw, 18px);
  line-height: 1.45;
  color: var(--ink-soft);
  b {
    font-weight: 600;
    color: var(--ink);
  }
`;

const Foot = styled.div<{ $t: number }>`
  margin-top: 26px;
  padding-top: 18px;
  border-top: 1px solid var(--line);
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 12px;
  color: var(--signal-ink);
  animation: ${(x) => fin(x.$t)} ${T}s cubic-bezier(0.16, 1, 0.3, 1) both;
  ${reduce}

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--signal);
    animation: ${blink} 1.8s ease-in-out infinite;
  }
  .sep {
    color: var(--line-strong);
  }
  .mute {
    color: var(--ink-faint);
  }
  @media (prefers-reduced-motion: reduce) {
    .dot {
      animation: none;
    }
  }
`;

const ConnectIcon = () => (
  <svg width='14' height='30' viewBox='0 0 14 30' fill='none' aria-hidden>
    <path d='M2 0v22m-1.6 0L2 24l1.6-2' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

const DownIcon = () => (
  <svg width='11' height='11' viewBox='0 0 12 12' fill='none' aria-hidden>
    <path d='M6 1v9m-3.2-3.2L6 10l3.2-3.2' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);
const UpIcon = () => (
  <svg width='11' height='11' viewBox='0 0 12 12' fill='none' aria-hidden>
    <path d='M6 11V2m-3.2 3.2L6 2l3.2 3.2' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

export const HeroArt = () => (
  <Frame>
    <Panel>
      <Step $t={0.1}>
        <Tag $tone='ask'>
          <DownIcon />
          you ask
        </Tag>
        <Ask>Why is checkout revenue down 12% this week?</Ask>
      </Step>

      <Arrow $t={0.9}>
        <ConnectIcon />
      </Arrow>

      <Step $t={1.2}>
        <Tag>
          <UpIcon />
          production
        </Tag>
        <Flat>Nothing is failing. No errors, no slow requests, every check green.</Flat>
      </Step>

      <Rule />

      <Step $t={2.6}>
        <Tag $tone='ask'>
          <DownIcon />
          so you ask again
        </Tag>
        <Ask>What discount did the promo code actually give those customers?</Ask>
      </Step>

      <Arrow $t={3.6}>
        <ConnectIcon />
      </Arrow>

      <Step $t={4.0}>
        <Tag>
          <UpIcon />
          production
        </Tag>
        <Answer $t={4.4}>
          <span className='val'>$0.00</span>
          <span className='was'>should have been $24.50</span>
        </Answer>
        <Blast>
          On <b>41,208 orders</b> over six days. Nothing ever threw an error.
        </Blast>
      </Step>

      <Foot $t={5.6}>
        <i className='dot' />
        answered in 4 seconds
        <span className='sep'>·</span>
        <span className='mute'>no code change</span>
        <span className='sep'>·</span>
        <span className='mute'>no redeploy</span>
      </Foot>
    </Panel>
  </Frame>
);
