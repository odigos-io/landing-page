'use client';

import React from 'react';
import styled, { keyframes, css } from 'styled-components';

/* Hero art: the one system that will not answer.

   An agent can already query everything a company owns and get an answer in
   milliseconds. The running service is the exception, and the price of asking
   it anything is a code change and a release. The second block is what
   happens when that stops being true. */

const T = 7.2;
const p = (s: number) => Math.max(0, Math.min(100, (s / T) * 100));

const fin = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0;transform:translateY(7px)}
  ${p(s + 0.5)}%,100%{opacity:1;transform:translateY(0)}`;

const land = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0;transform:translateY(12px) scale(.97)}
  ${p(s + 0.6)}%,100%{opacity:1;transform:none}`;

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
  border-radius: 20px;
  border: 1px solid rgba(91, 67, 241, 0.16);
  background: var(--paper-2);
  box-shadow: var(--shadow-panel);
  overflow: hidden;
`;

const Head = styled.div`
  padding: 20px 26px 0;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-faint);
  @media (max-width: 1000px) {
    padding: 16px 18px 0;
  }
`;

const Open = styled.div`
  padding: 14px 26px 20px;
  @media (max-width: 1000px) {
    padding: 12px 18px 16px;
  }
`;

const Row = styled.div<{ $t: number; $shut?: boolean }>`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  padding: 9px 0;
  border-bottom: 1px solid var(--line);
  animation: ${(x) => fin(x.$t)} ${T}s cubic-bezier(0.16, 1, 0.3, 1) both;
  ${reduce}
  &:last-child {
    border-bottom: none;
  }

  .what {
    font-size: clamp(14.5px, 1.4vw, 16.5px);
    letter-spacing: -0.01em;
    color: ${({ $shut }) => ($shut ? 'var(--ink)' : 'var(--ink-mute)')};
    font-weight: ${({ $shut }) => ($shut ? 600 : 400)};
  }
  .how {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    flex-shrink: 0;
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: clamp(11.5px, 1.1vw, 13px);
    color: ${({ $shut }) => ($shut ? 'var(--hot-ink)' : 'var(--ink-faint)')};
    text-align: right;
  }
  .tick {
    color: var(--signal);
  }
`;

const Shut = styled.div<{ $t: number }>`
  margin-top: 4px;
  padding: 16px 18px;
  border-radius: 12px;
  border: 1px solid rgba(255, 93, 143, 0.36);
  background: rgba(255, 93, 143, 0.05);
  animation: ${(x) => fin(x.$t)} ${T}s cubic-bezier(0.16, 1, 0.3, 1) both;
  ${reduce}

  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;

  .what {
    font-size: clamp(15px, 1.45vw, 17px);
    font-weight: 600;
    letter-spacing: -0.015em;
    color: var(--ink);
  }
  .how {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: clamp(11.5px, 1.1vw, 13px);
    color: var(--hot-ink);
  }
`;

const Split = styled.div`
  height: 1px;
  background: var(--line);
`;

const With = styled.div`
  padding: 22px 26px 24px;
  background: linear-gradient(180deg, #fbfaff, #f7f4fd);
  @media (max-width: 1000px) {
    padding: 18px 18px 20px;
  }
`;

const WithCap = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
`;

const Got = styled.div<{ $t: number }>`
  margin-top: 14px;
  animation: ${(x) => land(x.$t)} ${T}s cubic-bezier(0.16, 1, 0.3, 1) both;
  transform-origin: left bottom;
  ${reduce}

  .q {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 14px;
    flex-wrap: wrap;
  }
  .what {
    font-size: clamp(15px, 1.45vw, 17px);
    font-weight: 600;
    letter-spacing: -0.015em;
    color: var(--ink);
  }
  .ms {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: clamp(11.5px, 1.1vw, 13px);
    color: var(--signal-ink);
  }
  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--signal);
    animation: ${blink} 1.9s ease-in-out infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    .dot {
      animation: none;
    }
  }
`;

const Val = styled.div<{ $t: number }>`
  margin-top: 14px;
  padding: 16px 18px;
  border-radius: 12px;
  background: var(--paper-2);
  border: 1px solid rgba(91, 67, 241, 0.22);
  box-shadow: 0 12px 30px rgba(24, 20, 54, 0.09);
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: clamp(12.5px, 1.2vw, 14.5px);
  line-height: 1.7;
  color: var(--ink);
  animation: ${(x) => land(x.$t)} ${T}s cubic-bezier(0.16, 1, 0.3, 1) both;
  ${reduce}

  .v {
    color: var(--accent);
  }
  .bad {
    color: var(--hot-ink);
    font-weight: 600;
  }
  .sub {
    display: block;
    margin-top: 6px;
    color: var(--ink-faint);
  }
`;

const Tick = () => (
  <svg width='11' height='11' viewBox='0 0 12 12' fill='none' aria-hidden className='tick'>
    <path d='M2 6.3 4.7 9 10 3' stroke='currentColor' strokeWidth='1.9' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

const ALREADY = [
  ['every line of the repository', 'answered instantly'],
  ['ten years of tickets', 'answered instantly'],
  ['the runbooks and the wiki', 'answered instantly'],
  ['every dashboard you pay for', 'answered instantly'],
];

export const HeroArt = () => (
  <Frame>
    <Panel>
      <Head>what your agent can already ask</Head>
      <Open>
        {ALREADY.map(([what, how], i) => (
          <Row key={what} $t={0.1 + i * 0.16}>
            <span className='what'>{what}</span>
            <span className='how'>
              <Tick />
              {how}
            </span>
          </Row>
        ))}

        <Shut $t={1.2}>
          <span className='what'>what the code actually returned</span>
          <span className='how'>change the code, ship a release, wait</span>
        </Shut>
      </Open>

      <Split />

      <With>
        <WithCap>with odigos</WithCap>
        <Got $t={2.4}>
          <div className='q'>
            <span className='what'>what the code actually returned</span>
            <span className='ms'>
              <i className='dot' />
              1.2 seconds · no code change
            </span>
          </div>
        </Got>
        <Val $t={3.0}>
          applyPromo(<span className='v'>&quot;BLACK50&quot;</span>, <span className='v'>$49.00</span>) returned <span className='bad'>$0.00</span>
          <span className='sub'>on 41,208 orders over six days. no error. nobody was paged.</span>
        </Val>
      </With>
    </Panel>
  </Frame>
);
