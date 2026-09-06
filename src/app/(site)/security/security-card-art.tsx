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

/* ============================================================
   3. Two bodies, one x-ray.

   The same silhouette twice. Left is opaque: you see its edge and the
   marks where it touches the outside, nothing more. Right is the same
   outline gone transparent, the calls inside visible as a small tree.
   ============================================================ */

const T3 = 6;
const p3 = (s: number) => (s / T3) * 100;
const TREE: [number, number][] = [
  [148, 46],
  [138, 62],
  [158, 64],
  [152, 80],
];
const scanAt = (y: number) => ((y - 34) / (96 - 34)) * 1.8;

const blink = (i: number) => keyframes`
  0%,${p3(0.2 + i * 0.4)}%{opacity:.35}
  ${p3(0.2 + i * 0.4 + 0.15)}%{opacity:1}
  ${p3(0.2 + i * 0.4 + 0.6)}%{opacity:.35}
  ${p3(3.2 + i * 0.4)}%{opacity:.35}
  ${p3(3.2 + i * 0.4 + 0.15)}%{opacity:1}
  ${p3(3.2 + i * 0.4 + 0.6)}%,100%{opacity:.35}`;

const scan = keyframes`
  0%{transform:translateY(0);opacity:0}
  4%{opacity:1}
  ${p3(1.8)}%{transform:translateY(62px);opacity:1}
  ${p3(2.1)}%,100%{transform:translateY(62px);opacity:0}`;

const nodeIn = (y: number) => keyframes`
  0%,${p3(scanAt(y) - 0.05)}%{opacity:0}
  ${p3(scanAt(y) + 0.1)}%{opacity:1}
  ${p3(4.4)}%{opacity:1}
  ${p3(4.9)}%,100%{opacity:0}`;

const Tick = styled.line<{ $i: number }>`
  animation: ${(p) => blink(p.$i)} ${T3}s ease infinite;
  ${still}
  @media (prefers-reduced-motion: reduce) {
    opacity: 0.6;
  }
`;

const Scan = styled.g`
  animation: ${scan} ${T3}s cubic-bezier(0.45, 0, 0.35, 1) infinite;
  ${still}
  @media (prefers-reduced-motion: reduce) {
    opacity: 0;
  }
`;

const TreeNode = styled.g<{ $y: number }>`
  animation: ${(p) => nodeIn(p.$y)} ${T3}s ease infinite;
  ${still}
  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
  }
`;

export const XrayArt = () => (
  <Art viewBox='0 0 200 138' aria-hidden>
    <defs>
      <linearGradient id='scan3' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0' stopColor={VIOLET} stopOpacity='0' />
        <stop offset='0.5' stopColor={VIOLET} stopOpacity='0.5' />
        <stop offset='1' stopColor={VIOLET} stopOpacity='0' />
      </linearGradient>
      <clipPath id='body3'>
        <rect x={120} y={34} width={56} height={62} rx={18} />
      </clipPath>
    </defs>

    <line x1={100} y1={24} x2={100} y2={108} stroke={INK} strokeOpacity={0.08} strokeWidth={1} />

    {/* the outside of a process, which is all ordinary ebpf gets */}
    <rect x={24} y={34} width={56} height={62} rx={18} fill={SLATE} fillOpacity={0.16} stroke={SLATE} strokeWidth={1.2} />
    {[50, 66, 82].map((y, i) => (
      <Tick key={y} x1={17} y1={y} x2={24} y2={y} stroke={SLATE} strokeWidth={1.4} strokeLinecap='round' $i={i} />
    ))}

    {/* the same process, read from inside */}
    <rect x={120} y={34} width={56} height={62} rx={18} fill={VIOLET} fillOpacity={0.04} stroke={VIOLET} strokeWidth={1.2} />
    {[
      [0, 1],
      [0, 2],
      [2, 3],
    ].map(([a, b]) => (
      <TreeNode key={`${a}${b}`} $y={Math.max(TREE[a][1], TREE[b][1])}>
        <line x1={TREE[a][0]} y1={TREE[a][1]} x2={TREE[b][0]} y2={TREE[b][1]} stroke={VIOLET} strokeOpacity={0.55} strokeWidth={0.9} />
      </TreeNode>
    ))}
    {TREE.map(([x, y]) => (
      <TreeNode key={`${x}${y}`} $y={y}>
        <circle cx={x} cy={y} r={2} fill={VIOLET} />
      </TreeNode>
    ))}
    <g clipPath='url(#body3)'>
      <Scan>
        <rect x={120} y={31} width={56} height={6} fill='url(#scan3)' />
        <line x1={120} y1={34} x2={176} y2={34} stroke={VIOLET} strokeOpacity={0.45} strokeWidth={1} />
      </Scan>
    </g>

    <text x={24} y={120} fill={SLATE} fillOpacity={0.7}>
      other ebpf
    </text>
    <text x={24} y={129} fill={SLATE} fillOpacity={0.7}>
      sees the outside
    </text>
    <text x={120} y={120} fill={VIOLET} fillOpacity={0.8}>
      odigos ebpf
    </text>
    <text x={120} y={129} fill={VIOLET} fillOpacity={0.8}>
      sees the calls inside
    </text>
  </Art>
);

