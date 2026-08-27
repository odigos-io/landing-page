'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

/* The two routes an agent has to the data it needs.

   An agent working an incident needs data nobody collected. There are exactly
   two ways to get it.

   The long way, along the top: add a log line, get it reviewed, wait for CI,
   wait for the release window. Four gates, three weeks, and production only
   learns anything at the very end.

   The short way, along the bottom: ask production and it answers. No gates. The
   line never stops firing, and answers keep landing while the top route is
   still sitting in review.

   The shape of the two paths is the argument. */

const DUR = '12s';
const W = 720;
const H = 400;

const AGENT = { x: 86, y: 200, r: 34 };
const PROD = { x: 614, y: 200, w: 116, h: 116 };

/* the long way round */
const TOP_Y = 92;
const GATES = [
  { at: 6, x: 146, w: 146, h: 48, kind: 'diff' as const, head: 'charge.go', line: '+ log.Info("risk", score)' },
  { at: 30, x: 322, w: 82, h: 30, kind: 'chip' as const, head: 'review' },
  { at: 54, x: 424, w: 54, h: 30, kind: 'chip' as const, head: 'ci' },
  { at: 78, x: 498, w: 82, h: 30, kind: 'chip' as const, head: 'deploy' },
];

/* the short way */
const BOT_Y = 306;
const ANSWERS = [
  { at: 4, until: 46, x: 146, t: 'fraudScore() 240ms' },
  { at: 12, until: 54, x: 300, t: 'risk-api retry 3/3' },
  { at: 20, until: 62, x: 454, t: 'userId "u_8843"' },
  { at: 50, until: 92, x: 146, t: 'db.pool wait 190ms' },
  { at: 58, until: 92, x: 300, t: '1.4k calls/min' },
  { at: 66, until: 92, x: 454, t: 'p99 812ms' },
];

const MESH = [
  { x: -34, y: -30 },
  { x: 8, y: -40 },
  { x: 36, y: -12 },
  { x: -22, y: 6 },
  { x: 18, y: 14 },
  { x: -36, y: 34 },
  { x: 6, y: 38 },
  { x: 38, y: 24 },
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
];

const HOLD = 95;

/* ── motion ───────────────────────────────────────────────────────────────── */
const gateIn = (r: number) => keyframes`
  0%,${r}%{opacity:.18}
  ${r + 5}%{opacity:1}
  ${HOLD}%{opacity:1}
  ${HOLD + 3}%,100%{opacity:.18}`;

const answerIn = (a: number, b: number) => keyframes`
  0%,${a}%{opacity:0;transform:translateY(8px) scale(.94)}
  ${a + 2}%{opacity:1;transform:none}
  ${b}%{opacity:1;transform:none}
  ${b + 2}%,100%{opacity:0;transform:translateY(-6px) scale(.98)}`;

const shipPulse = keyframes`
  0%,88%{opacity:0}
  92%{opacity:1}
  ${HOLD + 2}%,100%{opacity:0}`;

const fire = keyframes`
  0%{opacity:0;transform:translateX(0)}
  8%{opacity:1}
  92%{opacity:1}
  100%{opacity:0;transform:translateX(420px)}`;

const back = keyframes`
  0%{opacity:0;transform:translateX(0)}
  10%{opacity:.9}
  90%{opacity:.9}
  100%{opacity:0;transform:translateX(-420px)}`;

const coreGlow = keyframes`0%,100%{opacity:.45}50%{opacity:.85}`;
const agentGlow = keyframes`0%,100%{opacity:.5;transform:scale(.97)}50%{opacity:1;transform:scale(1.03)}`;
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
    radial-gradient(52% 58% at 86% 52%, rgba(17, 168, 119, 0.2), transparent 70%),
    radial-gradient(46% 56% at 12% 50%, rgba(123, 93, 255, 0.24), transparent 72%),
    linear-gradient(165deg, #0c0c11 0%, #14141f 58%, #0e0e15 100%);
  box-shadow: var(--shadow-panel);
  svg {
    display: block;
    width: 100%;
    height: auto;
  }
`;
const Gate = styled.g<{ $kf: ReturnType<typeof keyframes> }>`
  animation: ${(p) => p.$kf} ${DUR} cubic-bezier(0.33, 1, 0.68, 1) infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
  }
`;
const Answer = styled.g<{ $kf: ReturnType<typeof keyframes> }>`
  transform-box: fill-box;
  transform-origin: center;
  animation: ${(p) => p.$kf} ${DUR} cubic-bezier(0.16, 1, 0.3, 1) infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: none;
  }
`;
const Ship = styled.g`
  animation: ${shipPulse} ${DUR} linear infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0;
  }
