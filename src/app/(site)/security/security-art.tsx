'use client';

import React from 'react';
import styled, { keyframes, css } from 'styled-components';

/* Hero art: brute force, a wall, one hole, then sideways.

   An operator with a model tries every variant it can generate. They fan
   out and break against the perimeter. One finds the hole, and from there
   the attack is lateral: edge, then api, then worker, each entered through
   a different weakness, inside a single request. The last hop meets a
   policy and never runs.

   crimson is the attacker, slate is the perimeter, violet is us. */

const T = 12;
const p = (s: number) => Math.max(0, Math.min(100, (s / T) * 100));

const HOT = '#c9346a';
const SLATE = '#8892ab';
const INK = '#1c1633';
const VIOLET = 'var(--accent)';

const AX = 7;
const AY = 41.5;
const Y0 = AY + 3.5; /* the run: where the fan starts and the hole sits */
const X0 = 18;
const WALL = 62;
const HOLE = 3.6;

const SVC = [
  { x: 86, k: 'edge', w: 'ssrf' },
  { x: 110, k: 'api', w: 'cve' },
  { x: 134, k: 'worker', w: 'zero-day' },
];
const BLOCK = (SVC[1].x + SVC[2].x) / 2;
const NODE = 7.2;

/* the fan: every attempt ends on the wall, except the one at the hole */
const N = 27;
const FAN = Array.from({ length: N }, (_, i) => ({ y: 12 + (i / (N - 1)) * 68, i }));
const THROUGH = Math.floor(N / 2);

const CELLS = [0.9, 0.35, 0.68, 0.22, 0.5, 0.85, 0.3, 0.62, 0.75, 0.28, 0.92, 0.44, 0.38, 0.7, 0.25, 0.8];

const CELLS_AT = 0.4;
const WALL_AT = 0.8;
const FAN_AT = 1.4;
const IN_AT = 3.0;
const LAND = [3.6, 4.6];
const HOP_AT = [4.0, 5.0];
const BLOCK_AT = 5.35;

const hop = (a: number, b: number) => `M${SVC[a].x + NODE / 2} ${Y0 - 2.4} Q${(SVC[a].x + SVC[b].x) / 2} 29 ${SVC[b].x - NODE / 2} ${Y0 - 2.4}`;

/* --- motion --- */

const fade = (a: number, o = 1, b?: number) => keyframes`
  0%,${p(a)}%{opacity:0}
  ${p(a + 0.35)}%${b === undefined ? ',100%' : ''}{opacity:${o}}
  ${b === undefined ? '' : `${p(b)}%{opacity:${o}}${p(b + 0.3)}%,100%{opacity:0}`}`;

const draw = (a: number, d: number, to = 0, o = 1) => keyframes`
  0%,${p(a)}%{stroke-dashoffset:1;opacity:0}
  ${p(a + 0.04)}%{opacity:${o}}
  ${p(a + d)}%,100%{stroke-dashoffset:${to};opacity:${o}}`;

const cellIn = (i: number) => keyframes`
  0%,${p(CELLS_AT + i * 0.015)}%{opacity:0}
  ${p(CELLS_AT + i * 0.015 + 0.3)}%,100%{opacity:${CELLS[i]}}`;

const cellPulse = (i: number) => keyframes`
  0%,100%{opacity:${CELLS[i]}}
  50%{opacity:${Math.min(1, CELLS[i] + 0.3)}}`;

const wallIn = keyframes`
  0%,${p(WALL_AT)}%{opacity:0;transform:scaleY(.3)}
  ${p(WALL_AT + 0.5)}%,100%{opacity:1;transform:scaleY(1)}`;

/* fast, in order, and every one of them stops at the wall */
const fanIn = (i: number) => {
  const a = FAN_AT + Math.abs(i - THROUGH) * 0.055;
  return keyframes`
  0%,${p(a)}%{stroke-dashoffset:1;opacity:0}
  ${p(a + 0.04)}%{opacity:.5}
  ${p(a + 0.5)}%,100%{stroke-dashoffset:0;opacity:.5}`;
};

const landIn = (i: number) => keyframes`
  0%,${p(LAND[i])}%{fill:#fff;stroke:${INK};transform:scale(1)}
  ${p(LAND[i] + 0.16)}%{fill:${HOT};stroke:${HOT};transform:scale(1.26)}
  ${p(LAND[i] + 0.4)}%,100%{fill:${HOT};stroke:${HOT};transform:scale(1)}`;

const spareIn = keyframes`
  0%,${p(BLOCK_AT)}%{fill:#fff;stroke:${INK}}
  ${p(BLOCK_AT + 0.3)}%,100%{fill:#fff;stroke:${VIOLET}}`;

