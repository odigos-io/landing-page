'use client';

import React from 'react';
import styled, { keyframes, css } from 'styled-components';

/* Hero art: an investigation, including the part that goes nowhere.

   The focus opens on the whole estate, closes on one cluster, goes deeper,
   finds nothing, pulls all the way back out, and starts again somewhere else.
   A node is violet only while it is inside the current scope, so the picture
   narrows, gives up, widens, and narrows again. Six stops, one wrong turn. */

const T = 16;

/* left / top / width / height at each stop, as a share of the field */
const track = keyframes`
  0%,3%    { opacity:0; left:3%;    top:5%;  width:94%;  height:90%; }
  5%,16%   { opacity:1; left:3%;    top:5%;  width:94%;  height:90%; }
  22%,31%  { opacity:1; left:12%;   top:36%; width:22%;  height:34%; }
  36%,45%  { opacity:1; left:17%;   top:44%; width:10%;  height:16%; }
  50%,58%  { opacity:1; left:6%;    top:18%; width:52%;  height:66%; }
  63%,71%  { opacity:1; left:56%;   top:25%; width:16%;  height:20%; }
  77%,100% { opacity:1; left:62.4%; top:32%; width:6.4%; height:8.4%; }
`;

const GREY = 'rgba(24, 20, 54, 0.32)';
const LIT = '#5b43f1';

/* never in scope */
const d0 = keyframes`
  0%,14%   { fill:${GREY}; opacity:1 }
  20%,100% { fill:${GREY}; opacity:.24 }`;

/* only in scope when it widens after the dead end */
const mid = keyframes`
  0%,14%   { fill:${GREY}; opacity:1 }
  20%,45%  { fill:${GREY}; opacity:.24 }
  52%,58%  { fill:${LIT};  opacity:1 }
  65%,100% { fill:${GREY}; opacity:.24 }`;

/* the cluster it tries first */
const a1 = keyframes`
  0%,14%   { fill:${GREY}; opacity:1 }
  23%,31%  { fill:${LIT};  opacity:1 }
  37%,45%  { fill:${GREY}; opacity:.3 }
  52%,58%  { fill:${LIT};  opacity:1 }
  65%,100% { fill:${GREY}; opacity:.24 }`;

/* deeper inside that same wrong cluster */
const a2 = keyframes`
  0%,14%   { fill:${GREY}; opacity:1 }
  23%,58%  { fill:${LIT};  opacity:1 }
  65%,100% { fill:${GREY}; opacity:.24 }`;

/* the cluster it goes to on the second attempt */
const b1 = keyframes`
  0%,14%   { fill:${GREY}; opacity:1 }
  20%,58%  { fill:${GREY}; opacity:.24 }
  65%,71%  { fill:${LIT};  opacity:1 }
  79%,100% { fill:${GREY}; opacity:.32 }`;

/* the one it lands on */
const b3 = keyframes`
  0%,14%   { fill:${GREY}; opacity:1; transform:scale(1) }
  20%,58%  { fill:${GREY}; opacity:.24; transform:scale(1) }
  65%,73%  { fill:${LIT};  opacity:1; transform:scale(1.3) }
  80%,100% { fill:${LIT};  opacity:1; transform:scale(2.4) }`;

const linkDim = keyframes`
  0%,14%   { opacity:1 }
  22%,45%  { opacity:.38 }
  52%,58%  { opacity:.7 }
  65%,100% { opacity:.38 }`;

const halo = keyframes`
  0%,77%  { opacity:0; transform:scale(.4) }
  85%     { opacity:.5; transform:scale(1) }
  100%    { opacity:0; transform:scale(1.9) }`;

const show = (a: number, b: number) => keyframes`
  0%,${a}% { opacity:0; transform:translateY(4px) }
  ${a + 2}%,${b}% { opacity:1; transform:none }
  ${b + 2}%,100% { opacity:0; transform:translateY(-4px) }`;

const stay = (a: number) => keyframes`
  0%,${a}% { opacity:0; transform:translateY(4px) }
  ${a + 2}%,100% { opacity:1; transform:none }`;

const float = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}`;
const blink = keyframes`0%,100%{opacity:.35}50%{opacity:1}`;

const reduce = css`
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Frame = styled.div`
  animation: ${float} 16s ease-in-out infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Panel = styled.div`
  border-radius: 20px;
  border: 1px solid rgba(91, 67, 241, 0.16);
  background: var(--paper-2);
  box-shadow: var(--shadow-panel);
  overflow: hidden;
`;

const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 14px 22px;
  background: var(--paper-3);
  border-bottom: 1px solid var(--line);
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 10.5px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--ink-faint);
  @media (max-width: 1000px) {
    padding: 12px 16px;
    font-size: 9.5px;
  }

  .live {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    color: var(--signal-ink);
  }
  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--signal);
    animation: ${blink} 1.9s ease-in-out infinite;
    ${reduce}
  }
`;

