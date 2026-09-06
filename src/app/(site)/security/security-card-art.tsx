'use client';

import React from 'react';
import styled, { keyframes, css } from 'styled-components';

/* Four small pictures, one belief each, drawn in the home page's hand.
   Each fills its panel; strokes are heavy enough to survive 1440px. */

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
    font-size: 5.2px;
    letter-spacing: 0.4px;
  }
`;

/* ============================================================
   1. The thing that casts no shadow.
   ============================================================ */

const T1 = 5;
const p1 = (s: number) => (s / T1) * 100;
const SWEEP_D = 2.2;
const OBJ = [30, 64, 98, 132];
const ATK = 172;
const OY = 64; /* object centre */
const GROUND = 80;
const xAt = (x: number) => ((x - 14) / (190 - 14)) * SWEEP_D;

const sweep = keyframes`
  0%{transform:translateX(0);opacity:0}
  3%{opacity:1}
  ${p1(SWEEP_D)}%{transform:translateX(158px);opacity:1}
  ${p1(SWEEP_D + 0.4)}%,100%{transform:translateX(158px);opacity:0}`;

const shade = (x: number) => keyframes`
  0%,${p1(xAt(x) - 0.05)}%{opacity:.34}
  ${p1(xAt(x) + 0.12)}%{opacity:.9}
  ${p1(xAt(x) + 0.5)}%,100%{opacity:.5}`;

const bloom = keyframes`
  0%,${p1(xAt(ATK))}%{opacity:0;transform:scale(.5)}
  ${p1(xAt(ATK) + 0.35)}%{opacity:.9;transform:scale(1)}
  ${p1(xAt(ATK) + 1.4)}%,100%{opacity:.75;transform:scale(1)}`;

const Sweep = styled.g`
  animation: ${sweep} ${T1}s cubic-bezier(0.45, 0, 0.35, 1) infinite;
  ${still}
  @media (prefers-reduced-motion: reduce) {
    opacity: 0;
  }
`;

const Shade = styled.path<{ $x: number }>`
  animation: ${(p) => shade(p.$x)} ${T1}s ease infinite;
  ${still}
  @media (prefers-reduced-motion: reduce) {
    opacity: 0.5;
  }
`;

const Bloom = styled.circle`
  transform-box: fill-box;
  transform-origin: center;
  animation: ${bloom} ${T1}s ease-out infinite;
  ${still}
  @media (prefers-reduced-motion: reduce) {
    opacity: 0.75;
  }
`;

/* a cast shadow: an ellipse thrown down and to the right from one light */
const shadow = (x: number) => `M${x - 6} ${GROUND + 1} C ${x - 3} ${GROUND - 3}, ${x + 22} ${GROUND - 2}, ${x + 26} ${GROUND + 3} C ${x + 24} ${GROUND + 7}, ${x + 2} ${GROUND + 7}, ${x - 6} ${GROUND + 1} Z`;

export const NoShadowArt = () => (
  <Art viewBox='0 0 200 138' aria-hidden>
    <defs>
      <filter id='soft1' x='-30%' y='-60%' width='160%' height='220%'>
        <feGaussianBlur stdDeviation='1.6' />
      </filter>
      <linearGradient id='sweep1' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0' stopColor={VIOLET} stopOpacity='0' />
        <stop offset='0.5' stopColor={VIOLET} stopOpacity='0.6' />
        <stop offset='1' stopColor={VIOLET} stopOpacity='0' />
      </linearGradient>
      <radialGradient id='obj1' cx='0.35' cy='0.3' r='0.8'>
        <stop offset='0' stopColor='#fff' />
        <stop offset='1' stopColor={SLATE} stopOpacity='0.35' />
      </radialGradient>
    </defs>

    {/* the surface every control reads */}
    <line x1={12} y1={GROUND} x2={192} y2={GROUND} stroke={INK} strokeOpacity={0.16} strokeWidth={1.4} />

    {OBJ.map((x) => (
      <Shade key={x} d={shadow(x)} fill={SLATE} filter='url(#soft1)' $x={x} />
    ))}
    {OBJ.map((x) => (
      <circle key={x} cx={x} cy={OY} r={11} fill='url(#obj1)' stroke={SLATE} strokeWidth={1.8} />
    ))}

    <Bloom cx={ATK} cy={OY} r={18} fill='none' stroke={VIOLET} strokeWidth={1.8} />
    <circle cx={ATK} cy={OY} r={11} fill={HOT} stroke={HOT} strokeWidth={1.8} />

    <Sweep>
      <rect x={10} y={30} width={8} height={70} fill='url(#sweep1)' opacity={0.55} />
      <line x1={14} y1={30} x2={14} y2={100} stroke={VIOLET} strokeWidth={1.4} strokeOpacity={0.75} />
    </Sweep>

    <text x={24} y={112} fill={SLATE} fillOpacity={0.75}>
      side effects
    </text>
    <text x={162} y={112} fill={HOT} fillOpacity={0.85}>
      none
    </text>
  </Art>
);

/* ============================================================
   2. Seven allowed calls, joined, are a blade.
   ============================================================ */

const T2 = 8;
const p2 = (s: number) => (s / T2) * 100;
const PTS: [number, number][] = [
  [22, 40],
  [58, 24],
  [96, 36],
  [149, 66],
  [96, 96],
  [58, 108],
  [22, 92],
];
const BOX = { x: 150, y: 44, w: 32, h: 44 };
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
  ${p2(CHAIN_AT + 0.05)}%{opacity:.85}
  ${p2(CHAIN_AT + CHAIN_D)}%,100%{stroke-dashoffset:0;opacity:.85}`;

