'use client';

import React from 'react';
import styled, { keyframes, css } from 'styled-components';

/* Hero art: focusing.

   A field of production, and a focus box that racks in on it, four times,
   until it is sitting on one function. The only words are the kind of
   telemetry being asked for at each stop, and they change because the
   question changed. One of them comes back empty, so the focus keeps going. */

const T = 9.2;

const track = keyframes`
  0%,5%   { opacity:0; left:3%;    top:5%;  width:94%;  height:90%; }
  9%,20%  { opacity:1; left:3%;    top:5%;  width:94%;  height:90%; }
  28%,38% { opacity:1; left:43%;   top:12%; width:35%;  height:42%; }
  46%,58% { opacity:1; left:56%;   top:25%; width:16%;  height:20%; }
  66%,100%{ opacity:1; left:62.4%; top:32%; width:6.4%; height:8.4%; }
`;

const show = (a: number, b: number) => keyframes`
  0%,${a}% { opacity:0; transform:translateY(4px) }
  ${a + 3}%,${b}% { opacity:1; transform:none }
  ${b + 3}%,100% { opacity:0; transform:translateY(-4px) }`;

const stay = (a: number) => keyframes`
  0%,${a}% { opacity:0; transform:translateY(4px) }
  ${a + 3}%,100% { opacity:1; transform:none }`;

const halo = keyframes`
  0%,70%  { opacity:0; transform:scale(.4) }
  80%     { opacity:.5; transform:scale(1) }
  100%    { opacity:0; transform:scale(1.9) }`;

const GREY = 'rgba(24, 20, 54, 0.32)';
const LIT = '#5b43f1';

/* never in scope after the first pass: fades back and stays back */
const outOfScope = keyframes`
  0%,20%  { fill:${GREY}; opacity:1 }
  32%,100%{ fill:${GREY}; opacity:.26 }`;

/* in scope for step one only */
const scope1 = keyframes`
  0%,24%  { fill:${GREY}; opacity:1 }
  31%,41% { fill:${LIT};  opacity:1 }
  50%,100%{ fill:${GREY}; opacity:.3 }`;

/* in scope until step three closes past it */
const scope2 = keyframes`
  0%,24%  { fill:${GREY}; opacity:1 }
  31%,59% { fill:${LIT};  opacity:1 }
  68%,100%{ fill:${GREY}; opacity:.34 }`;

/* the one it lands on */
const scope3 = keyframes`
  0%,24%  { fill:${GREY}; opacity:1; transform:scale(1) }
  31%,62% { fill:${LIT};  opacity:1; transform:scale(1.25) }
  72%,100%{ fill:${LIT};  opacity:1; transform:scale(2.4) }`;

const linkDim = keyframes`
  0%,22%  { opacity:1 }
  34%,100%{ opacity:.4 }`;

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
  background:
    radial-gradient(120% 90% at 66% 36%, rgba(91, 67, 241, 0.09), transparent 62%),
    linear-gradient(180deg, #fdfdff, #f8f6ff);
  @media (max-width: 560px) {
    aspect-ratio: 1.2 / 1;
  }

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

/* the estate, drawn once and deterministically so server and client agree */
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
    fill: rgba(24, 20, 54, 0.32);
    transform-box: fill-box;
    transform-origin: center;
  }
  .d0 {
    animation: ${outOfScope} ${T}s ease-in-out infinite;
  }
  .d1 {
    animation: ${scope1} ${T}s ease-in-out infinite;
  }
  .d2 {
    animation: ${scope2} ${T}s ease-in-out infinite;
  }
  .d3 {
    animation: ${scope3} ${T}s ease-in-out infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    circle,
    .link {
      animation: none;
    }
    .d3 {
      fill: #5b43f1;
      transform: scale(2.4);
    }
  }
