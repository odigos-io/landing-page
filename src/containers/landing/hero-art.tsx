'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

/* Hero art: an agent interrogating production, including the wrong turn.

   Four exchanges, left to right. The agent asks, production answers with data
   nobody was collecting, and the answer decides the next question. One of them
   is a dead end and gets ruled out, which is what a real investigation looks
   like, and the last one lands on a cause no static trace contained: a
   reporting job holding the connection pool.

   The map on the right is the same investigation drawn as a route: a grey
   branch that stops, and a green one that keeps going deeper. */

const DUR = '15s';
const W = 640;
const H = 404;

const MAP = { x: 328, y: 44, w: 288, h: 320 };
const N = {
  charge: { x: 132, y: 52, t: 'charge()', known: true },
  auth: { x: 40, y: 106, t: 'authorize()', known: true },
  promo: { x: 150, y: 140, t: 'applyPromo()' },
  tax: { x: 240, y: 108, t: 'taxFor()' },
  reserve: { x: 58, y: 206, t: 'reserve()' },
  settle: { x: 168, y: 240, t: 'settle()' },
  risk: { x: 246, y: 196, t: 'riskScore()' },
} as const;
type NodeId = keyof typeof N;

const EDGES: [NodeId, NodeId][] = [
  ['charge', 'auth'],
  ['charge', 'promo'],
  ['charge', 'tax'],
  ['promo', 'settle'],
  ['auth', 'reserve'],
  ['tax', 'risk'],
  ['promo', 'risk'],
];

/* the investigation. `dead` is the wrong turn, `cause` is where it ends. */
const STEPS = [
  { n: 1, node: 'charge' as NodeId, at: 4, q: 'what runs inside charge()?', a: '9 found · 5 never collected' },
  { n: 2, node: 'promo' as NodeId, at: 26, q: 'capture applyPromo() args', a: 'promoId "BLACK50" · uid 8843' },
  { n: 3, node: 'promo' as NodeId, at: 48, q: 'is it throwing?', a: 'no · err nil · 4ms', dead: true },
  { n: 4, node: 'promo' as NodeId, at: 70, q: 'what is it returning?', a: 'discount 0.00 always', cause: true },
];

const ROW_Y = 92;
const ROW_H = 68;
const LX = 24;
const LW = 276;

const HOLD = 93;

/* ── motion ───────────────────────────────────────────────────────────────── */
const askIn = (r: number) => keyframes`
  0%,${r}%{opacity:0;transform:translateY(6px)}
  ${r + 2}%{opacity:1;transform:none}
  ${HOLD}%{opacity:1;transform:none}
  ${HOLD + 3}%,100%{opacity:0;transform:translateY(-4px)}`;

const ansIn = (r: number) => keyframes`
  0%,${r + 6}%{opacity:0;transform:translateY(6px)}
  ${r + 9}%{opacity:1;transform:none}
  ${HOLD}%{opacity:1;transform:none}
  ${HOLD + 3}%,100%{opacity:0;transform:translateY(-4px)}`;

const probeIn = (r: number) => keyframes`
  0%,${r + 2}%{opacity:0;transform:scale(2)}
  ${r + 6}%{opacity:1;transform:scale(1)}
  ${HOLD}%{opacity:1;transform:scale(1)}
  ${HOLD + 3}%,100%{opacity:0;transform:scale(1)}`;

const routeIn = (r: number) => keyframes`
  0%,${r + 3}%{stroke-dashoffset:var(--len);opacity:0}
  ${r + 4}%{opacity:1}
  ${r + 9}%{stroke-dashoffset:0;opacity:1}
  ${HOLD}%{stroke-dashoffset:0;opacity:1}
  ${HOLD + 3}%,100%{opacity:0}`;

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
    radial-gradient(46% 44% at 80% 60%, rgba(17, 168, 119, 0.1), transparent 70%),
    radial-gradient(42% 46% at 14% 40%, rgba(123, 93, 255, 0.15), transparent 72%),
    linear-gradient(180deg, #ffffff 0%, #fcfbff 60%, #f6f3fd 100%);
  box-shadow: var(--shadow-panel);
  svg {
    display: block;
    width: 100%;
    height: auto;
  }
`;
const G = styled.g<{ $kf: ReturnType<typeof keyframes> }>`
  animation: ${(p) => p.$kf} ${DUR} cubic-bezier(0.16, 1, 0.3, 1) infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: none;
  }
