'use client';

import React from 'react';
import styled, { keyframes, css } from 'styled-components';

/* Hero art: an investigation, including the part that goes nowhere.

   The focus opens on the whole estate, closes on one cluster, goes deeper,
   finds nothing, pulls all the way back out, and starts again somewhere else.
   A node is violet only while it is inside the current scope, so the picture
   narrows, gives up, widens, and narrows again. Six stops, one wrong turn. */

const T = 18;

/* left / top / width / height at each stop, as a share of the field */
const track = keyframes`
  0%,3%    { opacity:0; left:3%;    top:5%;  width:94%;  height:90%; }
  4%,14%   { opacity:1; left:3%;    top:5%;  width:94%;  height:90%; }
  19%,26%  { opacity:1; left:12%;   top:36%; width:22%;  height:34%; }
  30%,38%  { opacity:1; left:17%;   top:44%; width:10%;  height:16%; }
  42%,49%  { opacity:1; left:6%;    top:18%; width:52%;  height:66%; }
  53%,60%  { opacity:1; left:56%;   top:25%; width:16%;  height:20%; }
  64%,70%  { opacity:1; left:59.5%; top:29%; width:11%;  height:14%; }
  74%,100% { opacity:1; left:62.4%; top:32%; width:6.4%; height:8.4%; }
`;

const GREY = 'rgba(24, 20, 54, 0.32)';
const LIT = '#5b43f1';

/* never in scope */
const d0 = keyframes`
  0%,12%   { fill:${GREY}; opacity:1 }
  18%,100% { fill:${GREY}; opacity:.24 }`;

/* only in scope when it widens after the dead end */
const mid = keyframes`
  0%,12%   { fill:${GREY}; opacity:1 }
  18%,38%  { fill:${GREY}; opacity:.24 }
  44%,50%  { fill:${LIT};  opacity:1 }
  57%,100% { fill:${GREY}; opacity:.24 }`;

/* the cluster it tries first */
const a1 = keyframes`
  0%,12%   { fill:${GREY}; opacity:1 }
  20%,26%  { fill:${LIT};  opacity:1 }
  32%,38%  { fill:${GREY}; opacity:.3 }
  44%,50%  { fill:${LIT};  opacity:1 }
  57%,100% { fill:${GREY}; opacity:.24 }`;

/* deeper inside that same wrong cluster */
const a2 = keyframes`
  0%,12%   { fill:${GREY}; opacity:1 }
  20%,50%  { fill:${LIT};  opacity:1 }
  57%,100% { fill:${GREY}; opacity:.24 }`;

/* the cluster it goes to on the second attempt */
const b1 = keyframes`
  0%,12%   { fill:${GREY}; opacity:1 }
  18%,50%  { fill:${GREY}; opacity:.24 }
  55%,70%  { fill:${LIT};  opacity:1 }
  78%,100% { fill:${GREY}; opacity:.32 }`;

/* the one it lands on */
const b3 = keyframes`
  0%,12%   { fill:${GREY}; opacity:1; transform:scale(1) }
  18%,50%  { fill:${GREY}; opacity:.24; transform:scale(1) }
  55%,72%  { fill:${LIT};  opacity:1; transform:scale(1.3) }
  78%,100% { fill:${LIT};  opacity:1; transform:scale(2.4) }`;

const linkDim = keyframes`
  0%,12%   { opacity:1 }
  20%,38%  { opacity:.38 }
  44%,50%  { opacity:.7 }
  57%,100% { opacity:.38 }`;

const halo = keyframes`
  0%,74%  { opacity:0; transform:scale(.4) }
  82%     { opacity:.5; transform:scale(1) }
  100%    { opacity:0; transform:scale(1.9) }`;

const show = (a: number, b: number) => keyframes`
  0%,${a}% { opacity:0; transform:translateY(4px) }
  ${a + 2}%,${b}% { opacity:1; transform:none }
  ${b + 2}%,100% { opacity:0; transform:translateY(-4px) }`;

const stay = (a: number) => keyframes`
  0%,${a}% { opacity:0; transform:translateY(4px) }
  ${a + 2}%,100% { opacity:1; transform:none }`;

const float = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}`;
const breathe = keyframes`0%,100%{opacity:.55;transform:rotate(0deg) scale(.92)}50%{opacity:1;transform:rotate(45deg) scale(1)}`;

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
  animation: ${stay(74)} ${T}s ease infinite;
  ${reduce}
  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
  }
`;

