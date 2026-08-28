'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

/* Hero art: an agent drilling from the top of the stack to the bottom.

   It starts where everyone starts, with rate and errors and duration, and it
   keeps going down: to the trace, to the functions inside the slow span that
   nothing was ever collecting, to the arguments and return values of one of
   them, and then back out to how much of production it touched.

   The map on the right is the same descent drawn as three bands, metrics over
   trace over functions, each one opening as the agent reaches it. */

const DUR = '12s';
const W = 660;
const H = 452;

const LX = 24;
const LW = 292;
const ROW_Y = 92;
const ROW_H = 62;

const MAP = { x: 344, y: 40, w: 300, h: 380 };
const B1 = MAP.y + 56; // metrics
const B2 = MAP.y + 134; // trace
const B3 = MAP.y + 244; // functions

const HOLD = 100;

const STEPS = [
  { n: 1, at: 2, q: 'checkout revenue is down 12%', a: 'errors 0.1% · p99 normal' },
  { n: 2, at: 10, q: 'show me a checkout trace', a: '12 green · charge() 600ms' },
  { n: 3, at: 19, q: 'open charge() internals', a: '9 functions · capturing in 1.2s' },
  { n: 4, at: 28, q: 'what does applyPromo() return?', a: 'in "BLACK50" → out 0.00', cause: true },
  { n: 5, at: 37, q: 'since when? how much?', a: '6 days · 1,284 carts · $84k', cause: true },
];

/* band 1: the numbers you already have */
const SERVICES = [
  { t: 'checkout', v: '0.1%', sel: true },
  { t: 'payments', v: '0.2%' },
  { t: 'fraud', v: '0.1%' },
];

/* band 2: the trace, which stops exactly where it gets interesting */
const SPANS = [
  { t: 'POST /checkout', w: 1, ms: '812ms' },
  { t: 'payments-svc', w: 0.84, ms: '690ms' },
  { t: 'charge()', w: 0.72, ms: '600ms', sel: true },
  { t: '', w: 0.5, ms: '', empty: true },
];

/* band 3: what was inside it all along */
const FNS = [
  { t: 'authorize()', x: 6, y: 0, known: true },
  { t: 'applyPromo()', x: 58, y: 34, target: true },
  { t: 'taxFor()', x: 116, y: 0 },
  { t: 'reserve()', x: 16, y: 62 },
  { t: 'settle()', x: 104, y: 56 },
  { t: 'riskScore()', x: 64, y: 90 },
];

/* ── motion ───────────────────────────────────────────────────────────────── */
/* the art plays once and stays. Its resting state used to be an empty frame,
   which is what a scroll-past, a screenshot or a two second visit actually saw */
const askIn = (r: number) => keyframes`
  0%,${r}%{opacity:0;transform:translateY(6px)}
  ${r + 2}%,100%{opacity:1;transform:none}`;
const ansIn = (r: number) => keyframes`
  0%,${r + 4}%{opacity:0;transform:translateY(6px)}
  ${r + 6}%,100%{opacity:1;transform:none}`;
const bandIn = (r: number) => keyframes`
  0%,${r + 2}%{opacity:0;transform:translateY(10px)}
  ${r + 7}%,100%{opacity:1;transform:none}`;
const drillIn = (r: number) => keyframes`
  0%,${r}%{opacity:0}
  ${r + 4}%,100%{opacity:1}`;
const pingAt = (r: number) => keyframes`
  0%,${r + 2}%{opacity:0;transform:scale(.5)}
  ${r + 4}%{opacity:.6}
  ${r + 12}%,100%{opacity:0;transform:scale(2.6)}`;
const blink = keyframes`0%,100%{opacity:.35}50%{opacity:1}`;
const core = keyframes`0%,100%{opacity:.55;transform:scale(.96)}50%{opacity:1;transform:scale(1.05)}`;
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
  background:
    radial-gradient(46% 44% at 80% 62%, rgba(17, 168, 119, 0.1), transparent 70%),
    radial-gradient(42% 46% at 14% 38%, rgba(123, 93, 255, 0.15), transparent 72%),
    linear-gradient(180deg, #ffffff 0%, #fcfbff 60%, #f6f3fd 100%);
  box-shadow: var(--shadow-panel);
`;
const G = styled.g<{ $kf: ReturnType<typeof keyframes> }>`
  animation: ${(p) => p.$kf} ${DUR} cubic-bezier(0.16, 1, 0.3, 1) both;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: none;
  }
