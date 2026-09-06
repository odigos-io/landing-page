'use client';

import React from 'react';
import styled, { keyframes, css } from 'styled-components';

/* Four small pictures, one belief each, drawn in the home page's hand. */

const HOT = '#c9346a';
const SLATE = '#8892ab';
const VIOLET = '#5b43f1';
const INK = '#1c1633';

const still = css`
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Art = styled.svg`
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
  text {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 5px;
    letter-spacing: 0.4px;
  }
`;

/* ============================================================
   1. The thing that casts no shadow.

   Every existing control reads the surface. Four ordinary objects rest
   on it and each throws a shadow, so there is something to find. The
   fifth throws nothing. A violet sweep clears each shadow in turn,
   finds nothing under the crimson one, and rings the object itself.
   ============================================================ */

const T1 = 6;
const p1 = (s: number) => (s / T1) * 100;
const SWEEP_D = 2.2;
const OBJ = [36, 66, 96, 126];
const ATK = 160;
const xAt = (x: number) => ((x - 22) / (178 - 22)) * SWEEP_D; /* when the sweep reaches x */

const sweep = keyframes`
  0%{transform:translateX(0);opacity:0}
  3%{opacity:1}
  ${p1(SWEEP_D)}%{transform:translateX(156px);opacity:1}
  ${p1(SWEEP_D + 0.3)}%,100%{transform:translateX(156px);opacity:0}`;

const shade = (x: number) => keyframes`
  0%,${p1(xAt(x) - 0.05)}%{opacity:.3}
  ${p1(xAt(x) + 0.12)}%{opacity:.85}
  ${p1(xAt(x) + 0.5)}%,100%{opacity:.42}`;

const bloom = keyframes`
  0%,${p1(xAt(ATK))}%{opacity:0;transform:scale(.5)}
  ${p1(xAt(ATK) + 0.35)}%{opacity:.7;transform:scale(1)}
  ${p1(xAt(ATK) + 1.4)}%,100%{opacity:.3;transform:scale(1.15)}`;

const Sweep = styled.g`
  animation: ${sweep} ${T1}s cubic-bezier(0.45, 0, 0.35, 1) infinite;
  ${still}
  @media (prefers-reduced-motion: reduce) {
    opacity: 0;
  }
`;

const Shade = styled.ellipse<{ $x: number }>`
  animation: ${(p) => shade(p.$x)} ${T1}s ease infinite;
  ${still}
  @media (prefers-reduced-motion: reduce) {
    opacity: 0.42;
  }
`;

const Bloom = styled.circle`
  transform-box: fill-box;
  transform-origin: center;
  animation: ${bloom} ${T1}s ease-out infinite;
  ${still}
  @media (prefers-reduced-motion: reduce) {
    opacity: 0.3;
  }
