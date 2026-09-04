'use client';

import React from 'react';
import styled, { keyframes, css } from 'styled-components';

/* Hero art: through every wall, then stopped at the call.

   Three colours, each meaning exactly one thing.

     slate    the controls you already own. They stand as vertical walls,
              and each one has a gap at the layer it was never built to read.
     crimson  the operator with a model. It probes, finds the gaps, and then
              moves sideways between services inside a single request.
     violet   Odigos. Not another wall in the row. A plane underneath all four
              services, which is the only geometry that sees a chain.

   The picture is the argument: their controls are vertical slices, we are the
   floor beneath every one of them. */

const T = 12;
const p = (s: number) => Math.max(0, Math.min(100, (s / T) * 100));

const HOT = '#c9346a';
const SLATE = '#8892ab';
const VIOLET = '#5b43f1';
const INK = '#1c1633';

/* --- geometry --- */
const RUN = 32; /* the height the request runs at */
const WALL_TOP = 14;
const WALL_BTM = 44;
const PLANE = 64;
const SVC_Y = 32;

const WALLS = [
  { x: 28, k: 'waf', w: 'the edge', g0: 28.5, g1: 35.5 },
  { x: 39.5, k: 'edr', w: 'the host', g0: 25.5, g1: 32.5 },
  { x: 51, k: 'adr', w: 'one app', g0: 30.5, g1: 37.5 },
];

const SVC = [
  { x: 68, k: 'edge' },
  { x: 90, k: 'api' },
  { x: 112, k: 'worker' },
  { x: 134, k: 'store' },
];

/* the run in, threading the gap in each wall on the way */
const RUN_D = `M17 ${RUN} L28 32 L${WALLS[1].x} 29 L${WALLS[2].x} 34 L64.5 ${SVC_Y}`;
/* lateral movement, one hop per service, above the row */
const HOP = (a: number, b: number) => `M${SVC[a].x + 3.6} ${SVC_Y - 2.6} Q${(SVC[a].x + SVC[b].x) / 2} 17 ${SVC[b].x - 3.6} ${SVC_Y - 2.6}`;
const BLOCK_X = (SVC[2].x + SVC[3].x) / 2;

/* the attacker, as a block of weights rather than a hooded figure */
const CELLS = [0.9, 0.35, 0.68, 0.22, 0.5, 0.85, 0.3, 0.62, 0.75, 0.28, 0.92, 0.44, 0.38, 0.7, 0.25, 0.8];

/* --- timing --- */
const WALLS_AT = 0.7;
const PLANE_AT = 1.1;
const AGENT_AT = 1.9;
const PROBE_AT = 2.3;
const RUN_AT = 2.9;
const HOP_AT = [3.9, 4.7, 5.5];
const LAND_AT = [3.7, 4.5, 5.3];
const LINK_AT = 5.6;
const BLOCK_AT = 6.1;

/* --- motion --- */

const draw = (a: number, d: number, to = 0) => keyframes`
  0%,${p(a)}%{stroke-dashoffset:1;opacity:0}
  ${p(a + 0.04)}%{opacity:1}
  ${p(a + d)}%,100%{stroke-dashoffset:${to};opacity:1}`;

const fade = (a: number, b?: number, o = 1) => keyframes`
  0%,${p(a)}%{opacity:0}
  ${p(a + 0.35)}%${b === undefined ? ',100%' : ''}{opacity:${o}}
  ${b === undefined ? '' : `${p(b)}%{opacity:${o}}${p(b + 0.3)}%,100%{opacity:0}`}`;

const wallIn = (i: number) => keyframes`
  0%,${p(WALLS_AT + i * 0.14)}%{opacity:0;transform:scaleY(.4)}
  ${p(WALLS_AT + i * 0.14 + 0.4)}%,100%{opacity:1;transform:scaleY(1)}`;

/* recon: it tries everything, and the walls hold. then it finds the gaps. */
const probeIn = (i: number) => keyframes`
  0%,${p(PROBE_AT + i * 0.11)}%{stroke-dashoffset:1;opacity:0}
  ${p(PROBE_AT + i * 0.11 + 0.05)}%{opacity:.5}
  ${p(PROBE_AT + i * 0.11 + 0.26)}%{stroke-dashoffset:0;opacity:.5}
  ${p(PROBE_AT + i * 0.11 + 0.5)}%,100%{stroke-dashoffset:0;opacity:0}`;

