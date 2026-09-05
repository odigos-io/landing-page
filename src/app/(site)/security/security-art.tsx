'use client';

import React from 'react';
import styled, { keyframes, css } from 'styled-components';

/* Hero art: brute force, met at the one place it converges.

   An operator with a model can generate exploit variants faster than
   anyone can write signatures. The lens is every attempt it makes. All of
   them bulge out and come back to a single point, because every one of
   them still has to make a function call this route has never made.
   That is the thing we watch, and the aperture shuts. */

const T = 10;
const p = (s: number) => Math.max(0, Math.min(100, (s / T) * 100));

const HOT = '#c9346a';
const VIOLET = 'var(--accent)';

const AX = 8;
const AY = 41.5; /* top of the attacker block */
const Y0 = AY + 3.5; /* where the lens starts and ends */
const X0 = 20;
const X1 = 116;

const VARIANTS = Array.from({ length: 29 }, (_, i) => ({ y: 9 + (i / 28) * 74, i }));
const CELLS = [0.9, 0.35, 0.68, 0.22, 0.5, 0.85, 0.3, 0.62, 0.75, 0.28, 0.92, 0.44, 0.38, 0.7, 0.25, 0.8];

const CELLS_AT = 0.5;
const LENS_AT = 1.3;
const RING_AT = 3.5;
const SHUT_AT = 4.6;

const fade = (a: number, o = 1, b?: number) => keyframes`
  0%,${p(a)}%{opacity:0}
  ${p(a + 0.35)}%${b === undefined ? ',100%' : ''}{opacity:${o}}
  ${b === undefined ? '' : `${p(b)}%{opacity:${o}}${p(b + 0.3)}%,100%{opacity:0}`}`;

const cellIn = (i: number) => keyframes`
  0%,${p(CELLS_AT + i * 0.015)}%{opacity:0}
  ${p(CELLS_AT + i * 0.015 + 0.3)}%,100%{opacity:${CELLS[i]}}`;

const cellPulse = (i: number) => keyframes`
  0%,100%{opacity:${CELLS[i]}}
  50%{opacity:${Math.min(1, CELLS[i] + 0.3)}}`;

/* one after another, fast. this is the only fast thing in the frame. */
const varIn = (i: number) => keyframes`
  0%,${p(LENS_AT + i * 0.04)}%{stroke-dashoffset:1;opacity:0}
  ${p(LENS_AT + i * 0.04 + 0.05)}%{opacity:.55}
  ${p(LENS_AT + i * 0.04 + 0.55)}%,100%{stroke-dashoffset:0;opacity:.55}`;

const ringIn = keyframes`
  0%,${p(RING_AT)}%{opacity:0;transform:scale(2.6)}
  ${p(RING_AT + 0.5)}%,100%{opacity:1;transform:scale(1)}`;

const shutIn = keyframes`
  0%,${p(SHUT_AT)}%{opacity:0;transform:scaleY(0)}
  ${p(SHUT_AT + 0.22)}%{opacity:1;transform:scaleY(1.25)}
  ${p(SHUT_AT + 0.4)}%,100%{opacity:1;transform:scaleY(1)}`;

const float = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}`;

const still = css`
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: none;
    stroke-dashoffset: 0;
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
  aspect-ratio: 148 / 96;
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

const Var = styled.path<{ $i: number }>`
  fill: none;
  stroke: url(#lens-ramp);
  stroke-width: 0.46;
  stroke-linecap: round;
  stroke-dasharray: 1;
  animation: ${(x) => varIn(x.$i)} ${T}s cubic-bezier(0.4, 0, 0.2, 1) infinite both;
  ${still}
  @media (prefers-reduced-motion: reduce) {
    opacity: 0.55;
  }
`;

const haloIn = keyframes`
  0%,${p(RING_AT)}%{opacity:0;transform:scale(.3)}
  ${p(RING_AT + 0.6)}%,100%{opacity:.08;transform:scale(1)}`;

