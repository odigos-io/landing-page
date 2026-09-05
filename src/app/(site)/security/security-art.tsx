'use client';

import React from 'react';
import styled, { keyframes, css } from 'styled-components';

/* Hero art: the estate, and one operator working through it.

   Same map as the home page: clusters of services on hairline links. An
   operator with a model sits at the left edge and tries everything against
   the near face of the estate. One probe lands, on edge, through an SSRF.
   From there the movement is sideways along the graph: api, through a CVE.
   The third hop, toward worker and a zero-day, meets a policy. The reticle
   closes on it and the hop never lands.

   crimson is the operator, violet is us, grey is the estate. */

const T = 16;
const pc = (s: number) => Math.max(0, Math.min(100, (s / T) * 100));

const GREY = 'rgba(24, 20, 54, 0.32)';
const HOT = '#c9346a';
const LIT = '#5b43f1';

/* beats, in seconds */
const PROBE_AT = 0.9;
const LAND_AT = 4.9;
const HOP1_AT = 7.4;
const HOP2_AT = 10.4;
const STOP_AT = 11.6;

/* the estate, drawn once from a fixed seed so hydration matches */
const CLUSTERS: [number, number, number][] = [
  [24, 20, 6],
  [50, 13, 6],
  [78, 18, 7],
  [113, 24, 6],
  [94, 37, 8],
  [31, 52, 8],
  [61, 47, 7],
  [104, 61, 7],
  [27, 80, 6],
  [59, 80, 7],
  [119, 78, 6],
  [84, 89, 5],
];

/* the three services the attack goes through, by cluster index */
const EDGE = 5;
const API = 6;
const WORKER = 4;

const OP = { x: 5.2, y: 52 };

const build = () => {
  let s = 20260905;
  const rnd = () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
  const nodes: { x: number; y: number; r: number; k: number }[] = [];
  const links: { x1: number; y1: number; x2: number; y2: number }[] = [];
  const face: { x: number; y: number }[] = [];

  CLUSTERS.forEach(([cx, cy, n], ci) => {
    for (let i = 0; i < n; i++) {
      const a = rnd() * Math.PI * 2;
      const d = 3 + rnd() * 9;
      const x = cx + Math.cos(a) * d;
      const y = cy + Math.sin(a) * d * 0.82;
      nodes.push({ x, y, r: 0.75 + rnd() * 0.85, k: 0 });
      links.push({ x1: cx, y1: cy, x2: x, y2: y });
      if (x < 44 && ci !== EDGE) face.push({ x, y });
    }
    const next = CLUSTERS[(ci + 3) % CLUSTERS.length];
    links.push({ x1: cx, y1: cy, x2: next[0], y2: next[1] });
  });

  /* the service at the centre of each cluster */
  CLUSTERS.forEach(([cx, cy], ci) => {
    nodes.push({ x: cx, y: cy, r: 1.35, k: ci === EDGE ? 1 : ci === API ? 2 : ci === WORKER ? 3 : 0 });
  });

  /* what it tries, in the order it tries it */
  const probes = face.sort(() => rnd() - 0.5).slice(0, 16);

  return { nodes, links, probes };
};

const MAP = build();
const E = { x: CLUSTERS[EDGE][0], y: CLUSTERS[EDGE][1] };
const A = { x: CLUSTERS[API][0], y: CLUSTERS[API][1] };
const Wk = { x: CLUSTERS[WORKER][0], y: CLUSTERS[WORKER][1] };

/* --- motion --- */

const probeIn = (i: number) => {
  const a = PROBE_AT + i * 0.17;
  return keyframes`
  0%,${pc(a)}%{stroke-dashoffset:1;opacity:0}
  ${pc(a + 0.04)}%{opacity:.55}
  ${pc(a + 0.3)}%{stroke-dashoffset:0;opacity:.55}
  ${pc(a + 1.1)}%,100%{stroke-dashoffset:0;opacity:.13}`;
};

const draw = (a: number, d: number, to = 0) => keyframes`
  0%,${pc(a)}%{stroke-dashoffset:1;opacity:0}
  ${pc(a + 0.04)}%{opacity:1}
  ${pc(a + d)}%,100%{stroke-dashoffset:${to};opacity:1}`;

const hit = (a: number) => keyframes`
  0%,${pc(a)}%{fill:${GREY};transform:scale(1)}
  ${pc(a + 0.18)}%{fill:${HOT};transform:scale(2.3)}
  ${pc(a + 0.5)}%,100%{fill:${HOT};transform:scale(1.8)}`;

const spared = keyframes`
  0%,${pc(STOP_AT)}%{fill:${GREY};transform:scale(1)}
  ${pc(STOP_AT + 0.4)}%,100%{fill:${LIT};transform:scale(1.8)}`;

const dim = keyframes`
  0%,${pc(LAND_AT)}%{opacity:1}
  ${pc(LAND_AT + 0.6)}%,100%{opacity:.45}`;