const shardIn = keyframes`
  0%,${p2(CLOSE_AT)}%{opacity:0}
  ${p2(CLOSE_AT + 0.5)}%,100%{opacity:1}`;

const boxHit = keyframes`
  0%,${p2(CLOSE_AT + 0.3)}%{stroke:${SLATE}}
  ${p2(CLOSE_AT + 0.7)}%,100%{stroke:${HOT}}`;

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
    opacity: 0.85;
  }
`;

const Shard = styled.polygon`
  animation: ${shardIn} ${T2}s ease infinite;
  ${still}
  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
  }
`;

const Box = styled.rect`
  animation: ${boxHit} ${T2}s ease infinite;
  ${still}
  @media (prefers-reduced-motion: reduce) {
    stroke: ${HOT};
  }
`;

export const ConstellationArt = () => (
  <Art viewBox='0 0 200 138' aria-hidden>
    <Shard points={PTS.map((p) => p.join(',')).join(' ')} fill={HOT} fillOpacity={0.07} />
    <Chain points={PTS.map((p) => p.join(',')).join(' ')} fill='none' stroke={VIOLET} strokeWidth={1.8} strokeLinejoin='round' strokeDasharray={1} pathLength={1} />
    {PTS.map(([x, y], i) => (
      <Dot key={i} cx={x} cy={y} r={4} fill='#fff' stroke={SLATE} strokeWidth={1.8} $i={i} />
    ))}
    <Box x={BOX.x} y={BOX.y} width={BOX.w} height={BOX.h} rx={7} fill={SLATE} fillOpacity={0.06} stroke={SLATE} strokeWidth={1.8} />
    <text x={22} y={126} fill={SLATE} fillOpacity={0.75}>
      seven allowed calls
    </text>
    <text x={150} y={102} fill={SLATE} fillOpacity={0.75}>
      the data
    </text>
  </Art>
);

/* ============================================================
   3. The same process, opaque and then transparent.
   ============================================================ */

const T3 = 6;
const p3 = (s: number) => (s / T3) * 100;
const LB = { x: 14, y: 22, w: 72, h: 84, rx: 22 };
const RB = { x: 114, y: 22, w: 72, h: 84, rx: 22 };
const TREE: [number, number][] = [
  [150, 40],
  [134, 60],
  [166, 62],
  [142, 82],
  [160, 86],
];
const TREE_LINKS: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 4],
];
const scanAt = (y: number) => ((y - RB.y) / RB.h) * 1.8;

const blink = (i: number) => keyframes`
  0%,${p3(0.2 + i * 0.4)}%{opacity:.5}
  ${p3(0.2 + i * 0.4 + 0.15)}%{opacity:1}
  ${p3(0.2 + i * 0.4 + 0.6)}%{opacity:.5}
  ${p3(3.2 + i * 0.4)}%{opacity:.5}
  ${p3(3.2 + i * 0.4 + 0.15)}%{opacity:1}
  ${p3(3.2 + i * 0.4 + 0.6)}%,100%{opacity:.5}`;

const scan = keyframes`
  0%{transform:translateY(0);opacity:0}
  4%{opacity:1}
  ${p3(1.8)}%{transform:translateY(${RB.h}px);opacity:1}
  ${p3(2.1)}%,100%{transform:translateY(${RB.h}px);opacity:0}`;

const nodeIn = (y: number) => keyframes`
  0%,${p3(scanAt(y) - 0.05)}%{opacity:0}
  ${p3(scanAt(y) + 0.1)}%{opacity:1}
  ${p3(4.6)}%{opacity:1}
  ${p3(5.1)}%,100%{opacity:0}`;

const Mark = styled.g<{ $i: number }>`
  animation: ${(p) => blink(p.$i)} ${T3}s ease infinite;
  ${still}
  @media (prefers-reduced-motion: reduce) {
    opacity: 0.7;
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
        <stop offset='0.5' stopColor={VIOLET} stopOpacity='0.55' />
        <stop offset='1' stopColor={VIOLET} stopOpacity='0' />
      </linearGradient>
      <clipPath id='body3'>
        <rect x={RB.x} y={RB.y} width={RB.w} height={RB.h} rx={RB.rx} />
      </clipPath>
    </defs>

    <line x1={100} y1={18} x2={100} y2={110} stroke={INK} strokeOpacity={0.1} strokeWidth={1.2} />

    {/* opaque: only what touches the outside */}
    <rect x={LB.x} y={LB.y} width={LB.w} height={LB.h} rx={LB.rx} fill={SLATE} fillOpacity={0.28} stroke={SLATE} strokeWidth={1.8} />
    {[
      ['open', 44],
      ['send', 64],
      ['read', 84],
    ].map(([k, y], i) => (
      <Mark key={k} $i={i}>
        <line x1={LB.x - 10} y1={y as number} x2={LB.x} y2={y as number} stroke={SLATE} strokeWidth={2} strokeLinecap='round' />
        <text x={LB.x + 9} y={(y as number) + 1.9} fill={INK} fillOpacity={0.9} style={{ fontSize: 5.2, fontWeight: 500 }}>
          {k}
        </text>
      </Mark>
    ))}

    {/* transparent: the calls inside */}
    <rect x={RB.x} y={RB.y} width={RB.w} height={RB.h} rx={RB.rx} fill={VIOLET} fillOpacity={0.05} stroke={VIOLET} strokeWidth={1.8} />
    {TREE_LINKS.map(([a, b]) => (
      <TreeNode key={`${a}${b}`} $y={Math.max(TREE[a][1], TREE[b][1])}>
        <line x1={TREE[a][0]} y1={TREE[a][1]} x2={TREE[b][0]} y2={TREE[b][1]} stroke={VIOLET} strokeOpacity={0.6} strokeWidth={1.3} />
      </TreeNode>
    ))}
    {TREE.map(([x, y]) => (
      <TreeNode key={`${x}${y}`} $y={y}>
        <circle cx={x} cy={y} r={3} fill={VIOLET} />
      </TreeNode>
    ))}
    <g clipPath='url(#body3)'>
      <Scan>
        <rect x={RB.x} y={RB.y - 4} width={RB.w} height={8} fill='url(#scan3)' />
        <line x1={RB.x} y1={RB.y} x2={RB.x + RB.w} y2={RB.y} stroke={VIOLET} strokeOpacity={0.5} strokeWidth={1.2} />
      </Scan>
    </g>

    <text x={LB.x} y={120} fill={SLATE} fillOpacity={0.75}>
      other ebpf
    </text>
    <text x={LB.x} y={129} fill={SLATE} fillOpacity={0.75}>
      sees the outside
    </text>
    <text x={RB.x} y={120} fill={VIOLET} fillOpacity={0.85}>
      odigos ebpf
    </text>
    <text x={RB.x} y={129} fill={VIOLET} fillOpacity={0.85}>
      sees the calls inside
    </text>
  </Art>
);

