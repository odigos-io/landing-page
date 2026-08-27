'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

/* Hero art (light): THE INTERROGATION LOOP.

   An agent asks production a question. Odigos attaches a probe on the exact
   span the question pointed at, and the trace gains resolution right there.
   The answer travels back, and the answer becomes the next question, one level
   deeper. Two full cycles per loop, then reset.

   Everything is opacity/transform on one shared timeline (DUR), so the whole
   thing stays on the compositor. Reduced motion drops to a static frame. */

const DUR = '13s';

type KF = ReturnType<typeof keyframes>;

type Row = {
  id: string;
  d: number; // depth
  w: number; // bar width
  label: string;
  wave: 0 | 1 | 2; // 0 = the coarse trace you already have
  hot?: boolean;
};

const ROWS: Row[] = [
  { id: 'r0', d: 0, w: 100, label: 'POST /checkout · 812ms', wave: 0 },
  { id: 'r1', d: 1, w: 88, label: 'payments-svc', wave: 0 },
  { id: 'r2', d: 2, w: 76, label: 'charge()', wave: 0 },
  { id: 'r3', d: 3, w: 64, label: 'fraudScore() · 240ms', wave: 1, hot: true },
  { id: 'r4', d: 3, w: 44, label: 'reserveInventory() · 41ms', wave: 1 },
  { id: 'r5', d: 3, w: 30, label: 'calculateTax() · 12ms', wave: 1 },
  { id: 'r6', d: 4, w: 52, label: 'risk-api · retry 3/3', wave: 2, hot: true },
  { id: 'r7', d: 4, w: 34, label: 'riskModel.score()', wave: 2 },
  { id: 'r8', d: 4, w: 24, label: 'jwt.verify', wave: 2 },
];

const BAR_X = 204; // depth 0 bar start
const BAR_STEP = 12; // indent per depth
const ROW_Y = 140; // first row baseline
const ROW_STEP = 16;
const BAR_H = 9;

/* ── timeline, in % of DUR ───────────────────────────────────────────────────
    6 agent asks          9 question beam       15 probe attaches
   19 wave 1 lands       30 answer beam         32 answer reads
   46 the answer becomes the next question, deeper
   49 beam  54 probe  57 wave 2  66 beam  68 answer   92 reset             */
const Q1 = 9;
const Q2 = 49;
const A1 = 30;
const A2 = 66;
const P1 = 15;
const P2 = 54;
const W1 = 19;
const W2 = 57;

const fadeAt = (a: number, b: number) => keyframes`0%,${a}%{opacity:0}${a + 2}%,${b}%{opacity:1}${b + 2}%,100%{opacity:0}`;

/* a transcript line lands at `a`, holds while it is the live line (until `b`),
   then stays on screen dimmed so the whole interrogation is readable at once */
const lineAt = (a: number, b: number) => keyframes`
  0%,${a}%{opacity:0}
  ${a + 2}%,${b}%{opacity:1}
  ${b + 3}%,91%{opacity:.42}
  95%,100%{opacity:0}`;

/* a discovered row slides out from under its parent and settles */
const rowIn = (r: number) => keyframes`
  0%,${r}%{opacity:0;transform:translateY(-6px) scaleX(.35)}
  ${r + 4}%{opacity:1;transform:translateY(0) scaleX(1)}
  91%{opacity:1;transform:translateY(0) scaleX(1)}
  95%,100%{opacity:0;transform:translateY(-6px) scaleX(.35)}`;

/* a beam draws across the gap between the two poles, then clears */
const beamAt = (r: number) => keyframes`
  0%,${r}%{stroke-dashoffset:var(--len);opacity:0}
  ${r + 1}%{opacity:1}
  ${r + 6}%{stroke-dashoffset:0;opacity:1}
  ${r + 12}%{stroke-dashoffset:0;opacity:0}
  100%{stroke-dashoffset:0;opacity:0}`;

/* the packet that lands when a beam arrives */
const landAt = (r: number) => keyframes`
  0%,${r + 5}%{opacity:0;transform:scale(.2)}
  ${r + 7}%{opacity:1;transform:scale(1)}
  ${r + 11}%{opacity:1;transform:scale(1)}
  ${r + 13}%,100%{opacity:0;transform:scale(.2)}`;

/* the probe snapping onto the span the question pointed at */
const probeAt = (r: number) => keyframes`
  0%,${r}%{opacity:0;transform:scale(1.9)}
  ${r + 3}%{opacity:1;transform:scale(1)}
  ${r + 24}%{opacity:1;transform:scale(1)}
  ${r + 28}%,100%{opacity:0;transform:scale(1)}`;

const pingAt = (r: number) => keyframes`
  0%,${r}%{opacity:0;transform:scale(.4)}
  ${r + 2}%{opacity:.5}
  ${r + 10}%,100%{opacity:0;transform:scale(2.8)}`;

