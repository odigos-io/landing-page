'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

/* Hero art: the two loops that can change what production tells you.

   Top loop is the SDLC. Its four steps light up one at a time and a full pass
   takes the entire animation, ending in a single deploy that finally reaches
   production. Bottom loop is the ADLC: ask, capture, answer. It completes five
   passes in the same window, and every time it hits `capture` a span that was
   never being collected appears in the live trace in the middle.

   Nothing here claims a speed difference. You watch one. */

const DUR = '12s';

/* ── layout, in viewBox units ─────────────────────────────────────────────── */
const W = 620;
const CH = 34; // chip height

const SDLC = [
  { t: 'code', x: 36, w: 78 },
  { t: 'review', w: 92, x: 126 },
  { t: 'ci', w: 56, x: 230 },
  { t: 'deploy', w: 88, x: 298 },
];
const SDLC_Y = 78;

const ADLC = [
  { t: 'ask', w: 74, x: 36 },
  { t: 'capture', w: 100, x: 122 },
  { t: 'answer', w: 92, x: 234 },
];
const ADLC_Y = 396;

const PROD = { x: 36, y: 152, w: 548, h: 170 };

type Span = { label: string; start: number; ms: number; depth: number; at?: number; hot?: boolean };
const TOTAL = 800;
const SPANS: Span[] = [
  { label: 'POST /checkout', start: 0, ms: 800, depth: 0 },
  { label: 'payments-svc', start: 40, ms: 690, depth: 1 },
  { label: 'charge()', start: 86, ms: 600, depth: 2 },
  { label: 'fraudScore()', start: 116, ms: 240, depth: 3, at: 14, hot: true },
  { label: 'risk-api · retry 3/3', start: 132, ms: 210, depth: 4, at: 34, hot: true },
  { label: 'reserveInventory()', start: 372, ms: 41, depth: 3, at: 54 },
  { label: 'calculateTax()', start: 430, ms: 12, depth: 3, at: 74 },
];

const HOLD = 95;
const BARS_X = PROD.x + 188;
const BARS_W = PROD.w - 258;
const px = (v: number) => BARS_X + (v / TOTAL) * BARS_W;
const pw = (v: number) => (v / TOTAL) * BARS_W;

/* ── motion ───────────────────────────────────────────────────────────────── */

/* one step of a loop is lit between a and b */
const litAt = (a: number, b: number) => keyframes`
  0%,${a}%{opacity:0}
  ${a + 1}%,${b}%{opacity:1}
  ${b + 1}%,100%{opacity:0}`;

/* the same, five times over, for the fast loop */
const litFast = (a: number, b: number) => {
  const seg = [0, 20, 40, 60, 80].map((o) => `${a + o}%,${b + o}%{opacity:1}${b + o + 1}%,${a + o + 19}%{opacity:0}`);
  return keyframes`0%,${a}%{opacity:0}${seg.join('')}100%{opacity:0}`;
};

const barIn = (r: number) => keyframes`
  0%,${r}%{opacity:0;transform:scaleX(0)}
  ${r + 3}%{opacity:1;transform:scaleX(1)}
  ${HOLD}%{opacity:1;transform:scaleX(1)}
  ${HOLD + 2}%,100%{opacity:0;transform:scaleX(0)}`;
const rowIn = (r: number) => keyframes`
  0%,${r}%{opacity:0}
  ${r + 3}%,${HOLD}%{opacity:1}
  ${HOLD + 2}%,100%{opacity:0}`;

const deployPulse = keyframes`
  0%,76%{opacity:0;transform:translateY(-16px)}
  84%{opacity:1;transform:translateY(0)}
  92%,100%{opacity:0;transform:translateY(10px)}`;

const askFlow = keyframes`
  0%{stroke-dashoffset:26}
  100%{stroke-dashoffset:0}`;

