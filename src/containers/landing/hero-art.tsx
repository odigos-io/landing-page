'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

/* Hero art: a real distributed trace, interrogated live.

   It has to LOOK like a trace, so it is a waterfall: bars placed on a time
   axis by when they started and how long they ran, nested by call depth. The
   loop is what happens to it. Someone asks production a question in plain
   language, and spans that were never being captured appear inside the trace,
   marked green, with the arguments and the return value of the call that
   turned out to be the problem. Then a deeper question, and it goes further in.

   Every bar is one transform animation on a shared timeline. */

const DUR = '11s';
const TOTAL = 812; // ms, the width of the whole trace

type Span = {
  label: string;
  start: number;
  ms: number;
  depth: number;
  at?: number; // % of the loop when it is captured. absent = already there
  hot?: boolean;
};

const SPANS: Span[] = [
  { label: 'POST /checkout', start: 0, ms: 812, depth: 0 },
  { label: 'payments-svc', start: 38, ms: 700, depth: 1 },
  { label: 'charge()', start: 88, ms: 600, depth: 2 },
  { label: 'fraudScore()', start: 118, ms: 240, depth: 3, at: 13, hot: true },
  { label: 'reserveInventory()', start: 372, ms: 41, depth: 3, at: 16 },
  { label: 'calculateTax()', start: 430, ms: 12, depth: 3, at: 19 },
  { label: 'risk-api · retry 3/3', start: 136, ms: 210, depth: 4, at: 37, hot: true },
  { label: 'jwt.verify', start: 352, ms: 6, depth: 4, at: 40 },
];

const ASKS = [
  { text: 'why is checkout p99 up 3x?', doing: 'capturing inside charge()', at: 3, until: 24 },
  { text: 'what is fraudScore() waiting on?', doing: 'capturing args and return value', at: 27, until: 90 },
];

const HOLD = 91;
const ARGS_AT = 44;
const FOOT_AT = 52;

/* a captured span draws itself along the time axis */
const barIn = (r: number) => keyframes`
  0%,${r}%{opacity:0;transform:scaleX(0)}
  ${r + 4}%{opacity:1;transform:scaleX(1)}
  ${HOLD}%{opacity:1;transform:scaleX(1)}
  ${HOLD + 4}%,100%{opacity:0;transform:scaleX(0)}`;

const rowIn = (r: number) => keyframes`
  0%,${r}%{opacity:0}
  ${r + 3}%{opacity:1}
  ${HOLD}%{opacity:1}
  ${HOLD + 4}%,100%{opacity:0}`;

const lineIn = (a: number, b: number) => keyframes`
  0%,${a}%{opacity:0;transform:translateY(3px)}
  ${a + 3}%,${b}%{opacity:1;transform:none}
  ${b + 3}%,100%{opacity:0;transform:none}`;

const holdIn = (r: number) => keyframes`
  0%,${r}%{opacity:0;transform:translateY(3px)}
  ${r + 3}%{opacity:1;transform:none}
  ${HOLD}%{opacity:1;transform:none}
  ${HOLD + 4}%,100%{opacity:0;transform:none}`;

const pulse = keyframes`0%,100%{opacity:.45}50%{opacity:1}`;
const float = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}`;

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
  background: linear-gradient(180deg, #ffffff 0%, #fcfbff 62%, #f6f3fd 100%);
  box-shadow: var(--shadow-panel);
  font-family: var(--font-mono), ui-monospace, monospace;
`;

const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 18px;
  border-bottom: 1px solid rgba(24, 20, 54, 0.07);
  background: rgba(255, 255, 255, 0.72);
  font-size: 11px;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--ink-faint);

  .who {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--ink-mute);
  }
  .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #11a877;
    box-shadow: 0 0 0 3px rgba(17, 168, 119, 0.15);
  }
`;

const Ask = styled.div`
  position: relative;
  height: 46px;
  border-bottom: 1px solid rgba(24, 20, 54, 0.07);
`;

const AskLine = styled.div<{ $kf: ReturnType<typeof keyframes> }>`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 18px;
  animation: ${(p) => p.$kf} ${DUR} cubic-bezier(0.16, 1, 0.3, 1) infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  .q {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: clamp(12px, 1.05vw, 14.5px);
    font-weight: 500;
    letter-spacing: -0.01em;
    color: var(--ink);
  }
  .caret {
    color: var(--accent);
    font-weight: 600;
  }
  .doing {
    flex: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 10.5px;
    letter-spacing: 0.04em;
    color: #0e9a6c;
  }
  .doing::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #11a877;
    animation: ${pulse} 1.1s ease-in-out infinite;
  }
  @media (max-width: 620px) {
    .doing {
      display: none;
    }
  }
`;

const Axis = styled.div`
  display: grid;
  grid-template-columns: 46% 1fr 54px;
  align-items: center;
  padding: 12px 18px 4px;
  font-size: 9.5px;
  letter-spacing: 0.06em;
  color: var(--ink-faint);

  .ticks {
    position: relative;
    height: 10px;
  }
  .ticks span {
    position: absolute;
    top: 0;
    transform: translateX(-50%);
  }
  .ticks span:first-child {
    transform: none;
  }