const blockIn = keyframes`
  0%,${p(BLOCK_AT)}%{opacity:0;transform:scaleY(0)}
  ${p(BLOCK_AT + 0.2)}%{opacity:1;transform:scaleY(1.2)}
  ${p(BLOCK_AT + 0.38)}%,100%{opacity:1;transform:scaleY(1)}`;

const haloIn = keyframes`
  0%,${p(BLOCK_AT)}%{opacity:0;transform:scale(.3)}
  ${p(BLOCK_AT + 0.6)}%,100%{opacity:.08;transform:scale(1)}`;

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
  gap: 14px;
  padding: 13px 22px;
  border-bottom: 1px solid var(--line);
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 11px;
  color: var(--ink-faint);

  .hot {
    color: ${HOT};
  }
  .us {
    color: ${VIOLET};
  }

  @media (max-width: 1000px) {
    padding: 11px 15px;
    font-size: 9.5px;
  }
`;

const Field = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 160 / 92;
  background: linear-gradient(180deg, #fdfcfe, #f7f5fa);
`;

const Map = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

const Cell = styled.rect<{ $i: number }>`
  fill: ${HOT};
  animation:
    ${(x) => cellIn(x.$i)} ${T}s linear infinite both,
    ${(x) => cellPulse(x.$i)} ${(x) => 2.2 + (x.$i % 5) * 0.42}s ease-in-out infinite;
  ${still}
  @media (prefers-reduced-motion: reduce) {
    opacity: ${(x) => CELLS[x.$i]};
  }
`;

const Wall = styled.line`
  stroke: ${SLATE};
  stroke-width: 0.9;
  stroke-dasharray: 2.4 1.4;
  stroke-linecap: round;
  transform-box: fill-box;
  transform-origin: center;
  animation: ${wallIn} ${T}s cubic-bezier(0.16, 1, 0.3, 1) infinite both;
  ${still}
`;

const Try = styled.path<{ $i: number }>`
  fill: none;
  stroke: ${HOT};
  stroke-width: 0.46;
  stroke-linecap: round;
  stroke-dasharray: 1;
  animation: ${(x) => fanIn(x.$i)} ${T}s cubic-bezier(0.4, 0, 0.2, 1) infinite both;
  ${still}
  @media (prefers-reduced-motion: reduce) {
    opacity: 0.5;
  }
`;

const Through = styled.path`
  fill: none;
  stroke: ${HOT};
  stroke-width: 1.05;
  stroke-linecap: round;
  stroke-dasharray: 1;
  animation: ${draw(IN_AT, 0.55)} ${T}s cubic-bezier(0.4, 0, 0.3, 1) infinite both;
  ${still}
`;

const Hop = styled.path<{ $i: number }>`
  fill: none;
  stroke: ${HOT};
  stroke-width: 1.05;
  stroke-linecap: round;
  stroke-dasharray: 1;
  animation: ${(x) => draw(HOP_AT[x.$i], 0.55, x.$i === 1 ? 0.5 : 0)} ${T}s cubic-bezier(0.4, 0, 0.3, 1) infinite both;
  ${still}
  @media (prefers-reduced-motion: reduce) {
    stroke-dashoffset: ${(x) => (x.$i === 1 ? 0.5 : 0)};
  }
`;

const Node = styled.rect<{ $i: number }>`
  fill: #fff;
  stroke: ${INK};
  stroke-width: 0.6;
  transform-box: fill-box;
  transform-origin: center;
  animation:
    ${fade(0.3)} ${T}s linear infinite both,
    ${(x) => (x.$i === 2 ? spareIn : landIn(x.$i))} ${T}s cubic-bezier(0.16, 1, 0.3, 1) infinite both;
  ${still}
  @media (prefers-reduced-motion: reduce) {
    fill: ${(x) => (x.$i === 2 ? '#fff' : HOT)};
    stroke: ${(x) => (x.$i === 2 ? VIOLET : HOT)};
  }
`;

const Name = styled.text`
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 3.1px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  fill: rgba(28, 22, 51, 0.5);
  text-anchor: middle;
  animation: ${fade(0.3)} ${T}s linear infinite both;
  ${still}
`;

const Weak = styled.text<{ $a: number }>`
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 3.1px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  fill: ${HOT};
  text-anchor: middle;
  animation: ${(x) => fade(x.$a)} ${T}s linear infinite both;
  ${still}
`;

const Halo = styled.circle`
  fill: ${VIOLET};
  transform-box: fill-box;
  transform-origin: center;
  animation: ${haloIn} ${T}s cubic-bezier(0.16, 1, 0.3, 1) infinite both;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.08;
    transform: none;
  }
`;