/* ============================================================
   4. Three responses. The third is the one you use.
   ============================================================ */

const T4 = 8;
const p4 = (s: number) => (s / T4) * 100;
const SA = { x: 34, y: 40, r: 15 };
const SB = { x: 34, y: 92, r: 15 };
const SC = { x: 136, y: 64, r: 36 };
const pol = (c: { x: number; y: number; r: number }, deg: number) => [c.x + c.r * Math.cos((deg * Math.PI) / 180), c.y + c.r * Math.sin((deg * Math.PI) / 180)] as const;
const fx = (n: number) => Math.round(n * 100) / 100;
const B0 = pol(SB, -15);
const B1 = pol(SB, -75);
const G0 = pol(SC, -56);
const G1 = pol(SC, -34);
const GATE = pol({ ...SC, r: SC.r + 6.5 }, -45);
const IN0 = [GATE[0] + 34, GATE[1] - 28];

const runA = keyframes`
  0%{transform:rotate(0deg)}
  ${p4(1.2)}%,100%{transform:rotate(-130deg)}`;
const dimA = keyframes`
  0%,${p4(1.2)}%{opacity:1}
  ${p4(1.6)}%,100%{opacity:.22}`;
const runB = keyframes`
  0%{transform:rotate(0deg)}
  100%{transform:rotate(-720deg)}`;
const dimB = keyframes`
  0%,${p4(1.6)}%{opacity:1}
  ${p4(2.0)}%,100%{opacity:.45}`;
const runC = keyframes`
  0%{transform:rotate(0deg)}
  100%{transform:rotate(-720deg)}`;