`;

const Rows = styled.div`
  padding: 0 18px 16px;
`;

const Row = styled.div<{ $kf: ReturnType<typeof keyframes>; $new?: boolean }>`
  display: grid;
  grid-template-columns: 46% 1fr 54px;
  align-items: center;
  gap: 0;
  height: 24px;
  animation: ${(p) => p.$kf} ${DUR} linear infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
  }

  .label {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
    font-size: clamp(10.5px, 0.92vw, 12.5px);
    color: ${(p) => (p.$new ? 'var(--ink)' : 'var(--ink-mute)')};
  }
  .label span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .plus {
    flex: none;
    color: #0e9a6c;
    font-weight: 700;
  }
  .track {
    position: relative;
    height: 100%;
  }
  .ms {
    text-align: right;
    font-size: clamp(10px, 0.85vw, 11.5px);
    font-variant-numeric: tabular-nums;
    color: ${(p) => (p.$new ? '#0e9a6c' : 'var(--ink-faint)')};
  }
`;

const Fill = styled.div<{ $kf?: ReturnType<typeof keyframes>; $hot?: boolean; $new?: boolean }>`
  position: absolute;
  top: 50%;
  height: 9px;
  margin-top: -4.5px;
  border-radius: 3px;
  transform-origin: left center;
  background: ${(p) => (p.$hot ? 'linear-gradient(90deg,#ff6a9c,#ff3d7a)' : p.$new ? 'linear-gradient(90deg,#6a4bff,#11a877)' : 'rgba(24,20,54,.15)')};
  animation: ${(p) => p.$kf ?? 'none'} ${DUR} cubic-bezier(0.16, 1, 0.3, 1) infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: none;
  }
`;

const Args = styled.div<{ $kf: ReturnType<typeof keyframes> }>`
  margin: 2px 0 0 calc(46% + 0px);
  padding: 8px 10px;
  border-left: 2px solid rgba(255, 61, 122, 0.5);
  background: rgba(255, 61, 122, 0.05);
  border-radius: 0 8px 8px 0;
  font-size: clamp(10px, 0.88vw, 12px);
  line-height: 1.6;
  animation: ${(p) => p.$kf} ${DUR} cubic-bezier(0.16, 1, 0.3, 1) infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
  }

  .k {
    color: var(--ink-faint);
  }
  .v {
    color: var(--accent);
  }
  .r {
    color: #d63a6f;
  }
  @media (max-width: 620px) {
    margin-left: 0;
  }
`;

const Foot = styled.div<{ $kf: ReturnType<typeof keyframes> }>`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 18px;
  padding: 11px 0 14px;
  border-top: 1px solid rgba(24, 20, 54, 0.07);
  font-size: clamp(10.5px, 0.9vw, 12px);
  color: #0e9a6c;
  animation: ${(p) => p.$kf} ${DUR} cubic-bezier(0.16, 1, 0.3, 1) infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
  }
`;

const pct = (v: number) => `${(v / TOTAL) * 100}%`;

export const HeroArt = () => {
  return (
    <Frame>
      <Panel>
        <Bar>
          <span className='who'>
            <span className='dot' /> odigos
          </span>
          <span>trace 8f2c14 · production</span>
        </Bar>

        <Ask>
          {ASKS.map((a, i) => (
            <AskLine key={i} $kf={lineIn(a.at, a.until)}>
              <span className='caret'>❯</span>
              <span className='q'>{a.text}</span>
              <span className='doing'>{a.doing}</span>
            </AskLine>
          ))}
        </Ask>

        <Axis>
          <span>span</span>
          <span className='ticks'>
            <span style={{ left: '0%' }}>0</span>
            <span style={{ left: '25%' }}>200ms</span>
            <span style={{ left: '50%' }}>400ms</span>
            <span style={{ left: '75%' }}>600ms</span>
          </span>
          <span style={{ textAlign: 'right' }}>took</span>
        </Axis>

        <Rows>
          {SPANS.map((s, i) => (
            <React.Fragment key={s.label}>
              <Row $kf={s.at ? rowIn(s.at) : rowIn(0)} $new={!!s.at}>
                <span className='label' style={{ paddingLeft: `${s.depth * 11}px` }}>
                  {s.at ? (
                    <span className='plus' aria-hidden>
                      +
                    </span>
                  ) : null}
                  <span>{s.label}</span>
                </span>
                <span className='track'>
                  <Fill style={{ left: pct(s.start), width: pct(s.ms) }} $kf={s.at ? barIn(s.at) : undefined} $hot={s.hot} $new={!!s.at} />
                </span>
                <span className='ms'>{s.ms}ms</span>
              </Row>
              {i === 6 && (
                <Args $kf={holdIn(ARGS_AT)}>
                  <div>
                    <span className='k'>userId</span> <span className='v'>&quot;u_8843&quot;</span> <span className='k'>amount</span> <span className='v'>249.90</span>
                  </div>
                  <div className='r'>→ timeout after 3 retries, no fallback</div>
                </Args>
              )}
            </React.Fragment>
          ))}
        </Rows>

        <Foot $kf={holdIn(FOOT_AT)}>answered in 1.2s · no code change · no redeploy</Foot>
      </Panel>
    </Frame>
  );
};
