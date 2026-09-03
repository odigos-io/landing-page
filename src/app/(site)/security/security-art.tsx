'use client';

import React from 'react';
import styled, { keyframes, css } from 'styled-components';

/* Hero art: the service map, and the route taken through it.

   Services are nodes, calls between them are edges, laid out the way a
   dependency map actually looks. The agent enters at the gateway and moves
   only along edges that already existed, which is the point: nothing here is a
   new connection, only a new sequence. The one call that should have been made
   stays dashed. When the last hop lands the route flares and the bar turns. */

const T = 7.6;
const p = (s: number) => Math.max(0, Math.min(100, (s / T) * 100));

const HOT = '#c9346a';
const DEEP = '#1c1633';
const INK = 'rgba(24, 20, 54, 0.5)';
const LINE = 'rgba(24, 20, 54, 0.16)';

type Node = { id: string; x: number; y: number; name: string; lx?: number; ly?: number; anchor?: string; step?: number; on?: number };

const NODES: Node[] = [
  { id: 'gw', x: 26, y: 50, name: 'gateway', ly: 8, step: 1, on: 1.4 },
  { id: 'tk', x: 54, y: 26, name: 'tickets-api', ly: -7, step: 2, on: 1.9 },
  { id: 'ac', x: 50, y: 76, name: 'accounts-api', ly: 8 },
  { id: 'nt', x: 79, y: 13, name: 'notify-svc', ly: 8 },
  { id: 'pm', x: 86, y: 48, name: 'payments-api', lx: -13, ly: 9, step: 3, on: 2.4 },
  { id: 'sr', x: 76, y: 86, name: 'search-svc', ly: 8 },
  { id: 'fr', x: 112, y: 72, name: 'fraud-svc', ly: 8 },
  { id: 'st', x: 118, y: 30, name: 'settlement', ly: -7, step: 4, on: 2.9 },
  { id: 'lg', x: 128, y: 58, name: 'ledger-db', lx: 4, ly: 9 },
];

const AGENT = { x: 7, y: 50 };
const at = (id: string) => NODES.find((n) => n.id === id) as Node;

/* the calls this estate normally makes. bow keeps the map organic */
const EDGES: [string, string, number][] = [
  ['gw', 'tk', -5],
  ['gw', 'ac', 5],
  ['tk', 'nt', -4],
  ['tk', 'pm', -5],
  ['ac', 'pm', 5],
  ['ac', 'sr', 4],
  ['pm', 'st', -5],
  ['st', 'lg', -4],
  ['sr', 'lg', 6],
];

/* the sequence the agent took, every hop along an edge that already existed */
const HOPS: { a: { x: number; y: number }; b: { x: number; y: number }; bow: number; t: number }[] = [
  { a: AGENT, b: at('gw'), bow: -4, t: 1.0 },
  { a: at('gw'), b: at('tk'), bow: -5, t: 1.5 },
  { a: at('tk'), b: at('pm'), bow: -5, t: 2.0 },
  { a: at('pm'), b: at('st'), bow: -5, t: 2.5 },
];

const SKIP: [string, string, number] = ['pm', 'fr', 5];
const SKIP_AT = 3.0;
const FLARE = 3.2;
const VERDICT = 3.55;

/* the loop held a static frame for four seconds. spend it going inside the box. */
const OPEN_AT = 4.5;
const FN_ORIGIN = { x: 54, y: 26 };
const FNS = [
  { dx: -21, dy: -1, name: 'render', hot: false, slow: true },
  { dx: -18, dy: -9, name: 'parse', hot: true },
  { dx: -8, dy: -15, name: 'execute', hot: true },
];

const CHAIN = ['ssrf', 'trusted internal call', 'template injection', 'service token reused'];

/* ---------------- geometry ---------------- */

const arc = (a: { x: number; y: number }, b: { x: number; y: number }, bow: number) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const cx = (a.x + b.x) / 2 + (-dy / len) * bow;
  const cy = (a.y + b.y) / 2 + (dx / len) * bow;
  return `M${a.x} ${a.y} Q${cx.toFixed(2)} ${cy.toFixed(2)} ${b.x} ${b.y}`;
};

/* ---------------- motion ---------------- */

const fieldIn = keyframes`
  0%{opacity:0}
  ${p(0.5)}%,100%{opacity:1}`;