const Halo = styled.circle`
  fill: var(--accent);
  transform-box: fill-box;
  transform-origin: center;
  animation: ${haloIn} ${T}s cubic-bezier(0.16, 1, 0.3, 1) infinite both;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.08;
    transform: none;
  }
`;

const Ring = styled.circle`
  fill: #fdfcfe;
  stroke: ${VIOLET};
  stroke-width: 1.15;
  transform-box: fill-box;
  transform-origin: center;
  animation: ${ringIn} ${T}s cubic-bezier(0.16, 1, 0.3, 1) infinite both;
  ${still}
`;

const Shut = styled.rect`
  fill: ${VIOLET};
  transform-box: fill-box;
  transform-origin: center;
  animation: ${shutIn} ${T}s cubic-bezier(0.16, 1, 0.3, 1) infinite both;
  ${still}
`;

const Cap = styled.text<{ $a: number; $c?: string; $s?: number; $m?: string; $o?: number; $b?: number }>`
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: ${(x) => x.$s ?? 3.4}px;
  letter-spacing: 0.2px;
  fill: ${(x) => x.$c ?? 'rgba(28,22,51,.5)'};
  text-anchor: ${(x) => x.$m ?? 'start'};
  animation: ${(x) => fade(x.$a, x.$o, x.$b)} ${T}s linear infinite both;
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
  animation: ${fade(0.8, 1, SHUT_AT)} ${T}s linear infinite both;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0;
  }
`;

const Loud = styled.div`
  color: var(--ink);
  animation: ${fade(SHUT_AT + 0.2)} ${T}s linear infinite both;
  ${still}
`;

export const SecurityArt = () => (
  <Frame>
    <Panel role='img' aria-label='An AI operator generates every exploit variant it can. All of them converge on one function call this route has never made, and it is refused before it runs.'>
      <Strip>
        <span className='hot'>every variant it can generate</span>
        <span className='us'>one call</span>
      </Strip>
      <Field>
        <Map viewBox='0 0 148 96' preserveAspectRatio='xMidYMid meet' aria-hidden>
          <defs>
            <linearGradient id='lens-ramp' gradientUnits='userSpaceOnUse' x1={X0} y1={0} x2={X1} y2={0}>
              <stop offset='0' stopColor={HOT} stopOpacity={1} />
              <stop offset='1' stopColor={HOT} stopOpacity={0.28} />
            </linearGradient>
          </defs>
          <Cap x={AX - 1} y={AY - 5.5} $a={CELLS_AT} $c={HOT} $s={2.8}>
            ai operator
          </Cap>
          {CELLS.map((_, i) => (
            <Cell key={i} x={AX + (i % 4) * 2.3} y={AY + Math.floor(i / 4) * 2.3} width={1.6} height={1.6} rx={0.3} $i={i} />
          ))}

          {VARIANTS.map((v) => (
            <Var key={v.i} d={`M${X0} ${Y0} C 52 ${v.y}, 86 ${v.y}, ${X1} ${Y0}`} pathLength={1} $i={v.i} />
          ))}

          <Cap x={68} y={7} $a={LENS_AT + 1.1} $m='middle' $c='rgba(201,52,106,.7)' $s={3.2}>
            tries everything, at machine speed
          </Cap>

          <Halo cx={X1} cy={Y0} r={11} />
          <Ring cx={X1} cy={Y0} r={6.2} />
          <Shut x={X1 - 0.9} y={Y0 - 11} width={1.8} height={22} rx={0.4} />
          <Cap x={X1 + 13.5} y={Y0 + 1.2} $a={SHUT_AT + 0.3} $c={VIOLET} $s={3.1}>
            refused
          </Cap>

          <Cap x={68} y={90} $a={RING_AT + 0.4} $m='middle' $c={VIOLET} $s={3.3}>
            every one of them makes a call this route has never made
          </Cap>
        </Map>
      </Field>

      <Foot>
        <Quiet>
          <span>no signature exists for any of these</span>
        </Quiet>
        <Loud>
          <Pill>refused</Pill>
          <span>by policy, before it runs</span>
        </Loud>
      </Foot>
    </Panel>
  </Frame>
);