/* ============================================================
   4. Three cuts.

   Three running services. The first is slashed through and goes
   dark: kill the process. The second has a wedge torn from its rim
   and limps: kill the thread. The third is whole, with one short
   violet segment on its rim, and drops what arrives there while it
   carries on. Damage shrinking to a point.
   ============================================================ */

const T4 = 8;
const p4 = (s: number) => (s / T4) * 100;
const DISC = [
  { x: 36, y: 62 },
  { x: 100, y: 62 },
  { x: 164, y: 62 },
];
const R = 23;
const pol = (cx: number, cy: number, deg: number, r = R) => [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)] as const;
const fx = (n: number) => Math.round(n * 100) / 100;
const B0 = pol(DISC[1].x, DISC[1].y, -15);
const B1 = pol(DISC[1].x, DISC[1].y, -75);
const G0 = pol(DISC[2].x, DISC[2].y, -52);
const G1 = pol(DISC[2].x, DISC[2].y, -38);

const runA = keyframes`
  0%{transform:rotate(0deg)}
  ${p4(1.2)}%,100%{transform:rotate(-130deg)}`;
const dimA = keyframes`
  0%,${p4(1.2)}%{opacity:1}
  ${p4(1.6)}%,100%{opacity:.15}`;
const runB = keyframes`
  0%{transform:rotate(0deg)}
  100%{transform:rotate(-720deg)}`;
const dimB = keyframes`
  0%,${p4(1.6)}%{opacity:1}
  ${p4(2.0)}%,100%{opacity:.4}`;
const runC = keyframes`
  0%{transform:rotate(0deg)}
  100%{transform:rotate(-720deg)}`;

/* a crimson call slides to the gate and is dropped there, three times a loop */
const intrude = keyframes`
  0%{transform:translate(0,0) scale(1);opacity:0}
  ${p4(1.4)}%{transform:translate(0,0) scale(1);opacity:.9}
  ${p4(2.2)}%{transform:translate(-16px,12px) scale(1);opacity:.9}
  ${p4(2.5)}%{transform:translate(-18px,14px) scale(0);opacity:0}
  ${p4(3.8)}%{transform:translate(0,0) scale(1);opacity:0}
  ${p4(3.9)}%{opacity:.9}
  ${p4(4.7)}%{transform:translate(-16px,12px) scale(1);opacity:.9}
  ${p4(5.0)}%{transform:translate(-18px,14px) scale(0);opacity:0}
  ${p4(6.3)}%{transform:translate(0,0) scale(1);opacity:0}
  ${p4(6.4)}%{opacity:.9}
  ${p4(7.2)}%{transform:translate(-16px,12px) scale(1);opacity:.9}
  ${p4(7.5)}%,100%{transform:translate(-18px,14px) scale(0);opacity:0}`;

const gatePulse = keyframes`
  0%,${p4(2.4)}%{opacity:.08}
  ${p4(2.55)}%{opacity:.3}
  ${p4(3.2)}%{opacity:.08}
  ${p4(4.9)}%{opacity:.08}
  ${p4(5.05)}%{opacity:.3}
  ${p4(5.7)}%{opacity:.08}
  ${p4(7.4)}%{opacity:.08}
  ${p4(7.55)}%{opacity:.3}
  100%{opacity:.08}`;

