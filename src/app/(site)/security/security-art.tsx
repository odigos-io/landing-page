'use client';

import React from 'react';
import styled, { keyframes, css } from 'styled-components';

/* Hero art: one request.

   A line is one request. From the outside it is a 200 and nothing else, which
   is all any control at the edge or on the host ever gets to read.

   Then the line is combed, in one fast pass, into every function call it
   actually made, grouped into the four services it crossed. Four of those
   calls light up and turn out to be a single chain. The last one is refused.

   The comb is the claim. Nobody else can draw the inside of a request. */

const T = 10;
const p = (s: number) => Math.max(0, Math.min(100, (s / T) * 100));

const HOT = '#c9346a';
const INK = '#1c1633';
const OK = '#3f8a5c';

const Y = 20; /* the request */
const TOP = Y + 1.5; /* where the comb starts */
const RAIL = 56; /* where the chain is drawn */
const X0 = 10;
const X1 = 132;

const COMB_AT = 1.6;
const NAME_AT = 2.4;
const CHAIN_AT = 3.1;
const LINK_AT = 4.4;
const STOP_AT = 5.5;

/* four services, each a burst of calls. the gaps between them are the seams
   the attack crosses, which is the part a per-service tool never sees. */
const SVC = ['edge', 'api', 'worker', 'store'];
const GAP = 3.2;
const BAND = (X1 - X0 - GAP * 3) / 4;

let seed = 20260904;
const rnd = () => {
  seed = (seed * 1103515245 + 12345) % 2147483648;
  return seed / 2147483648;
};

type Tick = { x: number; h: number; svc: number; hit: boolean };
const TICKS: Tick[] = [];
const HITS: Tick[] = [];
SVC.forEach((_, s) => {
  const x0 = X0 + s * (BAND + GAP);
  const n = 13 + Math.floor(rnd() * 4);
  const hit = 3 + Math.floor(rnd() * (n - 6));
  for (let i = 0; i < n; i++) {
    const t = { x: x0 + 1.2 + (i * (BAND - 2.4)) / (n - 1), h: 2.4 + rnd() * 8.2, svc: s, hit: i === hit };
    if (t.hit) {
      t.h = 11.5;
      HITS.push(t);
    }
    TICKS.push(t);
  }
});
const WALLGAP = 3.2;
const SEAM = [0, 1, 2].map((i) => X0 + (i + 1) * BAND + i * GAP + GAP / 2);
const MID = (s: number) => X0 + s * (BAND + GAP) + BAND / 2;
const WALL = HITS[3].x - WALLGAP;

/* ---------------- motion ---------------- */

const lineIn = keyframes`
  0%{opacity:0;transform:scaleX(.5)}
  ${p(1.0)}%,100%{opacity:1;transform:scaleX(1)}`;

/* one fast pass, left to right. the only fast thing in the frame. */
const tickIn = (i: number, n: number) => keyframes`
  0%,${p(COMB_AT + (i / n) * 0.62)}%{opacity:0;transform:scaleY(0)}
  ${p(COMB_AT + (i / n) * 0.62 + 0.1)}%,100%{opacity:1;transform:scaleY(1)}`;

const hitIn = (i: number, n: number) => {
  const a = COMB_AT + (i / n) * 0.62;
  const b = CHAIN_AT + HITS.findIndex((h) => h === TICKS[i]) * 0.3;
  return keyframes`
  0%,${p(a)}%{opacity:0;transform:scaleY(0);fill:rgba(28,22,51,.3)}
  ${p(a + 0.1)}%{opacity:1;transform:scaleY(1);fill:rgba(28,22,51,.3)}
  ${p(b)}%{opacity:1;transform:scaleY(1);fill:rgba(28,22,51,.3)}
  ${p(b + 0.14)}%{opacity:1;transform:scaleY(1.14);fill:${HOT}}
  ${p(b + 0.36)}%,100%{opacity:1;transform:scaleY(1);fill:${HOT}}`;
};

const riserIn = (i: number) => keyframes`
  0%,${p(LINK_AT + i * 0.13)}%{opacity:0;transform:scaleY(0)}
  ${p(LINK_AT + i * 0.13 + 0.22)}%,100%{opacity:.55;transform:scaleY(1)}`;