`;
const Probe = styled.g<{ $kf: ReturnType<typeof keyframes> }>`
  transform-box: fill-box;
  transform-origin: center;
  animation: ${(p) => p.$kf} ${DUR} cubic-bezier(0.16, 1, 0.3, 1) infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: none;
  }
`;
const Route = styled.path<{ $kf: ReturnType<typeof keyframes> }>`
  fill: none;
  stroke-linecap: round;
  stroke-dasharray: var(--len);
  animation: ${(p) => p.$kf} ${DUR} cubic-bezier(0.4, 0, 0.2, 1) infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    stroke-dashoffset: 0;
    opacity: 1;
  }
`;
const Ping = styled.circle<{ $kf: ReturnType<typeof keyframes> }>`
  fill: none;
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
  .q {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 12.5px;
    fill: var(--ink);
    letter-spacing: -0.01em;
  }
  .caret {
    fill: var(--accent);
    font-weight: 700;
  }
  .a {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 12.5px;
    fill: #0c7a58;
  }
  .a.dead {
    fill: #93909f;
  }
  .a.cause {
    fill: #c9346a;
  }
  .tag {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 9.5px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .tag.dead {
    fill: #93909f;
  }
  .tag.cause {
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
  .numRing.dead {
    fill: #a9a6b4;
  }
  .numRing.cause {
    fill: #ff3d7a;
  }
  .svc {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 10px;
    fill: var(--ink-mute);
  }
  .node {
    fill: #fff;
    stroke: rgba(24, 20, 54, 0.22);
    stroke-width: 1.2;
  }
  .dark {
    fill: none;
    stroke: rgba(24, 20, 54, 0.2);
    stroke-width: 1.1;
    stroke-dasharray: 3 4;
  }
  .edge {
    stroke: rgba(24, 20, 54, 0.12);
    stroke-width: 1.1;
  }
  .rule {
    stroke: rgba(24, 20, 54, 0.08);
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
    .live {
      animation: none;
    }
  }
  @media (max-width: 620px) {
    .q,
    .a {
      font-size: 14px;
    }
    .svc {
      font-size: 12px;
    }
  }
`;

const mx = (id: NodeId) => MAP.x + N[id].x;
const my = (id: NodeId) => MAP.y + N[id].y;

/* the route the investigation actually took */
const LEGS = [{ from: 'charge' as NodeId, to: 'promo' as NodeId, at: 26 }];

export const HeroArt = () => {
  return (
    <Frame>
      <Panel>
        <Svg
          viewBox={`0 0 ${W} ${H}`}
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          role='img'
          aria-label='An AI agent interrogating live production in four exchanges. Checkout p99 is up, fraudScore takes 240ms, the risk API is ruled out, the wait is on the database connection pool, and a reporting job is holding eight connections.'
        >
          {/* ── the agent ──────────────────────────────────────────────── */}
          <circle className='agentCore' cx='40' cy='42' r='11' fill='#5b43f1' opacity='.9' />
          <circle cx='40' cy='42' r='18' stroke='rgba(91,67,241,.22)' strokeWidth='1' fill='none' />
          <text className='who' x='66' y='46'>
            ai agent
          </text>
          <text className='who' x={LX + LW} y='46' textAnchor='end'>
            4 questions · 6s
          </text>
          <path className='rule' d={`M${LX},64 H${LX + LW}`} />

          {/* ── the exchanges ──────────────────────────────────────────── */}
          {STEPS.map((s, i) => {
            const y = ROW_Y + i * ROW_H;
            const tone = s.dead ? ' dead' : s.cause ? ' cause' : '';
            return (
              <React.Fragment key={s.n}>
                <G $kf={askIn(s.at)}>
                  <text className='q' x={LX} y={y}>
                    <tspan className='caret'>❯ </tspan>
                    {s.q}
                  </text>
                </G>
                <G $kf={ansIn(s.at)}>
                  <circle className={`numRing${tone}`} cx={LX + 7} cy={y + 20} r='8' />
                  <text className='num' x={LX + 7} y={y + 23.5} textAnchor='middle'>
                    {s.n}
                  </text>
                  <text className={`a${tone}`} x={LX + 24} y={y + 24}>
                    {s.a}
                  </text>
                  {(s.dead || s.cause) && (
                    <text className={`tag${tone}`} x={LX + LW} y={y + 24} textAnchor='end'>
                      {s.dead ? 'ruled out' : 'root cause'}
                    </text>
                  )}
                </G>
                {i < STEPS.length - 1 && <path className='rule' d={`M${LX},${y + 40} H${LX + LW}`} />}
              </React.Fragment>
            );
          })}

          {/* ── production, and the route the agent took through it ────── */}
          <rect x={MAP.x} y={MAP.y} width={MAP.w} height={MAP.h} rx='16' fill='rgba(255,255,255,.55)' stroke='rgba(91,67,241,.14)' />
          <circle className='live' cx={MAP.x + 16} cy={MAP.y + 20} r='3.4' fill='#11a877' />
          <text className='who' x={MAP.x + 26} y={MAP.y + 24}>
            checkout-svc · live
          </text>
          <G $kf={askIn(8)}>
            <text className='tag' x={MAP.x + MAP.w - 16} y={MAP.y + 24} textAnchor='end' style={{ fill: '#0e9a6c' }}>
              +5 discovered
            </text>
          </G>

          {EDGES.map(([a, b], i) => (
            <line key={i} className='edge' x1={mx(a)} y1={my(a)} x2={mx(b)} y2={my(b)} />
          ))}

          {LEGS.map((l, i) => {
            const len = Math.round(Math.hypot(mx(l.to) - mx(l.from), my(l.to) - my(l.from))) + 4;
            return <Route key={i} d={`M${mx(l.from)},${my(l.from)} L${mx(l.to)},${my(l.to)}`} stroke='#11a877' strokeWidth='2' style={{ ['--len' as string]: `${len}` }} $kf={routeIn(l.at)} />;
          })}

          {(Object.keys(N) as NodeId[]).map((id) => {
            const n = N[id] as { x: number; y: number; t: string; known?: boolean };
            const step = STEPS.find((s) => s.node === id);
            const r = step ? 10 : 7.5;
            if (n.known) {
              return (
                <g key={id}>
                  <circle className='node' cx={mx(id)} cy={my(id)} r={r} />
                  <text className='svc' x={mx(id)} y={my(id) + r + 14} textAnchor='middle'>
                    {n.t}
                  </text>
                </g>
              );
            }
            // nothing was ever collected about this one, so it starts as an
            // outline with no name on it, and fills in when it is discovered
            return (
              <g key={id}>
                <circle className='dark' cx={mx(id)} cy={my(id)} r={r} />
                <G $kf={askIn(8)}>
                  <circle className='node' cx={mx(id)} cy={my(id)} r={r} />
                  <text className='svc' x={mx(id)} y={my(id) + r + 14} textAnchor='middle'>
                    {n.t}
                  </text>
                </G>
              </g>
            );
          })}

          {STEPS.map((s) => {
            const tone = s.dead ? ' dead' : s.cause ? ' cause' : '';
            return (
              <React.Fragment key={`p${s.n}`}>
                <Probe $kf={probeIn(s.at)}>
                  <circle className={`numRing${tone}`} cx={mx(s.node) + 15} cy={my(s.node) - 13} r='8.5' />
                  <text className='num' x={mx(s.node) + 14} y={my(s.node) - 8.5} textAnchor='middle'>
                    {s.n}
                  </text>
                </Probe>
                <Ping cx={mx(s.node)} cy={my(s.node)} r='13' stroke={s.dead ? 'rgba(24,20,54,.3)' : s.cause ? '#ff3d7a' : '#11a877'} $kf={pingAt(s.at)} />
              </React.Fragment>
            );
          })}
        </Svg>
      </Panel>
    </Frame>
  );
};