const Runner = styled.g<{ $cx: number; $cy: number; $k: 'a' | 'b' | 'c' }>`
  transform-box: view-box;
  transform-origin: ${(p) => p.$cx}px ${(p) => p.$cy}px;
  animation: ${(p) => (p.$k === 'a' ? runA : p.$k === 'b' ? runB : runC)} ${T4}s ${(p) => (p.$k === 'a' ? 'cubic-bezier(0.4, 0, 0.6, 1)' : 'linear')} infinite;
  ${still}
`;

const Disc = styled.g<{ $k: 'a' | 'b' | 'c' }>`
  animation: ${(p) => (p.$k === 'a' ? dimA : p.$k === 'b' ? dimB : 'none')} ${T4}s ease infinite;
  ${still}
  @media (prefers-reduced-motion: reduce) {
    opacity: ${(p) => (p.$k === 'a' ? 0.15 : p.$k === 'b' ? 0.4 : 1)};
  }
`;

const Intruder = styled.circle`
  transform-box: view-box;
  transform-origin: 196px 32px;
  animation: ${intrude} ${T4}s ease-in infinite;
  ${still}
  @media (prefers-reduced-motion: reduce) {
    opacity: 0;
  }
`;

const HaloC = styled.circle`
  animation: ${gatePulse} ${T4}s ease infinite;
  ${still}
  @media (prefers-reduced-motion: reduce) {
    opacity: 0.08;
  }
`;

export const ThreeCutsArt = () => (
  <Art viewBox='0 0 200 138' aria-hidden>
    {/* kill the process */}
    <Disc $k='a'>
      <circle cx={DISC[0].x} cy={DISC[0].y} r={R} fill='none' stroke={SLATE} strokeOpacity={0.3} strokeWidth={1.4} strokeDasharray='2 3' />
      <Runner $cx={DISC[0].x} $cy={DISC[0].y} $k='a'>
        <circle cx={DISC[0].x + R} cy={DISC[0].y} r={2} fill={SLATE} />
      </Runner>
    </Disc>
    <line x1={DISC[0].x - 17} y1={DISC[0].y + 16} x2={DISC[0].x + 17} y2={DISC[0].y - 16} stroke={HOT} strokeWidth={1.6} strokeLinecap='round' />

    {/* kill the thread */}
    <Disc $k='b'>
      <path d={`M${fx(B0[0])} ${fx(B0[1])} A${R} ${R} 0 1 1 ${fx(B1[0])} ${fx(B1[1])}`} fill='none' stroke={SLATE} strokeOpacity={0.55} strokeWidth={1.4} strokeLinecap='round' />
      <Runner $cx={DISC[1].x} $cy={DISC[1].y} $k='b'>
        <circle cx={DISC[1].x + R} cy={DISC[1].y} r={2} fill={SLATE} />
      </Runner>
    </Disc>
    <line x1={fx(B0[0])} y1={fx(B0[1])} x2={fx(B1[0])} y2={fx(B1[1])} stroke={HOT} strokeOpacity={0.7} strokeWidth={1.2} strokeLinecap='round' />

    {/* block the call */}
    <HaloC cx={DISC[2].x} cy={DISC[2].y} r={R + 7} fill='none' stroke={VIOLET} strokeWidth={1} />
    <Disc $k='c'>
      <circle cx={DISC[2].x} cy={DISC[2].y} r={R} fill='none' stroke={SLATE} strokeOpacity={0.6} strokeWidth={1.4} />
      <Runner $cx={DISC[2].x} $cy={DISC[2].y} $k='c'>
        <circle cx={DISC[2].x + R} cy={DISC[2].y} r={2} fill={VIOLET} />
      </Runner>
    </Disc>
    <path d={`M${fx(G0[0])} ${fx(G0[1])} A${R} ${R} 0 0 1 ${fx(G1[0])} ${fx(G1[1])}`} fill='none' stroke={VIOLET} strokeWidth={2.4} strokeLinecap='round' />
    <Intruder cx={196} cy={32} r={2.4} fill={HOT} />

    <text x={DISC[0].x} y={104} textAnchor='middle' fill={SLATE} fillOpacity={0.55} style={{ letterSpacing: 0.2 }}>
      kill the process
    </text>
    <text x={DISC[1].x} y={104} textAnchor='middle' fill={SLATE} fillOpacity={0.55} style={{ letterSpacing: 0.2 }}>
      kill the thread
    </text>
    <text x={DISC[2].x} y={104} textAnchor='middle' fill={VIOLET} fillOpacity={0.85} style={{ letterSpacing: 0.2 }}>
      block the call
    </text>
  </Art>
);