const triedIn = keyframes`
  0%,${p(LINK_AT + 0.39)}%{opacity:0;transform:scaleY(0)}
  ${p(LINK_AT + 0.61)}%{opacity:.5;transform:scaleY(1)}
  ${p(STOP_AT)}%{opacity:.5;transform:scaleY(1)}
  ${p(STOP_AT + 0.3)}%,100%{opacity:.24;transform:scaleY(1)}`;

const railIn = keyframes`
  0%,${p(LINK_AT)}%{stroke-dashoffset:1;opacity:0}
  ${p(LINK_AT + 0.05)}%{opacity:1}
  ${p(LINK_AT + 0.85)}%,100%{stroke-dashoffset:0;opacity:1}`;

const stopIn = keyframes`
  0%,${p(STOP_AT)}%{opacity:0;transform:scaleY(.2)}
  ${p(STOP_AT + 0.14)}%{opacity:1;transform:scaleY(1.3)}
  ${p(STOP_AT + 0.3)}%,100%{opacity:1;transform:scaleY(1)}`;

const fade = (a: number, b?: number) => keyframes`
  0%,${p(a)}%{opacity:0}
  ${p(a + 0.35)}%${b === undefined ? ',100%' : ''}{opacity:1}
  ${b === undefined ? '' : `${p(b)}%{opacity:1}${p(b + 0.3)}%,100%{opacity:0}`}`;

const seamIn = keyframes`
  0%,${p(NAME_AT)}%{opacity:0}
  ${p(NAME_AT + 0.4)}%,100%{opacity:1}`;

const float = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}`;

const still = css`
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: none;
  }
`;

/* ---------------- shell ---------------- */

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
  aspect-ratio: 142 / 76;
  background: linear-gradient(180deg, #fdfcfe, #f7f5fa);
`;

const Map = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

const Line = styled.rect`
  fill: ${INK};
  transform-box: fill-box;
  transform-origin: center;
  animation: ${lineIn} ${T}s cubic-bezier(0.16, 1, 0.3, 1) infinite both;
  ${still}
`;

const Bar = styled.rect<{ $i: number; $n: number }>`
  fill: rgba(28, 22, 51, 0.36);
  transform-box: fill-box;
  transform-origin: top;
  animation: ${(x) => tickIn(x.$i, x.$n)} ${T}s cubic-bezier(0.2, 0, 0.2, 1) infinite both;
  ${still}
`;

const Hit = styled.rect<{ $i: number; $n: number }>`
  fill: rgba(28, 22, 51, 0.36);
  transform-box: fill-box;
  transform-origin: top;
  animation: ${(x) => hitIn(x.$i, x.$n)} ${T}s cubic-bezier(0.16, 1, 0.3, 1) infinite both;
  ${still}
`;


const Rail = styled.path`
  fill: none;
  stroke: ${HOT};
  stroke-width: 1;
  stroke-linecap: round;
  stroke-dasharray: 1;
  animation: ${railIn} ${T}s cubic-bezier(0.4, 0, 0.2, 1) infinite both;
  ${still}
`;

const Riser = styled.rect<{ $i: number }>`
  fill: ${HOT};
  opacity: 0;
  transform-box: fill-box;
  transform-origin: top;
  animation: ${(x) => riserIn(x.$i)} ${T}s ease-out infinite both;
  ${still}
`;

const Tried = styled.rect`
  fill: ${HOT};
  opacity: 0;
  transform-box: fill-box;
  transform-origin: top;
  animation: ${triedIn} ${T}s ease-out infinite both;
  mask-image: repeating-linear-gradient(180deg, #000 0 2px, transparent 2px 5px);
  ${still}
`;

const Seam = styled.line`
  stroke: rgba(28, 22, 51, 0.13);
  stroke-width: 0.4;
  stroke-dasharray: 1.2 1.8;
  opacity: 0;
  animation: ${seamIn} ${T}s ease-out infinite both;
  ${still}
`;

const Stop = styled.rect`
  fill: ${HOT};
  transform-box: fill-box;
  transform-origin: center;
  opacity: 0;
  animation: ${stopIn} ${T}s cubic-bezier(0.16, 1, 0.3, 1) infinite both;
  ${still}
`;