`;

/* the focus box */
const Reticle = styled.div`
  position: absolute;
  animation: ${track} ${T}s cubic-bezier(0.65, 0, 0.2, 1) infinite;
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
  /* crosshairs */
  &::before,
  &::after {
    content: '';
    position: absolute;
    background: rgba(91, 67, 241, 0.22);
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

/* what it lands on */
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

/* the only words on the picture */

/* one seeded pass, at module scope, so the picture never changes between
   renders and hydration does not complain */
const CLUSTERS: [number, number, number][] = [
  [20, 23, 7],
  [47, 14, 6],
  [77, 19, 7],
  [114, 25, 6],
  [93, 37, 9],
  [29, 52, 7],
  [61, 47, 6],
  [104, 60, 7],
  [26, 79, 6],
  [59, 79, 7],
  [119, 76, 6],
  [84, 88, 5],
];

/* the reticle stops, in the same units the map is drawn in */
const BOXES: [number, number, number, number][] = [
  [43 * 1.42, 12, 35 * 1.42, 42],
  [56 * 1.42, 25, 16 * 1.42, 20],
  [62.4 * 1.42, 32, 6.4 * 1.42, 8.4],
];

const inBox = (x: number, y: number, b: [number, number, number, number]) => x >= b[0] && x <= b[0] + b[2] && y >= b[1] && y <= b[1] + b[3];

const build = () => {
  let s = 20260830;
  const rnd = () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
  const nodes: { x: number; y: number; r: number; near: boolean }[] = [];
  const links: { x1: number; y1: number; x2: number; y2: number }[] = [];

  CLUSTERS.forEach(([cx, cy, n], ci) => {
    for (let i = 0; i < n; i++) {
      const a = rnd() * Math.PI * 2;
      const d = 3 + rnd() * 9;
      const x = cx + Math.cos(a) * d;
      const y = cy + Math.sin(a) * d * 0.82;
      nodes.push({ x, y, r: 0.75 + rnd() * 0.85, near: ci === 4 });
      links.push({ x1: cx, y1: cy, x2: x, y2: y });
    }
    const next = CLUSTERS[(ci + 3) % CLUSTERS.length];
    links.push({ x1: cx, y1: cy, x2: next[0], y2: next[1] });
  });

  /* the exact point the focus lands on */
  nodes.push({ x: 93.2, y: 36.2, r: 1.5, near: true });

  const depths = nodes.map((n) => {
    let d = 0;
    BOXES.forEach((b, i) => {
      if (inBox(n.x, n.y, b)) d = i + 1;
    });
    return d;
  });

  /* exactly one node is allowed to be the landing point */
  const last = depths.length - 1;
  depths.forEach((d, i) => {
    if (d === 3 && i !== last) depths[i] = 2;
  });

  return { nodes, links, depths };
};

const MAP = build();

const Asked = styled.div`
  position: absolute;
  left: 22px;
  bottom: 20px;
  height: 22px;
  @media (max-width: 1000px) {
    left: 16px;
    bottom: 16px;
  }

  span {
    position: absolute;
    left: 0;
    bottom: 0;
    white-space: nowrap;
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: clamp(12.5px, 1.25vw, 15px);
    letter-spacing: 0.02em;
    color: var(--accent);
  }
  .dead {
    color: var(--ink-faint);
  }
  .dead s {
    text-decoration-color: rgba(24, 20, 54, 0.3);
  }
`;

const A1 = styled.span`
  animation: ${show(6, 22)} ${T}s ease infinite;
  ${reduce}
`;
const A2 = styled.span`
  animation: ${show(25, 40)} ${T}s ease infinite;
  ${reduce}
`;
const A3 = styled.span`
  animation: ${show(43, 58)} ${T}s ease infinite;
  ${reduce}
`;
const A4 = styled.span`
  animation: ${stay(62)} ${T}s ease infinite;
  ${reduce}
  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
  }
`;

const Answer = styled.span`
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: clamp(12px, 1.2vw, 13.5px);
  color: var(--ink);
  animation: ${stay(74)} ${T}s ease infinite;
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
  padding: 14px 22px 17px;
  border-top: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 11.5px;
  color: var(--ink-faint);
  @media (max-width: 1000px) {
    padding: 12px 16px 15px;
  }

  .sep {
    color: var(--line-strong);
    margin: 0 8px;
  }
  .meta {
    white-space: nowrap;
  }
`;

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
            <circle key={i} className={`d${MAP.depths[i]}`} cx={n.x} cy={n.y} r={n.r} />
          ))}
        </Map>

        <Halo />
        <Reticle>
          <span />
          <span />
          <span />
          <span />
        </Reticle>

        <Asked>
          <A1>asking for metrics</A1>
          <A2>asking for traces</A2>
          <A3 className='dead'>
            <s>asking for logs</s> nothing here
          </A3>
          <A4>asking for the function&rsquo;s values</A4>
        </Asked>

      </Field>

      <Foot>
        <Answer>
          promo.Apply returned <b>$0.00</b>, not $24.50
        </Answer>
        <span className='meta'>
          seconds per step
          <span className='sep'>·</span>
          no code change
        </span>
      </Foot>
    </Panel>
  </Frame>
);
