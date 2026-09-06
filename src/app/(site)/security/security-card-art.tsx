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
    {['waf', 'edr', 'siem', 'adr'].map((k, i) => (
      <text key={k} x={OBJ[i] + 10} y={GROUND + 17} textAnchor='middle' fill={SLATE} fillOpacity={0.8} style={{ fontSize: 5, letterSpacing: 0.6, textTransform: 'uppercase' }}>
        {k}
      </text>
    ))}

    <Bloom cx={ATK} cy={OY} r={18} fill='none' stroke={VIOLET} strokeWidth={1.8} />
    <circle cx={ATK} cy={OY} r={11} fill={HOT} stroke={HOT} strokeWidth={1.8} />

    <Sweep>
      <rect x={10} y={30} width={8} height={70} fill='url(#sweep1)' opacity={0.55} />
      <line x1={14} y1={30} x2={14} y2={100} stroke={VIOLET} strokeWidth={1.4} strokeOpacity={0.75} />
    </Sweep>

    <text x={ATK + 6} y={GROUND + 17} textAnchor='middle' fill={HOT} fillOpacity={0.9} style={{ fontSize: 5, letterSpacing: 0.6, textTransform: 'uppercase' }}>
      none
    </text>
    <text x={30} y={122} fill={SLATE} fillOpacity={0.7}>
      each one waits for a side effect
    </text>
  </Art>
);

/* ============================================================
   2. Five steps, each stamped allowed. Joined in order, one attack.
   ============================================================ */

const OKC = '#2f9e6a';
const T2 = 8;
const p2 = (s: number) => (s / T2) * 100;
const STEPS: { x: number; y: number; k: string }[] = [
  { x: 24, y: 62, k: 'request' },
  { x: 56, y: 52, k: 'lookup' },
  { x: 88, y: 62, k: 'render' },
  { x: 120, y: 52, k: 'parse' },
  { x: 152, y: 62, k: 'write' },
];
const VAULT = { x: 172, y: 44, w: 22, h: 28 };
const CHAIN_AT = 1.8;
const CHAIN_D = 2.4;
const HOT_AT = CHAIN_AT + CHAIN_D + 0.3;

const stepIn = (i: number) => keyframes`
  0%,${p2(0.2 + i * 0.22)}%{opacity:0;transform:scale(.5)}
  ${p2(0.2 + i * 0.22 + 0.3)}%,100%{opacity:1;transform:scale(1)}`;

const tickIn = (i: number) => keyframes`
  0%,${p2(0.45 + i * 0.22)}%{opacity:0;stroke-dashoffset:1}
  ${p2(0.45 + i * 0.22 + 0.35)}%,100%{opacity:1;stroke-dashoffset:0}`;

const chainDraw = keyframes`
  0%,${p2(CHAIN_AT)}%{stroke-dashoffset:1;opacity:0;stroke:${VIOLET}}
  ${p2(CHAIN_AT + 0.05)}%{opacity:.85;stroke:${VIOLET}}
  ${p2(CHAIN_AT + CHAIN_D)}%{stroke-dashoffset:0;opacity:.85;stroke:${VIOLET}}
  ${p2(HOT_AT)}%{stroke-dashoffset:0;opacity:1;stroke:${VIOLET}}
  ${p2(HOT_AT + 0.5)}%,100%{stroke-dashoffset:0;opacity:1;stroke:${HOT}}`;

const headIn = keyframes`
  0%,${p2(HOT_AT + 0.3)}%{opacity:0;transform:translateX(-6px)}
  ${p2(HOT_AT + 0.7)}%,100%{opacity:1;transform:translateX(0)}`;

const vaultHit = keyframes`
  0%,${p2(HOT_AT + 0.6)}%{stroke:${SLATE};fill-opacity:.06}
  ${p2(HOT_AT + 1.0)}%,100%{stroke:${HOT};fill-opacity:.12}`;

const Step = styled.g<{ $i: number }>`
  transform-box: fill-box;
  transform-origin: center;
  animation: ${(p) => stepIn(p.$i)} ${T2}s cubic-bezier(0.16, 1, 0.3, 1) infinite;
  ${still}
`;

const Tick = styled.path<{ $i: number }>`
  animation: ${(p) => tickIn(p.$i)} ${T2}s ease infinite;
  ${still}
  @media (prefers-reduced-motion: reduce) {
    stroke-dashoffset: 0;
    opacity: 1;
  }
`;

const ChainLine = styled.path`
  animation: ${chainDraw} ${T2}s cubic-bezier(0.4, 0, 0.3, 1) infinite;
  ${still}
  @media (prefers-reduced-motion: reduce) {
    stroke-dashoffset: 0;
    opacity: 1;
    stroke: ${HOT};
  }
`;

const Head2 = styled.path`
  transform-box: fill-box;
  transform-origin: center;
  animation: ${headIn} ${T2}s ease-out infinite;
  ${still}
  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
  }
`;

const Vault = styled.rect`
  animation: ${vaultHit} ${T2}s ease infinite;
  ${still}
  @media (prefers-reduced-motion: reduce) {
    stroke: ${HOT};
    fill-opacity: 0.12;
  }
`;