`;
const Fire = styled.circle<{ $d: string }>`
  animation: ${fire} 1.15s cubic-bezier(0.45, 0, 0.55, 1) infinite;
  animation-delay: ${(p) => p.$d};
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0;
  }
`;
const Back = styled.circle<{ $d: string }>`
  animation: ${back} 1.15s cubic-bezier(0.45, 0, 0.55, 1) infinite;
  animation-delay: ${(p) => p.$d};
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0;
  }
`;

const Svg = styled.svg`
  .lane {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }
  .lane.slow {
    fill: #8a8a95;
  }
  .lane.fast {
    fill: #1fd793;
  }
  .note {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 10.5px;
    letter-spacing: 0.04em;
    fill: #6f6f7c;
  }
  .cost {
    font-family: var(--font-display), system-ui, sans-serif;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.02em;
  }
  .cost.slow {
    fill: #a3a3ae;
  }
  .cost.fast {
    fill: #1fd793;
  }
  .gateBox {
    fill: rgba(255, 255, 255, 0.045);
    stroke: rgba(255, 255, 255, 0.16);
    stroke-width: 1.1;
  }
  .gateTxt {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 11.5px;
    fill: #c9c9d4;
  }
  .gateNote {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 10px;
    fill: #75757f;
  }
  .diffTxt {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 11px;
    fill: #55e0a3;
  }
  .ansBox {
    fill: rgba(17, 168, 119, 0.16);
    stroke: rgba(31, 215, 147, 0.5);
    stroke-width: 1;
  }
  .ansTxt {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 11px;
    fill: #d8f5e8;
  }
  .pathSlow {
    stroke: rgba(255, 255, 255, 0.14);
    stroke-width: 1.4;
    stroke-dasharray: 3 6;
    fill: none;
  }
  .pathFast {
    stroke: rgba(31, 215, 147, 0.42);
    stroke-width: 1.6;
    fill: none;
  }
  .agentRing {
    fill: rgba(123, 93, 255, 0.14);
    stroke: rgba(166, 144, 255, 0.5);
    stroke-width: 1.3;
  }
  .agentTxt {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    fill: #cfc6ff;
  }
  .coreBox {
    fill: rgba(255, 255, 255, 0.03);
    stroke: rgba(166, 144, 255, 0.34);
    stroke-width: 1.2;
  }
  .link {
    stroke: rgba(166, 144, 255, 0.4);
    stroke-width: 1;
  }
  .node {
    fill: #16161f;
    stroke: #a690ff;
    stroke-width: 1.3;
  }
  .coreTxt {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 10.5px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    fill: #b9b9c6;
  }
  .halo {
    animation: ${coreGlow} 3.2s ease-in-out infinite;
  }
  .pulse {
    animation: ${agentGlow} 2.6s ease-in-out infinite;
    transform-box: fill-box;
    transform-origin: center;
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
    .pulse,
    .mesh,
    .live {
      animation: none;
    }
  }
  @media (max-width: 620px) {
    .note,
    .gateNote {
      display: none;
    }
    .gateTxt,
    .ansTxt,
    .diffTxt {
      font-size: 13px;
    }
    .lane,
    .agentTxt,
    .coreTxt {
      font-size: 13px;
    }
  }