const Svc = styled.text`
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 3.1px;
  letter-spacing: 0.28px;
  text-transform: uppercase;
  fill: rgba(28, 22, 51, 0.42);
  text-anchor: middle;
  opacity: 0;
  animation: ${seamIn} ${T}s ease-out infinite both;
  ${still}
`;

const Cap = styled.text<{ $a: number; $b?: number; $c?: string }>`
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 3.5px;
  letter-spacing: 0.05px;
  fill: ${(x) => x.$c ?? 'rgba(28,22,51,.45)'};
  opacity: 0;
  animation: ${(x) => fade(x.$a, x.$b)} ${T}s linear infinite both;
  ${still}
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 22px;
  border-bottom: 1px solid var(--line);
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 11px;
  color: var(--ink-faint);
  animation: ${fade(0.5)} ${T}s linear infinite both;
  ${still}

  .ok {
    color: ${OK};
  }

  @media (max-width: 1000px) {
    padding: 11px 15px;
    font-size: 9.5px;
  }
`;

const Foot = styled.div`
  display: grid;
  padding: 14px 22px;
  border-top: 1px solid var(--line);
  > * {
    grid-area: 1 / 1;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 11px;
  color: var(--ink-faint);

  @media (max-width: 1000px) {
    padding: 12px 15px;
    font-size: 9.5px;
  }
`;

const Pill = styled.span`
  padding: 3px 9px;
  border-radius: 999px;
  background: ${HOT};
  color: #fff;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  font-size: 9.5px;
  flex: none;
`;

const FootHot = styled.div`
  color: var(--ink);
  animation: ${fade(STOP_AT + 0.15)} ${T}s linear infinite both;
  ${still}
`;

const FootQuiet = styled.div`
  animation: ${fade(0.6, STOP_AT)} ${T}s linear infinite both;
  ${still}
`;

const N = TICKS.length;

export const SecurityArt = () => (
  <Frame>
    <Panel>
      <Head>
        <span>one request</span>
        <span className='ok'>200 OK</span>
      </Head>
      <Field>
        <Map viewBox='0 0 142 76' preserveAspectRatio='xMidYMid meet' aria-hidden>
          {/* the four services it crossed, named above the line it arrived on */}
          {SVC.map((s, i) => (
            <Svc key={s} x={MID(i)} y={Y - 8}>
              {s}
            </Svc>
          ))}
          <Line x={X0} y={Y - 0.7} width={X1 - X0} height={1.4} rx={0.7} />

          {/* the inside of it, at the resolution we work at */}
          {TICKS.map((t, i) =>
            t.hit ? (
              <Hit key={i} x={t.x - 0.6} y={TOP} width={1.2} height={t.h} rx={0.55} $i={i} $n={N} />
            ) : (
              <Bar key={i} x={t.x - 0.475} y={TOP} width={0.95} height={t.h} rx={0.42} $i={i} $n={N} />
            ),
          )}
          <Cap x={X0} y={TOP + 15} $a={COMB_AT + 0.5} $b={CHAIN_AT}>
            every function call it actually made
          </Cap>

          {SEAM.map((x, i) => (
            <Seam key={i} x1={x} y1={Y - 5} x2={x} y2={TOP + 14} />
          ))}

          {/* four of those calls, one per service, are a single chain */}
          {HITS.slice(0, 3).map((h, i) => (
            <Riser key={i} x={h.x - 0.28} y={TOP + h.h + 0.8} width={0.56} height={RAIL - TOP - h.h - 0.8} $i={i} />
          ))}
          <Rail d={`M${HITS[0].x} ${RAIL} H${WALL - 1.4}`} pathLength={1} />
          <Tried x={HITS[3].x - 0.28} y={TOP + HITS[3].h + 0.8} width={0.56} height={RAIL - TOP - HITS[3].h - 0.8} />
          <Stop x={WALL - 0.9} y={RAIL - 7.5} width={1.8} height={15} rx={0.25} />

          <Cap x={X0} y={RAIL + 11.5} $a={LINK_AT + 0.6} $c={HOT}>
            four weaknesses · four services · one request
          </Cap>
        </Map>
      </Field>

      <Foot>
        <FootQuiet>
          <span>nothing in this request was malformed</span>
        </FootQuiet>
        <FootHot>
          <Pill>refused</Pill>
          <span>at the call, not at the release</span>
        </FootHot>
      </Foot>
    </Panel>
  </Frame>
);