/* a loose sketch of whatever signal is being asked for right now */
const Scope = styled.div`
  position: absolute;
  right: 18px;
  bottom: 16px;
  width: 40%;
  min-width: 168px;
  min-height: 82px;
  border-radius: 10px;
  border: 1px solid rgba(24, 20, 54, 0.1);
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 10px 26px rgba(24, 20, 54, 0.1);
  backdrop-filter: blur(3px);
  overflow: hidden;
  @media (max-width: 560px) {
    right: 12px;
    bottom: 12px;
    width: 54%;
    min-height: 74px;
  }

  .cap {
    padding: 7px 10px 0;
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 9px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--ink-faint);
  }
  .body {
    padding: 7px 10px 10px;
  }
`;

const Sheet = styled.div<{ $a: number; $b?: number }>`
  position: absolute;
  inset: 0;
  animation: ${(x) => (x.$b === undefined ? stay(x.$a) : show(x.$a, x.$b))} ${T}s ease infinite;
  ${reduce}
  @media (prefers-reduced-motion: reduce) {
    opacity: ${(x) => (x.$b === undefined ? 1 : 0)};
  }
`;

/* rows that stand in for a waterfall or for log lines */
const Bars = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  i {
    display: block;
    height: 5px;
    border-radius: 2px;
    background: rgba(24, 20, 54, 0.17);
  }
  i.on {
    background: var(--accent);
  }
`;

/* frames nest inside their parent and narrow on the way down, so the
   silhouette tapers the way a flame graph does */
const Flame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  .row {
    position: relative;
    height: 6px;
  }
  .row i {
    position: absolute;
    top: 0;
    height: 6px;
    border-radius: 1.5px;
    background: rgba(24, 20, 54, 0.2);
  }
  .row:nth-child(2) i {
    background: rgba(24, 20, 54, 0.12);
  }
  .row:nth-child(3) i {
    background: rgba(24, 20, 54, 0.15);
  }
  .row:nth-child(4) i {
    background: rgba(24, 20, 54, 0.18);
  }
  .row:nth-child(5) i {
    background: rgba(24, 20, 54, 0.22);
  }
  .row i.on {
    background: var(--accent);
  }
`;

const Vals = styled.div`
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 10.5px;
  line-height: 1.65;
  color: var(--ink-mute);

  b {
    color: var(--hot-ink);
  }
  em {
    font-style: normal;
    color: var(--accent);
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

  .mark {
    position: absolute;
    left: 1px;
    bottom: 4px;
    color: var(--accent);
    transform-origin: center;
    animation: ${breathe} 3.2s ease-in-out infinite;
    ${reduce}
  }

  span {
    position: absolute;
    left: 24px;
    bottom: 0;
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: clamp(10.5px, 1.2vw, 14.5px);
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
  animation: ${show(2, 15)} ${T}s ease infinite;
  ${reduce}
`;
const S1 = styled.span`
  animation: ${show(16, 27)} ${T}s ease infinite;
  ${reduce}
`;
const S2 = styled.span`
  animation: ${show(28, 39)} ${T}s ease infinite;
  ${reduce}
`;
const S3 = styled.span`
  animation: ${show(40, 50)} ${T}s ease infinite;
  ${reduce}
`;
const S4 = styled.span`
  animation: ${show(51, 61)} ${T}s ease infinite;
  ${reduce}
`;
const S5 = styled.span`
  animation: ${show(62, 71)} ${T}s ease infinite;
  ${reduce}
`;

const S6 = styled.span`
  animation: ${stay(73)} ${T}s ease infinite;
  ${reduce}
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 3px 11px 4px;
  margin-left: -4px;
  border-radius: 999px;
  background: rgba(91, 67, 241, 0.08);
  border: 1px solid rgba(91, 67, 241, 0.22);
  font-weight: 500;
  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
  }
`;

