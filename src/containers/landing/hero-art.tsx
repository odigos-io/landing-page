'use client';

import React from 'react';
import styled, { keyframes, css } from 'styled-components';

/* Hero art: the green dashboard, and the bill.

   Top block is every check a platform team owns, all passing, which is what
   the customer's existing spend is able to tell them. Bottom block is what
   it cost while those checks passed. The gap between the two blocks is the
   product. */

const T = 7.6;
const p = (s: number) => Math.max(0, Math.min(100, (s / T) * 100));

const fin = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0;transform:translateY(9px)}
  ${p(s + 0.6)}%,100%{opacity:1;transform:translateY(0)}`;

const bill = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0;transform:translateY(14px) scale(.94)}
  ${p(s + 0.65)}%,100%{opacity:1;transform:none}`;

const float = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}`;
const pulse = keyframes`0%,100%{opacity:.35}50%{opacity:1}`;

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
  border-radius: 20px;
  border: 1px solid rgba(91, 67, 241, 0.16);
  background: var(--paper-2);
  box-shadow: var(--shadow-panel);
  overflow: hidden;
`;

/* ---- what everything they already pay for was able to tell them ---- */
const Green = styled.div<{ $t: number }>`
  padding: 26px 30px 24px;
  background: var(--paper-3);
  border-bottom: 1px solid var(--line);
  animation: ${(x) => fin(x.$t)} ${T}s cubic-bezier(0.16, 1, 0.3, 1) both;
  ${reduce}
  @media (max-width: 1000px) {
    padding: 20px 20px 18px;
  }

  .stat {
    display: flex;
    align-items: center;
    gap: 9px;
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--signal-ink);
  }
  .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--signal);
    animation: ${pulse} 2s ease-in-out infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    .dot {
      animation: none;
    }
  }
`;

const Checks = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 28px;
  flex-wrap: wrap;

  div {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .k {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 10.5px;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: var(--ink-faint);
  }
  .v {
    font-size: clamp(17px, 1.7vw, 21px);
    font-weight: 600;
    letter-spacing: -0.025em;
    color: var(--ink-mute);
  }
`;

const Note = styled.div`
  margin-top: 16px;
  font-size: 14.5px;
  line-height: 1.45;
  color: var(--ink-faint);
`;

/* ---- what it cost while all of that was passing ---- */
const Bill = styled.div`
  padding: 30px 30px 26px;
  @media (max-width: 1000px) {
    padding: 24px 20px 22px;
  }
`;

const BillCap = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--hot-ink);
`;

const Money = styled.div<{ $t: number }>`
  margin-top: 12px;
  display: flex;
  align-items: baseline;
  gap: 16px;
  flex-wrap: wrap;
  transform-origin: left bottom;
  animation: ${(x) => bill(x.$t)} ${T}s cubic-bezier(0.16, 1, 0.3, 1) both;
  ${reduce}

  .n {
    font-size: clamp(46px, 5.2vw, 68px);
    font-weight: 600;
    letter-spacing: -0.05em;
    line-height: 0.95;
    color: var(--ink);
  }
  .w {
    font-size: clamp(14.5px, 1.4vw, 17px);
    color: var(--ink-mute);
  }
`;

const Why = styled.div<{ $t: number }>`
  margin-top: 20px;
  padding: 16px 18px;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: #fbfaf7;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: clamp(12.5px, 1.15vw, 14px);
  line-height: 1.7;
  color: var(--ink);
  animation: ${(x) => fin(x.$t)} ${T}s cubic-bezier(0.16, 1, 0.3, 1) both;
  ${reduce}

  .bad {
    color: var(--hot-ink);
    font-weight: 600;
  }
  .was {
    color: var(--ink-faint);
  }
  .sub {
    display: block;
    margin-top: 6px;
    color: var(--ink-faint);
  }
`;

const Foot = styled.div<{ $t: number }>`
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 12px;
  color: var(--signal-ink);
  animation: ${(x) => fin(x.$t)} ${T}s cubic-bezier(0.16, 1, 0.3, 1) both;
  ${reduce}

  .sep {
    color: var(--line-strong);
  }
  .mute {
    color: var(--ink-faint);
  }
`;

export const HeroArt = () => (
  <Frame>
    <Panel>
      <Green $t={0.1}>
        <div className='stat'>
          <i className='dot' />
          all systems operational
        </div>
        <Checks>
          <div>
            <span className='k'>errors</span>
            <span className='v'>0.00%</span>
          </div>
          <div>
            <span className='k'>p99 latency</span>
            <span className='v'>214ms</span>
          </div>
          <div>
            <span className='k'>uptime</span>
            <span className='v'>99.99%</span>
          </div>
          <div>
            <span className='k'>alerts</span>
            <span className='v'>none</span>
          </div>
        </Checks>
        <Note>Every check your platform team owns, passing, for six days straight.</Note>
      </Green>

      <Bill>
        <BillCap>what it cost while those checks passed</BillCap>
        <Money $t={1.5}>
          <span className='n'>$1.01M</span>
          <span className='w'>on 41,208 orders that all went through fine</span>
        </Money>

        <Why $t={2.6}>
          applyPromo() returned <span className='bad'>$0.00</span> <span className='was'>instead of $24.50</span>
          <span className='sub'>on every call. no error. no slow request. nobody was ever paged.</span>
        </Why>

        <Foot $t={3.6}>
          found by asking the running service
          <span className='sep'>·</span>
          <span className='mute'>4 seconds</span>
          <span className='sep'>·</span>
          <span className='mute'>no code change</span>
        </Foot>
      </Bill>
    </Panel>
  </Frame>
);
