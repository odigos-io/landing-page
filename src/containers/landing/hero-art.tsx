'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

/* Hero art: two clocks, one production.

   Left is the SDLC. It is the only way most teams can change what production
   tells them: write code, review it, run the pipeline, deploy. One lap here
   takes weeks, and the dot on that ring crawls.

   Right is the agent loop: ask production, capture what answers it, read the
   answer, ask the next thing. One lap takes about a second, and the dot laps
   that ring over and over inside the time the left one barely moves.

   The middle is the live trace, and it gains a span on every fast lap. That is
   the whole argument for dynamic capture: agents run at a cadence the delivery
   pipeline can never feed. */

const DUR = '12s';

/* ── geometry ─────────────────────────────────────────────────────────────── */
const L = { cx: 100, cy: 170, r: 58 }; // sdlc ring
const R = { cx: 533, cy: 170, r: 58 }; // agent ring
const P = { x: 200, y: 70, w: 250, h: 210 }; // production

const SDLC_NODES = [0, 90, 180, 270];
const AGENT_NODES = [270, 30, 150];

const onRing = (c: { cx: number; cy: number; r: number }, deg: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return { x: c.cx + c.r * Math.cos(a), y: c.cy + c.r * Math.sin(a) };
};

type Span = { label: string; start: number; ms: number; depth: number; at?: number; hot?: boolean };
const TOTAL = 800;
const SPANS: Span[] = [
  { label: 'POST /checkout', start: 0, ms: 800, depth: 0 },
  { label: 'payments-svc', start: 40, ms: 690, depth: 1 },
  { label: 'charge()', start: 86, ms: 600, depth: 2 },
  { label: 'fraudScore()', start: 116, ms: 240, depth: 3, at: 21, hot: true },
  { label: 'risk-api retry 3/3', start: 132, ms: 210, depth: 4, at: 41, hot: true },
  { label: 'reserveInventory()', start: 372, ms: 41, depth: 3, at: 61 },
  { label: 'calculateTax()', start: 430, ms: 12, depth: 3, at: 81 },
];

const HOLD = 93;

/* ── motion ───────────────────────────────────────────────────────────────── */
const spin = keyframes`from{transform:rotate(0deg)}to{transform:rotate(360deg)}`;
const barIn = (r: number) => keyframes`
  0%,${r}%{opacity:0;transform:scaleX(0)}
  ${r + 3}%{opacity:1;transform:scaleX(1)}
  ${HOLD}%{opacity:1;transform:scaleX(1)}
  ${HOLD + 3}%,100%{opacity:0;transform:scaleX(0)}`;
const rowIn = (r: number) => keyframes`
  0%,${r}%{opacity:0}
  ${r + 3}%,${HOLD}%{opacity:1}
  ${HOLD + 3}%,100%{opacity:0}`;
const askPulse = keyframes`
  0%{stroke-dashoffset:17}
  100%{stroke-dashoffset:0}`;
const shipPulse = keyframes`
  0%,86%{opacity:0;transform:translateX(-14px)}
  90%{opacity:.9;transform:translateX(0)}
  96%,100%{opacity:0;transform:translateX(10px)}`;
const breathe = keyframes`0%,100%{opacity:.5}50%{opacity:1}`;
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
  background: linear-gradient(180deg, #ffffff 0%, #fcfbff 60%, #f6f3fd 100%);
  box-shadow: var(--shadow-panel);
  svg {
    display: block;
    width: 100%;
    height: auto;
  }
`;

/* the slow ring makes one lap for the whole loop. The fast ring laps five
   times in the same window, which is the entire point of the picture. */
const Slow = styled.g`
  transform-origin: ${L.cx}px ${L.cy}px;
  animation: ${spin} ${DUR} linear infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
const Fast = styled.g`
  transform-origin: ${R.cx}px ${R.cy}px;
  animation: ${spin} 2.4s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Bar = styled.rect<{ $kf?: ReturnType<typeof keyframes> }>`
  transform-origin: left center;
  transform-box: fill-box;
  animation: ${(p) => p.$kf ?? 'none'} ${DUR} cubic-bezier(0.16, 1, 0.3, 1) infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: none;
  }
`;
const Row = styled.g<{ $kf?: ReturnType<typeof keyframes> }>`
  animation: ${(p) => p.$kf ?? 'none'} ${DUR} linear infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
  }
`;
const Ship = styled.g`
  animation: ${shipPulse} ${DUR} ease-in-out infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0;
  }
`;

const Svg = styled.svg`
  .ringSlow {
    fill: none;
    stroke: rgba(24, 20, 54, 0.14);
    stroke-width: 1.4;
    stroke-dasharray: 4 5;
  }
  .ringFast {
    fill: none;
    stroke: rgba(17, 168, 119, 0.4);
    stroke-width: 1.6;
  }
  .nodeSlow {
    fill: #fff;
    stroke: rgba(24, 20, 54, 0.22);
    stroke-width: 1.2;
  }
  .nodeFast {
    fill: #fff;
    stroke: rgba(17, 168, 119, 0.55);
    stroke-width: 1.2;
  }
  .kicker {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 12.5px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-weight: 600;
  }
  .sub {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 10.5px;
    letter-spacing: 0.04em;
    fill: var(--ink-faint);
  }
  .clock {
    font-family: var(--font-display), system-ui, sans-serif;
    font-size: 23px;
    font-weight: 600;
    letter-spacing: -0.02em;
  }
  .clockSub {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 9px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    fill: var(--ink-faint);
  }
  .slowInk {
    fill: var(--ink-mute);
  }
  .fastInk {
    fill: #0e9a6c;
  }
  .prodBox {
    fill: rgba(255, 255, 255, 0.72);
    stroke: rgba(91, 67, 241, 0.16);
    stroke-width: 1;
  }
  .cap {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 9.5px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    fill: var(--ink-faint);
  }
  .span {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 10px;
    fill: var(--ink-mute);
  }
  .span.on {
    fill: var(--ink);
  }
  .plus {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 10.5px;
    font-weight: 700;
    fill: #0e9a6c;
  }
  .live {
    animation: ${breathe} 1.6s ease-in-out infinite;
  }
  .askPath {
    fill: none;
    stroke: #11a877;
    stroke-width: 1.6;
    stroke-dasharray: 17;
    animation: ${askPulse} 1.2s linear infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    .live,
    .askPath {
      animation: none;
    }
  }
  @media (max-width: 620px) {
    .span,
    .cap {
      font-size: 10px;
    }
  }