const draw = (s: number) => keyframes`
  0%,${p(s)}%{stroke-dashoffset:1;opacity:0}
  ${p(s + 0.05)}%{opacity:1}
  ${p(s + 0.45)}%,${p(FLARE)}%{stroke-dashoffset:0;opacity:1;stroke-width:1.5}
  ${p(FLARE + 0.4)}%{stroke-dashoffset:0;opacity:1;stroke-width:2.6}
  ${p(FLARE + 1)}%,100%{stroke-dashoffset:0;opacity:1;stroke-width:1.8}`;

const glow = (s: number) => keyframes`
  0%,${p(FLARE)}%{opacity:0;stroke-width:1}
  ${p(FLARE + 0.4)}%{opacity:.42;stroke-width:8}
  ${p(FLARE + 1)}%,100%{opacity:.24;stroke-width:6}`;

const nodeOn = (s: number) => keyframes`
  0%,${p(s)}%{fill:#fff;stroke:${LINE};r:3.2}
  ${p(s + 0.22)}%{fill:${HOT};stroke:${HOT};r:5}
  ${p(s + 0.5)}%,${p(FLARE)}%{fill:${HOT};stroke:${HOT};r:4.4}
  ${p(FLARE + 0.4)}%{fill:${HOT};stroke:${HOT};r:5.2}
  ${p(FLARE + 1)}%,100%{fill:${HOT};stroke:${HOT};r:4.6}`;

const labelOn = (s: number) => keyframes`
  0%,${p(s)}%{fill:${INK}}
  ${p(s + 0.25)}%,100%{fill:${HOT}}`;

const numIn = (s: number) => keyframes`
  0%,${p(s + 0.1)}%{opacity:0}
  ${p(s + 0.35)}%,100%{opacity:1}`;

const ringOut = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0;transform:scale(.3)}
  ${p(s + 0.28)}%{opacity:.55;transform:scale(1)}
  ${p(s + 0.95)}%,100%{opacity:0;transform:scale(2.3)}`;

const skipIn = keyframes`
  0%,${p(SKIP_AT)}%{opacity:0}
  ${p(SKIP_AT + 0.5)}%,100%{opacity:1}`;

const verdictIn = keyframes`
  0%,${p(VERDICT)}%{opacity:0;transform:translateY(8px)}
  ${p(VERDICT + 0.45)}%,100%{opacity:1;transform:none}`;

const calmOut = keyframes`
  0%,${p(VERDICT)}%{opacity:1;transform:none}
  ${p(VERDICT + 0.32)}%,100%{opacity:0;transform:translateY(-8px)}`;



const zoomIn = (i: number) => keyframes`
  0%,${p(OPEN_AT + i * 0.18)}%{opacity:0;transform:translate(0,0) scale(.4)}
  ${p(OPEN_AT + i * 0.18 + 0.4)}%,100%{opacity:1;transform:none}`;

const stalkIn = (i: number) => keyframes`
  0%,${p(OPEN_AT + i * 0.18)}%{opacity:0;stroke-dashoffset:1}
  ${p(OPEN_AT + i * 0.18 + 0.4)}%,100%{opacity:1;stroke-dashoffset:0}`;

const insideIn = keyframes`
  0%,${p(OPEN_AT)}%{opacity:0}
  ${p(OPEN_AT + 0.5)}%,100%{opacity:1}`;

const agentPulse = keyframes`
  0%,100%{opacity:.28;transform:scale(.85)}
  50%{opacity:.05;transform:scale(1.5)}`;

const float = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}`;

const reduce = css`
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
  aspect-ratio: 1.42 / 1;
  overflow: hidden;
  background: radial-gradient(75% 120% at 8% 50%, rgba(201, 52, 106, 0.06), transparent 55%), linear-gradient(180deg, #fdfcfe, #f8f6fa);
`;

const Map = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  animation: ${fieldIn} ${T}s linear infinite both;
  ${reduce}
`;

const Edge = styled.path`
  fill: none;
  stroke: ${LINE};
  stroke-width: 0.55;
`;

const SkipEdge = styled.path`
  fill: none;
  stroke: rgba(24, 20, 54, 0.32);
  stroke-width: 0.6;
  stroke-dasharray: 2 2;
  animation: ${skipIn} ${T}s linear infinite both;
  ${reduce}
`;

const SkipNote = styled.text`
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 3.1px;
  text-anchor: middle;
  fill: rgba(24, 20, 54, 0.45);
  animation: ${skipIn} ${T}s linear infinite both;
  ${reduce}
