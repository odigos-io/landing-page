'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

/* Hero art: an agent asks production for data nobody was collecting, and gets
   it. That is the whole picture, nothing else in the frame.

   Left, the agent and its question in plain language. Right, production as it
   actually is: services talking to each other. The question lands on one of
   them, a probe attaches, and the thing that comes back is the part no other
   tool can reach: the function, the arguments it was called with, and what it
   returned. */

const DUR = '9s';
const W = 600;
const H = 360;

const PANEL = { x: 250, y: 34, w: 326, h: 292 };

/* the running system: services and who calls whom */
const SVC = [
  { id: 'gw', x: 48, y: 76, t: 'gateway' },
  { id: 'chk', x: 138, y: 58, t: 'checkout', hot: true },
  { id: 'pay', x: 232, y: 84, t: 'payments' },
  { id: 'inv', x: 58, y: 122, t: 'inventory' },
  { id: 'fr', x: 160, y: 118, t: 'fraud' },
  { id: 'db', x: 252, y: 130, t: 'postgres' },
];
const EDGES: [string, string][] = [
  ['gw', 'chk'],
  ['chk', 'pay'],
  ['gw', 'inv'],
  ['chk', 'fr'],
  ['pay', 'db'],
  ['fr', 'db'],
  ['inv', 'fr'],
];
const byId = Object.fromEntries(SVC.map((s) => [s.id, s]));
const HOT = SVC.find((s) => s.hot)!;

/* what comes back */
const CARD = { x: 272, y: 200, w: 286, h: 112 };
const ROWS = [
  { at: 34, k: 'arg', a: 'userId', b: '"u_8843"' },
  { at: 40, k: 'arg', a: 'amount', b: '249.90' },
  { at: 46, k: 'ret', a: 'returned', b: 'timeout · 3 retries' },
];

const HOLD = 90;

/* ── motion ───────────────────────────────────────────────────────────────── */
const inAt = (r: number) => keyframes`
  0%,${r}%{opacity:0;transform:translateY(6px)}
  ${r + 4}%{opacity:1;transform:none}
  ${HOLD}%{opacity:1;transform:none}
  ${HOLD + 4}%,100%{opacity:0;transform:translateY(-4px)}`;

const beamAt = (r: number) => keyframes`
  0%,${r}%{stroke-dashoffset:56;opacity:0}
  ${r + 1}%{opacity:1}
  ${r + 7}%{stroke-dashoffset:0;opacity:1}
  ${r + 14}%{opacity:0}
  100%{opacity:0}`;

const ringAt = (r: number) => keyframes`
  0%,${r}%{opacity:0;transform:scale(1.9)}
  ${r + 4}%{opacity:1;transform:scale(1)}
  ${HOLD}%{opacity:1;transform:scale(1)}
  ${HOLD + 4}%,100%{opacity:0;transform:scale(1)}`;

const pingAt = (r: number) => keyframes`
  0%,${r}%{opacity:0;transform:scale(.5)}
  ${r + 2}%{opacity:.55}
  ${r + 12}%,100%{opacity:0;transform:scale(2.6)}`;

const trace = keyframes`0%{stroke-dashoffset:34}100%{stroke-dashoffset:0}`;
const blink = keyframes`0%,100%{opacity:.35}50%{opacity:1}`;
const core = keyframes`0%,100%{opacity:.55;transform:scale(.96)}50%{opacity:1;transform:scale(1.04)}`;
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
    radial-gradient(48% 46% at 76% 62%, rgba(17, 168, 119, 0.1), transparent 70%),
    radial-gradient(44% 46% at 16% 46%, rgba(123, 93, 255, 0.16), transparent 72%),
    linear-gradient(180deg, #ffffff 0%, #fcfbff 60%, #f6f3fd 100%);
  box-shadow: var(--shadow-panel);
  svg {
    display: block;
    width: 100%;
    height: auto;
  }
`;
const In = styled.g<{ $kf: ReturnType<typeof keyframes> }>`
  animation: ${(p) => p.$kf} ${DUR} cubic-bezier(0.16, 1, 0.3, 1) infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: none;
  }
`;
const Beam = styled.path<{ $kf: ReturnType<typeof keyframes> }>`
  fill: none;
  stroke-dasharray: 56;
  animation: ${(p) => p.$kf} ${DUR} cubic-bezier(0.4, 0, 0.2, 1) infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0;
  }
`;
const Ring = styled.g<{ $kf: ReturnType<typeof keyframes> }>`
  transform-box: fill-box;
  transform-origin: center;
  animation: ${(p) => p.$kf} ${DUR} cubic-bezier(0.16, 1, 0.3, 1) infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: none;
  }
`;
const Ping = styled.circle<{ $kf: ReturnType<typeof keyframes> }>`
  fill: none;
  stroke: #11a877;
  stroke-width: 1.3;
  transform-box: fill-box;
  transform-origin: center;
  animation: ${(p) => p.$kf} ${DUR} ease-out infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0;
  }
