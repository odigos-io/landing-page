'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

type KF = ReturnType<typeof keyframes>;

/* Hero art (light, no filters, no zoom). An organic distributed trace. An x-ray
   beam sweeps LEFT to RIGHT and discovers a first set of spans; each one is
   revealed exactly as the beam edge crosses its x. Moments later a second beam
   sweeps RIGHT to LEFT and reveals more, again in step with the beam. Some
   spans branch off, some loop back into the trace, some sit inline on the path.
   Pure trace discovery (no profiling). */

type Kind = 'gateway' | 'service' | 'fn' | 'db' | 'cache';
type Span = { x: number; y: number; t: string; kind: Kind; side: 'up' | 'down' };
type Disc = { d: string; len: number; w: number; ox: number; node: [number, number]; kind: Kind; label: string; anchor: 'start' | 'middle' | 'end'; lx: number; ly: number; wave: 1 | 2; hot?: boolean };
type P = { x: number; y: number };

const SPANS: Span[] = [
  { x: 42, y: 152, t: 'api-gateway', kind: 'gateway', side: 'up' },
  { x: 110, y: 116, t: 'authGuard()', kind: 'fn', side: 'up' },
  { x: 192, y: 158, t: 'checkout-svc', kind: 'service', side: 'down' },
  { x: 286, y: 108, t: 'payments-svc', kind: 'service', side: 'up' },
  { x: 372, y: 166, t: 'charge()', kind: 'fn', side: 'down' },
  { x: 456, y: 132, t: 'postgres', kind: 'db', side: 'up' },
];