`;
const Ping = styled.circle<{ $kf: ReturnType<typeof keyframes> }>`
  fill: none;
  stroke-width: 1.3;
  transform-box: fill-box;
  transform-origin: center;
  animation: ${(p) => p.$kf} ${DUR} ease-out both;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0;
  }
`;

const Svg = styled.svg`
  display: block;
  width: 100%;
  height: auto;
  @media (max-width: 620px) {
    display: none;
  }

  .who {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 10.5px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    fill: var(--ink-faint);
  }
  .q {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 15px;
    fill: var(--ink);
    letter-spacing: -0.01em;
  }
  .caret {
    fill: var(--accent);
    font-weight: 700;
  }
  .a {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 15px;
    fill: #0c7a58;
  }
  .a.cause {
    fill: #c9346a;
  }
  .num {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 10px;
    font-weight: 700;
    fill: #fff;
  }
  .numRing {
    fill: #11a877;
  }
  .numRing.cause {
    fill: #ff3d7a;
  }
  .depth {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    fill: var(--ink-faint);
  }
  .pill {
    fill: #fff;
    stroke: rgba(24, 20, 54, 0.16);
    stroke-width: 1.1;
  }
  .pill.sel {
    stroke: #6a4bff;
    stroke-width: 1.5;
  }
  .pillTxt {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 10.5px;
    fill: var(--ink-mute);
  }
  .pillTxt.sel {
    fill: var(--ink);
  }
  .pillVal {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 10.5px;
    fill: var(--ink-faint);
  }

  .span {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 10px;
    fill: var(--ink-mute);
  }
  .fn {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 10px;
    fill: var(--ink-mute);
  }
  .fn.on {
    fill: var(--ink);
  }
  .node {
    fill: #fff;
    stroke: rgba(24, 20, 54, 0.22);
    stroke-width: 1.2;
  }
  .node.on {
    stroke: #ff3d7a;
    stroke-width: 1.6;
  }
  .dark {
    fill: none;
    stroke: rgba(24, 20, 54, 0.2);
    stroke-width: 1.1;
    stroke-dasharray: 3 4;
  }
  .valBox {
    fill: rgba(255, 255, 255, 0.92);
    stroke: rgba(255, 61, 122, 0.5);
    stroke-width: 1.2;
    filter: drop-shadow(0 10px 22px rgba(24, 20, 54, 0.14));
  }
  .valKey {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 10.5px;
    fill: #b05c7d;
  }
  .valBig {
    font-family: var(--font-display), system-ui, sans-serif;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.02em;
    fill: #d63a6f;
  }
  .valTag {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 9px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    fill: #c9346a;
  }
  .rule {
    stroke: rgba(24, 20, 54, 0.08);
    stroke-width: 1;
  }
  .drill {
    stroke: rgba(17, 168, 119, 0.5);
    stroke-width: 1.4;
    stroke-dasharray: 3 4;
  }
  .agentCore {
    animation: ${core} 2.6s ease-in-out infinite;
    transform-box: fill-box;
    transform-origin: center;
  }
  .live {
    animation: ${blink} 1.7s ease-in-out infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    .agentCore,
    .live {
      animation: none;
    }
  }
  @media (max-width: 620px) {
    .q,
    .a {
      font-size: 14px;
    }
    .span,
    .fn,
    .pillTxt,
    .pillVal {
      font-size: 12px;
    }
  }
`;

const BAR_X = MAP.x + 108;
const BAR_W = MAP.w - 176;

const MobileSvg = styled.svg`
  display: none;
  width: 100%;
  height: auto;
  @media (max-width: 620px) {
    display: block;
  }
  .who {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    fill: var(--ink-faint);
  }
  .q {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 13px;
    fill: var(--ink);
    letter-spacing: -0.01em;
  }
  .caret {
    fill: var(--accent);
    font-weight: 700;
  }
  .a {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 13px;
    fill: #0c7a58;
  }
  .a.cause {
    fill: #c9346a;
  }
  .num {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 9.5px;
    font-weight: 700;
    fill: #fff;
  }
  .numRing {
    fill: #11a877;
  }
  .numRing.cause {
    fill: #ff3d7a;
  }
  .depth {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 9px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    fill: var(--ink-faint);
  }
  .rule {
    stroke: rgba(24, 20, 54, 0.08);
    stroke-width: 1;
  }
  .live {
    animation: ${blink} 1.7s ease-in-out infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    .live {
      animation: none;
    }
  }