const landIn = (i: number) => keyframes`
  0%,${p(LAND_AT[i])}%{fill:#fff;stroke:${INK};transform:scale(1)}
  ${p(LAND_AT[i] + 0.16)}%{fill:${HOT};stroke:${HOT};transform:scale(1.28)}
  ${p(LAND_AT[i] + 0.4)}%,100%{fill:${HOT};stroke:${HOT};transform:scale(1)}`;

const lastIn = keyframes`
  0%,${p(BLOCK_AT)}%{fill:#fff;stroke:${INK}}
  ${p(BLOCK_AT + 0.3)}%,100%{fill:#fff;stroke:${VIOLET}}`;

/* what we wrote down, on the plane, as each one landed */
const markIn = (i: number) => keyframes`
  0%,${p(LAND_AT[i] + 0.12)}%{opacity:0;transform:scale(.2)}
  ${p(LAND_AT[i] + 0.34)}%,100%{opacity:1;transform:scale(1)}`;

const blockIn = keyframes`
  0%,${p(BLOCK_AT)}%{transform:scaleY(0)}
  ${p(BLOCK_AT + 0.22)}%{transform:scaleY(1.06)}
  ${p(BLOCK_AT + 0.4)}%,100%{transform:scaleY(1)}`;

const cellPulse = (i: number) => keyframes`
  0%,100%{opacity:${CELLS[i]}}
  50%{opacity:${Math.min(1, CELLS[i] + 0.3)}}`;

const float = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}`;

const still = css`
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: none;
    stroke-dashoffset: 0;
  }
`;

/* --- shell --- */

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

const Strip = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 22px;
  border-bottom: 1px solid var(--line);
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 11px;
  color: var(--ink-faint);

  .ok {
    color: #3f8a5c;
  }

  @media (max-width: 1000px) {
    padding: 11px 15px;
    font-size: 9.5px;
  }
`;

