'use client';

import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const HOT = '#c9346a';
const SLATE = '#8892ab';
const VIOLET = 'var(--accent)';
const INK = '#1c1633';

const still = css`
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: none;
    stroke-dashoffset: 0;
  }
`;

const Board = styled.div`
  position: relative;
  margin-top: 44px;
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  background: var(--paper-2);
  overflow: hidden;

`;

const Strip = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 13px 22px;
  border-bottom: 1px solid var(--line);
  font-family: var(--font-mono), monospace;
  font-size: 10.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-faint);

  @media (max-width: 780px) {
    padding: 11px 15px;
    font-size: 8.5px;
  }
`;

/* the diagrams carry small type, so on a phone they scroll rather than shrink */
const Scroll = styled.div`
  @media (max-width: 820px) {
    overflow-x: auto;
    overscroll-behavior-x: contain;
    -webkit-overflow-scrolling: touch;
    padding-right: 24px;
    /* the diagram scrolls; the fade says so before the hint does */
    mask-image: linear-gradient(90deg, #000 calc(100% - 60px), transparent calc(100% - 10px));
    -webkit-mask-image: linear-gradient(90deg, #000 calc(100% - 60px), transparent calc(100% - 10px));
  }
`;

const Stage = styled.div<{ $ar: string; $mw: number }>`
  position: relative;
  width: 100%;
  aspect-ratio: ${(x) => x.$ar};
  background: linear-gradient(180deg, #fdfcfe, #f7f5fa);

  @media (max-width: 820px) {
    width: ${(x) => x.$mw}px;
  }
`;

const Hint = styled.div`
  display: none;
  padding: 9px 15px;
  border-top: 1px solid var(--line);
  font-family: var(--font-mono), monospace;
  font-size: 9px;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--ink-faint);

  @media (max-width: 820px) {
    display: block;
  }
`;

const Svg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

/* ============================================================
   Where each control attaches.

   The nesting is the answer. Their sensors sit outside the process
   or inside your code. Ours sits under both, in the kernel, and
   reads up into a process it never enters.
   ============================================================ */

const T1 = 9;
const q = (s: number) => Math.max(0, Math.min(100, (s / T1) * 100));

const boxIn = (a: number) => keyframes`
  0%,${q(a)}%{opacity:0;transform:translateY(4px)}
  ${q(a + 0.5)}%,100%{opacity:1;transform:translateY(0)}`;

const inkIn = (a: number, o = 1) => keyframes`
  0%,${q(a)}%{opacity:0}
  ${q(a + 0.4)}%,100%{opacity:${o}}`;

/* the read: it goes up into the process without entering it */
const rayIn = (i: number) => keyframes`
  0%,${q(2.4 + i * 0.13)}%{opacity:0;transform:translateY(5px)}
  ${q(2.4 + i * 0.13 + 0.3)}%{opacity:.9;transform:translateY(0)}
  ${q(2.4 + i * 0.13 + 0.9)}%,100%{opacity:.32;transform:translateY(0)}`;

const Region = styled.g<{ $a: number }>`
  animation: ${(x) => boxIn(x.$a)} ${T1}s cubic-bezier(0.16, 1, 0.3, 1) infinite both;
  ${still}
`;

const Edge = styled.rect`
  fill: none;
  stroke: ${SLATE};
  stroke-width: 0.55;
  stroke-dasharray: 2.4 1.6;
`;

const Solid = styled.rect`
  fill: none;
  stroke: rgba(28, 22, 51, 0.28);
  stroke-width: 0.55;
`;

const Proc = styled.rect`
  fill: rgba(28, 22, 51, 0.035);
  stroke: rgba(28, 22, 51, 0.28);
  stroke-width: 0.55;
`;

const Kern = styled.rect`
  fill: rgba(91, 67, 241, 0.07);
  stroke: ${VIOLET};
  stroke-width: 0.6;
`;

const Ray = styled.path<{ $i: number }>`
  fill: ${VIOLET};
  animation: ${(x) => rayIn(x.$i)} ${T1}s cubic-bezier(0.16, 1, 0.3, 1) infinite both;
  ${still}
  @media (prefers-reduced-motion: reduce) {
    opacity: 0.32;
  }
`;

const Tie = styled.line<{ $a: number }>`
  stroke: rgba(28, 22, 51, 0.16);
  stroke-width: 0.4;
  stroke-dasharray: 1.2 1.4;
  animation: ${(x) => inkIn(x.$a)} ${T1}s linear infinite both;
  ${still}
`;

const Lbl = styled.text<{ $a: number; $c?: string; $s?: number; $w?: number }>`
  font-family: var(--font-mono), monospace;
  font-size: ${(x) => x.$s ?? 3.1}px;
  font-weight: ${(x) => x.$w ?? 400};
  letter-spacing: 0.2px;
  fill: ${(x) => x.$c ?? 'rgba(28,22,51,.5)'};
  animation: ${(x) => inkIn(x.$a)} ${T1}s linear infinite both;
  ${still}
`;

const Dot = styled.circle<{ $a: number }>`
  animation: ${(x) => inkIn(x.$a)} ${T1}s linear infinite both;
  ${still}
`;

const GX = 142; /* where the gutter of tool names starts */

export const DeployFigure = () => (
  <Board>
    <Strip>
      <span>agentless · nothing in your process</span>
      <span>agent view · every call, its argument, its return value</span>
    </Strip>
    <Scroll>
    <Stage $ar='200 / 80' $mw={700}>
      <Svg viewBox='0 0 200 80' preserveAspectRatio='xMidYMid meet' aria-hidden>
        {/* the network edge */}
        <Region $a={0.2}>
          <Edge x={6} y={5} width={124} height={9} rx={2} />
          <Lbl x={11} y={11.2} $a={0.4}>
            the network edge
          </Lbl>
        </Region>
        <Tie x1={130} y1={9.5} x2={GX - 3} y2={9.5} $a={0.6} />
        <Dot cx={GX} cy={9.5} r={1.15} fill={SLATE} $a={0.6} />
        <Lbl x={GX + 3.5} y={10.6} $a={0.6} $c={SLATE}>
          waf
        </Lbl>

        {/* the node */}
        <Region $a={0.5}>
          <Solid x={6} y={19} width={124} height={55} rx={2.5} />
          <Lbl x={11} y={25.5} $a={0.7}>
            the node
          </Lbl>
        </Region>
        <Tie x1={130} y1={24} x2={GX - 3} y2={24} $a={0.9} />
        <Dot cx={GX} cy={24} r={1.15} fill={SLATE} $a={0.9} />
        <Lbl x={GX + 3.5} y={25.1} $a={0.9} $c={SLATE}>
          edr · cnapp
        </Lbl>

        {/* your process */}
        <Region $a={0.9}>
          <Proc x={16} y={30} width={106} height={20} rx={2} />
          <Lbl x={21} y={36.6} $a={1.1}>
            your application process
          </Lbl>
          <Lbl x={21} y={45} $a={1.3} $c='rgba(28,22,51,.34)' $s={2.9}>
            your code · the framework · the libraries
          </Lbl>
        </Region>
        <Tie x1={122} y1={40} x2={GX - 3} y2={40} $a={1.3} />
        <Dot cx={GX} cy={40} r={1.15} fill={SLATE} $a={1.3} />
        <Lbl x={GX + 3.5} y={41.1} $a={1.3} $c={SLATE}>
          in-app agents
        </Lbl>
        <Lbl x={GX + 3.5} y={45.4} $a={1.5} $c='rgba(136,146,171,.75)' $s={2.7}>
          vendor code on your
        </Lbl>
        <Lbl x={GX + 3.5} y={49} $a={1.5} $c='rgba(136,146,171,.75)' $s={2.7}>
          call stack, per service
        </Lbl>

        {/* the kernel, and the read upward into a process we never enter */}
        {[26, 44, 62, 80, 98].map((x, i) => (
          <Ray key={x} d={`M${x} 50.6 l3 5.6 h-6 z`} $i={i} />
        ))}
        <Region $a={1.6}>
          <Kern x={12} y={57} width={114} height={11} rx={2} />
          <Lbl x={17} y={64.2} $a={1.8} $c={VIOLET} $w={500}>
            the kernel · we read up, and never go in
          </Lbl>
        </Region>
        <Tie x1={126} y1={62.5} x2={GX - 3} y2={62.5} $a={2} />
        <Dot cx={GX} cy={62.5} r={1.5} fill={VIOLET} $a={2} />
        <Lbl x={GX + 3.5} y={63.8} $a={2} $c={VIOLET} $w={500}>
          odigos
        </Lbl>
        <Lbl x={GX + 3.5} y={68.1} $a={2.2} $c='rgba(91,67,241,.7)' $s={2.7}>
          every call, every process
        </Lbl>
        <Lbl x={GX + 3.5} y={71.7} $a={2.2} $c='rgba(91,67,241,.7)' $s={2.7}>
          on the node, no redeploy
        </Lbl>
      </Svg>
    </Stage>
    </Scroll>
    <Hint>scroll sideways &rsaquo;</Hint>
  </Board>
);