`;

const HopGlow = styled.path<{ $t: number }>`
  fill: none;
  stroke: ${HOT};
  stroke-linecap: round;
  opacity: 0;
  filter: blur(2.5px);
  animation: ${(x) => glow(x.$t)} ${T}s ease-out infinite both;
  ${reduce}
`;

const Hop = styled.path<{ $t: number }>`
  fill: none;
  stroke: ${HOT};
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-dasharray: 1;
  animation: ${(x) => draw(x.$t)} ${T}s cubic-bezier(0.4, 0, 0.2, 1) infinite both;
  ${reduce}
`;

const Dot = styled.circle<{ $t?: number }>`
  fill: #fff;
  stroke: ${LINE};
  stroke-width: 0.6;
  ${({ $t }) =>
    $t !== undefined &&
    css`
      animation: ${nodeOn($t)} ${T}s cubic-bezier(0.16, 1, 0.3, 1) infinite both;
    `}
  ${reduce}
`;

const Ring = styled.circle<{ $t: number }>`
  fill: none;
  stroke: ${HOT};
  stroke-width: 0.5;
  r: 7;
  transform-box: fill-box;
  transform-origin: center;
  opacity: 0;
  animation: ${(x) => ringOut(x.$t)} ${T}s ease-out infinite both;
  ${reduce}
`;

const Num = styled.text<{ $t: number }>`
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 3.4px;
  text-anchor: middle;
  dominant-baseline: central;
  fill: #fff;
  animation: ${(x) => numIn(x.$t)} ${T}s linear infinite both;
  ${reduce}
`;

const Label = styled.text<{ $t?: number }>`
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 3.4px;
  text-anchor: middle;
  fill: ${INK};
  ${({ $t }) =>
    $t !== undefined &&
    css`
      animation: ${labelOn($t)} ${T}s linear infinite both;
    `}
  ${reduce}
`;

/* the functions inside one service, which no service map contains */
const FnStalk = styled.line<{ $i: number }>`
  stroke: rgba(201, 52, 106, 0.4);
  stroke-width: 0.4;
  stroke-dasharray: 1;
  animation: ${(x) => stalkIn(x.$i)} ${T}s ease-out infinite both;
  ${reduce}
`;

const FnG = styled.g<{ $i: number }>`
  transform-box: fill-box;
  transform-origin: center;
  animation: ${(x) => zoomIn(x.$i)} ${T}s cubic-bezier(0.16, 1, 0.3, 1) infinite both;
  ${reduce}
`;

const InsideNote = styled.text`
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 2.9px;
  text-anchor: middle;
  letter-spacing: 0.05px;
  fill: rgba(24, 20, 54, 0.45);
  animation: ${insideIn} ${T}s linear infinite both;
  ${reduce}
`;

const AgentHalo = styled.circle`
  fill: ${HOT};
  transform-box: fill-box;
  transform-origin: center;
  animation: ${agentPulse} 3.6s ease-in-out infinite;
  ${reduce}
`;

const rowBase = css`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 22px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 11px;

  @media (max-width: 1000px) {
    padding: 12px 15px;
    font-size: 9.5px;
    gap: 8px;
  }
`;

const VerdictWrap = styled.div`
  position: relative;
  border-top: 1px solid var(--line);
`;

const Calm = styled.div`
  ${rowBase};
  color: var(--ink-faint);
  animation: ${calmOut} ${T}s cubic-bezier(0.16, 1, 0.3, 1) infinite both;
  ${reduce}

  .pill {
    padding: 3px 9px;
    border-radius: 999px;
    border: 1px solid var(--line);
    background: var(--paper-3);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-size: 9.5px;
  }
  /* reduced motion shows both rows stacked, so the reversal still reads */
  @media (prefers-reduced-motion: reduce) {
    border-bottom: 1px solid var(--line);
  }
`;

const Verdict = styled.div`
  ${rowBase};
  position: absolute;
  inset: 0;
  background: rgba(201, 52, 106, 0.06);
  color: var(--hot-ink);
  animation: ${verdictIn} ${T}s cubic-bezier(0.16, 1, 0.3, 1) infinite both;
  ${reduce}

  @media (prefers-reduced-motion: reduce) {
    position: static;
  }

  .crit {
    flex-shrink: 0;
    padding: 3px 9px;
    border-radius: 999px;
    background: ${HOT};
    color: #fff;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-size: 9.5px;
  }
  .chain {
    color: var(--ink);
    white-space: nowrap;

    @media (max-width: 560px) {
      white-space: normal;
      line-height: 1.5;
    }
  }
  .arw {
    color: var(--ink-faint);
    padding: 0 5px;
  }