const show = (a: number, b: number) => keyframes`
  0%,${pc(a)}% { opacity:0; transform:translateY(4px) }
  ${pc(a + 0.3)}%,${pc(b)}% { opacity:1; transform:none }
  ${pc(b + 0.3)}%,100% { opacity:0; transform:translateY(-4px) }`;

const stay = (a: number) => keyframes`
  0%,${pc(a)}% { opacity:0; transform:translateY(4px) }
  ${pc(a + 0.3)}%,100% { opacity:1; transform:none }`;

const halo = keyframes`
  0%,${pc(STOP_AT)}%  { opacity:0; transform:scale(.4) }
  ${pc(STOP_AT + 0.9)}%     { opacity:.5; transform:scale(1) }
  100%    { opacity:0; transform:scale(1.9) }`;

const float = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}`;

const reduce = css`
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

/* --- shell, kept identical to the home page --- */

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
  }
  circle {
    fill: ${GREY};
    transform-box: fill-box;
    transform-origin: center;
  }
  .n0 {
    animation: ${dim} ${T}s ease-in-out infinite;
  }
  .n1 {
    animation: ${hit(LAND_AT)} ${T}s ease-in-out infinite;
  }
  .n2 {
    animation: ${hit(HOP1_AT + 0.6)} ${T}s ease-in-out infinite;
  }
  .n3 {
    animation: ${spared} ${T}s ease-in-out infinite;
  }
  .op {
    fill: ${HOT};
  }
  .perim {
    fill: none;
    stroke: #8892ab;
    stroke-width: 0.5;
    stroke-dasharray: 2 1.4;
    stroke-linecap: round;
    animation: ${stay(0.2)} ${T}s ease infinite;
  }
  .lp {
    fill: #8892ab;
    animation: ${stay(0.4)} ${T}s ease infinite;
  }
  .probe {
    fill: none;
    stroke: ${HOT};
    stroke-width: 0.3;
    stroke-linecap: round;
    stroke-dasharray: 1;
  }
  .through {
    fill: none;
    stroke: ${HOT};
    stroke-width: 0.9;
    stroke-linecap: round;
    stroke-dasharray: 1;
    animation: ${draw(LAND_AT - 0.5, 0.5)} ${T}s cubic-bezier(0.4, 0, 0.3, 1) infinite;
  }
  .hop1 {
    fill: none;
    stroke: ${HOT};
    stroke-width: 0.9;
    stroke-linecap: round;
    stroke-dasharray: 1;
    animation: ${draw(HOP1_AT, 0.6)} ${T}s cubic-bezier(0.4, 0, 0.3, 1) infinite;
  }
  .hop2 {
    fill: none;
    stroke: ${HOT};
    stroke-width: 0.9;
    stroke-linecap: round;
    stroke-dasharray: 1;
    animation: ${draw(HOP2_AT, 1.2, 0.42)} ${T}s cubic-bezier(0.4, 0, 0.3, 1) infinite;
  }
  text {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 2.9px;
    letter-spacing: 0.25px;
    text-transform: uppercase;
  }
  .l1 {
    fill: ${HOT};
    animation: ${stay(LAND_AT + 0.3)} ${T}s ease infinite;
  }
  .l2 {
    fill: ${HOT};
    animation: ${stay(HOP1_AT + 0.9)} ${T}s ease infinite;
  }
  .l3 {
    fill: ${LIT};
    animation: ${stay(STOP_AT + 0.3)} ${T}s ease infinite;
  }
  .lo {
    fill: ${HOT};
    animation: ${stay(0.3)} ${T}s ease infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    circle,
    .probe,
    .through,
    .hop1,
    .hop2,
    text {
      animation: none;
      opacity: 1;
      stroke-dashoffset: 0;
    }
    .n0 {
      opacity: 0.45;
    }
    .n1,
    .n2 {
      fill: ${HOT};
      transform: scale(1.8);
    }
    .n3 {
      fill: ${LIT};
      transform: scale(1.8);
    }
    .probe {
      opacity: 0.13;
    }
    .hop2 {
      stroke-dashoffset: 0.42;
    }
  }
`;

const Probe = styled.path<{ $i: number }>`
  animation: ${(x) => probeIn(x.$i)} ${T}s cubic-bezier(0.4, 0, 0.2, 1) infinite;
`;

/* the reticle closes on the service the third hop was heading for */
const Reticle = styled.div`
  position: absolute;
  left: ${Wk.x / 1.42 - 3.2}%;
  top: ${Wk.y - 4.2}%;
  width: 6.4%;
  height: 8.4%;
  animation: ${stay(STOP_AT)} ${T}s ease infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
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
`;

const Glow = styled.i`
  position: absolute;
  left: ${Wk.x / 1.42}%;
  top: ${Wk.y}%;
  width: 86px;
  height: 86px;
  margin: -43px 0 0 -43px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(91, 67, 241, 0.22), transparent 68%);
  animation: ${stay(STOP_AT)} ${T}s ease infinite;
  ${reduce}
  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
  }
