'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

/* Hero art: a race between two clocks around a living production system.

   Left, the delivery pipeline. A single packet crawls down code, review, ci,
   deploy over the entire animation, and a day counter grinds from 1 to 21.

   Right, the agent loop. Pulses fire into production about once a second, each
   one coming back with a real answer, and an answer counter runs to 47.

   Middle, production itself, lit and running the whole time.

   Same window. One change shipped, forty-seven answers. */

const DUR = '12s';
const W = 640;
const H = 420;

const CORE = { cx: 320, cy: 208, w: 168, h: 150 };

/* the mesh inside production */
const MESH = [
  { x: -52, y: -44 },
  { x: 6, y: -58 },
  { x: 54, y: -26 },
  { x: -34, y: 4 },
  { x: 22, y: 12 },
  { x: -58, y: 46 },
  { x: 4, y: 52 },
  { x: 56, y: 34 },
];
const LINKS: [number, number][] = [
  [0, 1],
  [1, 2],
  [0, 3],
  [3, 4],
  [4, 2],
  [3, 5],
  [5, 6],
  [6, 7],
  [4, 7],
  [6, 4],
];

const STOPS = [
  { t: 'code', y: 108 },
  { t: 'review', y: 168 },
  { t: 'ci', y: 228 },
  { t: 'deploy', y: 288 },
];
const TRACK_X = 88;

/* the counters. Each value owns a slice of the loop. */
const DAYS = ['day 1', 'day 3', 'day 6', 'day 9', 'day 12', 'day 15', 'day 18', 'day 21'];
const ANSWERS = ['4', '9', '14', '19', '24', '29', '34', '39', '43', '47'];

/* answers that come back, cycling in four slots */
const CHIPS = [
  ['fraudScore() 240ms', 'db.pool wait 190ms', 'gc pause 44ms'],
  ['risk-api retry 3/3', 'tls handshake 61ms', 'dns 12ms'],
  ['userId "u_8843"', 'cart 3 items', 'region eu-west-1'],
  ['1.4k calls/min', '2 callers', 'p99 812ms'],
];
const CHIP_X = 468;
const CHIP_W = 150;

/* ── motion ───────────────────────────────────────────────────────────────── */
const crawl = keyframes`
  0%{transform:translateY(0);opacity:0}
  4%{opacity:1}
  96%{opacity:1}
  100%{transform:translateY(180px);opacity:0}`;

/* counter slots are contiguous: one value hands straight over to the next, so
   the number is never absent for a frame */
const fadeSlot = (a: number, b: number) => keyframes`
  0%,${a}%{opacity:0}
  ${a}%,${b}%{opacity:1}
  ${b}%,100%{opacity:0}`;

const chipIn = (a: number, b: number) => keyframes`
  0%,${a}%{opacity:0;transform:translateX(14px)}
  ${a + 2}%,${b}%{opacity:1;transform:none}
  ${b + 2}%,100%{opacity:0;transform:translateX(-8px)}`;

const shot = keyframes`
  0%{opacity:0;transform:translateX(0) scale(.6)}
  12%{opacity:1}
  100%{opacity:0;transform:translateX(-118px) scale(1.1)}`;

const coreGlow = keyframes`0%,100%{opacity:.5}50%{opacity:.9}`;
const meshDrift = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}`;
const blink = keyframes`0%,100%{opacity:.35}50%{opacity:1}`;
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
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background:
    radial-gradient(60% 60% at 78% 44%, rgba(17, 168, 119, 0.22), transparent 70%),
    radial-gradient(58% 62% at 46% 52%, rgba(123, 93, 255, 0.28), transparent 72%),
    linear-gradient(165deg, #0c0c11 0%, #131320 58%, #0e0e15 100%);
  box-shadow: var(--shadow-panel);
  svg {
    display: block;
    width: 100%;
    height: auto;
  }
`;