/* a crimson call arrives at the gate, stops there, and is gone before the next */
const intrude = keyframes`
  0%{transform:translate(0,0) scale(1);opacity:0}
  ${p4(0.3)}%{opacity:.95}
  ${p4(1.3)}%{transform:translate(${fx(GATE[0] - IN0[0])}px,${fx(GATE[1] - IN0[1])}px) scale(1);opacity:.95}
  99%{transform:translate(${fx(GATE[0] - IN0[0])}px,${fx(GATE[1] - IN0[1])}px) scale(1);opacity:.95}
  100%{transform:translate(${fx(GATE[0] - IN0[0])}px,${fx(GATE[1] - IN0[1])}px) scale(1);opacity:0}`;

const gateGlow = keyframes`
  0%,${p4(1.2)}%{opacity:.1}
  ${p4(1.45)}%{opacity:.5}
  99%{opacity:.25}
  100%{opacity:.1}`;

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
    opacity: ${(p) => (p.$k === 'a' ? 0.22 : p.$k === 'b' ? 0.45 : 1)};
  }
`;

const Intruder = styled.circle`
  transform-box: view-box;
  transform-origin: ${fx(IN0[0])}px ${fx(IN0[1])}px;
  animation: ${intrude} ${T4}s ease-out infinite;
  ${still}
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: translate(${fx(GATE[0] - IN0[0])}px, ${fx(GATE[1] - IN0[1])}px);
    opacity: 0.95;
  }
`;

const GateGlow = styled.circle`
  animation: ${gateGlow} ${T4}s ease infinite;
  ${still}
  @media (prefers-reduced-motion: reduce) {
    opacity: 0.2;
  }
`;

export const ThreeCutsArt = () => (
  <Art viewBox='0 0 200 138' aria-hidden>
    {/* kill the process */}
    <Disc $k='a'>
      <circle cx={SA.x} cy={SA.y} r={SA.r} fill='none' stroke={SLATE} strokeOpacity={0.35} strokeWidth={1.6} strokeDasharray='2 3' />
      <Runner $cx={SA.x} $cy={SA.y} $k='a'>
        <circle cx={SA.x + SA.r} cy={SA.y} r={2.2} fill={SLATE} />
      </Runner>
    </Disc>
    <line x1={SA.x - 10} y1={SA.y + 10} x2={SA.x + 10} y2={SA.y - 10} stroke={HOT} strokeWidth={2} strokeLinecap='round' />
    <text x={SA.x} y={SA.y + SA.r + 9} textAnchor='middle' fill={SLATE} fillOpacity={0.7} style={{ fontSize: 4.6 }}>
      kill the process
    </text>

    {/* kill the thread */}
    <Disc $k='b'>
      <path d={`M${fx(B0[0])} ${fx(B0[1])} A${SB.r} ${SB.r} 0 1 1 ${fx(B1[0])} ${fx(B1[1])}`} fill='none' stroke={SLATE} strokeOpacity={0.6} strokeWidth={1.6} strokeLinecap='round' />
      <Runner $cx={SB.x} $cy={SB.y} $k='b'>
        <circle cx={SB.x + SB.r} cy={SB.y} r={2.2} fill={SLATE} />
      </Runner>
    </Disc>
    <line x1={fx(B0[0])} y1={fx(B0[1])} x2={fx(B1[0])} y2={fx(B1[1])} stroke={HOT} strokeOpacity={0.8} strokeWidth={1.6} strokeLinecap='round' />
    <text x={SB.x} y={SB.y + SB.r + 9} textAnchor='middle' fill={SLATE} fillOpacity={0.7} style={{ fontSize: 4.6 }}>
      kill the thread
    </text>

    {/* block the call: the service stays whole */}
    <GateGlow cx={fx(GATE[0])} cy={fx(GATE[1])} r={11} fill={VIOLET} />
    <Disc $k='c'>
      <circle cx={SC.x} cy={SC.y} r={SC.r} fill={VIOLET} fillOpacity={0.07} stroke={SLATE} strokeOpacity={0.7} strokeWidth={1.8} />
      <circle cx={SC.x} cy={SC.y} r={SC.r - 9} fill='none' stroke={VIOLET} strokeOpacity={0.14} strokeWidth={1} strokeDasharray='3 4' />
      <Runner $cx={SC.x} $cy={SC.y} $k='c'>
        <circle cx={SC.x + SC.r} cy={SC.y} r={2.6} fill={VIOLET} />
      </Runner>
    </Disc>
    <path d={`M${fx(G0[0])} ${fx(G0[1])} A${SC.r} ${SC.r} 0 0 1 ${fx(G1[0])} ${fx(G1[1])}`} fill='none' stroke={VIOLET} strokeWidth={3.4} strokeLinecap='round' />
    <Intruder cx={fx(IN0[0])} cy={fx(IN0[1])} r={4} fill={HOT} stroke='#fff' strokeWidth={1.2} />
    <text x={SC.x} y={SC.y + SC.r + 14} textAnchor='middle' fill={VIOLET} fillOpacity={0.9}>
      block the call
    </text>
  </Art>
);