const Field = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1.42 / 1;
  overflow: hidden;
  background: radial-gradient(120% 90% at 66% 36%, rgba(91, 67, 241, 0.07), transparent 62%), linear-gradient(180deg, #fdfdff, #f8f6ff);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: linear-gradient(rgba(24, 20, 54, 0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(24, 20, 54, 0.045) 1px, transparent 1px);
    background-size: 34px 34px;
    -webkit-mask-image: radial-gradient(90% 90% at 50% 50%, #000, transparent 88%);
    mask-image: radial-gradient(90% 90% at 50% 50%, #000, transparent 88%);
  }
`;

const Map = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;

  .link {
    stroke: rgba(24, 20, 54, 0.13);
    stroke-width: 0.28;
    animation: ${linkDim} ${T}s ease-in-out infinite;
  }
  circle {
    fill: ${GREY};
    transform-box: fill-box;
    transform-origin: center;
  }
  .n0 {
    animation: ${d0} ${T}s ease-in-out infinite;
  }
  .n1 {
    animation: ${a1} ${T}s ease-in-out infinite;
  }
  .n2 {
    animation: ${a2} ${T}s ease-in-out infinite;
  }
  .n3 {
    animation: ${b1} ${T}s ease-in-out infinite;
  }
  .n5 {
    animation: ${mid} ${T}s ease-in-out infinite;
  }
  .n4 {
    animation: ${b3} ${T}s ease-in-out infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    circle,
    .link {
      animation: none;
    }
    .n4 {
      fill: ${LIT};
      transform: scale(2.4);
    }
  }
`;

const Reticle = styled.div`
  position: absolute;
  animation: ${track} ${T}s cubic-bezier(0.66, 0, 0.18, 1) infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    left: 62.4%;
    top: 32%;
    width: 6.4%;
    height: 8.4%;
    opacity: 1;
  }

  span {
    position: absolute;
    width: 11px;
    height: 11px;
    border: 1.6px solid var(--accent);
  }
  span:nth-child(1) {
    top: -1px;
    left: -1px;
    border-right: 0;
    border-bottom: 0;
    border-radius: 3px 0 0 0;
  }
  span:nth-child(2) {
    top: -1px;
    right: -1px;
    border-left: 0;
    border-bottom: 0;
    border-radius: 0 3px 0 0;
  }
  span:nth-child(3) {
    bottom: -1px;
    left: -1px;
    border-right: 0;
    border-top: 0;
    border-radius: 0 0 0 3px;
  }
  span:nth-child(4) {
    bottom: -1px;
    right: -1px;
    border-left: 0;
    border-top: 0;
    border-radius: 0 0 3px 0;
  }
  &::before,
  &::after {
    content: '';
    position: absolute;
    background: rgba(91, 67, 241, 0.2);
  }
  &::before {
    left: 50%;
    top: 12%;
    bottom: 12%;
    width: 1px;
  }
  &::after {
    top: 50%;
    left: 12%;
    right: 12%;
    height: 1px;
  }
`;

const Glow = styled.i`
  position: absolute;
  left: 65.6%;
  top: 36.2%;
  width: 86px;
  height: 86px;
  margin: -43px 0 0 -43px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(91, 67, 241, 0.22), transparent 68%);
  animation: ${stay(77)} ${T}s ease infinite;
  ${reduce}
  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
  }
`;

const Halo = styled.i`
  position: absolute;
  left: 65.6%;
  top: 36.2%;
  width: 46px;
  height: 46px;
  margin: -23px 0 0 -23px;
  border-radius: 50%;
  border: 1.5px solid var(--accent);
  animation: ${halo} ${T}s ease-out infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0;
  }
`;

const Step = styled.div`
  position: relative;
  height: 22px;
  margin-bottom: 7px;

  span {
    position: absolute;
    left: 0;
    bottom: 0;
    white-space: nowrap;
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: clamp(11.5px, 1.2vw, 14.5px);
    letter-spacing: 0.01em;
    color: var(--accent);
  }
  .dead {
    color: var(--ink-faint);
  }
  .dead s {
    text-decoration-color: rgba(24, 20, 54, 0.3);
  }
`;

const S0 = styled.span`
  animation: ${show(3, 17)} ${T}s ease infinite;
  ${reduce}
`;
const S1 = styled.span`
  animation: ${show(20, 33)} ${T}s ease infinite;
  ${reduce}
`;
const S2 = styled.span`
  animation: ${show(35, 47)} ${T}s ease infinite;
  ${reduce}
`;
const S3 = styled.span`
  animation: ${show(49, 60)} ${T}s ease infinite;
  ${reduce}
`;
const S4 = styled.span`
  animation: ${show(62, 73)} ${T}s ease infinite;
  ${reduce}
`;
const S5 = styled.span`
  animation: ${stay(76)} ${T}s ease infinite;
  ${reduce}
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 3px 11px 4px;
  margin-left: -11px;
  border-radius: 999px;
  background: rgba(91, 67, 241, 0.08);
  border: 1px solid rgba(91, 67, 241, 0.22);
  font-weight: 500;
  &::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--accent);
    flex-shrink: 0;
  }
  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
  }
`;

const Found = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: 10px;
  color: var(--signal-ink);
  animation: ${stay(88)} ${T}s ease infinite;
  ${reduce}
  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
  }

  svg {
    flex-shrink: 0;
  }
`;

const Answer = styled.span`
  display: block;
  min-height: 1.45em;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: clamp(12px, 1.2vw, 13.5px);
  color: var(--ink);
  animation: ${stay(83)} ${T}s ease infinite;
  ${reduce}
  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
  }

  b {
    color: var(--hot-ink);
    font-weight: 600;
  }