const Crawl = styled.g`
  animation: ${crawl} ${DUR} linear infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
const Slot = styled.g<{ $kf: ReturnType<typeof keyframes> }>`
  animation: ${(p) => p.$kf} ${DUR} steps(1, end) infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0;
  }
`;
const Chip = styled.g<{ $kf: ReturnType<typeof keyframes> }>`
  animation: ${(p) => p.$kf} ${DUR} cubic-bezier(0.16, 1, 0.3, 1) infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: none;
  }
`;
const Shot = styled.circle<{ $d: string }>`
  animation: ${shot} 1.05s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  animation-delay: ${(p) => p.$d};
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0;
  }
`;

const Svg = styled.svg`
  .kick {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }
  .kick.slow {
    fill: #8a8a95;
  }
  .kick.fast {
    fill: #1fd793;
  }
  .stop {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 11px;
    fill: #7c7c88;
  }
  .num {
    font-family: var(--font-display), system-ui, sans-serif;
    font-weight: 600;
    letter-spacing: -0.03em;
  }
  .num.slow {
    font-size: 34px;
    fill: #9a9aa6;
  }
  .num.fast {
    font-size: 44px;
    fill: #1fd793;
  }
  .under {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 10.5px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    fill: #6f6f7c;
  }
  .coreLabel {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 10.5px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    fill: #b9b9c6;
  }
  .chipTxt {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 11px;
    fill: #d8f5e8;
  }
  .chipBox {
    fill: rgba(17, 168, 119, 0.13);
    stroke: rgba(31, 215, 147, 0.42);
    stroke-width: 1;
  }
  .track {
    stroke: rgba(255, 255, 255, 0.12);
    stroke-width: 1.4;
    stroke-dasharray: 3 6;
  }
  .stopDot {
    fill: #16161f;
    stroke: rgba(255, 255, 255, 0.24);
    stroke-width: 1.2;
  }
  .link {
    stroke: rgba(166, 144, 255, 0.42);
    stroke-width: 1;
  }
  .node {
    fill: #16161f;
    stroke: #a690ff;
    stroke-width: 1.3;
  }
  .coreBox {
    fill: rgba(255, 255, 255, 0.03);
    stroke: rgba(166, 144, 255, 0.34);
    stroke-width: 1.2;
  }
  .halo {
    animation: ${coreGlow} 3.2s ease-in-out infinite;
  }
  .mesh {
    animation: ${meshDrift} 5s ease-in-out infinite;
    transform-box: fill-box;
    transform-origin: center;
  }
  .live {
    animation: ${blink} 1.6s ease-in-out infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    .halo,
    .mesh,
    .live {
      animation: none;
    }
  }
  @media (max-width: 620px) {
    .stop,
    .chipTxt,
    .under,
    .coreLabel {
      font-size: 13px;
    }
    .kick {
      font-size: 14px;
    }
  }