`;

export const RoutesDiagram = () => {
  return (
    <Frame>
      <Panel>
        <Svg
          viewBox={`0 0 ${W} ${H}`}
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          role='img'
          aria-label='An AI agent needs data nobody collected. The long route across the top adds a log line and passes through review, CI and a release window, taking three weeks before production learns anything. The short route along the bottom asks production directly and answers keep coming back in about a second each.'
        >
          <defs>
            <radialGradient id='halo'>
              <stop offset='0' stopColor='rgba(166,144,255,.45)' />
              <stop offset='1' stopColor='rgba(166,144,255,0)' />
            </radialGradient>
          </defs>

          {/* ── the two routes ─────────────────────────────────────────── */}
          <path className='pathSlow' d={`M${AGENT.x},${AGENT.y - AGENT.r - 6} V${TOP_Y} H${PROD.x - 8}`} />
          <path className='pathFast' d={`M${AGENT.x},${AGENT.y + AGENT.r + 6} V${BOT_Y} H${PROD.x - 8}`} />
          <path className='pathSlow' d={`M${PROD.x - 8},${TOP_Y} V${PROD.y - PROD.h / 2 - 8}`} />
          <path className='pathFast' d={`M${PROD.x - 8},${BOT_Y} V${PROD.y + PROD.h / 2 + 8}`} />

          {/* ── the agent that needs data ──────────────────────────────── */}
          <circle className='pulse' cx={AGENT.x} cy={AGENT.y} r={AGENT.r + 12} fill='url(#halo)' />
          <circle className='agentRing' cx={AGENT.x} cy={AGENT.y} r={AGENT.r} />
          <circle cx={AGENT.x} cy={AGENT.y} r='9' fill='#a690ff' />
          <text className='agentTxt' x={AGENT.x} y={AGENT.y + AGENT.r + 26} textAnchor='middle'>
            ai agent
          </text>
          <text className='note' x={AGENT.x} y={AGENT.y + AGENT.r + 42} textAnchor='middle'>
            needs data
          </text>
          <text className='note' x={AGENT.x} y={AGENT.y + AGENT.r + 56} textAnchor='middle'>
            nobody collected
          </text>

          {/* ── the long way ───────────────────────────────────────────── */}
          <text className='lane slow' x='168' y='44'>
            SDLC
          </text>
          <text className='note' x='226' y='44'>
            change the code, then wait
          </text>

          {GATES.map((g) => (
            <Gate key={g.head} $kf={gateIn(g.at)}>
              <rect className='gateBox' x={g.x} y={TOP_Y - g.h / 2} width={g.w} height={g.h} rx={g.kind === 'diff' ? 10 : 15} />
              {g.kind === 'diff' ? (
                <>
                  <text className='gateNote' x={g.x + 12} y={TOP_Y - 8}>
                    {g.head}
                  </text>
                  <text className='diffTxt' x={g.x + 12} y={TOP_Y + 12}>
                    {g.line}
                  </text>
                </>
              ) : (
                <text className='gateTxt' x={g.x + g.w / 2} y={TOP_Y + 4} textAnchor='middle'>
                  {g.head}
                </text>
              )}
            </Gate>
          ))}

          <text className='cost slow' x={PROD.x - 8} y={TOP_Y - 34} textAnchor='end'>
            3 weeks
          </text>
          <Ship>
            <circle cx={PROD.x - 8} cy={PROD.y - PROD.h / 2 - 18} r='5' fill='#a3a3ae' />
          </Ship>

          {/* ── the short way ──────────────────────────────────────────── */}
          <text className='lane fast' x='168' y={H - 30}>
            ADLC
          </text>
          <text className='note' x='226' y={H - 30}>
            ask production, get the answer, ask again
          </text>

          {[0, 1, 2, 3].map((i) => (
            <Fire key={`f${i}`} cx={AGENT.x + 24} cy={BOT_Y} r='3.6' fill='#1fd793' $d={`${i * 0.29}s`} />
          ))}
          {[0, 1, 2].map((i) => (
            <Back key={`b${i}`} cx={PROD.x - 30} cy={BOT_Y + 10} r='3' fill='rgba(31,215,147,.6)' $d={`${0.14 + i * 0.38}s`} />
          ))}

          {ANSWERS.map((a, i) => (
            <Answer key={i} $kf={answerIn(a.at, a.until)}>
              <rect className='ansBox' x={a.x} y={BOT_Y - 46} width='146' height='28' rx='9' />
              <text className='ansTxt' x={a.x + 12} y={BOT_Y - 27}>
                {a.t}
              </text>
            </Answer>
          ))}

          <text className='cost fast' x={PROD.x - 8} y={BOT_Y + 34} textAnchor='end'>
            1.2s each
          </text>

          {/* ── production ─────────────────────────────────────────────── */}
          <circle className='halo' cx={PROD.x} cy={PROD.y} r='92' fill='url(#halo)' />
          <rect className='coreBox' x={PROD.x - PROD.w / 2} y={PROD.y - PROD.h / 2} width={PROD.w} height={PROD.h} rx='16' />
          <g className='mesh'>
            {LINKS.map(([a, b], i) => (
              <line key={i} className='link' x1={PROD.x + MESH[a].x} y1={PROD.y + MESH[a].y} x2={PROD.x + MESH[b].x} y2={PROD.y + MESH[b].y} />
            ))}
            {MESH.map((n, i) => (
              <circle key={i} className='node' cx={PROD.x + n.x} cy={PROD.y + n.y} r='5' />
            ))}
          </g>
          <text className='coreTxt' x={PROD.x} y={PROD.y - PROD.h / 2 - 14} textAnchor='middle'>
            production
          </text>
          <circle className='live' cx={PROD.x - 20} cy={PROD.y + PROD.h / 2 + 18} r='3.4' fill='#1fd793' />
          <text className='note' x={PROD.x - 10} y={PROD.y + PROD.h / 2 + 22}>
            live
          </text>
        </Svg>
      </Panel>
    </Frame>
  );
};