const core = keyframes`0%,100%{opacity:.6;transform:scale(.94)}50%{opacity:1;transform:scale(1.06)}`;
const float = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}`;

const ROWS2 = ROWS.map((r, i) => {
  const y = ROW_Y + i * ROW_STEP;
  const x = BAR_X + r.d * BAR_STEP;
  const base = r.wave === 1 ? W1 : W2;
  const at = base + ((i + 2) % 3) * 3;
  return { ...r, x, y, kf: r.wave === 0 ? null : rowIn(at) };
});

const Frame = styled.div`
  position: relative;
  animation: ${float} 13s ease-in-out infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const Panel = styled.div`
  position: relative;
  border-radius: 22px;
  overflow: hidden;
  aspect-ratio: 1.6 / 1;
  border: 1px solid rgba(91, 67, 241, 0.12);
  background:
    radial-gradient(52% 50% at 18% 44%, rgba(123, 93, 255, 0.16), transparent 70%),
    radial-gradient(48% 48% at 82% 64%, rgba(17, 168, 119, 0.1), transparent 72%),
    linear-gradient(180deg, #f1eefb 0%, #f7f4fc 55%, #f1eef8 100%);
  box-shadow: var(--shadow-lift), inset 0 1px 0 rgba(255, 255, 255, 0.9), inset 0 0 80px rgba(123, 93, 255, 0.06);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 4;
    background-image: ${GRAIN};
    background-size: 140px 140px;
    opacity: 0.05;
    mix-blend-mode: multiply;
  }
`;

const Line = styled.g<{ $kf: KF }>`
  animation: ${(p) => p.$kf} ${DUR} linear infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0;
  }
`;

const Beam = styled.path<{ $kf: KF }>`
  fill: none;
  stroke-linecap: round;
  stroke-dasharray: var(--len);
  animation: ${(p) => p.$kf} ${DUR} cubic-bezier(0.4, 0, 0.2, 1) infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0;
  }
`;

const Pop = styled.g<{ $kf: KF }>`
  transform-box: fill-box;
  transform-origin: center;
  animation: ${(p) => p.$kf} ${DUR} cubic-bezier(0.16, 1, 0.3, 1) infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0;
  }
`;

const RowG = styled.g<{ $kf: KF }>`
  transform-box: fill-box;
  transform-origin: left center;
  animation: ${(p) => p.$kf} ${DUR} cubic-bezier(0.16, 1, 0.3, 1) infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: none;
  }
`;

const Ping = styled.circle<{ $kf: KF }>`
  fill: none;
  stroke-width: 1.2;
  transform-box: fill-box;
  transform-origin: center;
  animation: ${(p) => p.$kf} ${DUR} ease-out infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0;
  }
`;

const Svg = styled.svg`
  position: relative;
  z-index: 2;
  display: block;
  width: 100%;
  height: 100%;

  .panelBox {
    fill: rgba(255, 255, 255, 0.6);
    stroke: rgba(91, 67, 241, 0.14);
    stroke-width: 1;
  }
  .agentBox {
    fill: #ffffff;
    stroke: rgba(91, 67, 241, 0.18);
    stroke-width: 1;
    filter: drop-shadow(0 10px 20px rgba(24, 20, 54, 0.1));
  }
  .cap {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 8.5px;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    fill: #9a97a8;
  }
  .agentName {
    font-family: var(--font-display), system-ui, sans-serif;
    font-size: 12.5px;
    font-weight: 600;
    fill: #1a1730;
    letter-spacing: -0.01em;
  }
  .speaker {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 9px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .line {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 12.5px;
    letter-spacing: -0.012em;
  }
  .q .speaker,
  .q .line {
    fill: #5b43f1;
  }
  .a .speaker {
    fill: #0e9a6c;
  }
  .a .line {
    fill: #0c7a58;
  }
  .micro {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 8px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    opacity: 0.8;
  }
  .micro.q {
    fill: #5b43f1;
  }
  .micro.a {
    fill: #0e9a6c;
  }
  .cap.on {
    fill: #0e9a6c;
  }
  .rowLabel {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 9.5px;
    fill: #74718a;
    letter-spacing: -0.01em;
  }
  .rowLabel.hot {
    fill: #c9346a;
  }
  .barBase {
    fill: rgba(24, 20, 54, 0.17);
  }
  .probeRing {
    fill: rgba(17, 168, 119, 0.08);
    stroke: #11a877;
    stroke-width: 1.2;
  }
  .chip {
    fill: rgba(17, 168, 119, 0.1);
    stroke: rgba(17, 168, 119, 0.38);
    stroke-width: 1;
  }
  .chipText {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 8.5px;
    fill: #0e9a6c;
    letter-spacing: 0.02em;
  }
  .core {
    animation: ${core} 2.6s ease-in-out infinite;
    transform-box: fill-box;
    transform-origin: center;
  }
  @media (prefers-reduced-motion: reduce) {
    .core {
      animation: none;
    }
  }
  @media (max-width: 560px) {
    /* at this size the transcript carries the message; keep only the labels
       that name the finding, and keep them inside the frame */
    /* the transcript already names db.pool and tls.handshake, so the labels
       are redundant here and only risk running past the frame */
    .rowLabel {
      display: none;
    }
    .line {
      font-size: 15px;
    }
    .speaker {
      font-size: 10px;
    }
  }
`;