`;

const Svg = styled.svg`
  .who {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 10.5px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    fill: var(--ink-faint);
  }
  .ask {
    font-family: var(--font-display), system-ui, sans-serif;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -0.02em;
    fill: var(--ink);
  }
  .svc {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 10.5px;
    fill: var(--ink-mute);
  }
  .svc.on {
    fill: var(--ink);
  }
  .node {
    fill: #fff;
    stroke: rgba(24, 20, 54, 0.2);
    stroke-width: 1.2;
  }
  .node.on {
    stroke: #11a877;
    stroke-width: 1.6;
  }
  .edge {
    stroke: rgba(24, 20, 54, 0.14);
    stroke-width: 1.1;
    fill: none;
  }
  .edge.live {
    stroke: rgba(17, 168, 119, 0.55);
    stroke-width: 1.5;
    stroke-dasharray: 5 6;
    animation: ${trace} 1.1s linear infinite;
  }
  .card {
    fill: #fff;
    stroke: rgba(17, 168, 119, 0.4);
    stroke-width: 1.3;
    filter: drop-shadow(0 12px 26px rgba(24, 20, 54, 0.12));
  }
  .fn {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 13.5px;
    fill: var(--ink);
  }
  .ms {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 12.5px;
    fill: #c9346a;
  }
  .k {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 12px;
    fill: var(--ink-faint);
  }
  .v {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 12px;
    fill: var(--accent);
  }
  .v.err {
    fill: #d63a6f;
  }
  .tag {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 10.5px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    fill: #0e9a6c;
  }
  .rule {
    stroke: rgba(24, 20, 54, 0.09);
    stroke-width: 1;
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
    .live,
    .edge.live {
      animation: none;
    }
  }
  @media (max-width: 620px) {
    .svc {
      font-size: 12px;
    }
    .ask {
      font-size: 18px;
    }
    .k,
    .v {
      font-size: 13.5px;
    }
    .fn {
      font-size: 15px;
    }
  }
`;

const nx = (id: string) => PANEL.x + byId[id].x;
const ny = (id: string) => PANEL.y + byId[id].y;

export const HeroArt = () => {
  return (
    <Frame>
      <Panel>
        <Svg
          viewBox={`0 0 ${W} ${H}`}
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          role='img'
          aria-label='An AI agent asks why checkout p99 tripled. The question lands on the checkout service in live production, and Odigos returns the function that was slow with the arguments it was called with and what it returned.'
        >
          {/* ── the agent, and what it wants to know ───────────────────── */}
          <In $kf={inAt(2)}>
            <circle className='agentCore' cx='58' cy='118' r='13' fill='#5b43f1' opacity='.9' />
            <circle cx='58' cy='118' r='21' stroke='rgba(91,67,241,.25)' strokeWidth='1' fill='none' />
            <text className='who' x='86' y='122'>
              ai agent
            </text>
            <text className='ask' x='24' y='168'>
              why is checkout
            </text>
            <text className='ask' x='24' y='190'>
              p99 up 3x?
            </text>
          </In>

          {/* the question reaches one service */}
          <Beam d={`M120,206 C170,214 190,${ny('chk') + 20} ${nx('chk') - 14},${ny('chk')}`} stroke='#5b43f1' strokeWidth='1.8' $kf={beamAt(14)} />

          {/* ── production, as it actually runs ────────────────────────── */}
          <rect x={PANEL.x} y={PANEL.y} width={PANEL.w} height={PANEL.h} rx='16' fill='rgba(255,255,255,.55)' stroke='rgba(91,67,241,.14)' />
          <circle className='live' cx={PANEL.x + 16} cy={PANEL.y + 20} r='3.4' fill='#11a877' />
          <text className='who' x={PANEL.x + 26} y={PANEL.y + 24}>
            production · live
          </text>

          {EDGES.map(([a, b], i) => {
            const live = a === HOT.id || b === HOT.id;
            return <path key={i} className={`edge${live ? ' live' : ''}`} d={`M${nx(a)},${ny(a)} L${nx(b)},${ny(b)}`} />;
          })}
          {SVC.map((s) => (
            <g key={s.id}>
              <circle className={`node${s.hot ? ' on' : ''}`} cx={PANEL.x + s.x} cy={PANEL.y + s.y} r={s.hot ? 11 : 8} />
              <text className={`svc${s.hot ? ' on' : ''}`} x={PANEL.x + s.x} y={PANEL.y + s.y + (s.hot ? 26 : 22)} textAnchor='middle'>
                {s.t}
              </text>
            </g>
          ))}
          <Ring $kf={ringAt(20)}>
            <circle cx={PANEL.x + HOT.x} cy={PANEL.y + HOT.y} r='17' stroke='#11a877' strokeWidth='1.4' fill='none' />
          </Ring>
          <Ping cx={PANEL.x + HOT.x} cy={PANEL.y + HOT.y} r='12' $kf={pingAt(20)} />

          {/* ── what comes back ────────────────────────────────────────── */}
          <In $kf={inAt(26)}>
            <path className='rule' d={`M${PANEL.x + HOT.x},${PANEL.y + HOT.y + 30} V${CARD.y - 8}`} />
            <rect className='card' x={CARD.x} y={CARD.y} width={CARD.w} height={CARD.h} rx='12' />
            <text className='tag' x={CARD.x + 16} y={CARD.y + 24}>
              captured live
            </text>
            <text className='tag' x={CARD.x + CARD.w - 16} y={CARD.y + 24} textAnchor='end'>
              1.2s
            </text>
            <text className='fn' x={CARD.x + 16} y={CARD.y + 48}>
              fraudScore()
            </text>
            <text className='ms' x={CARD.x + CARD.w - 16} y={CARD.y + 48} textAnchor='end'>
              240ms
            </text>
            <path className='rule' d={`M${CARD.x + 16},${CARD.y + 60} H${CARD.x + CARD.w - 16}`} />
          </In>

          {ROWS.map((r, i) => (
            <In key={r.a} $kf={inAt(r.at)}>
              <text className='k' x={CARD.x + 16} y={CARD.y + 78 + i * 19}>
                {r.a}
              </text>
              <text className={`v${r.k === 'ret' ? ' err' : ''}`} x={CARD.x + CARD.w - 16} y={CARD.y + 78 + i * 19} textAnchor='end'>
                {r.b}
              </text>
            </In>
          ))}

          <In $kf={inAt(54)}>
            <text className='who' x='24' y='236'>
              no code change · no redeploy
            </text>
          </In>
        </Svg>
      </Panel>
    </Frame>
  );
};
