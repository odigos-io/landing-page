'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

type KF = ReturnType<typeof keyframes>;

/* Hero art (light). A distributed trace, discovered then profiled. An x-ray beam
   sweeps LEFT to RIGHT and reveals a first set of spans exactly as its edge
   crosses each one; moments later a second beam sweeps RIGHT to LEFT and reveals
   more. Discovered spans settle onto two clean rails (upper/lower) so the fully
   revealed graph reads as a deliberate map, not scatter. On pass 2 the slow db
   span (pg.query 274ms) is detected as the hot path, and the view then flies
   into it (scale + translate) to profile it, before resetting and looping. */

type Kind = 'gateway' | 'service' | 'fn' | 'db' | 'cache';
type Node = { id: string; x: number; y: number; kind: Kind; wave: 1 | 2; label?: string; lside?: 'up' | 'down'; hot?: boolean };
type Edge = { from: string; to: string; cross?: boolean };

// A discovered call graph (not a flat spine). The request fans out through
// services into a branching, cross-linked web with depth: laid out left to
// right by call depth, with organic vertical spread, curved edges, and a few
// shared-dependency cross-links, so the fully-revealed shape reads as a real
// distributed trace rather than rails of straight stubs.
// pads snap to a clean column (by call depth) and row grid, so the board reads
// as one deliberate, fully-wired circuit. Siblings share a parent's column and
// fan out from a single junction. Columns x: 56 130 204 278 352 426. Rows y: 64
// 104 150 196 236.
const NODES: Node[] = [
  { id: 'gw', x: 56, y: 150, kind: 'gateway', wave: 1, label: 'api-gateway', lside: 'down' },
  { id: 'auth', x: 130, y: 104, kind: 'fn', wave: 1 },
  { id: 'chk', x: 130, y: 196, kind: 'service', wave: 1, label: 'checkout-svc', lside: 'down' },
  { id: 'sess', x: 204, y: 64, kind: 'cache', wave: 1 },
  { id: 'cart', x: 204, y: 150, kind: 'fn', wave: 1 },
  { id: 'pay', x: 204, y: 236, kind: 'service', wave: 1, label: 'payments-svc', lside: 'down' },
  { id: 'inv', x: 278, y: 104, kind: 'service', wave: 2 },
  { id: 'fraud', x: 278, y: 196, kind: 'fn', wave: 2 },
  { id: 'chg', x: 278, y: 236, kind: 'fn', wave: 2 },
  { id: 'resv', x: 352, y: 64, kind: 'fn', wave: 2 },
  { id: 'risk', x: 352, y: 150, kind: 'fn', wave: 2 },
  { id: 'pg', x: 352, y: 236, kind: 'db', wave: 2, label: 'pg.query · 274ms', lside: 'down', hot: true },
  { id: 'pgsv', x: 426, y: 150, kind: 'db', wave: 2, label: 'postgres', lside: 'up' },
];

const EDGES: Edge[] = [
  { from: 'gw', to: 'auth' },
  { from: 'gw', to: 'chk' },
  { from: 'auth', to: 'sess' },
  { from: 'chk', to: 'cart' },
  { from: 'chk', to: 'pay' },
  { from: 'cart', to: 'inv' },
  { from: 'pay', to: 'fraud' },
  { from: 'pay', to: 'chg' },
  { from: 'inv', to: 'resv' },
  { from: 'fraud', to: 'risk' },
  { from: 'chg', to: 'pg' },
  { from: 'pg', to: 'pgsv' },
  // cross-links: shared dependencies give the graph a web/mesh feel
  { from: 'cart', to: 'sess', cross: true },
  { from: 'inv', to: 'pg', cross: true },
  { from: 'risk', to: 'pg', cross: true },
];

const NMAP: Record<string, Node> = {};
NODES.forEach((n) => (NMAP[n.id] = n));

const DUR = '11s';