`;

export const HeroArt = () => {
  return (
    <Frame>
      <Panel>
        <Svg
          viewBox={`0 0 ${W} ${H}`}
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          role='img'
          aria-label='A race around a live production system. On the left a delivery pipeline crawls from code to review to CI to deploy while a counter reaches day 21. On the right an agent fires a question into production about once a second and a counter reaches 47 answers.'
        >
          <defs>
            <radialGradient id='halo'>
              <stop offset='0' stopColor='rgba(166,144,255,.5)' />
              <stop offset='1' stopColor='rgba(166,144,255,0)' />
            </radialGradient>
            <linearGradient id='beam' x1='1' y1='0' x2='0' y2='0'>
              <stop offset='0' stopColor='rgba(31,215,147,0)' />
              <stop offset='1' stopColor='#1fd793' />
            </linearGradient>
          </defs>

          {/* ── left: the delivery pipeline ─────────────────────────────── */}
          <text className='kick slow' x='40' y='52'>
            SDLC
          </text>
          <path className='track' d={`M${TRACK_X},96 V300`} />
          {STOPS.map((s) => (
            <g key={s.t}>
              <circle className='stopDot' cx={TRACK_X} cy={s.y} r='5' />
              <text className='stop' x={TRACK_X + 16} y={s.y + 4}>
                {s.t}
              </text>
            </g>
          ))}
          <Crawl>
            <circle cx={TRACK_X} cy='108' r='6.5' fill='#9a9aa6' opacity='.9' />
          </Crawl>
          {DAYS.map((d, i) => (
            <Slot key={d} $kf={fadeSlot(i * 12.5, (i + 1) * 12.5)}>
              <text className='num slow' x='40' y='362'>
                {d}
              </text>
            </Slot>
          ))}
          <text className='under' x='40' y='382'>
            to ship one change
          </text>

          {/* ── middle: production ──────────────────────────────────────── */}
          <circle className='halo' cx={CORE.cx} cy={CORE.cy} r='118' fill='url(#halo)' />
          <rect className='coreBox' x={CORE.cx - CORE.w / 2} y={CORE.cy - CORE.h / 2} width={CORE.w} height={CORE.h} rx='18' />
          <g className='mesh'>
            {LINKS.map(([a, b], i) => (
              <line key={i} className='link' x1={CORE.cx + MESH[a].x} y1={CORE.cy + MESH[a].y} x2={CORE.cx + MESH[b].x} y2={CORE.cy + MESH[b].y} />
            ))}
            {MESH.map((n, i) => (
              <circle key={i} className='node' cx={CORE.cx + n.x} cy={CORE.cy + n.y} r='5.5' />
            ))}
          </g>
          <text className='coreLabel' x={CORE.cx} y={CORE.cy - CORE.h / 2 - 14} textAnchor='middle'>
            production
          </text>
          <circle className='live' cx={CORE.cx - 22} cy={CORE.cy + CORE.h / 2 + 18} r='3.4' fill='#1fd793' />
          <text className='under' x={CORE.cx - 12} y={CORE.cy + CORE.h / 2 + 22}>
            live
          </text>

          {/* ── right: the agent loop ───────────────────────────────────── */}
          <text className='kick fast' x={W - 40} y='52' textAnchor='end'>
            ADLC
          </text>

          {/* questions firing into production, about once a second */}
          {['0s', '0.35s', '0.7s'].map((d) => (
            <Shot key={d} cx={CORE.cx + CORE.w / 2 + 122} cy={CORE.cy} r='4' fill='#1fd793' $d={d} />
          ))}
          <path d={`M${CORE.cx + CORE.w / 2 + 8},${CORE.cy} H${CORE.cx + CORE.w / 2 + 126}`} stroke='url(#beam)' strokeWidth='1.2' opacity='.5' />

          {/* the answers that come back */}
          {CHIPS.map((variants, row) =>
            variants.map((t, k) => {
              // one variant per row is on screen at any moment, and the rows
              // flip at slightly different times so the stack always looks live
              const span = 100 / variants.length;
              const a = k * span + row * 1.5;
              return (
                <Chip key={`${row}-${k}`} $kf={chipIn(a, a + span - 1.5)}>
                  <rect className='chipBox' x={CHIP_X} y={104 + row * 42} width={CHIP_W} height='28' rx='9' />
                  <text className='chipTxt' x={CHIP_X + 12} y={104 + row * 42 + 18}>
                    {t}
                  </text>
                </Chip>
              );
            }),
          )}

          {ANSWERS.map((n, i) => (
            <Slot key={n} $kf={fadeSlot(i * 10, (i + 1) * 10)}>
              <text className='num fast' x={W - 40} y='362' textAnchor='end'>
                {n}
              </text>
            </Slot>
          ))}
          <text className='under' x={W - 40} y='382' textAnchor='end'>
            answers, same window
          </text>
        </Svg>
      </Panel>
    </Frame>
  );
};