`;

const Foot = styled.div`
  padding: 14px 22px 15px;
  border-top: 1px solid var(--line);
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 11.5px;
  color: var(--ink-faint);
  @media (max-width: 1000px) {
    padding: 13px 16px 15px;
  }

`;


/* the estate, drawn once from a fixed seed so hydration matches */
const CLUSTERS: [number, number, number][] = [
  [20, 23, 7],
  [47, 14, 6],
  [77, 19, 7],
  [114, 25, 6],
  [93, 37, 9],
  [29, 52, 8],
  [61, 47, 6],
  [104, 60, 7],
  [26, 79, 6],
  [59, 79, 7],
  [119, 76, 6],
  [84, 88, 5],
];

/* the reticle stops that matter, in map units */
const A_OUT: [number, number, number, number] = [17.0, 36, 31.2, 34];
const A_IN: [number, number, number, number] = [24.1, 44, 14.2, 16];
const B_OUT: [number, number, number, number] = [79.5, 25, 22.7, 20];
const MID: [number, number, number, number] = [8.5, 18, 73.9, 66];

const inBox = (x: number, y: number, b: [number, number, number, number]) => x >= b[0] && x <= b[0] + b[2] && y >= b[1] && y <= b[1] + b[3];

const build = () => {
  let s = 20260830;
  const rnd = () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
  const nodes: { x: number; y: number; r: number }[] = [];
  const links: { x1: number; y1: number; x2: number; y2: number }[] = [];

  CLUSTERS.forEach(([cx, cy, n], ci) => {
    for (let i = 0; i < n; i++) {
      const a = rnd() * Math.PI * 2;
      const d = 3 + rnd() * 9;
      nodes.push({ x: cx + Math.cos(a) * d, y: cy + Math.sin(a) * d * 0.82, r: 0.75 + rnd() * 0.85 });
      links.push({ x1: cx, y1: cy, x2: cx + Math.cos(a) * d, y2: cy + Math.sin(a) * d * 0.82 });
    }
    const next = CLUSTERS[(ci + 3) % CLUSTERS.length];
    links.push({ x1: cx, y1: cy, x2: next[0], y2: next[1] });
  });

  /* the point the second attempt lands on */
  nodes.push({ x: 93.2, y: 36.2, r: 1.5 });
  const target = nodes.length - 1;

  const kind = nodes.map((n, i) => {
    if (i === target) return 4;
    if (inBox(n.x, n.y, A_IN)) return 2;
    if (inBox(n.x, n.y, A_OUT)) return 1;
    if (inBox(n.x, n.y, B_OUT)) return 3;
    if (inBox(n.x, n.y, MID)) return 5;
    return 0;
  });

  return { nodes, links, kind };
};

const MAP = build();

export const HeroArt = () => (
  <Frame>
    <Panel>
      <Bar>
        <span>production</span>
        <span className='live'>
          <i className='dot' />
          live
        </span>
      </Bar>

      <Field>
        <Map viewBox='0 0 142 100' preserveAspectRatio='xMidYMid slice' aria-hidden>
          {MAP.links.map((l, i) => (
            <line key={i} className='link' x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
          ))}
          {MAP.nodes.map((n, i) => (
            <circle key={i} className={`n${MAP.kind[i]}`} cx={n.x} cy={n.y} r={n.r} />
          ))}
        </Map>

        <Glow />
        <Halo />
        <Reticle>
          <span />
          <span />
          <span />
          <span />
        </Reticle>

      </Field>

      <Foot>
        <Step>
          <S0>examining RED metrics across 400 services</S0>
          <S1>pulling correlated traces on the slow path</S1>
          <S2>reading the logs that path already writes</S2>
          <S3 className='dead'>
            <s>nothing here</s> backing out, trying elsewhere
          </S3>
          <S4>correlated traces on the checkout path</S4>
          <S5>dynamically instrumenting applyDiscount()</S5>
        </Step>
        <Answer>
          applyDiscount() returned <b>$0.00</b>, not $24.50
          <Found>
            <svg width='12' height='12' viewBox='0 0 14 14' fill='none' aria-hidden>
              <path d='M2 7.4 5.2 10.5 12 3.5' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
            cause found
          </Found>
        </Answer>
      </Foot>
    </Panel>
  </Frame>
);
