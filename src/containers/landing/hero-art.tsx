'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

/* Hero art: THE INTERROGATION LOOP, as the session itself.

   The previous version was a diagram with six regions (transcript, agent box,
   two arcs, trace panel, probe chip, inspector) and you had to work out where
   to look first. This is one column you read top to bottom, the way you read a
   terminal: someone asks production a question in plain language, and data that
   did not exist a second ago comes back, marked with a +. Then a deeper
   question, and the arguments and the return value of the call itself.

   Every line is one opacity/transform animation on a shared timeline. */

const DUR = '12s';

type Kind = 'ask' | 'meta' | 'new' | 'arg' | 'ret' | 'foot';

type L = {
  at: number; // % of the loop when the line lands
  kind: Kind;
  a: string; // left side
  b?: string; // right side: duration, or the value of an argument
  gap?: boolean; // breathing room above
};

const LINES: L[] = [
  { at: 4, kind: 'ask', a: 'why is checkout p99 up 3x?' },
  { at: 11, kind: 'meta', a: 'capturing inside charge()' },
  { at: 15, kind: 'new', a: 'fraudScore()', b: '240ms' },
  { at: 18, kind: 'new', a: 'reserveInventory()', b: '41ms' },
  { at: 21, kind: 'new', a: 'calculateTax()', b: '12ms' },
  { at: 28, kind: 'ask', a: 'what is fraudScore() waiting on?', gap: true },
  { at: 35, kind: 'meta', a: 'capturing arguments and return value' },
  { at: 39, kind: 'new', a: 'risk-api · retry 3/3', b: '210ms' },
  { at: 42, kind: 'arg', a: 'userId', b: '"u_8843"' },
  { at: 45, kind: 'arg', a: 'amount', b: '249.90' },
  { at: 48, kind: 'ret', a: '→ timeout, no fallback' },
  { at: 56, kind: 'foot', a: 'answered in 1.2s · no code change · no redeploy', gap: true },
];

const HOLD = 92;

const lineIn = (r: number) => keyframes`
  0%,${r}%{opacity:0;transform:translateY(4px)}
  ${r + 3}%{opacity:1;transform:none}
  ${HOLD}%{opacity:1;transform:none}
  ${HOLD + 4}%,100%{opacity:0;transform:none}`;

/* the live badge only shows while a capture is being attached */
const liveAt = (r: number) => keyframes`
  0%,${r}%{opacity:0}
  ${r + 2}%,${r + 8}%{opacity:1}
  ${r + 10}%,100%{opacity:0}`;

const blink = keyframes`0%,49%{opacity:1}50%,100%{opacity:0}`;
const float = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}`;
const sheen = keyframes`0%,100%{opacity:.4}50%{opacity:1}`;

const Frame = styled.div`
  animation: ${float} 16s ease-in-out infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Panel = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  border: 1px solid rgba(91, 67, 241, 0.14);
  background: linear-gradient(180deg, #ffffff 0%, #fbfaff 62%, #f5f2fd 100%);
  box-shadow: var(--shadow-panel);
`;

const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 18px;
  border-bottom: 1px solid rgba(24, 20, 54, 0.07);
  background: rgba(255, 255, 255, 0.72);

  .who {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 11px;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: var(--ink-mute);
  }
  .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #11a877;
    box-shadow: 0 0 0 3px rgba(17, 168, 119, 0.15);
  }
  .env {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 11px;
    letter-spacing: 0.06em;
    color: var(--ink-faint);
  }
`;

const Feed = styled.div`
  padding: 22px 22px 24px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: clamp(12px, 1.06vw, 15px);
  line-height: 1.45;
  @media (max-width: 1000px) {
    font-size: clamp(12.5px, 3.3vw, 15px);
  }
`;

const Row = styled.div<{ $kf: ReturnType<typeof keyframes>; $gap?: boolean; $kind: Kind }>`
  display: flex;
  align-items: baseline;
  gap: 10px;
  padding: 3.5px 0;
  margin-top: ${(p) => (p.$gap ? '13px' : '0')};
  animation: ${(p) => p.$kf} ${DUR} cubic-bezier(0.16, 1, 0.3, 1) infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .mark {
    flex: none;
    width: 11px;
    text-align: center;
    font-weight: 600;
  }
  .a {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .b {
    flex: none;
    font-variant-numeric: tabular-nums;
  }

  /* the question a human or an agent asked, in plain language */
  ${(p) =>
    p.$kind === 'ask' &&
    `
    .mark { color: var(--accent); }
    .a { color: var(--ink); font-weight: 500; letter-spacing: -0.01em; }
  `}

  /* what odigos is doing about it, right now */
  ${(p) =>
    p.$kind === 'meta' &&
    `
    .a { color: var(--ink-faint); font-size: .88em; }
  `}

  /* data that did not exist a second ago, tinted so it reads at a glance */
  ${(p) =>
    p.$kind === 'new' &&
    `
    margin-left: -8px; padding-left: 8px;
    margin-right: -8px; padding-right: 8px;
    border-radius: 8px;
    background: linear-gradient(90deg, rgba(17,168,119,.09), rgba(17,168,119,0) 72%);
    .mark { color: #0e9a6c; }
    .a { color: var(--ink); }
    .b { color: #0e9a6c; }
  `}

  ${(p) =>
    p.$kind === 'arg' &&
    `
    padding-left: 21px;
    .a { color: var(--ink-faint); }
    .b { color: var(--accent); }
  `}

  ${(p) =>
    p.$kind === 'ret' &&
    `
    padding-left: 21px;
    .a { color: #d63a6f; }
  `}

  ${(p) =>
    p.$kind === 'foot' &&
    `
    border-top: 1px solid rgba(24,20,54,.07);
    padding-top: 12px;
    .a { color: #0e9a6c; font-size: .9em; }
  `}
`;

const Live = styled.span<{ $kf: ReturnType<typeof keyframes> }>`
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8em;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: #0e9a6c;
  animation: ${(p) => p.$kf} ${DUR} linear infinite;
  &::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #11a877;
    animation: ${sheen} 1.1s ease-in-out infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0;
  }
`;

const Caret = styled.span`
  display: inline-block;
  width: 7px;
  height: 0.95em;
  vertical-align: -0.1em;
  background: var(--accent);
  opacity: 0.7;
  animation: ${blink} 1.05s steps(1) infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const MARK: Record<Kind, string> = { ask: '❯', meta: '', new: '+', arg: '', ret: '', foot: '' };

const ROWS = LINES.map((l) => ({ ...l, kf: lineIn(l.at) }));

export const HeroArt = () => {
  return (
    <Frame>
      <Panel>
        <Bar>
          <span className='who'>
            <span className='dot' /> odigos
          </span>
          <span className='env'>production · live</span>
        </Bar>
        <Feed>
          {ROWS.map((l, i) => (
            <Row key={i} $kf={l.kf} $gap={l.gap} $kind={l.kind}>
              <span className='mark' aria-hidden>
                {MARK[l.kind]}
              </span>
              <span className='a'>{l.a}</span>
              {l.kind === 'meta' && <Live $kf={liveAt(l.at)}>capturing</Live>}
              {l.b && <span className='b'>{l.b}</span>}
            </Row>
          ))}
          <Row $kf={lineIn(62)} $kind='ask' $gap>
            <span className='mark' aria-hidden>
              ❯
            </span>
            <span className='a'>
              <Caret />
            </span>
          </Row>
        </Feed>
      </Panel>
    </Frame>
  );
};