`;

export const SecurityArt = () => (
  <Frame>
    <Panel>
      <Field>
        <Map viewBox='0 0 142 100' preserveAspectRatio='xMidYMid meet' aria-hidden>
          {EDGES.map(([a, b, bow]) => (
            <Edge key={`e${a}${b}`} d={arc(at(a), at(b), bow)} />
          ))}

          <SkipEdge d={arc(at(SKIP[0]), at(SKIP[1]), SKIP[2])} />
          <SkipNote x={(at('pm').x + at('fr').x) / 2 - 6} y={(at('pm').y + at('fr').y) / 2 + 7}>
            not called on this request
          </SkipNote>

          {HOPS.map((h, i) => (
            <HopGlow key={`hg${i}`} d={arc(h.a, h.b, h.bow)} $t={h.t} />
          ))}
          {HOPS.map((h, i) => (
            <Hop key={`h${i}`} d={arc(h.a, h.b, h.bow)} pathLength={1} $t={h.t} />
          ))}

          {NODES.map((n) => (
            <g key={n.id}>
              {n.on !== undefined && <Ring cx={n.x} cy={n.y} $t={n.on} />}
              <Dot cx={n.x} cy={n.y} r={3.2} $t={n.on} />
              {n.step !== undefined && n.on !== undefined && (
                <Num x={n.x} y={n.y} $t={n.on}>
                  {n.step}
                </Num>
              )}
              <Label x={n.x + (n.lx ?? 0)} y={n.y + (n.ly ?? 8)} $t={n.on}>
                {n.name}
              </Label>
            </g>
          ))}

          {/* inside node 2: the calls a service map has no way to show */}
          {FNS.map((fn, i) => (
            <FnStalk key={`fs${fn.name}`} x1={FN_ORIGIN.x} y1={FN_ORIGIN.y} x2={FN_ORIGIN.x + fn.dx} y2={FN_ORIGIN.y + fn.dy} pathLength={1} $i={i} />
          ))}
          {FNS.map((fn, i) => (
            <FnG key={`fn${fn.name}`} $i={i}>
              <circle cx={FN_ORIGIN.x + fn.dx} cy={FN_ORIGIN.y + fn.dy} r={2.1} fill={fn.hot ? HOT : fn.slow ? 'rgba(201,52,106,0.22)' : '#fff'} stroke={fn.hot ? HOT : fn.slow ? 'rgba(201,52,106,0.5)' : LINE} strokeWidth={0.5} />
              <text
                x={FN_ORIGIN.x + fn.dx - 3.6}
                y={FN_ORIGIN.y + fn.dy + 1}
                fontSize='2.9px'
                textAnchor='end'
                fontFamily='var(--font-mono), monospace'
                fill={fn.hot ? HOT : fn.slow ? 'rgba(201,52,106,0.7)' : 'rgba(24,20,54,0.5)'}
              >
                {fn.name}
              </text>
            </FnG>
          ))}
          <InsideNote x={FN_ORIGIN.x - 10} y={FN_ORIGIN.y - 20}>
            two calls that never ran here before
          </InsideNote>

          <AgentHalo cx={AGENT.x} cy={AGENT.y} r={8} />
          <circle cx={AGENT.x} cy={AGENT.y} r={2.9} fill={DEEP} />
          <circle cx={AGENT.x} cy={AGENT.y} r={1.1} fill={HOT} />
          <text x={AGENT.x} y={AGENT.y + 9} fontSize='3.4px' textAnchor='middle' fontFamily='var(--font-mono), monospace' fill={DEEP}>
            agent
          </text>
        </Map>
      </Field>

      <VerdictWrap>
        <Calm>
          <span className='pill'>triaged</span>
          <span>three closed on their merits, one never filed</span>
        </Calm>
        <Verdict>
          <span className='crit'>critical</span>
          <span className='chain'>
            {CHAIN.map((c, i) => (
              <React.Fragment key={c}>
                {i > 0 && <span className='arw'>&rsaquo;</span>}
                {c}
              </React.Fragment>
            ))}
          </span>
        </Verdict>
      </VerdictWrap>
    </Panel>
  </Frame>
);