const chainPath = () => {
  const pts = STEPS.map((s) => [s.x, s.y] as const);
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const mx = (x0 + x1) / 2;
    d += ` C ${mx} ${y0}, ${mx} ${y1}, ${x1} ${y1}`;
  }
  d += ` L${VAULT.x - 4} ${VAULT.y + VAULT.h / 2}`;
  return d;
};

export const ConstellationArt = () => (
  <Art viewBox='0 0 200 138' aria-hidden>
    <ChainLine d={chainPath()} fill='none' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round' strokeDasharray={1} pathLength={1} />
    <Head2 d={`M${VAULT.x - 9} ${VAULT.y + VAULT.h / 2 - 5} L${VAULT.x - 2} ${VAULT.y + VAULT.h / 2} L${VAULT.x - 9} ${VAULT.y + VAULT.h / 2 + 5} Z`} fill={HOT} />
    {STEPS.map((s, i) => (
      <Step key={s.k} $i={i}>
        <circle cx={s.x} cy={s.y} r={9} fill='#fff' stroke={OKC} strokeWidth={1.8} />
        <Tick d={`M${s.x - 4} ${s.y} L${s.x - 1} ${s.y + 3.2} L${s.x + 4.5} ${s.y - 3.5}`} fill='none' stroke={OKC} strokeWidth={2} strokeLinecap='round' strokeLinejoin='round' strokeDasharray={1} pathLength={1} $i={i} />
        <text x={s.x} y={s.y + (i % 2 === 0 ? 17 : -13)} textAnchor='middle' fill={INK} fillOpacity={0.6} style={{ fontSize: 4.8 }}>
          {s.k}
        </text>
      </Step>
    ))}
    <Vault x={VAULT.x} y={VAULT.y} width={VAULT.w} height={VAULT.h} rx={5} fill={HOT} stroke={SLATE} strokeWidth={1.8} />
    <text x={VAULT.x + VAULT.w / 2} y={VAULT.y + VAULT.h + 11} textAnchor='middle' fill={SLATE} fillOpacity={0.75} style={{ fontSize: 4.8 }}>
      the data
    </text>
    <text x={24} y={118} fill={OKC} fillOpacity={0.9}>
      five checks
    </text>
    <text x={24} y={127} fill={HOT} fillOpacity={0.9}>
      one attack
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
  [150, 36],
  [136, 50],
  [164, 52],
  [128, 66],
  [146, 66],
  [172, 68],
  [138, 82],
  [156, 84],
  [150, 96],
];
const TREE_LINKS: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [1, 4],
  [2, 5],
  [3, 6],
  [4, 7],
  [7, 8],
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
    {TREE.map(([x, y], i) => (
      <TreeNode key={`${x}${y}`} $y={y}>
        <circle cx={x} cy={y} r={6} fill={VIOLET} fillOpacity={0.14} />
        <circle cx={x} cy={y} r={i === 4 ? 3.6 : 2.8} fill={i === 4 ? HOT : VIOLET} />
      </TreeNode>
    ))}
    <TreeNode $y={66}>
      <text x={156} y={65.5} fill={HOT} fillOpacity={0.95} style={{ fontSize: 4.2, fontWeight: 500 }}>
        args
      </text>
      <text x={156} y={71} fill={HOT} fillOpacity={0.95} style={{ fontSize: 4.2, fontWeight: 500 }}>
        return
      </text>
    </TreeNode>
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
      sees every call inside
    </text>
  </Art>
);

/* ============================================================
   4. The same service three times, as a grid of functions.
   Kill the process and all of it goes dark. Kill the thread and a whole
   row goes dark. Block the function and one square goes violet while
   everything else keeps running.
   ============================================================ */

const T4 = 5;
const p4 = (s: number) => (s / T4) * 100;
const COLS = 5;
const ROWS = 4;
const CELL = 5.6;
const GAP = 2.2;
const BAD = { r: 1, c: 3 }; /* the malicious call */
const gridW = COLS * CELL + (COLS - 1) * GAP;
const gridH = ROWS * CELL + (ROWS - 1) * GAP;
const SVC4 = [
  { x: 14, y: 28, k: 'kill the process', s: 0.78 },
  { x: 14, y: 84, k: 'kill the thread', s: 0.78 },
  { x: 86, y: 30, k: 'block the function', s: 1.55, hero: true },
];
const HIT_AT = 0.7;
const ACT_AT = 1.7;

const live = keyframes`
  0%,100%{opacity:1}
  50%{opacity:.55}`;

const goDark = keyframes`
  0%,${p4(ACT_AT)}%{opacity:1}
  ${p4(ACT_AT + 0.5)}%,100%{opacity:.14}`;

const goBad = keyframes`
  0%,${p4(HIT_AT)}%{fill:${SLATE};fill-opacity:.35}
  ${p4(HIT_AT + 0.3)}%,100%{fill:${HOT};fill-opacity:1}`;

const goBlocked = keyframes`
  0%,${p4(ACT_AT)}%{fill:${HOT};fill-opacity:1}
  ${p4(ACT_AT + 0.4)}%,100%{fill:${VIOLET};fill-opacity:1}`;