`;

export const NoShadowArt = () => (
  <Art viewBox='0 0 200 138' aria-hidden>
    <defs>
      <filter id='soft1' x='-50%' y='-50%' width='200%' height='200%'>
        <feGaussianBlur stdDeviation='1.5' />
      </filter>
      <linearGradient id='sweep1' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0' stopColor={VIOLET} stopOpacity='0' />
        <stop offset='0.5' stopColor={VIOLET} stopOpacity='0.55' />
        <stop offset='1' stopColor={VIOLET} stopOpacity='0' />
      </linearGradient>
    </defs>

    <line x1={22} y1={92} x2={178} y2={92} stroke={INK} strokeOpacity={0.12} strokeWidth={1} />

    {OBJ.map((x) => (
      <Shade key={x} cx={x} cy={97} rx={11} ry={2.6} fill={SLATE} filter='url(#soft1)' $x={x} />
    ))}
    {OBJ.map((x) => (
      <circle key={x} cx={x} cy={82} r={6.5} fill={SLATE} fillOpacity={0.18} stroke={SLATE} strokeWidth={1.2} />
    ))}

    <Bloom cx={ATK} cy={82} r={12} fill='none' stroke={VIOLET} strokeWidth={1} />
    <circle cx={ATK} cy={82} r={6.5} fill={HOT} fillOpacity={0.14} stroke={HOT} strokeWidth={1.2} />

    <Sweep>
      <rect x={19} y={58} width={6} height={48} fill='url(#sweep1)' opacity={0.5} />
      <line x1={22} y1={58} x2={22} y2={106} stroke={VIOLET} strokeWidth={1} strokeOpacity={0.7} />
    </Sweep>

    <text x={30} y={114} fill={SLATE} fillOpacity={0.7}>
      side effects
    </text>
    <text x={152} y={114} fill={HOT} fillOpacity={0.75}>
      none
    </text>
  </Art>
);

/* ============================================================
   2. Constellation.

   Seven dots, each nothing on its own. A violet line joins them in
   the order they happened. The closed shape turns crimson: a shard,
   pointed at the data. Nothing was added. Only the joining made it
   a shape.
   ============================================================ */

const T2 = 8;
const p2 = (s: number) => (s / T2) * 100;
const PTS: [number, number][] = [
  [30, 44],
  [58, 36],
  [86, 46],
  [112, 62],
  [86, 88],
  [58, 98],
  [30, 90],
];
const CHAIN_AT = 1.2;
const CHAIN_D = 2.2;
const CLOSE_AT = CHAIN_AT + CHAIN_D + 0.2;

const dotIn = (i: number) => keyframes`
  0%,${p2(0.15 + i * 0.12)}%{opacity:0;transform:scale(.4)}
  ${p2(0.15 + i * 0.12 + 0.3)}%{opacity:1;transform:scale(1)}
  ${p2(CLOSE_AT)}%{stroke:${SLATE}}
  ${p2(CLOSE_AT + 0.3)}%,100%{opacity:1;transform:scale(1);stroke:${HOT}}`;

const chainIn = keyframes`
  0%,${p2(CHAIN_AT)}%{stroke-dashoffset:1;opacity:0}
  ${p2(CHAIN_AT + 0.05)}%{opacity:.75}
  ${p2(CHAIN_AT + CHAIN_D)}%,100%{stroke-dashoffset:0;opacity:.75}`;

const shardIn = keyframes`
  0%,${p2(CLOSE_AT)}%{opacity:0}
  ${p2(CLOSE_AT + 0.5)}%,100%{opacity:1}`;

const aimIn = keyframes`
  0%,${p2(CLOSE_AT + 0.4)}%{stroke-dashoffset:1;opacity:0}
  ${p2(CLOSE_AT + 0.45)}%{opacity:.45}
  ${p2(CLOSE_AT + 1.0)}%,100%{stroke-dashoffset:0;opacity:.45}`;

const Dot = styled.circle<{ $i: number }>`
  transform-box: fill-box;
  transform-origin: center;
  animation: ${(p) => dotIn(p.$i)} ${T2}s ease infinite;
  ${still}
  @media (prefers-reduced-motion: reduce) {
    stroke: ${HOT};
  }
`;

const Chain = styled.polygon`
  animation: ${chainIn} ${T2}s cubic-bezier(0.4, 0, 0.3, 1) infinite;
  ${still}
  @media (prefers-reduced-motion: reduce) {
    stroke-dashoffset: 0;
    opacity: 0.75;
  }
`;

const Shard = styled.polygon`
  animation: ${shardIn} ${T2}s ease infinite;
  ${still}
  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
  }
`;

const Aim = styled.line`
  animation: ${aimIn} ${T2}s ease infinite;
  ${still}
  @media (prefers-reduced-motion: reduce) {
    stroke-dashoffset: 0;
    opacity: 0.45;
  }
`;

export const ConstellationArt = () => (
  <Art viewBox='0 0 200 138' aria-hidden>
    <Shard points={PTS.map((p) => p.join(',')).join(' ')} fill={HOT} fillOpacity={0.1} />
    <Chain points={PTS.map((p) => p.join(',')).join(' ')} fill='none' stroke={VIOLET} strokeWidth={1.2} strokeLinejoin='round' strokeDasharray={1} pathLength={1} />
    <Aim x1={112} y1={62} x2={150} y2={69} stroke={HOT} strokeWidth={1} strokeDasharray='2 3' pathLength={1} style={{ strokeDasharray: 1 }} />
    {PTS.map(([x, y], i) => (
      <Dot key={i} cx={x} cy={y} r={3} fill='#fff' stroke={SLATE} strokeWidth={1.2} $i={i} />
    ))}
    <rect x={150} y={58} width={22} height={22} rx={5} fill={SLATE} fillOpacity={0.05} stroke={SLATE} strokeWidth={1.2} />
    <text x={30} y={118} fill={SLATE} fillOpacity={0.7}>
      seven allowed calls
    </text>
    <text x={150} y={92} fill={SLATE} fillOpacity={0.7}>
      the data
    </text>
  </Art>
);