`;

const BARS_X = P.x + 108;
const BARS_W = P.w - 122;
const pctX = (v: number) => BARS_X + (v / TOTAL) * BARS_W;
const pctW = (v: number) => (v / TOTAL) * BARS_W;

export const HeroArt = () => {
  return (
    <Frame>
      <Panel>
        <Svg
          viewBox='0 0 640 320'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          role='img'
          aria-label='Two loops around one production system. On the left the software delivery lifecycle, which takes weeks per lap. On the right an agent loop asking production directly, which takes about a second per lap and adds new spans to the live trace on every pass.'
        >
          {/* ── left: the delivery pipeline ───────────────────────────── */}
          <circle className='ringSlow' cx={L.cx} cy={L.cy} r={L.r} />
          {SDLC_NODES.map((d) => {
            const p = onRing(L, d);
            return <circle key={d} className='nodeSlow' cx={p.x} cy={p.y} r='5' />;
          })}
          <Slow>
            <circle cx={L.cx} cy={L.cy - L.r} r='6' fill='rgba(24,20,54,.5)' />
          </Slow>
          <text className='clock slowInk' x={L.cx} y={L.cy + 2} textAnchor='middle'>
            3 weeks
          </text>
          <text className='clockSub' x={L.cx} y={L.cy + 16} textAnchor='middle'>
            per lap
          </text>
          <text className='kicker slowInk' x={L.cx} y='42' textAnchor='middle'>
            SDLC
          </text>
          <text className='sub' x={L.cx} y='58' textAnchor='middle'>
            code · ci · deploy
          </text>
          <text className='sub' x={L.cx} y='268' textAnchor='middle'>
            weeks to add
          </text>
          <text className='sub' x={L.cx} y='282' textAnchor='middle'>
            one missing signal
          </text>

          {/* deploys reach production once, late in the loop */}
          <path d='M148,170 H196' stroke='rgba(24,20,54,.18)' strokeWidth='1.4' strokeDasharray='4 5' />
          <Ship>
            <circle cx='172' cy='170' r='4' fill='rgba(24,20,54,.5)' />
          </Ship>

          {/* ── middle: production, and the trace inside it ────────────── */}
          <rect className='prodBox' x={P.x} y={P.y} width={P.w} height={P.h} rx='12' />
          <circle className='live' cx={P.x + 15} cy={P.y + 19} r='3.4' fill='#11a877' />
          <text className='cap' x={P.x + 25} y={P.y + 22}>
            production · live
          </text>

          {SPANS.map((s, i) => {
            const y = P.y + 44 + i * 22;
            return (
              <Row key={s.label} $kf={s.at ? rowIn(s.at) : undefined}>
                {s.at && (
                  <text className='plus' x={P.x + 11 + s.depth * 6} y={y + 7}>
                    +
                  </text>
                )}
                <text className={`span${s.at ? ' on' : ''}`} x={P.x + 20 + s.depth * 6} y={y + 7}>
                  {s.label.length > 17 ? s.label.slice(0, 17) + '…' : s.label}
                </text>
                <Bar
                  x={pctX(s.start)}
                  y={y}
                  width={pctW(s.ms)}
                  height='7'
                  rx='2.5'
                  fill={s.hot ? '#ff3d7a' : s.at ? '#11a877' : 'rgba(24,20,54,.16)'}
                  $kf={s.at ? barIn(s.at) : undefined}
                />
              </Row>
            );
          })}

          {/* ── right: the agent loop ─────────────────────────────────── */}
          <path className='askPath' d='M454,160 H471' />
          <path d='M471,182 H454' stroke='rgba(17,168,119,.45)' strokeWidth='1.6' />
          <path d='M452,182 l7,3.4 v-6.8 z' fill='rgba(17,168,119,.75)' />
          <path d='M469,160 l7,-3.4 v6.8 z' fill='#11a877' />

          <circle className='ringFast' cx={R.cx} cy={R.cy} r={R.r} />
          {AGENT_NODES.map((d) => {
            const p = onRing(R, d);
            return <circle key={d} className='nodeFast' cx={p.x} cy={p.y} r='5' />;
          })}
          <Fast>
            <circle cx={R.cx} cy={R.cy - R.r} r='6.4' fill='#11a877' />
          </Fast>
          <text className='clock fastInk' x={R.cx} y={R.cy + 2} textAnchor='middle'>
            1.2s
          </text>
          <text className='clockSub' x={R.cx} y={R.cy + 16} textAnchor='middle'>
            per lap
          </text>
          <text className='kicker fastInk' x={R.cx} y='42' textAnchor='middle'>
            ADLC
          </text>
          <text className='sub' x={R.cx} y='58' textAnchor='middle'>
            ask · capture · answer
          </text>
          <text className='sub' x={R.cx} y='268' textAnchor='middle'>
            seconds to add
          </text>
          <text className='sub' x={R.cx} y='282' textAnchor='middle'>
            one missing signal
          </text>
        </Svg>
      </Panel>
    </Frame>
  );
};