/* Beam timing (matches xray1/xray2 below). The beam center x equals its
   translateX. Both passes sweep LEFT to RIGHT: pass 1 over loop 5%..22%, pass 2
   over loop 26%..44%. Sweeping the same direction twice keeps the reveal in call
   order, parents before the children they call. The loop % at which the beam
   crosses a given x is: */
function crossAt(x: number, wave: 1 | 2): number {
  return wave === 1 ? 5 + ((x + 30) / 530) * 17 : 26 + ((x + 30) / 530) * 18;
}
/* reveal keyframes anchored to the beam-crossing moment r, then hold and fade
   together near the end of the loop. Encoded per element so it repeats cleanly. */
const drawAt = (r: number) => keyframes`0%,${r.toFixed(1)}%{stroke-dashoffset:var(--len)}${(r + 5).toFixed(1)}%{stroke-dashoffset:0}88%{stroke-dashoffset:0}94%,100%{stroke-dashoffset:var(--len)}`;
const popAt = (r: number) => keyframes`0%,${r.toFixed(1)}%{opacity:0;transform:scale(.3)}${(r + 3).toFixed(1)}%{opacity:1;transform:scale(1.08)}${(r + 5).toFixed(1)}%{transform:scale(1)}88%{opacity:1;transform:scale(1)}94%,100%{opacity:0;transform:scale(.3)}`;
// a one-shot expanding ring at the moment a span is discovered
const pingAt = (r: number) => keyframes`0%,${r.toFixed(1)}%{opacity:0;transform:scale(.3)}${(r + 1).toFixed(1)}%{opacity:.62}${(r + 8).toFixed(1)}%{opacity:0;transform:scale(2.7)}100%{opacity:0;transform:scale(2.7)}`;

// each node reveals just behind the scan edge as the beam crosses its x
const NODES2 = NODES.map((n) => {
  const r = crossAt(n.x, n.wave) + 1.8;
  return { ...n, popKf: popAt(r), pingKf: pingAt(r) };
});
// each edge draws as the beam reaches the child it leads to
// orthogonal PCB-style trace: horizontal run, a rounded 90 degree turn, vertical
// run, another rounded turn into the pad. Pure right angles, no organic swoops.
function orthPath(ax: number, ay: number, bx: number, by: number, midX: number, rc: number) {
  const dh1 = midX >= ax ? 1 : -1;
  const dv = by >= ay ? 1 : -1;
  const dh2 = bx >= midX ? 1 : -1;
  const r1 = Math.max(0, Math.min(rc, Math.abs(midX - ax), Math.abs(by - ay) / 2));
  const r2 = Math.max(0, Math.min(rc, Math.abs(bx - midX), Math.abs(by - ay) / 2));
  return `M${ax},${ay} H${(midX - dh1 * r1).toFixed(1)} Q${midX},${ay} ${midX},${(ay + dv * r1).toFixed(1)} V${(by - dv * r2).toFixed(1)} Q${midX},${by} ${(midX + dh2 * r2).toFixed(1)},${by} H${bx}`;
}

const EDGES2 = EDGES.map((e) => {
  const a = NMAP[e.from];
  const b = NMAP[e.to];
  const dx = b.x - a.x;
  // turn halfway between the two columns. Siblings from the same parent share
  // this column, so they leave the parent as one trace and split at a junction.
  const midX = a.x + dx * 0.5;
  const d = orthPath(a.x, a.y, b.x, b.y, midX, 7);
  const len = Math.round(Math.abs(midX - a.x) + Math.abs(b.y - a.y) + Math.abs(b.x - midX) + 18);
  // draw the edge only once BOTH endpoints have been revealed, so a connector
  // never appears before the node it points to
  const r = Math.max(crossAt(a.x, a.wave), crossAt(b.x, b.wave)) + 2.2;
  const hot = !!(a.hot || b.hot);
  return { ...e, d, len, hot, drawKf: drawAt(r) };
});
const HOTN = NODES.find((n) => n.hot)!;