const Block = styled.rect`
  fill: ${VIOLET};
  transform-box: fill-box;
  transform-origin: center;
  animation: ${blockIn} ${T}s cubic-bezier(0.16, 1, 0.3, 1) infinite both;
  ${still}
`;

const Cap = styled.text<{ $a: number; $c?: string; $s?: number; $m?: string; $b?: number }>`
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: ${(x) => x.$s ?? 3.3}px;
  letter-spacing: 0.2px;
  fill: ${(x) => x.$c ?? 'rgba(28,22,51,.5)'};
  text-anchor: ${(x) => x.$m ?? 'start'};
  animation: ${(x) => fade(x.$a, 1, x.$b)} ${T}s linear infinite both;
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
  animation: ${fade(0.8, 1, BLOCK_AT)} ${T}s linear infinite both;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0;
  }
`;

const Loud = styled.div`
  color: var(--ink);
  animation: ${fade(BLOCK_AT + 0.2)} ${T}s linear infinite both;
  ${still}
`;

export const SecurityArt = () => (
  <Frame>
    <Panel role='img' aria-label='An AI operator tries every exploit variant against the perimeter. One finds a hole, then moves sideways through three services, each through a different weakness, until a policy refuses the last call.'>
      <Strip>
        <span className='hot'>every variant, at machine speed</span>
        <span className='us'>one hole, then sideways</span>
      </Strip>
      <Field>
        <Map viewBox='0 0 160 92' preserveAspectRatio='xMidYMid meet' aria-hidden>
          {/* the operator */}
          <Cap x={AX - 1} y={AY - 5.5} $a={CELLS_AT} $c={HOT} $s={2.8}>
            ai operator
          </Cap>
          {CELLS.map((_, i) => (
            <Cell key={i} x={AX + (i % 4) * 2.3} y={AY + Math.floor(i / 4) * 2.3} width={1.6} height={1.6} rx={0.3} $i={i} />
          ))}

          {/* the perimeter, with the one gap it has */}
          <Cap x={WALL} y={7} $a={WALL_AT + 0.3} $c={SLATE} $s={2.9} $m='middle'>
            perimeter
          </Cap>
          <Wall x1={WALL} y1={10} x2={WALL} y2={Y0 - HOLE} />
          <Wall x1={WALL} y1={Y0 + HOLE} x2={WALL} y2={84} />

          {/* every attempt, breaking on the wall */}
          {FAN.map((v) =>
            v.i === THROUGH ? null : <Try key={v.i} d={`M${X0} ${Y0} C 36 ${v.y}, 48 ${v.y}, ${WALL - 0.6} ${v.y}`} pathLength={1} $i={v.i} />,
          )}
          <Cap x={AX - 1} y={7} $a={FAN_AT + 1.0} $c='rgba(201,52,106,.7)' $s={2.9}>
            tries everything
          </Cap>

          {/* the one that found the hole, and where it went next */}
          <Through d={`M${X0} ${Y0} H${SVC[0].x - NODE / 2}`} pathLength={1} />
          <Hop d={hop(0, 1)} pathLength={1} $i={0} />
          <Hop d={hop(1, 2)} pathLength={1} $i={1} />

          {SVC.map((s, i) => (
            <g key={s.k}>
              <Node x={s.x - NODE / 2} y={Y0 - NODE / 2} width={NODE} height={NODE} rx={1.6} $i={i} />
              <Name x={s.x} y={Y0 + 10}>
                {s.k}
              </Name>
              <Weak x={s.x} y={Y0 + 14.6} $a={i === 2 ? BLOCK_AT + 0.4 : LAND[i] + 0.15}>
                {s.w}
              </Weak>
            </g>
          ))}

          {/* the hop that never lands */}
          <Halo cx={BLOCK} cy={Y0 - 6} r={9} />
          <Block x={BLOCK - 0.9} y={Y0 - 16} width={1.8} height={20} rx={0.4} />
          <Cap x={BLOCK} y={Y0 + 24} $a={BLOCK_AT + 0.4} $c={VIOLET} $s={3.1} $m='middle'>
            refused by policy
          </Cap>

          <Cap x={X0} y={88} $a={LAND[0] + 0.3} $c='rgba(28,22,51,.5)' $s={3}>
            one request. a different weakness in each service.
          </Cap>
        </Map>
      </Field>

      <Foot>
        <Quiet>
          <span>nothing in this request was malformed</span>
        </Quiet>
        <Loud>
          <Pill>refused</Pill>
          <span>the third hop never ran</span>
        </Loud>
      </Foot>
    </Panel>
  </Frame>
);