`;

const Halo = styled.i`
  position: absolute;
  left: ${Wk.x / 1.42}%;
  top: ${Wk.y}%;
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

/* what it found, one line at a time */
const Scope = styled.div`
  position: absolute;
  right: 18px;
  bottom: 16px;
  min-width: 200px;
  min-height: 62px;
  border-radius: 10px;
  border: 1px solid rgba(24, 20, 54, 0.1);
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 10px 26px rgba(24, 20, 54, 0.1);
  backdrop-filter: blur(3px);
  overflow: hidden;
  @media (max-width: 560px) {
    right: 12px;
    bottom: 12px;
    min-width: 150px;
  }
`;

const Line = styled.div<{ $a: number; $b?: number }>`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3px;
  padding: 10px 14px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 12px;
  line-height: 1.3;
  color: var(--hot-ink);
  white-space: nowrap;
  animation: ${(x) => (x.$b === undefined ? stay(x.$a) : show(x.$a, x.$b))} ${T}s ease infinite;
  ${reduce}
  @media (prefers-reduced-motion: reduce) {
    opacity: ${(x) => (x.$b === undefined ? 1 : 0)};
  }

  b {
    font-weight: 600;
  }
  em {
    font-style: normal;
    color: var(--accent);
  }
  @media (max-width: 560px) {
    font-size: 10.5px;
    padding: 8px 11px;
  }
`;


const cut = (a: { x: number; y: number }, b: { x: number; y: number }, r: number) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const d = Math.hypot(dx, dy);
  return { x1: a.x + (dx / d) * r, y1: a.y + (dy / d) * r, x2: b.x - (dx / d) * r, y2: b.y - (dy / d) * r };
};
const IN = cut(OP, E, 2.6);
const H1 = cut(E, A, 2.6);
const H2 = cut(A, Wk, 2.6);

export const SecurityArt = () => (
  <Frame>
    <Panel role='img' aria-label='A map of services. An AI operator probes the estate, lands on the edge service through an SSRF, moves sideways to the API through a CVE, and is refused by policy before reaching the worker.'>
      <Field>
        <Map viewBox='0 0 142 100' preserveAspectRatio='xMidYMid slice' aria-hidden>
          {MAP.links.map((l, i) => (
            <line key={i} className='link' x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
          ))}

          {/* the perimeter, and the operator outside it */}
          <line className='perim' x1={13.5} y1={1} x2={13.5} y2={99} />
          <text className='lp' x={15.2} y={5.6}>
            perimeter
          </text>

          {/* everything it tries against the near face of the estate */}
          {MAP.probes.map((t, i) => (
            <Probe key={i} className='probe' d={`M${OP.x} ${OP.y} L${t.x} ${t.y}`} pathLength={1} $i={i} />
          ))}
          <path className='through' d={`M${IN.x1} ${IN.y1} L${IN.x2} ${IN.y2}`} pathLength={1} />
          <path className='hop1' d={`M${H1.x1} ${H1.y1} L${H1.x2} ${H1.y2}`} pathLength={1} />
          <path className='hop2' d={`M${H2.x1} ${H2.y1} L${H2.x2} ${H2.y2}`} pathLength={1} />

          {MAP.nodes.map((n, i) => (
            <circle key={i} className={`n${n.k}`} cx={n.x} cy={n.y} r={n.r} />
          ))}

          {/* the operator */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <circle key={`o${i}`} className='op' cx={OP.x - 1.6 + (i % 3) * 1.6} cy={OP.y - 1.6 + Math.floor(i / 3) * 1.6} r={0.55} />
          ))}
          <text className='lo' x={OP.x - 3.2} y={OP.y - 4.2}>
            ai operator
          </text>

          <text className='l1' x={E.x - 3} y={E.y + 6.4}>
            edge · ssrf
          </text>
          <text className='l2' x={A.x - 2} y={A.y + 6.6}>
            api · cve
          </text>
          <text className='l3' x={Wk.x + 9} y={Wk.y + 1}>
            worker · zero-day
          </text>
        </Map>

        <Scope>
          <Line $a={LAND_AT} $b={HOP1_AT + 0.4}>
            <span>
              <b>SSRF</b> found
            </span>
          </Line>
          <Line $a={HOP1_AT + 0.8} $b={STOP_AT - 0.3}>
            <span>
              <b>CVE-2026-135253</b> found
            </span>
          </Line>
          <Line $a={STOP_AT}>
            <span>
              <b>zero-day</b> found
            </span>
            <em>refused by policy</em>
          </Line>
        </Scope>

        <Glow />
        <Halo />
        <Reticle>
          <span />
          <span />
          <span />
          <span />
        </Reticle>
      </Field>

    </Panel>
  </Frame>
);