function cubicAt(p0: P, c1: P, c2: P, p3: P, t: number): P {
  const m = 1 - t;
  return {
    x: m * m * m * p0.x + 3 * m * m * t * c1.x + 3 * m * t * t * c2.x + t * t * t * p3.x,
    y: m * m * m * p0.y + 3 * m * m * t * c1.y + 3 * m * t * t * c2.y + t * t * t * p3.y,
  };
}
function buildTrace() {
  const pts: P[] = [{ x: -16, y: 150 }, ...SPANS.map((s) => ({ x: s.x, y: s.y })), { x: 496, y: 122 }];
  let d = `M${pts[0].x} ${pts[0].y}`;
  const instr: Array<{ x: number; y: number; wave: 1 | 2 }> = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1: P = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2: P = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    d += ` C${c1.x.toFixed(1)} ${c1.y.toFixed(1)} ${c2.x.toFixed(1)} ${c2.y.toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    if (i >= 1 && i <= pts.length - 3) {
      const m = cubicAt(p1, c1, c2, p2, 0.5);
      instr.push({ x: +m.x.toFixed(1), y: +m.y.toFixed(1), wave: i <= 3 ? 1 : 2 });
    }
  }
  return { d, instr };
}
const { d: TRACE, instr: INSTR } = buildTrace();

const DISC: Disc[] = [
  // --- pass 1 (left to right). ox = where the branch attaches to the trace ---
  { d: 'M110,116 C90,144 62,178 60,232', len: 136, w: 1.6, ox: 110, node: [60, 232], kind: 'cache', label: 'session.get', anchor: 'middle', lx: 60, ly: 246, wave: 1 },
  { d: 'M192,158 C186,128 176,98 166,72', len: 102, w: 1.6, ox: 192, node: [166, 72], kind: 'fn', label: 'validateCart()', anchor: 'middle', lx: 166, ly: 60, wave: 1 },
  { d: 'M192,158 C216,202 262,198 286,108', len: 150, w: 1.5, ox: 192, node: [240, 184], kind: 'fn', label: 'reserveStock()', anchor: 'middle', lx: 238, ly: 198, wave: 1 },
  { d: 'M372,166 C369,192 364,216 360,240', len: 82, w: 1.7, ox: 372, node: [360, 240], kind: 'db', label: 'pg.query · 274ms', anchor: 'middle', lx: 360, ly: 254, wave: 1, hot: true },
  // --- pass 2 (right to left) ---
  { d: 'M456,132 C461,172 462,206 458,234', len: 110, w: 1.6, ox: 456, node: [458, 234], kind: 'db', label: 'commit', anchor: 'middle', lx: 456, ly: 248, wave: 2 },
  { d: 'M286,108 C300,80 320,60 332,44', len: 86, w: 1.6, ox: 286, node: [332, 44], kind: 'fn', label: 'fraud.check()', anchor: 'middle', lx: 332, ly: 32, wave: 2 },
  { d: 'M286,108 C308,202 356,204 372,166', len: 154, w: 1.5, ox: 286, node: [333, 197], kind: 'fn', label: 'applyPromo()', anchor: 'middle', lx: 331, ly: 213, wave: 2 },
  { d: 'M110,116 C104,90 96,66 92,44', len: 80, w: 1.6, ox: 110, node: [92, 44], kind: 'fn', label: 'loadUser()', anchor: 'middle', lx: 92, ly: 32, wave: 2 },
];

const DUR = '11s';

/* Beam timing (matches xray1/xray2 below). The beam center x equals its
   translateX. Pass 1 sweeps x = -30 -> 500 over loop 5%..22%. Pass 2 sweeps
   x = 500 -> -30 over loop 26%..44%. So the loop % at which the beam crosses a
   given x is: */
function crossAt(x: number, wave: 1 | 2): number {
  return wave === 1 ? 5 + ((x + 30) / 530) * 17 : 26 + ((500 - x) / 530) * 18;
}
/* reveal keyframes anchored to the beam-crossing moment r, then hold and fade
   together near the end of the loop. Encoded per element so it repeats cleanly. */
const drawAt = (r: number) => keyframes`0%,${r.toFixed(1)}%{stroke-dashoffset:var(--len)}${(r + 5).toFixed(1)}%{stroke-dashoffset:0}88%{stroke-dashoffset:0}94%,100%{stroke-dashoffset:var(--len)}`;
const popAt = (r: number) => keyframes`0%,${r.toFixed(1)}%{opacity:0;transform:scale(.3)}${(r + 3).toFixed(1)}%{opacity:1;transform:scale(1.08)}${(r + 5).toFixed(1)}%{transform:scale(1)}88%{opacity:1;transform:scale(1)}94%,100%{opacity:0;transform:scale(.3)}`;
const diamondAt = (r: number) => keyframes`0%,${r.toFixed(1)}%{opacity:0;transform:scale(0) rotate(45deg)}${(r + 4).toFixed(1)}%{opacity:1;transform:scale(1) rotate(45deg)}88%{opacity:1;transform:scale(1) rotate(45deg)}94%,100%{opacity:0;transform:scale(0) rotate(45deg)}`;
// a one-shot expanding ring at the moment a span is discovered
const pingAt = (r: number) => keyframes`0%,${r.toFixed(1)}%{opacity:0;transform:scale(.3)}${(r + 1).toFixed(1)}%{opacity:.62}${(r + 8).toFixed(1)}%{opacity:0;transform:scale(2.7)}100%{opacity:0;transform:scale(2.7)}`;

const DISC2 = DISC.map((b) => {
  // anchor to the beam crossing the attach point, plus a small lag so the span
  // snaps in just behind the scan edge, not ahead of it
  const r = crossAt(b.ox, b.wave) + 1.5;
  return { ...b, drawKf: drawAt(r), popKf: popAt(r + 0.8), pingKf: pingAt(r + 0.8) };
});
const INSTR2 = INSTR.map((p) => ({ ...p, kf: diamondAt(crossAt(p.x, p.wave) + 1.2) }));
const HOT = DISC2.find((d) => d.hot)!;

const draw = keyframes`from{stroke-dashoffset:600}to{stroke-dashoffset:0}`;
const ping = keyframes`0%{opacity:.55;transform:scale(.35)}70%,100%{opacity:0;transform:scale(2.6)}`;
const nodeGlow = keyframes`0%,100%{opacity:.5}50%{opacity:1}`;
const spanIn = keyframes`from{opacity:0;transform:translateY(3px)}to{opacity:1;transform:translateY(0)}`;
const xray1 = keyframes`0%,5%{opacity:0;transform:translateX(-30px)}10%{opacity:1}22%{opacity:.85;transform:translateX(500px)}26%,100%{opacity:0;transform:translateX(510px)}`;
const xray2 = keyframes`0%,26%{opacity:0;transform:translateX(500px)}31%{opacity:1}44%{opacity:.85;transform:translateX(-30px)}48%,100%{opacity:0;transform:translateX(-40px)}`;
const fire = keyframes`0%,13%{opacity:0;transform:scale(.2)}19%{opacity:.95;transform:scale(1)}28%{opacity:0;transform:scale(3)}100%{opacity:0;transform:scale(3)}`;
const radar = keyframes`0%,12%{opacity:0;transform:scale(.08)}18%{opacity:.6}30%{opacity:0;transform:scale(2.7)}100%{opacity:0;transform:scale(2.7)}`;
const lock = keyframes`0%,12%{opacity:0;transform:scale(1.7)}19%{opacity:.95;transform:scale(1)}29%,100%{opacity:0;transform:scale(.85)}`;
const slowPulse = keyframes`0%,100%{opacity:.4;transform:scale(.85)}50%{opacity:.9;transform:scale(1.3)}`;
const float = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}`;
const glowPulse = keyframes`0%,100%{opacity:.15}50%{opacity:.27}`;
const zoomPulse = keyframes`0%,13%{transform:scale(1)}20%{transform:scale(1.018)}30%,100%{transform:scale(1)}`;
const hp1 = keyframes`0%,4%{opacity:0}9%,22%{opacity:1}27%,100%{opacity:0}`;
const hp2 = keyframes`0%,24%{opacity:0}28%,33%{opacity:1}38%,100%{opacity:0}`;
const hp3 = keyframes`0%,34%{opacity:0}39%,48%{opacity:1}53%,100%{opacity:0}`;
const hp4 = keyframes`0%,54%{opacity:0}59%,90%{opacity:1}96%,100%{opacity:0}`;
const hudDot = keyframes`0%,100%{opacity:.4}50%{opacity:1}`;

const Frame = styled.div`
  position: relative;
  animation: ${float} 11s ease-in-out infinite;
`;

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const AnimBranch = styled.path<{ $kf: KF }>`
  animation: ${(p) => p.$kf} ${DUR} cubic-bezier(0.33, 1, 0.68, 1) infinite;
`;
const AnimNode = styled.g<{ $kf: KF }>`
  transform-box: fill-box;
  transform-origin: center;
  animation: ${(p) => p.$kf} ${DUR} cubic-bezier(0.45, 0, 0.3, 1) infinite;
`;
const AnimDiamond = styled.g<{ $kf: KF }>`
  transform-box: fill-box;
  transform-origin: center;
  animation: ${(p) => p.$kf} ${DUR} cubic-bezier(0.45, 0, 0.3, 1) infinite;
`;
const AnimPing = styled.circle<{ $kf: KF }>`
  fill: none;
  stroke-width: 1.2;
  transform-box: fill-box;
  transform-origin: center;
  animation: ${(p) => p.$kf} ${DUR} ease-out infinite;
`;

const Panel = styled.div`
  position: relative;
  border-radius: 22px;
  overflow: hidden;
  aspect-ratio: 1.6 / 1;
  border: 1px solid rgba(91, 67, 241, 0.1);
  background:
    radial-gradient(58% 56% at 46% 56%, rgba(123, 93, 255, 0.15), transparent 72%),
    radial-gradient(40% 44% at 12% 84%, rgba(11, 184, 166, 0.09), transparent 72%),
    radial-gradient(44% 50% at 74% 84%, rgba(255, 77, 133, 0.08), transparent 72%),
    linear-gradient(180deg, #efebfb 0%, #f4f1fb 55%, #f0edf7 100%);
  box-shadow: var(--shadow-lift), inset 0 1px 0 rgba(255, 255, 255, 0.9), inset 0 0 80px rgba(123, 93, 255, 0.06);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 3;
    background-image: repeating-linear-gradient(0deg, rgba(91, 67, 241, 0.045) 0 1px, transparent 1px 4px);
    -webkit-mask-image: radial-gradient(82% 82% at 50% 50%, #000 38%, transparent 92%);
    mask-image: radial-gradient(82% 82% at 50% 50%, #000 38%, transparent 92%);
    opacity: 0.55;
  }
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 4;
    background-image: ${GRAIN};
    background-size: 140px 140px;
    opacity: 0.05;
    mix-blend-mode: soft-light;
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;
    transform-origin: center;
    animation: ${zoomPulse} ${DUR} ease-in-out infinite;
  }

  .traceGlow2 {
    fill: none;
    stroke: url(#g);
    stroke-width: 15;
    opacity: 0.08;
    stroke-linecap: round;
  }
  .traceGlow {
    fill: none;
    stroke: url(#g);
    stroke-width: 8;
    opacity: 0.18;
    stroke-linecap: round;
    animation: ${glowPulse} 4.5s ease-in-out infinite;
  }
  .trace {
    fill: none;
    stroke: url(#g);
    stroke-width: 2.8;
    stroke-linecap: round;
    stroke-dasharray: 600;
    animation: ${draw} 1.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .radar {
    fill: none;
    stroke: rgba(255, 130, 90, 0.6);
    stroke-width: 1;
    transform-box: fill-box;
    transform-origin: center;
    animation: ${radar} ${DUR} cubic-bezier(0.3, 0, 0.4, 1) infinite;
  }
  .fire {
    transform-box: fill-box;
    transform-origin: center;
    fill: url(#fireGrad);
    animation: ${fire} ${DUR} cubic-bezier(0.3, 0, 0.4, 1) infinite;
  }
  .reticle {
    fill: none;
    stroke: #ff7a4d;
    stroke-width: 1;
    stroke-linecap: round;
    transform-box: fill-box;
    transform-origin: center;
    animation: ${lock} ${DUR} cubic-bezier(0.3, 0, 0.4, 1) infinite;
  }

  .instr .iglow {
    fill: rgba(138, 116, 255, 0.13);
  }
  .instr .core {
    fill: #8a74ff;
  }
  .instr .halo {
    fill: rgba(138, 116, 255, 0.22);
  }
  .instr .ispec {
    fill: rgba(255, 255, 255, 0.7);
  }

  .span {
    animation: ${spanIn} 0.6s ease both;
  }
  .ping {
    fill: none;
    stroke: url(#g);
    stroke-width: 1.4;
    transform-box: fill-box;
    transform-origin: center;
    animation: ${ping} 2.8s ease-out infinite;
  }
  .spanDot {
    fill: #fff;
    stroke: url(#g);
    stroke-width: 1.8;
  }
  .spanGlow {
    fill: url(#g);
    transform-box: fill-box;
    transform-origin: center;
    animation: ${nodeGlow} 2.6s ease-in-out infinite;
  }

  .branch,
  .branchGlow {
    fill: none;
    stroke-linecap: round;
    stroke-dasharray: var(--len);
  }
  .branchGlow {
    opacity: 0.16;
  }
  .branch.fn,
  .branch.cache,
  .branchGlow.fn,
  .branchGlow.cache {
    stroke: url(#g);
  }
  .branch.db,
  .branchGlow.db {
    stroke: #ff4d85;
  }
  .hotPulse {
    fill: rgba(255, 77, 133, 0.18);
    transform-box: fill-box;
    transform-origin: center;
    animation: ${slowPulse} 1.7s ease-in-out infinite;
  }

  .beam {
    fill: url(#beamGrad);
  }
  .scanEdge {
    fill: rgba(224, 216, 255, 0.92);
  }
  .beamWrap.b1 {
    animation: ${xray1} ${DUR} cubic-bezier(0.5, 0, 0.5, 1) infinite;
  }
  .beamWrap.b2 {
    animation: ${xray2} ${DUR} cubic-bezier(0.5, 0, 0.5, 1) infinite;
  }

  .pill {
    transform-box: fill-box;
    transform-origin: center;
  }
  .pill rect {
    fill: rgba(255, 255, 255, 0.95);
    stroke: rgba(91, 67, 241, 0.16);
    stroke-width: 0.6;
  }
  .pill.svc rect {
    stroke: rgba(40, 36, 54, 0.16);
  }
  .pill.db rect {
    fill: rgba(255, 241, 245, 0.96);
    stroke: rgba(255, 61, 122, 0.34);
  }
  .pill text {
    font-family: var(--font-mono), monospace;
    dominant-baseline: middle;
    fill: #5b43f1;
  }
  .pill.svc text {
    fill: #2a2636;
    font-weight: 600;
  }
  .pill.db text {
    fill: #ff3d7a;
    font-weight: 600;
  }
  .pill.cache text {
    fill: #0b8a7c;
  }
  .ic {
    fill: none;
    stroke-width: 1.1;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke: #6a4bff;
  }
  .pill.svc .ic {
    stroke: #2a2636;
  }
  .pill.db .ic {
    stroke: #ff3d7a;
  }
  .pill.cache .ic {
    stroke: #0b8a7c;
  }

  .hud text {
    font-family: var(--font-mono), monospace;
    font-size: 8px;
    letter-spacing: 0.06em;
    fill: #6a6580;
  }
  .hud .p1 {
    fill: #5b43f1;
    animation: ${hp1} ${DUR} linear infinite;
  }
  .hud .p2 {
    fill: #ff3d7a;
    font-weight: 600;
    animation: ${hp2} ${DUR} linear infinite;
  }
  .hud .p3 {
    fill: #5b43f1;
    animation: ${hp3} ${DUR} linear infinite;
  }
  .hud .p4 {
    fill: #0b8a7c;
    animation: ${hp4} ${DUR} linear infinite;
  }
  .hudDot {
    fill: var(--signal-bright);
    animation: ${hudDot} 1.2s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    ${AnimBranch},
    ${AnimNode},
    ${AnimDiamond},
    ${AnimPing},
    .trace,
    .traceGlow,
    .span,
    .hotPulse,
    svg {
      animation: none;
    }
    ${AnimPing} {
      display: none;
    }
    .trace,
    ${AnimBranch} {
      stroke-dashoffset: 0;
    }
    .fire,
    .radar,
    .reticle,
    .beamWrap,
    .hud {
      display: none;
    }
  }
`;

function Icon({ kind }: { kind: Kind }) {
  switch (kind) {
    case 'gateway':
      return (
        <g className='ic'>
          <circle cx='6' cy='6' r='4.6' />
          <path d='M6,1.4 C3,3.4 3,8.6 6,10.6 C9,8.6 9,3.4 6,1.4 M1.4,6 H10.6' />
        </g>
      );
    case 'service':
      return (
        <g className='ic'>
          <rect x='1.6' y='2' width='8.8' height='8' rx='1.4' />
          <path d='M1.6,5 H10.4 M1.6,7.4 H10.4' />
        </g>
      );
    case 'db':
      return (
        <g className='ic'>
          <path d='M1.6,3 C1.6,1.7 10.4,1.7 10.4,3 L10.4,9 C10.4,10.3 1.6,10.3 1.6,9 Z' />
          <path d='M1.6,3 C1.6,4.3 10.4,4.3 10.4,3' />
        </g>
      );
    case 'cache':
      return (
        <g className='ic'>
          <path d='M6.6,1.2 L3,6.4 H5.4 L5,10.8 L9,5 H6.2 Z' />
        </g>
      );
    default:
      return (
        <g className='ic'>
          <path d='M4,2 L1.4,6 L4,10 M8,2 L10.6,6 L8,10' />
        </g>
      );
  }
}

function Pill({ x, y, t, kind, anchor }: { x: number; y: number; t: string; kind: Kind; anchor: 'start' | 'middle' | 'end' }) {
  const fs = 6.5;
  const icW = 12;
  const padL = 4;
  const gap = 3;
  const padR = 6;
  const tw = t.length * fs * 0.6;
  const w = padL + icW + gap + tw + padR;
  const h = 16;
  const x0 = anchor === 'middle' ? x - w / 2 : anchor === 'start' ? x - 2 : x - w + 2;
  const y0 = y - h / 2;
  const svc = kind === 'gateway' || kind === 'service' || kind === 'db';
  const pc = kind === 'db' ? 'db' : kind === 'cache' ? 'cache' : svc ? 'svc' : 'fn';
  return (
    <g className={`pill ${pc}`}>
      <rect x={x0} y={y0} width={w} height={h} rx={h / 2} />
      <g transform={`translate(${x0 + padL}, ${y - 6})`}>
        <Icon kind={kind} />
      </g>
      <text x={x0 + padL + icW + gap} y={y} fontSize={fs}>
        {t}
      </text>
    </g>
  );
}

export const HeroArt = () => {
  return (
    <Frame>
      <Panel>
        <svg viewBox='0 0 480 300' fill='none' xmlns='http://www.w3.org/2000/svg' aria-hidden>
          <defs>
            <linearGradient id='g' x1='0' y1='150' x2='480' y2='150' gradientUnits='userSpaceOnUse'>
              <stop stopColor='#10c2b0' />
              <stop offset='0.5' stopColor='#6a4bff' />
              <stop offset='1' stopColor='#f0508f' />
            </linearGradient>
            <linearGradient id='beamGrad' x1='0' y1='0' x2='1' y2='0'>
              <stop stopColor='rgba(138,116,255,0)' />
              <stop offset='0.42' stopColor='rgba(150,128,255,0.34)' />
              <stop offset='0.5' stopColor='rgba(214,205,255,0.95)' />
              <stop offset='0.58' stopColor='rgba(150,128,255,0.34)' />
              <stop offset='1' stopColor='rgba(138,116,255,0)' />
            </linearGradient>
            <radialGradient id='fireGrad'>
              <stop offset='0' stopColor='rgba(255,255,255,0.95)' />
              <stop offset='0.3' stopColor='rgba(255,140,70,0.8)' />
              <stop offset='0.65' stopColor='rgba(255,61,122,0.4)' />
              <stop offset='1' stopColor='rgba(255,61,122,0)' />
            </radialGradient>
            <radialGradient id='ndV' cx='0.35' cy='0.3' r='0.8'>
              <stop offset='0' stopColor='#a690ff' />
              <stop offset='1' stopColor='#5b43f1' />
            </radialGradient>
            <radialGradient id='ndH' cx='0.35' cy='0.3' r='0.8'>
              <stop offset='0' stopColor='#ff8aae' />
              <stop offset='1' stopColor='#ff4d85' />
            </radialGradient>
          </defs>

          {/* the organic route */}
          <path className='traceGlow2' d={TRACE} />
          <path className='traceGlow' d={TRACE} />
          <path className='trace' d={TRACE} />

          {/* custom instrumentation: finer spans on the trace, revealed in the beam wake */}
          {INSTR2.map((p, i) => (
            <g key={`i${i}`} transform={`translate(${p.x},${p.y})`}>
              <AnimDiamond className='instr' $kf={p.kf}>
                <circle className='iglow' cx={0} cy={0} r={5.6} />
                <rect className='halo' x={-4.2} y={-4.2} width={8.4} height={8.4} rx={1.3} />
                <rect className='core' x={-2.4} y={-2.4} width={4.8} height={4.8} rx={1} />
                <rect className='ispec' x={-1.6} y={-1.6} width={1.5} height={1.5} rx={0.5} />
              </AnimDiamond>
            </g>
          ))}

          {/* pass 1 senses the slow span: fire + lock-on */}
          <circle className='radar' cx={HOT.node[0]} cy={HOT.node[1]} r='12' />
          <circle className='radar' cx={HOT.node[0]} cy={HOT.node[1]} r='12' style={{ animationDelay: '0.6s' }} />
          <circle className='fire' cx={HOT.node[0]} cy={HOT.node[1]} r='26' />
          <g transform={`translate(${HOT.node[0]},${HOT.node[1]})`}>
            <g className='reticle'>
              <path d='M-7,-3 V-7 H-3' />
              <path d='M3,-7 H7 V-3' />
              <path d='M-7,3 V7 H-3' />
              <path d='M3,7 H7 V3' />
            </g>
          </g>

          {/* discovered spans, each revealed as the beam crosses it */}
          {DISC2.map((b, i) => (
            <AnimBranch key={`bg${i}`} className={`branchGlow ${b.kind}`} d={b.d} strokeWidth={b.w + 3} $kf={b.drawKf} style={{ ['--len' as string]: `${b.len}` }} />
          ))}
          {DISC2.map((b, i) => (
            <AnimBranch key={`br${i}`} className={`branch ${b.kind}`} d={b.d} strokeWidth={b.w} $kf={b.drawKf} style={{ ['--len' as string]: `${b.len}` }} />
          ))}
          {DISC2.map((b, i) => (
            <AnimPing key={`pg${i}`} cx={b.node[0]} cy={b.node[1]} r={b.hot ? 5 : 4} stroke={b.hot ? '#ff4d85' : '#6a4bff'} $kf={b.pingKf} />
          ))}
          {DISC2.map((b, i) => {
            const r = b.hot ? 2.7 : 2.2;
            return (
              <AnimNode key={`bn${i}`} $kf={b.popKf}>
                {b.hot && <circle className='hotPulse' cx={b.node[0]} cy={b.node[1]} r='6' />}
                <circle cx={b.node[0]} cy={b.node[1]} r={r + 2.6} fill={b.hot ? 'rgba(255,77,133,0.2)' : 'rgba(106,75,255,0.14)'} />
                <circle cx={b.node[0]} cy={b.node[1]} r={r} fill={b.hot ? 'url(#ndH)' : 'url(#g)'} stroke='#fff' strokeWidth='1' />
                <circle cx={b.node[0] - 0.7} cy={b.node[1] - 0.8} r='0.7' fill='#fff' opacity='0.65' />
              </AnimNode>
            );
          })}
          {DISC2.map((b, i) => (
            <AnimNode key={`bp${i}`} $kf={b.popKf}>
              <Pill x={b.lx} y={b.ly} t={b.label} kind={b.kind} anchor={b.anchor} />
            </AnimNode>
          ))}

          {/* two x-ray passes, each with a crisp leading scan-edge */}
          <g className='beamWrap b1'>
            <rect className='beam' x='-13' y='14' width='26' height='272' />
            <rect className='scanEdge' x='11.6' y='14' width='1.4' height='272' />
          </g>
          <g className='beamWrap b2'>
            <rect className='beam' x='-13' y='14' width='26' height='272' />
            <rect className='scanEdge' x='-13' y='14' width='1.4' height='272' />
          </g>

          {/* span nodes + pills on the route */}
          {SPANS.map((s, i) => (
            <g key={`s${i}`} className='span' style={{ animationDelay: `${0.3 + i * 0.12}s` }}>
              <circle className='ping' cx={s.x} cy={s.y} r='4' style={{ animationDelay: `${i * 0.5}s` }} />
              <circle className='spanGlow' cx={s.x} cy={s.y} r='6.5' opacity='0.18' style={{ animationDelay: `${i * 0.4}s` }} />
              <circle className='spanDot' cx={s.x} cy={s.y} r='3.6' />
              <Pill x={s.x} y={s.side === 'up' ? s.y - 16 : s.y + 16} t={s.t} kind={s.kind} anchor='middle' />
            </g>
          ))}

          {/* narrative HUD */}
          <g className='hud'>
            <circle className='hudDot' cx='16' cy='19' r='2.4' />
            <text className='p1' x='24' y='22'>
              x-ray pass 1 → discovering spans
            </text>
            <text className='p2' x='24' y='22'>
              slow span detected · pg.query 274ms
            </text>
            <text className='p3' x='24' y='22'>
              ← x-ray pass 2 · deeper discovery
            </text>
            <text className='p4' x='24' y='22'>
              runtime context captured · 13 spans
            </text>
          </g>
        </svg>
      </Panel>
    </Frame>
  );
};