const Cell4 = styled.rect<{ $d: number }>`
  animation: ${live} 2.6s ease-in-out infinite;
  animation-delay: ${(p) => -p.$d}s;
  ${still}
`;

const Dark = styled.g`
  animation: ${goDark} ${T4}s ease infinite;
  ${still}
  @media (prefers-reduced-motion: reduce) {
    opacity: 0.14;
  }
`;

const dead = keyframes`
  0%,${p4(ACT_AT)}%{opacity:0}
  ${p4(ACT_AT + 0.5)}%,100%{opacity:.55}`;

const Dead = styled.rect`
  animation: ${dead} ${T4}s ease infinite;
  ${still}
  @media (prefers-reduced-motion: reduce) {
    opacity: 0.55;
  }
`;

const Bad = styled.rect<{ $blocked?: boolean }>`
  animation: ${(p) => (p.$blocked ? goBlocked : goBad)} ${T4}s ease infinite;
  ${still}
  @media (prefers-reduced-motion: reduce) {
    fill: ${(p) => (p.$blocked ? VIOLET : HOT)};
    fill-opacity: 1;
  }
`;

const BadPre = styled.rect`
  animation: ${goBad} ${T4}s ease infinite;
  ${still}
  @media (prefers-reduced-motion: reduce) {
    fill: ${HOT};
    fill-opacity: 1;
  }
`;

const Shield = styled.rect`
  animation: ${keyframes`
    0%,${p4(ACT_AT)}%{opacity:0;transform:scale(.6)}
    ${p4(ACT_AT + 0.35)}%{opacity:.9;transform:scale(1.15)}
    ${p4(ACT_AT + 0.6)}%,100%{opacity:.7;transform:scale(1)}`} ${T4}s cubic-bezier(0.16, 1, 0.3, 1) infinite;
  transform-box: fill-box;
  transform-origin: center;
  ${still}
  @media (prefers-reduced-motion: reduce) {
    opacity: 0.7;
  }
`;

const Grid = ({ x, y, s, mode }: { x: number; y: number; s: number; mode: 'process' | 'thread' | 'function' }) => {
  const cells: React.ReactNode[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cx = c * (CELL + GAP);
      const cy = r * (CELL + GAP);
      const isBad = r === BAD.r && c === BAD.c;
      const d = ((r * COLS + c) * 0.37) % 2.6;
      if (isBad) {
        cells.push(
          mode === 'function' ? (
            <Bad key={`${r}${c}`} x={cx} y={cy} width={CELL} height={CELL} rx={1.2} $blocked />
          ) : (
            <BadPre key={`${r}${c}`} x={cx} y={cy} width={CELL} height={CELL} rx={1.2} />
          ),
        );
      } else {
        cells.push(<Cell4 key={`${r}${c}`} x={cx} y={cy} width={CELL} height={CELL} rx={1.2} fill={mode === 'function' ? VIOLET : SLATE} fillOpacity={mode === 'function' ? 0.55 : 0.4} $d={d} />);
      }
    }
  }
  const dark = (r: number) => r === BAD.r;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-5} y={-5} width={gridW + 10} height={gridH + 10} rx={5} fill='#fff' stroke={mode === 'function' ? VIOLET : SLATE} strokeOpacity={mode === 'function' ? 0.6 : 0.45} strokeWidth={1.2 / s} />
      {mode === 'process' ? (
        <>
          <Dark>{cells}</Dark>
          <Dead x={-5} y={-5} width={gridW + 10} height={gridH + 10} rx={5} fill={INK} fillOpacity={0.5} />
        </>
      ) : mode === 'thread' ? (
        <>
          {cells.filter((_, i) => !dark(Math.floor(i / COLS)))}
          <Dark>{cells.filter((_, i) => dark(Math.floor(i / COLS)))}</Dark>
        </>
      ) : (
        <>
          {cells}
          <Shield x={BAD.c * (CELL + GAP) - 2.2} y={BAD.r * (CELL + GAP) - 2.2} width={CELL + 4.4} height={CELL + 4.4} rx={2.4} fill='none' stroke={VIOLET} strokeWidth={1.6 / s} />
        </>
      )}
    </g>
  );
};

export const ThreeCutsArt = () => (
  <Art viewBox='0 0 200 138' aria-hidden>
    {SVC4.map((v) => (
      <g key={v.k}>
        <Grid x={v.x} y={v.y} s={v.s} mode={v.hero ? 'function' : v.k.includes('process') ? 'process' : 'thread'} />
        <text
          x={v.hero ? v.x + (gridW * v.s) / 2 : v.x + (gridW * v.s) / 2}
          y={v.y + gridH * v.s + (v.hero ? 16 : 12)}
          textAnchor='middle'
          fill={v.hero ? VIOLET : SLATE}
          fillOpacity={v.hero ? 0.95 : 0.75}
          style={{ fontSize: v.hero ? 5.4 : 4.6, fontWeight: v.hero ? 500 : 400 }}
        >
          {v.k}
        </text>
      </g>
    ))}
  </Art>
);