/* the loop across the gap: question out over the top, answer back underneath */
const Q_PATH = 'M138,148 C160,130 164,121 184,121';
const A_PATH = 'M184,199 C164,199 158,192 140,187';
const LEN = 62;

const SCRIPT = [
  { kind: 'q', speaker: 'agent', text: 'why is checkout p99 up 3x?', at: 6, until: 30 },
  { kind: 'a', speaker: 'odigos', text: 'fraudScore() eats 240ms inside charge()', at: 33, until: 45 },
  { kind: 'q', speaker: 'agent', text: 'what is fraudScore() waiting on?', at: 46, until: 67 },
  { kind: 'a', speaker: 'odigos', text: '3 retries against the partner risk api', at: 69, until: 90 },
] as const;

const LINE_Y = [28, 46, 64, 82];
const LINES = SCRIPT.map((s) => ({ ...s, kf: lineAt(s.at, s.until) }));

const STATES = [
  { text: 'asking', kf: fadeAt(4, 30) },
  { text: 'reading', kf: fadeAt(31, 45) },
  { text: 'asking', kf: fadeAt(45, 66) },
  { text: 'reading', kf: fadeAt(67, 91) },
];

export const HeroArt = () => {
  return (
    <Frame>
      <Panel>
        <Svg viewBox='0 0 480 300' fill='none' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='An AI agent asks production why checkout latency tripled. Odigos attaches an eBPF probe to the exact span and new spans appear inside the live trace, the answer returns, and the agent asks a deeper question.'>
          <defs>
            <linearGradient id='barG' x1='0' y1='0' x2='1' y2='0'>
              <stop stopColor='#6a4bff' />
              <stop offset='1' stopColor='#11a877' />
            </linearGradient>
            <linearGradient id='barHot' x1='0' y1='0' x2='1' y2='0'>
              <stop stopColor='#ff6a9c' />
              <stop offset='1' stopColor='#ff3d7a' />
            </linearGradient>
            <linearGradient id='qBeam' x1='0' y1='0' x2='1' y2='0'>
              <stop stopColor='rgba(91,67,241,0.12)' />
              <stop offset='1' stopColor='#5b43f1' />
            </linearGradient>
            <linearGradient id='aBeam' x1='0' y1='0' x2='1' y2='0'>
              <stop stopColor='#11a877' />
              <stop offset='1' stopColor='rgba(17,168,119,0.12)' />
            </linearGradient>
            <radialGradient id='coreG'>
              <stop offset='0' stopColor='#a690ff' />
              <stop offset='1' stopColor='#5b43f1' />
            </radialGradient>
          </defs>

          {/* the interrogation, as a running transcript */}
          {LINES.map((l, i) => (
            <Line key={`l${i}`} className={l.kind} $kf={l.kf}>
              <text className='speaker' x='22' y={LINE_Y[i]}>
                {l.speaker}
              </text>
              <text className='line' x='78' y={LINE_Y[i]}>
                {l.text}
              </text>
            </Line>
          ))}
          <path d='M22,96 H458' stroke='rgba(24,20,54,0.07)' strokeWidth='1' />

          {/* left pole: the agent */}
          <rect className='agentBox' x='22' y='126' width='114' height='104' rx='14' />
          <circle cx='79' cy='160' r='27' stroke='rgba(91,67,241,0.1)' strokeWidth='1' fill='none' />
          <circle cx='79' cy='160' r='20' stroke='rgba(91,67,241,0.2)' strokeWidth='1' fill='none' />
          <circle className='core' cx='79' cy='160' r='13' fill='url(#coreG)' opacity='0.92' />
          <text className='agentName' x='79' y='202' textAnchor='middle'>
            AI agent
          </text>
          {STATES.map((s, i) => (
            <Line key={`s${i}`} $kf={s.kf}>
              <text className='cap' x='79' y='216' textAnchor='middle'>
                {s.text}
              </text>
            </Line>
          ))}

          {/* the loop */}
          <path d={Q_PATH} stroke='rgba(91,67,241,0.28)' strokeWidth='1.3' strokeDasharray='3 4' fill='none' />
          <path d={A_PATH} stroke='rgba(17,168,119,0.28)' strokeWidth='1.3' strokeDasharray='3 4' fill='none' />
          <path d='M188,121 l-6,-3.2 v6.4 z' fill='rgba(91,67,241,0.55)' />
          <path d='M136,187 l6,3.2 v-6.4 z' fill='rgba(17,168,119,0.55)' />
          <text className='micro q' x='161' y='112' textAnchor='middle'>
            asks
          </text>
          <text className='micro a' x='161' y='215' textAnchor='middle'>
            answers
          </text>
          {[Q1, Q2].map((t, i) => (
            <React.Fragment key={`q${i}`}>
              <Beam d={Q_PATH} stroke='url(#qBeam)' strokeWidth='2.2' $kf={beamAt(t)} style={{ ['--len' as string]: `${LEN}` }} />
              <Pop $kf={landAt(t)}>
                <circle cx='184' cy='121' r='3.4' fill='#5b43f1' />
              </Pop>
            </React.Fragment>
          ))}
          {[A1, A2].map((t, i) => (
            <React.Fragment key={`a${i}`}>
              <Beam d={A_PATH} stroke='url(#aBeam)' strokeWidth='2.2' $kf={beamAt(t)} style={{ ['--len' as string]: `${LEN}` }} />
              <Pop $kf={landAt(t)}>
                <circle cx='140' cy='187' r='3.4' fill='#11a877' />
              </Pop>
            </React.Fragment>
          ))}

          {/* right pole: production, and the live trace inside it */}
          <rect className='panelBox' x='190' y='108' width='272' height='180' rx='14' />
          <text className='cap' x='204' y='128'>
            production · live
          </text>

          {/* probe chip, panel header right */}
          {[P1, P2].map((t, i) => (
            <Pop key={`c${i}`} $kf={probeAt(t)}>
              <rect className='chip' x='330' y='116' width='118' height='16' rx='8' />
              <text className='chipText' x='340' y='127'>
                eBPF probe attached
              </text>
            </Pop>
          ))}

          {ROWS2.map((r) =>
            r.kf ? (
              <RowG key={r.id} $kf={r.kf}>
                <rect x={r.x} y={r.y} width={r.w} height={BAR_H} rx={3} fill={r.hot ? 'url(#barHot)' : 'url(#barG)'} />
                <text className={`rowLabel${r.hot ? ' hot' : ''}${r.d >= 4 ? ' deep' : ''}`} x={r.x + r.w + 8} y={r.y + BAR_H - 1}>
                  {r.label}
                </text>
              </RowG>
            ) : (
              <g key={r.id}>
                <rect className='barBase' x={r.x} y={r.y} width={r.w} height={BAR_H} rx={3} />
                <text className='rowLabel' x={r.x + r.w + 8} y={r.y + BAR_H - 1}>
                  {r.label}
                </text>
              </g>
            ),
          )}

          {/* the probe lands on the exact span the question pointed at */}
          <Pop $kf={probeAt(P1)}>
            <rect className='probeRing' x={ROWS2[2].x - 4} y={ROWS2[2].y - 3} width={ROWS2[2].w + 8} height={BAR_H + 6} rx={5} />
          </Pop>
          <Ping cx={ROWS2[2].x} cy={ROWS2[2].y + BAR_H / 2} r='7' stroke='#11a877' $kf={pingAt(P1)} />
          <Pop $kf={probeAt(P2)}>
            <rect className='probeRing' x={ROWS2[3].x - 4} y={ROWS2[3].y - 3} width={ROWS2[3].w + 8} height={BAR_H + 6} rx={5} />
          </Pop>
          <Ping cx={ROWS2[3].x} cy={ROWS2[3].y + BAR_H / 2} r='7' stroke='#11a877' $kf={pingAt(P2)} />

          {/* the standing claim */}
          {/* the same question, answered both ways */}
          <g className='claims'>
            <text className='cap' x='22' y='244'>
              time to that answer
            </text>
            <text className='cap on' x='22' y='262'>
              odigos
            </text>
            <text className='cap on' x='178' y='262' textAnchor='end'>
              1.2s
            </text>
            <rect x='22' y='266' width='16' height='3' rx='1.5' fill='#11a877' />
            <rect x='40' y='267' width='138' height='1' fill='rgba(24,20,54,0.08)' />
            <text className='cap' x='22' y='282'>
              ship a code change
            </text>
            <text className='cap' x='178' y='282' textAnchor='end'>
              3 weeks
            </text>
            <rect x='22' y='286' width='156' height='3' rx='1.5' fill='rgba(24,20,54,0.16)' />
          </g>
        </Svg>
      </Panel>
    </Frame>
  );
};