`;

/* on a phone the three bands cannot be drawn at a readable size, so the depth
   each question reaches is named instead */
const DEPTH = ['metrics', 'trace', 'internals', 'values', 'impact'];

export const HeroArt = () => {
  return (
    <Frame>
      <Panel>
        <Svg
          viewBox={`0 0 ${W} ${H}`}
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          role='img'
          aria-label='An agent drilling from error rates down to a trace, then into the functions inside the slow span that nothing was collecting, then to the arguments and return value of one of them, and finally to how many carts it affected.'
        >
          {/* ── the agent, and the descent ─────────────────────────────── */}
          <circle className='agentCore' cx='40' cy='42' r='11' fill='#5b43f1' opacity='.9' />
          <circle cx='40' cy='42' r='18' stroke='rgba(91,67,241,.22)' strokeWidth='1' fill='none' />
          <text className='who' x='66' y='46'>
            ai agent
          </text>
          <text className='who' x={LX + LW} y='46' textAnchor='end'>
            5 questions · 5s
          </text>
          <path className='rule' d={`M${LX},64 H${LX + LW}`} />

          {STEPS.map((s, i) => {
            const y = ROW_Y + i * ROW_H;
            const tone = s.cause ? ' cause' : '';
            return (
              <React.Fragment key={s.n}>
                <G $kf={askIn(s.at)}>
                  <text className='q' x={LX} y={y}>
                    <tspan className='caret'>❯ </tspan>
                    {s.q}
                  </text>
                </G>
                <G $kf={ansIn(s.at)}>
                  <circle className={`numRing${tone}`} cx={LX + 7} cy={y + 19} r='8' />
                  <text className='num' x={LX + 7} y={y + 22.5} textAnchor='middle'>
                    {s.n}
                  </text>
                  <text className={`a${tone}`} x={LX + 24} y={y + 23}>
                    {s.a}
                  </text>
                </G>
                {i < STEPS.length - 1 && <path className='rule' d={`M${LX},${y + 36} H${LX + LW}`} />}
              </React.Fragment>
            );
          })}

          {/* ── the same descent, drawn ────────────────────────────────── */}
          <rect x={MAP.x} y={MAP.y} width={MAP.w} height={MAP.h} rx='16' fill='rgba(255,255,255,.55)' stroke='rgba(91,67,241,.14)' />
          <circle className='live' cx={MAP.x + 16} cy={MAP.y + 20} r='3.4' fill='#11a877' />
          <text className='who' x={MAP.x + 26} y={MAP.y + 24}>
            production · live
          </text>

          <path className='rule' d={`M${MAP.x + 12},${B2 - 30} H${MAP.x + MAP.w - 12}`} />
          <path className='rule' d={`M${MAP.x + 12},${B3 - 40} H${MAP.x + MAP.w - 12}`} />

          {/* band 1 · the numbers everyone already has */}
          <text className='depth' x={MAP.x + 16} y={B1 - 12}>
            metrics
          </text>
          <G $kf={bandIn(2)}>
            {SERVICES.map((s, i) => {
              const x = MAP.x + 16 + i * 98;
              return (
                <g key={s.t}>
                  <rect className={`pill${s.sel ? ' sel' : ''}`} x={x} y={B1} width='90' height='30' rx='9' />
                  <text className={`pillTxt${s.sel ? ' sel' : ''}`} x={x + 10} y={B1 + 13}>
                    {s.t}
                  </text>
                  <text className='pillVal' x={x + 10} y={B1 + 25}>
                    {s.v} errors
                  </text>
                </g>
              );
            })}
          </G>
          <G $kf={drillIn(8)}>
            <path className='drill' d={`M${MAP.x + 60},${B1 + 34} V${B2 - 22}`} />
            <path d={`M${MAP.x + 56},${B2 - 20} l4,6 l4,-6 z`} fill='rgba(17,168,119,.6)' />
          </G>

          {/* band 2 · the trace, which runs out exactly where it matters */}
          <text className='depth' x={MAP.x + 16} y={B2 - 8}>
            trace
          </text>
          <G $kf={bandIn(10)}>
            {SPANS.map((s, i) => {
              const y = B2 + 4 + i * 16;
              if (s.empty) {
                return (
                  <g key={i}>
                    <text className='span' x={MAP.x + 24} y={y + 8}>
                      not collected
                    </text>
                    <rect className='dark' x={BAR_X + 16} y={y} width={BAR_W * s.w} height='8' rx='3' />
                  </g>
                );
              }
              return (
                <g key={i}>
                  <text className='span' x={MAP.x + 16 + i * 6} y={y + 8}>
                    {s.t}
                  </text>
                  <rect x={BAR_X} y={y} width={BAR_W * s.w} height='8' rx='3' fill={s.sel ? '#6a4bff' : 'rgba(24,20,54,.16)'} />
                  <text className='span' x={MAP.x + MAP.w - 16} y={y + 8} textAnchor='end'>
                    {s.ms}
                  </text>
                </g>
              );
            })}
          </G>
          <G $kf={drillIn(17)}>
            <path className='drill' d={`M${MAP.x + 60},${B2 + 76} V${B3 - 30}`} />
            <path d={`M${MAP.x + 56},${B3 - 28} l4,6 l4,-6 z`} fill='rgba(17,168,119,.6)' />
          </G>

          {/* band 3 · the functions that were never being collected */}
          <text className='depth' x={MAP.x + 16} y={B3 - 10}>
            internals · live
          </text>
          <G $kf={bandIn(19)}>
            {FNS.map((f) => {
              const cx = MAP.x + 40 + f.x;
              const cy = B3 + 18 + f.y;
              return (
                <g key={f.t}>
                  <circle className={`node${f.target ? ' on' : ''}`} cx={cx} cy={cy} r={f.target ? 9 : 7} />
                  <text className={`fn${f.target ? ' on' : ''}`} x={cx} y={cy + (f.target ? 22 : 20)} textAnchor='middle'>
                    {f.t}
                  </text>
                </g>
              );
            })}
          </G>

          {/* the value that no error and no duration would ever have shown */}
          <G $kf={bandIn(28)}>
            <rect className='valBox' x={MAP.x + 186} y={B3 + 8} width='116' height='82' rx='10' />
            <text className='valKey' x={MAP.x + 198} y={B3 + 28}>
              in &quot;BLACK50&quot;
            </text>
            <text className='valKey' x={MAP.x + 198} y={B3 + 52}>
              out
            </text>
            <text className='valBig' x={MAP.x + 210} y={B3 + 54}>
              0.00
            </text>
            <text className='valTag' x={MAP.x + 198} y={B3 + 76}>
              no error · 4ms
            </text>
            <path className='rule' d={`M${MAP.x + 125},${B3 + 50} H${MAP.x + 184}`} />
          </G>
          <Ping cx={MAP.x + 98} cy={B3 + 52} r='13' stroke='#ff3d7a' $kf={pingAt(28)} />
        </Svg>

        <MobileSvg viewBox='0 0 340 320' fill='none' xmlns='http://www.w3.org/2000/svg' aria-hidden>
          <circle className='live' cx='18' cy='22' r='3.4' fill='#11a877' />
          <text className='who' x='28' y='26'>
            production · live
          </text>
          <text className='who' x='324' y='26' textAnchor='end'>
            5 questions
          </text>
          <path className='rule' d='M14,38 H324' />
          {STEPS.map((s, i) => {
            const y = 62 + i * 52;
            const tone = s.cause ? ' cause' : '';
            return (
              <React.Fragment key={`m${s.n}`}>
                <G $kf={askIn(s.at)}>
                  <text className='depth' x='324' y={y - 12} textAnchor='end'>
                    {DEPTH[i]}
                  </text>
                  <text className='q' x='14' y={y}>
                    <tspan className='caret'>❯ </tspan>
                    {s.q}
                  </text>
                </G>
                <G $kf={ansIn(s.at)}>
                  <circle className={`numRing${tone}`} cx='21' cy={y + 19} r='7.5' />
                  <text className='num' x='21' y={y + 22.5} textAnchor='middle'>
                    {s.n}
                  </text>
                  <text className={`a${tone}`} x='36' y={y + 23}>
                    {s.a}
                  </text>
                </G>
                {i < STEPS.length - 1 && <path className='rule' d={`M14,${y + 34} H324`} />}
              </React.Fragment>
            );
          })}
        </MobileSvg>
      </Panel>
    </Frame>
  );
};