const breathe = keyframes`0%,100%{opacity:.45}50%{opacity:1}`;
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
  background: linear-gradient(180deg, #ffffff 0%, #fcfbff 58%, #f6f3fd 100%);
  box-shadow: var(--shadow-panel);
  svg {
    display: block;
    width: 100%;
    height: auto;
  }
`;

const Lit = styled.g<{ $kf: ReturnType<typeof keyframes> }>`
  animation: ${(p) => p.$kf} ${DUR} steps(1, end) infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0;
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
const Deploy = styled.g`
  animation: ${deployPulse} ${DUR} ease-in-out infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0;
  }
`;

const Svg = styled.svg`
  .kick {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }
  .kick.slow {
    fill: var(--ink-mute);
  }
  .kick.fast {
    fill: #0e9a6c;
  }
  .note {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 11px;
    letter-spacing: 0.02em;
    fill: var(--ink-faint);
  }
  .chip {
    fill: #fff;
    stroke: rgba(24, 20, 54, 0.16);
    stroke-width: 1.2;
  }
  .chipTxt {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 12.5px;
    fill: var(--ink-mute);
    letter-spacing: 0.02em;
  }
  .chipLit {
    fill: rgba(24, 20, 54, 0.9);
  }
  .chipLitFast {
    fill: #11a877;
  }
  .chipTxtLit {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 12.5px;
    fill: #fff;
    letter-spacing: 0.02em;
  }
  .loopPath {
    fill: none;
    stroke-width: 1.4;
  }
  .loopSlow {
    stroke: rgba(24, 20, 54, 0.22);
    stroke-dasharray: 4 5;
  }
  .loopFast {
    stroke: rgba(17, 168, 119, 0.5);
  }
  .badge {
    fill: #fff;
    stroke-width: 1.2;
  }
  .badgeSlow {
    stroke: rgba(24, 20, 54, 0.2);
  }
  .badgeFast {
    stroke: rgba(17, 168, 119, 0.45);
  }
  .badgeTxt {
    font-family: var(--font-display), system-ui, sans-serif;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.01em;
  }
  .badgeTxt.slow {
    fill: var(--ink);
  }
  .badgeTxt.fast {
    fill: #0e9a6c;
  }
  .prodBox {
    fill: rgba(255, 255, 255, 0.75);
    stroke: rgba(91, 67, 241, 0.18);
    stroke-width: 1;
  }
  .cap {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 10.5px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    fill: var(--ink-faint);
  }
  .span {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 11px;
    fill: var(--ink-mute);
  }
  .span.on {
    fill: var(--ink);
  }
  .ms {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 10px;
    fill: var(--ink-faint);
  }
  .ms.on {
    fill: #0e9a6c;
  }
  .plus {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 11px;
    font-weight: 700;
    fill: #0e9a6c;
  }
  .live {
    animation: ${breathe} 1.6s ease-in-out infinite;
  }
  .flow {
    fill: none;
    stroke: #11a877;
    stroke-width: 1.6;
    stroke-dasharray: 26;
    animation: ${askFlow} 1s linear infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    .live,
    .flow {
      animation: none;
    }
  }
`;

const Chip = ({ t, x, w, y, kf, fast }: { t: string; x: number; w: number; y: number; kf: ReturnType<typeof keyframes>; fast?: boolean }) => (
  <g>
    <rect className='chip' x={x} y={y} width={w} height={CH} rx={CH / 2} />
    <text className='chipTxt' x={x + w / 2} y={y + 22} textAnchor='middle'>
      {t}
    </text>
    <Lit $kf={kf}>
      <rect className={fast ? 'chipLitFast' : 'chipLit'} x={x} y={y} width={w} height={CH} rx={CH / 2} />
      <text className='chipTxtLit' x={x + w / 2} y={y + 22} textAnchor='middle'>
        {t}
      </text>
    </Lit>
  </g>
);

const Arrow = ({ x, y, fast }: { x: number; y: number; fast?: boolean }) => <path d={`M${x},${y} l7,4 l-7,4 z`} fill={fast ? 'rgba(17,168,119,.6)' : 'rgba(24,20,54,.3)'} />;

export const HeroArt = () => {
  const sdlcEnd = SDLC[3].x + SDLC[3].w;
  const adlcEnd = ADLC[2].x + ADLC[2].w;
  return (
    <Frame>
      <Panel>
        <Svg
          viewBox={`0 0 ${W} 478`}
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          role='img'
          aria-label='Two loops that can change what production tells you. The software delivery loop of code, review, CI and deploy takes three weeks per pass. The agent loop of ask, capture and answer takes 1.2 seconds, and each pass adds a new span to the live trace in production.'
        >
          {/* ── the delivery loop ──────────────────────────────────────── */}
          <text className='kick slow' x='36' y='32'>
            SDLC
          </text>
          <text className='note' x='94' y='32'>
            the only way to change what production can tell you
          </text>

          {SDLC.map((c, i) => (
            <React.Fragment key={c.t}>
              <Chip t={c.t} x={c.x} w={c.w} y={SDLC_Y} kf={litAt(i * 25, i * 25 + 24)} />
              {i < SDLC.length - 1 && <Arrow x={c.x + c.w + 3} y={SDLC_Y + CH / 2 - 4} />}
            </React.Fragment>
          ))}

          {/* it loops back on itself, over the top, and it takes weeks */}
          <path className='loopPath loopSlow' d={`M${sdlcEnd - 20},${SDLC_Y} V52 H${SDLC[0].x + 20} V${SDLC_Y - 6}`} />
          <path d={`M${SDLC[0].x + 16},${SDLC_Y - 4} l4,7 l4,-7 z`} fill='rgba(24,20,54,.3)' />
          <rect className='badge badgeSlow' x='236' y='39' width='84' height='26' rx='13' />
          <text className='badgeTxt slow' x='278' y='57' textAnchor='middle'>
            3 weeks
          </text>

          {/* one deploy finally lands, in its own lane under the chips */}
          <path d={`M${SDLC[3].x + SDLC[3].w / 2},${SDLC_Y + CH + 4} V${PROD.y - 6}`} stroke='rgba(24,20,54,.18)' strokeWidth='1.4' strokeDasharray='4 5' />
          <path d={`M${SDLC[3].x + SDLC[3].w / 2 - 4},${PROD.y - 8} l4,7 l4,-7 z`} fill='rgba(24,20,54,.3)' />
          <text className='note' x={SDLC[3].x + SDLC[3].w / 2 + 12} y={PROD.y - 18}>
            one deploy, finally
          </text>
          <Deploy>
            <circle cx={SDLC[3].x + SDLC[3].w / 2} cy={PROD.y - 24} r='4.5' fill='rgba(24,20,54,.5)' />
          </Deploy>

          {/* ── production ─────────────────────────────────────────────── */}
          <rect className='prodBox' x={PROD.x} y={PROD.y} width={PROD.w} height={PROD.h} rx='14' />
          <circle className='live' cx={PROD.x + 18} cy={PROD.y + 22} r='3.6' fill='#11a877' />
          <text className='cap' x={PROD.x + 28} y={PROD.y + 26}>
            production · live
          </text>
          <text className='cap' x={PROD.x + PROD.w - 16} y={PROD.y + 26} textAnchor='end'>
            trace 8f2c14
          </text>

          {SPANS.map((s, i) => {
            const y = PROD.y + 48 + i * 17;
            return (
              <Row key={s.label} $kf={s.at ? rowIn(s.at) : undefined}>
                {s.at && (
                  <text className='plus' x={PROD.x + 14 + s.depth * 7} y={y + 8}>
                    +
                  </text>
                )}
                <text className={`span${s.at ? ' on' : ''}`} x={PROD.x + 24 + s.depth * 7} y={y + 8}>
                  {s.label}
                </text>
                <Bar x={px(s.start)} y={y} width={pw(s.ms)} height='8' rx='3' fill={s.hot ? '#ff3d7a' : s.at ? '#11a877' : 'rgba(24,20,54,.16)'} $kf={s.at ? barIn(s.at) : undefined} />
                <text className={`ms${s.at ? ' on' : ''}`} x={PROD.x + PROD.w - 16} y={y + 8} textAnchor='end'>
                  {s.ms}ms
                </text>
              </Row>
            );
          })}

          {/* ── the agent loop ─────────────────────────────────────────── */}
          <path className='flow' d={`M${ADLC[0].x + 34},${ADLC_Y - 46} V${PROD.y + PROD.h + 10}`} />
          <path d={`M${ADLC[0].x + 30},${PROD.y + PROD.h + 14} l4,-7 l4,7 z`} fill='#11a877' />
          <text className='note' x={ADLC[0].x + 44} y={ADLC_Y - 60}>
            ask
          </text>
          <path d={`M${ADLC[2].x + 40},${PROD.y + PROD.h + 10} V${ADLC_Y - 46}`} stroke='rgba(17,168,119,.45)' strokeWidth='1.6' />
          <path d={`M${ADLC[2].x + 36},${ADLC_Y - 44} l4,7 l4,-7 z`} fill='rgba(17,168,119,.7)' />
          <text className='note' x={ADLC[2].x + 50} y={ADLC_Y - 60}>
            answer, already in the trace
          </text>

          <text className='kick fast' x='36' y={ADLC_Y - 18}>
            ADLC
          </text>
          <text className='note' x='94' y={ADLC_Y - 18}>
            your agents, asking production directly
          </text>

          {ADLC.map((c, i) => (
            <React.Fragment key={c.t}>
              <Chip t={c.t} x={c.x} w={c.w} y={ADLC_Y} kf={litFast(i * 6, i * 6 + 5)} fast />
              {i < ADLC.length - 1 && <Arrow x={c.x + c.w + 3} y={ADLC_Y + CH / 2 - 4} fast />}
            </React.Fragment>
          ))}

          <path className='loopPath loopFast' d={`M${adlcEnd - 20},${ADLC_Y + CH} V${ADLC_Y + CH + 26} H${ADLC[0].x + 20} V${ADLC_Y + CH + 6}`} />
          <path d={`M${ADLC[0].x + 16},${ADLC_Y + CH + 8} l4,-7 l4,7 z`} fill='rgba(17,168,119,.6)' />
          <rect className='badge badgeFast' x='196' y={ADLC_Y + CH + 13} width='66' height='26' rx='13' />
          <text className='badgeTxt fast' x='229' y={ADLC_Y + CH + 31} textAnchor='middle'>
            1.2s
          </text>
        </Svg>
      </Panel>
    </Frame>
  );
};