const Found = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
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
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
  min-height: 1.45em;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: clamp(12px, 1.2vw, 13.5px);
  color: var(--ink);
  animation: ${stay(80)} ${T}s ease infinite;
  ${reduce}
  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
  }

  .ctx {
    color: var(--ink-faint);
    animation: ${stay(83)} ${T}s ease infinite;
    ${reduce}
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
      <Field>
        <Map viewBox='0 0 142 100' preserveAspectRatio='xMidYMid slice' aria-hidden>
          {MAP.links.map((l, i) => (
            <line key={i} className='link' x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
          ))}
          {MAP.nodes.map((n, i) => (
            <circle key={i} className={`n${MAP.kind[i]}`} cx={n.x} cy={n.y} r={n.r} />
          ))}
        </Map>

        <Scope>
          <Sheet $a={2} $b={15}>
            <div className='cap'>metrics</div>
            <div className='body'>
              <svg viewBox='0 0 120 34' width='100%' height='34' fill='none' aria-hidden>
                <path d='M0 22 L14 18 L28 21 L42 15 L56 19 L70 16 L84 20 L98 12 L112 26 L120 30' stroke='rgba(24,20,54,0.28)' strokeWidth='1.6' strokeLinejoin='round' />
                <path d='M98 12 L112 26 L120 30' stroke='#5b43f1' strokeWidth='1.8' strokeLinejoin='round' />
                <line x1='0' y1='33' x2='120' y2='33' stroke='rgba(24,20,54,0.1)' strokeWidth='1' />
              </svg>
            </div>
          </Sheet>

          <Sheet $a={16} $b={27}>
            <div className='cap'>traces</div>
            <div className='body'>
              <Bars>
                <i style={{ width: '92%' }} />
                <i style={{ width: '58%', marginLeft: '8%' }} />
                <i style={{ width: '34%', marginLeft: '16%' }} />
                <i style={{ width: '46%', marginLeft: '12%' }} />
              </Bars>
            </div>
          </Sheet>

          <Sheet $a={28} $b={39}>
            <div className='cap'>logs</div>
            <div className='body'>
              <Bars>
                <i style={{ width: '88%' }} />
                <i style={{ width: '96%' }} />
                <i style={{ width: '71%' }} />
                <i style={{ width: '83%' }} />
              </Bars>
            </div>
          </Sheet>

          <Sheet $a={51} $b={61}>
            <div className='cap'>traces</div>
            <div className='body'>
              <Bars>
                <i style={{ width: '94%' }} />
                <i style={{ width: '40%', marginLeft: '6%' }} />
                <i className='on' style={{ width: '22%', marginLeft: '14%' }} />
                <i style={{ width: '66%', marginLeft: '10%' }} />
              </Bars>
            </div>
          </Sheet>

          <Sheet $a={62} $b={71}>
            <div className='cap'>profile</div>
            <div className='body'>
              <Flame>
                <div className='row'>
                  <i className='on' style={{ left: '34%', width: '14%' }} />
                </div>
                <div className='row'>
                  <i style={{ left: '6%', width: '14%' }} />
                  <i style={{ left: '30%', width: '20%' }} />
                  <i style={{ left: '62%', width: '12%' }} />
                </div>
                <div className='row'>
                  <i style={{ left: '2%', width: '22%' }} />
                  <i style={{ left: '26%', width: '26%' }} />
                  <i style={{ left: '60%', width: '20%' }} />
                </div>
                <div className='row'>
                  <i style={{ left: '0%', width: '56%' }} />
                  <i style={{ left: '58%', width: '36%' }} />
                </div>
                <div className='row'>
                  <i style={{ left: '0%', width: '100%' }} />
                </div>
              </Flame>
            </div>
          </Sheet>

          <Sheet $a={73}>
            <div className='cap'>function values</div>
            <div className='body'>
              <Vals>
                code <em>&quot;BLACK50&quot;</em>
                <br />
                rule <b>nil</b>
                <br />
                returned <b>0.00</b>
              </Vals>
            </div>
          </Sheet>
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

      <Foot>
        <Step>
          <svg className='mark' width='11' height='11' viewBox='0 0 12 12' fill='none' aria-hidden>
            <path d='M6 0.6c.35 2.6 2.44 4.69 5.04 5.04v.72C8.44 6.71 6.35 8.8 6 11.4h-.72C4.93 8.8 2.84 6.71.24 6.36v-.72C2.84 5.29 4.93 3.2 5.28.6z' fill='currentColor' />
          </svg>
          <S0>checkout revenue is down 12%</S0>
          <S1>following a checkout that completed</S1>
          <S2>whatever that path already records</S2>
          <S3 className='dead'>
            <s>nothing here</s> backing out, trying elsewhere
          </S3>
          <S4>trying the promo path</S4>
          <S5>finding out which functions ran</S5>
          <S6>dynamically instrumenting applyDiscount()</S6>
        </Step>
        <Answer>
          <Found>
            <svg width='12' height='12' viewBox='0 0 14 14' fill='none' aria-hidden>
              <path d='M2 7.4 5.2 10.5 12 3.5' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
            cause found
          </Found>
          <span className='ctx'>the rule lookup came back empty</span>
        </Answer>
      </Foot>
    </Panel>
  </Frame>
);