const draw = keyframes`from{stroke-dashoffset:600}to{stroke-dashoffset:0}`;
const ping = keyframes`0%{opacity:.55;transform:scale(.35)}70%,100%{opacity:0;transform:scale(2.6)}`;
const nodeGlow = keyframes`0%,100%{opacity:.5}50%{opacity:1}`;
const spanIn = keyframes`from{opacity:0;transform:translateY(3px)}to{opacity:1;transform:translateY(0)}`;
const xray1 = keyframes`0%,5%{opacity:0;transform:translateX(-30px)}10%{opacity:1}22%{opacity:.85;transform:translateX(500px)}26%,100%{opacity:0;transform:translateX(510px)}`;
const xray2 = keyframes`0%,26%{opacity:0;transform:translateX(-30px)}31%{opacity:1}44%{opacity:.85;transform:translateX(500px)}48%,100%{opacity:0;transform:translateX(510px)}`;
const fire = keyframes`0%,44%{opacity:0;transform:scale(.2)}50%{opacity:.95;transform:scale(1)}58%{opacity:0;transform:scale(3)}100%{opacity:0;transform:scale(3)}`;
const radar = keyframes`0%,43%{opacity:0;transform:scale(.08)}51%{opacity:.6}60%{opacity:0;transform:scale(2.7)}100%{opacity:0;transform:scale(2.7)}`;
const lock = keyframes`0%,44%{opacity:0;transform:scale(1.7)}51%{opacity:.95;transform:scale(1)}88%{opacity:.95;transform:scale(1)}94%,100%{opacity:0;transform:scale(.85)}`;
const slowPulse = keyframes`0%,100%{opacity:.4;transform:scale(.85)}50%{opacity:.9;transform:scale(1.3)}`;
const float = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}`;
const glowPulse = keyframes`0%,100%{opacity:.15}50%{opacity:.27}`;
// fly into the hot node: scale up while translating so pg.query (viewBox 380,232)
// lands just past panel center, keeping the frame full (no exposed background edge).
const zoomFire = keyframes`0%,56%{transform:scale(1) translate(0,0)}68%{transform:scale(1.66) translate(-18.5%,-23.5%)}88%{transform:scale(1.66) translate(-18.5%,-23.5%)}95%,100%{transform:scale(1) translate(0,0)}`;
const hp1 = keyframes`0%,4%{opacity:0}9%,22%{opacity:1}26%,100%{opacity:0}`;
const hp2 = keyframes`0%,26%{opacity:0}30%,44%{opacity:1}48%,100%{opacity:0}`;
const hp3 = keyframes`0%,45%{opacity:0}48%,58%{opacity:1}62%,100%{opacity:0}`;
const hp4 = keyframes`0%,58%{opacity:0}62%,90%{opacity:1}96%,100%{opacity:0}`;
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
    transform-origin: 50% 50%;
    animation: ${zoomFire} ${DUR} cubic-bezier(0.5, 0, 0.2, 1) infinite;
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
    fill: #5b43f1;
    animation: ${hp2} ${DUR} linear infinite;
  }
  .hud .p3 {
    fill: #ff3d7a;
    font-weight: 600;
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

          {/* discovered call graph: edges (glow under stroke), drawn as the beam reaches each child */}
          {EDGES2.map((e, i) => (
            <AnimBranch key={`eg${i}`} className={`branchGlow ${e.hot ? 'db' : 'fn'}`} d={e.d} strokeWidth={e.cross ? 3 : 4} $kf={e.drawKf} style={{ ['--len' as string]: `${e.len}`, opacity: e.cross ? 0.08 : 0.15 }} />
          ))}
          {EDGES2.map((e, i) => (
            <AnimBranch key={`e${i}`} className={`branch ${e.hot ? 'db' : 'fn'}`} d={e.d} strokeWidth={e.cross ? 1.2 : 1.7} $kf={e.drawKf} style={{ ['--len' as string]: `${e.len}`, opacity: e.cross ? 0.7 : 1 }} />
          ))}

          {/* pass 2 senses the slow db span: fire + radar + lock-on */}
          <circle className='radar' cx={HOTN.x} cy={HOTN.y} r='12' />
          <circle className='radar' cx={HOTN.x} cy={HOTN.y} r='12' style={{ animationDelay: '0.6s' }} />
          <circle className='fire' cx={HOTN.x} cy={HOTN.y} r='26' />
          <g transform={`translate(${HOTN.x},${HOTN.y})`}>
            <g className='reticle'>
              <path d='M-7,-3 V-7 H-3' />
              <path d='M3,-7 H7 V-3' />
              <path d='M-7,3 V7 H-3' />
              <path d='M3,7 H7 V3' />
            </g>
          </g>

          {/* discovery pings */}
          {NODES2.map((n, i) => (
            <AnimPing key={`np${i}`} cx={n.x} cy={n.y} r={n.hot ? 5 : 4} stroke={n.hot ? '#ff4d85' : '#6a4bff'} $kf={n.pingKf} />
          ))}

          {/* graph nodes as PCB pads */}
          {NODES2.map((n, i) => {
            const big = n.kind === 'service' || n.kind === 'db' || n.kind === 'gateway';
            const s = n.hot ? 7.6 : big ? 6.6 : 5.2;
            return (
              <AnimNode key={`n${i}`} $kf={n.popKf}>
                {n.hot && <circle className='hotPulse' cx={n.x} cy={n.y} r='8' />}
                <rect x={n.x - s / 2 - 1.6} y={n.y - s / 2 - 1.6} width={s + 3.2} height={s + 3.2} rx={2.4} fill={n.hot ? 'rgba(255,77,133,0.18)' : 'rgba(106,75,255,0.12)'} />
                <rect x={n.x - s / 2} y={n.y - s / 2} width={s} height={s} rx={1.8} fill={n.hot ? 'url(#ndH)' : 'url(#g)'} stroke='#fff' strokeWidth='1' />
                <rect x={n.x - s / 2 + 1} y={n.y - s / 2 + 1} width={1.5} height={1.5} rx={0.5} fill='#fff' opacity='0.6' />
              </AnimNode>
            );
          })}

          {/* sparse anchor labels (key services + the hot path) */}
          {NODES2.filter((n) => n.label).map((n, i) => (
            <AnimNode key={`nl${i}`} $kf={n.popKf}>
              <Pill x={n.x} y={n.lside === 'down' ? n.y + 15 : n.y - 15} t={n.label!} kind={n.kind} anchor='middle' />
            </AnimNode>
          ))}

          {/* two x-ray passes, each with a crisp leading scan-edge */}
          <g className='beamWrap b1'>
            <rect className='beam' x='-13' y='14' width='26' height='272' />
            <rect className='scanEdge' x='11.6' y='14' width='1.4' height='272' />
          </g>
          <g className='beamWrap b2'>
            <rect className='beam' x='-13' y='14' width='26' height='272' />
            <rect className='scanEdge' x='11.6' y='14' width='1.4' height='272' />
          </g>

          {/* narrative HUD */}
          <g className='hud'>
            <circle className='hudDot' cx='16' cy='19' r='2.4' />
            <text className='p1' x='24' y='22'>
              x-ray pass 1 → discovering spans
            </text>
            <text className='p2' x='24' y='22'>
              x-ray pass 2 → deeper discovery
            </text>
            <text className='p3' x='24' y='22'>
              hot path found · pg.query 274ms
            </text>
            <text className='p4' x='24' y='22'>
              zoom in → profiling the hot path
            </text>
          </g>
        </svg>
      </Panel>
    </Frame>
  );
};