const Field = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 148 / 78;
  background: linear-gradient(180deg, #fdfcfe, #f7f5fa);
`;

const Map = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

/* their controls */
const Wall = styled.line<{ $i: number }>`
  stroke: ${SLATE};
  stroke-width: 0.75;
  stroke-dasharray: 2.6 1.3;
  stroke-linecap: round;
  transform-box: fill-box;
  transform-origin: center;
  animation: ${(x) => wallIn(x.$i)} ${T}s cubic-bezier(0.16, 1, 0.3, 1) infinite both;
  ${still}
`;

const WallCap = styled.text<{ $i: number }>`
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 3.1px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  fill: ${SLATE};
  text-anchor: middle;
  animation: ${(x) => fade(WALLS_AT + x.$i * 0.14)} ${T}s linear infinite both;
  ${still}
`;

/* the attacker */
const Cell = styled.rect<{ $i: number }>`
  fill: ${HOT};
  opacity: ${(x) => CELLS[x.$i]};
  animation:
    ${(x) => fade(AGENT_AT + x.$i * 0.012, undefined, CELLS[x.$i])} ${T}s linear infinite both,
    ${(x) => cellPulse(x.$i)} ${(x) => 2.2 + (x.$i % 5) * 0.42}s ease-in-out infinite;
  ${still}
`;

const Probe = styled.path<{ $i: number }>`
  fill: none;
  stroke: ${HOT};
  stroke-width: 0.45;
  stroke-dasharray: 1;
  stroke-linecap: round;
  animation: ${(x) => probeIn(x.$i)} ${T}s ease-out infinite both;
  ${still}
`;

const Run = styled.path`
  fill: none;
  stroke: ${HOT};
  stroke-width: 1.05;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  animation: ${draw(RUN_AT, 0.9)} ${T}s cubic-bezier(0.4, 0, 0.3, 1) infinite both;
  ${still}
`;

const Hop = styled.path<{ $i: number }>`
  fill: none;
  stroke: ${HOT};
  stroke-width: 1.05;
  stroke-linecap: round;
  stroke-dasharray: 1;
  animation: ${(x) => draw(HOP_AT[x.$i], 0.55, x.$i === 2 ? 0.5 : 0)} ${T}s cubic-bezier(0.4, 0, 0.3, 1) infinite both;
  ${still}
`;

/* the services */
const Node = styled.rect<{ $i: number }>`
  fill: #fff;
  stroke: ${INK};
  stroke-width: 0.6;
  transform-box: fill-box;
  transform-origin: center;
  animation:
    ${fade(0.3)} ${T}s linear infinite both,
    ${(x) => (x.$i === 3 ? lastIn : landIn(x.$i))} ${T}s cubic-bezier(0.16, 1, 0.3, 1) infinite both;
  ${still}
`;

const SvcCap = styled.text`
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 3.1px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  fill: rgba(28, 22, 51, 0.45);
  text-anchor: middle;
  animation: ${fade(0.3)} ${T}s linear infinite both;
  ${still}
`;

/* us */
const Plane = styled.path`
  fill: none;
  stroke: ${VIOLET};
  stroke-width: 1.15;
  stroke-linecap: round;
  stroke-dasharray: 1;
  animation: ${draw(PLANE_AT, 0.9)} ${T}s cubic-bezier(0.16, 1, 0.3, 1) infinite both;
  ${still}
`;

const Riser = styled.line`
  stroke: ${VIOLET};
  stroke-width: 0.42;
  animation: ${fade(PLANE_AT + 0.5, undefined, 0.28)} ${T}s linear infinite both;
  ${still}
`;

const Mark = styled.rect<{ $i: number }>`
  fill: ${VIOLET};
  transform-box: fill-box;
  transform-origin: center;
  animation: ${(x) => markIn(x.$i)} ${T}s cubic-bezier(0.16, 1, 0.3, 1) infinite both;
  ${still}
`;

const Link = styled.path`
  fill: none;
  stroke: ${VIOLET};
  stroke-width: 2.1;
  stroke-linecap: round;
  stroke-dasharray: 1;
  opacity: 0.9;
  animation: ${draw(LINK_AT, 0.5)} ${T}s cubic-bezier(0.4, 0, 0.2, 1) infinite both;
  ${still}
`;

const Block = styled.rect`
  fill: ${VIOLET};
  transform-box: fill-box;
  transform-origin: bottom;
  animation: ${blockIn} ${T}s cubic-bezier(0.16, 1, 0.3, 1) infinite both;
  ${still}
`;

const Stem = styled.line`
  stroke: ${VIOLET};
  stroke-width: 0.5;
  stroke-dasharray: 1.4 1.6;
  animation: ${fade(BLOCK_AT + 0.1, undefined, 0.4)} ${T}s linear infinite both;
  ${still}
`;

const WallSub = styled.text<{ $i: number }>`
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 2.8px;
  fill: rgba(136, 146, 171, 0.85);
  text-anchor: middle;
  animation: ${(x) => fade(WALLS_AT + x.$i * 0.14 + 0.2)} ${T}s linear infinite both;
  ${still}
`;

const Cap = styled.text<{ $a: number; $b?: number; $c?: string; $e?: boolean; $s?: number }>`
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: ${(x) => x.$s ?? 3.4}px;
  fill: ${(x) => x.$c ?? 'rgba(28,22,51,.45)'};
  text-anchor: ${(x) => (x.$e ? 'end' : 'start')};
  animation: ${(x) => fade(x.$a, x.$b)} ${T}s linear infinite both;
  ${still}
`;

const Foot = styled.div`
  display: grid;
  padding: 14px 22px;
  border-top: 1px solid var(--line);
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 11px;
  color: var(--ink-faint);

  > * {
    grid-area: 1 / 1;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  @media (max-width: 1000px) {
    padding: 12px 15px;
    font-size: 9.5px;
  }
`;

const Pill = styled.span`
  flex: none;
  padding: 3px 9px;
  border-radius: 999px;
  background: ${VIOLET};
  color: #fff;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  font-size: 9.5px;
`;

const Quiet = styled.div`
  animation: ${fade(0.6, BLOCK_AT)} ${T}s linear infinite both;
  ${still}
`;

const Loud = styled.div`
  color: var(--ink);
  animation: ${fade(BLOCK_AT + 0.2)} ${T}s linear infinite both;
  ${still}
`;

const AX = 8.5;
const AY = 26.5;

export const SecurityArt = () => (
  <Frame>
    <Panel>
      <Strip>
        <span>one request</span>
        <span className='ok'>200 OK</span>
      </Strip>
      <Field>
        <Map viewBox='0 0 148 78' preserveAspectRatio='xMidYMid meet' aria-hidden>
          {/* the controls you already own, and the gap in each one */}
          {WALLS.map((w, i) => (
            <g key={w.k}>
              <WallCap x={w.x} y={10} $i={i}>
                {w.k}
              </WallCap>
              <Wall x1={w.x} y1={WALL_TOP} x2={w.x} y2={w.g0} $i={i} />
              <Wall x1={w.x} y1={w.g1} x2={w.x} y2={WALL_BTM} $i={i} />
              <WallSub x={w.x} y={i === 1 ? 53 : 48} $i={i}>
                {w.w}
              </WallSub>
            </g>
          ))}

          {/* an operator with a model, drawn as what it is */}
          <Cap x={AX - 3} y={AY - 4.5} $a={AGENT_AT} $c={HOT} $s={2.95}>
            ai operator
          </Cap>
          {CELLS.map((_, i) => (
            <Cell key={i} x={AX + (i % 4) * 2.3} y={AY + Math.floor(i / 4) * 2.3} width={1.6} height={1.6} rx={0.3} $i={i} />
          ))}

          {/* recon against all three, which is what the walls are good for */}
          {[24, 32, 40].map((y, i) => (
            <Probe key={y} d={`M17 ${RUN} Q${(17 + WALLS[i].x) / 2} ${y} ${WALLS[i].x - 0.8} ${y}`} pathLength={1} $i={i} />
          ))}

          {/* us: not another wall in the row, a plane under all four */}
          <Plane d={`M61 ${PLANE} H143`} pathLength={1} />
          {SVC.map((s) => (
            <Riser key={s.k} x1={s.x} y1={47} x2={s.x} y2={PLANE - 1} />
          ))}
          <Cap x={61} y={PLANE + 8} $a={PLANE_AT + 0.5} $c={VIOLET}>
            odigos · every call, in every one of them
          </Cap>

          {/* the chain */}
          <Run d={RUN_D} pathLength={1} />
          {[0, 1, 2].map((i) => (
            <Hop key={i} d={HOP(i, i + 1)} pathLength={1} $i={i} />
          ))}

          {SVC.map((s, i) => (
            <g key={s.k}>
              <Node x={s.x - 3.6} y={SVC_Y - 3.6} width={7.2} height={7.2} rx={1.6} $i={i} />
              <SvcCap x={s.x} y={43.5}>
                {s.k}
              </SvcCap>
            </g>
          ))}

          {/* written down on the plane as each one landed, then joined up */}
          <Link d={`M${SVC[0].x} ${PLANE} H${SVC[2].x}`} pathLength={1} />
          {[0, 1, 2].map((i) => (
            <Mark key={i} x={SVC[i].x - 1.15} y={PLANE - 1.15} width={2.3} height={2.3} rx={0.5} $i={i} />
          ))}

          {/* and the fourth one does not happen */}
          <Stem x1={BLOCK_X} y1={30} x2={BLOCK_X} y2={PLANE} />
          <Block x={BLOCK_X - 0.75} y={15.5} width={1.5} height={15} rx={0.3} />
          <Cap x={143} y={13} $a={BLOCK_AT + 0.3} $c={VIOLET} $e>
            refused at the call
          </Cap>
        </Map>
      </Field>

      <Foot>
        <Quiet>
          <span>three controls, three gaps, nothing malformed</span>
        </Quiet>
        <Loud>
          <Pill>refused</Pill>
          <span>the fourth call never ran</span>
        </Loud>
      </Foot>
    </Panel>
  </Frame>
);
