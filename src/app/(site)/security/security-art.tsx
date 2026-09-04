'use client';

import React from 'react';
import styled, { keyframes, css } from 'styled-components';

/* Hero art: an agent brute forcing its way across the estate.

   Four rounds. Each one throws a burst of probes from wherever it has already
   reached, most of which fail and stay on the map as faint scars, so the sheer
   volume of what was tried is visible. One probe in each burst lands, the
   service ignites, the weakness it found is named, and that name joins the
   chain in the bar. By the fourth round the frontier is the settlement service
   and four separate findings have compounded into one path. */

const T = 10;
const p = (s: number) => Math.max(0, Math.min(100, (s / T) * 100));

const HOT = '#c9346a';
const DEEP = '#1c1633';
const INK = 'rgba(24, 20, 54, 0.5)';
const LINE = 'rgba(24, 20, 54, 0.16)';

type Node = { id: string; x: number; y: number; name: string; lx?: number; ly?: number; step?: number; on?: number };

const NODES: Node[] = [
  { id: 'gw', x: 26, y: 50, name: 'gateway', ly: 8, step: 1, on: 1.5 },
  { id: 'tk', x: 54, y: 26, name: 'tickets-api', ly: -7, step: 2, on: 3.1 },
  { id: 'ac', x: 50, y: 76, name: 'accounts-api', ly: 8 },
  { id: 'nt', x: 79, y: 13, name: 'notify-svc', ly: 8 },
  { id: 'pm', x: 86, y: 48, name: 'payments-api', lx: -13, ly: 9, step: 3, on: 4.7 },
  { id: 'sr', x: 76, y: 86, name: 'search-svc', ly: 8 },
  { id: 'fr', x: 112, y: 72, name: 'fraud-svc', ly: 8 },
  { id: 'st', x: 118, y: 30, name: 'settlement', ly: -7, step: 4, on: 6.3 },
  { id: 'lg', x: 128, y: 58, name: 'ledger-db', lx: 4, ly: 9 },
];

const AGENT = { x: 7, y: 50 };
const at = (id: string) => NODES.find((n) => n.id === id) as Node;
const pt = (id: string) => (id === 'agent' ? AGENT : at(id));

/* the calls this estate normally makes */
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

/* four rounds. from wherever it has reached, throw everything, keep what lands. */
const ROUNDS = [
  { at: 0.4, from: 'agent', miss: ['ac', 'sr', 'nt', 'tk', 'ac'], hit: 'gw', bow: 6, vuln: 'ssrf', cx: 8, cy: -11 },
  { at: 1.9, from: 'gw', miss: ['ac', 'sr', 'nt', 'ac', 'sr', 'tk', 'nt'], hit: 'tk', bow: -5, vuln: 'known cve', cx: -19, cy: -12 },
  { at: 3.1, from: 'tk', miss: ['nt', 'sr', 'ac', 'lg', 'nt', 'pm', 'sr', 'ac', 'lg'], hit: 'pm', bow: -5, vuln: 'zero-day', cx: 6, cy: -12 },
  { at: 4.2, from: 'pm', miss: ['lg', 'sr', 'ac', 'fr', 'lg', 'st', 'sr', 'nt', 'fr', 'ac', 'lg'], hit: 'st', bow: -5, vuln: 'token reuse', cx: 2, cy: 12 },
];

const BURST = 0.75;
const HIT_AT = 0.95;

const SKIP: [string, string, number] = ['pm', 'fr', 5];
const SKIP_AT = 5.8;
const FLARE = 6.4;
const VERDICT = 6.9;

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
  ${p(0.4)}%,100%{opacity:1}`;

/* a probe that goes nowhere. fast, then it stays on the map as a scar. */
const fizzle = (s: number) => keyframes`
  0%,${p(s)}%{stroke-dashoffset:1;opacity:0}
  ${p(s + 0.02)}%{opacity:.85}
  ${p(s + 0.16)}%{stroke-dashoffset:0;opacity:.85}
  ${p(s + 0.34)}%{stroke-dashoffset:0;opacity:.14}
  ${p(s + 0.6)}%,100%{stroke-dashoffset:0;opacity:.28}`;

/* the one that lands, and then stays lit for the rest of the loop */
const land = (s: number) => keyframes`
  0%,${p(s)}%{stroke-dashoffset:1;opacity:0}
  ${p(s + 0.04)}%{opacity:1}
  ${p(s + 0.42)}%,${p(FLARE)}%{stroke-dashoffset:0;opacity:1;stroke-width:1.5}
  ${p(FLARE + 0.4)}%{stroke-dashoffset:0;opacity:1;stroke-width:2.8}
  ${p(FLARE + 1.1)}%,100%{stroke-dashoffset:0;opacity:1;stroke-width:1.9}`;

const glow = (s: number) => keyframes`
  0%,${p(FLARE)}%{opacity:0;stroke-width:1}
  ${p(FLARE + 0.4)}%{opacity:.42;stroke-width:8}
  ${p(FLARE + 1.1)}%,100%{opacity:.24;stroke-width:6}`;

const nodeOn = (s: number) => keyframes`
  0%,${p(s)}%{fill:#fff;stroke:${LINE};r:3.2}
  ${p(s + 0.18)}%{fill:${HOT};stroke:${HOT};r:5.4}
  ${p(s + 0.45)}%,${p(FLARE)}%{fill:${HOT};stroke:${HOT};r:4.4}
  ${p(FLARE + 0.4)}%{fill:${HOT};stroke:${HOT};r:5.2}
  ${p(FLARE + 1.1)}%,100%{fill:${HOT};stroke:${HOT};r:4.6}`;

const labelOn = (s: number) => keyframes`
  0%,${p(s)}%{fill:${INK}}
  ${p(s + 0.22)}%,100%{fill:${HOT}}`;

const numIn = (s: number) => keyframes`
  0%,${p(s + 0.08)}%{opacity:0}
  ${p(s + 0.3)}%,100%{opacity:1}`;

const shock = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0;transform:scale(.25)}
  ${p(s + 0.2)}%{opacity:.7;transform:scale(1)}
  ${p(s + 0.8)}%,100%{opacity:0;transform:scale(2.6)}`;

/* the weakness is named at the moment it is found, then it lives in the bar */
const vulnPop = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0;transform:translate(-50%,4px) scale(.8)}
  ${p(s + 0.18)}%{opacity:1;transform:translate(-50%,0) scale(1.08)}
  ${p(s + 0.3)}%,${p(s + 1.5)}%{opacity:1;transform:translate(-50%,0) scale(1)}
  ${p(s + 1.9)}%,100%{opacity:0;transform:translate(-50%,-5px) scale(1)}`;

/* each find joins the chain and stays */
const chipIn = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0;transform:translateY(5px)}
  ${p(s + 0.28)}%,100%{opacity:1;transform:none}`;

const skipIn = keyframes`
  0%,${p(SKIP_AT)}%{opacity:0}
  ${p(SKIP_AT + 0.45)}%,100%{opacity:1}`;

const verdictIn = keyframes`
  0%,${p(VERDICT)}%{opacity:0;transform:translateY(8px)}
  ${p(VERDICT + 0.4)}%,100%{opacity:1;transform:none}`;

/* only the live indicator leaves. the chain it assembled stays for the payoff. */
const liveOut = keyframes`
  0%,${p(VERDICT)}%{opacity:1;width:70px}
  ${p(VERDICT + 0.3)}%,100%{opacity:0;width:0}`;

const critIn = keyframes`
  0%,${p(VERDICT)}%{opacity:0;transform:scale(.7)}
  ${p(VERDICT + 0.3)}%,100%{opacity:1;transform:scale(1)}`;

const agentPulse = keyframes`
  0%,100%{opacity:.3;transform:scale(.85)}
  50%{opacity:.06;transform:scale(1.55)}`;

const rattle = keyframes`
  0%,100%{opacity:.35}
  50%{opacity:1}`;

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
  background: radial-gradient(75% 120% at 8% 50%, rgba(201, 52, 106, 0.07), transparent 55%), linear-gradient(180deg, #fdfcfe, #f8f6fa);
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

const Miss = styled.path<{ $t: number }>`
  fill: none;
  stroke: ${HOT};
  stroke-width: 0.38;
  stroke-linecap: round;
  stroke-dasharray: 1;
  opacity: 0;
  animation: ${(x) => fizzle(x.$t)} ${T}s cubic-bezier(0.3, 0, 0.2, 1) infinite both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.22;
  }
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

const HitGlow = styled.path<{ $t: number }>`
  fill: none;
  stroke: ${HOT};
  stroke-linecap: round;
  opacity: 0;
  filter: blur(2.5px);
  animation: ${(x) => glow(x.$t)} ${T}s ease-out infinite both;
  ${reduce}
`;

const Hit = styled.path<{ $t: number }>`
  fill: none;
  stroke: ${HOT};
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-dasharray: 1;
  animation: ${(x) => land(x.$t)} ${T}s cubic-bezier(0.4, 0, 0.2, 1) infinite both;
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

const Shock = styled.circle<{ $t: number }>`
  fill: none;
  stroke: ${HOT};
  stroke-width: 0.5;
  r: 7;
  transform-box: fill-box;
  transform-origin: center;
  opacity: 0;
  animation: ${(x) => shock(x.$t)} ${T}s ease-out infinite both;
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

const AgentHalo = styled.circle`
  fill: ${HOT};
  transform-box: fill-box;
  transform-origin: center;
  animation: ${agentPulse} 2.4s ease-in-out infinite;
  ${reduce}
`;

/* the weakness, named where it was found */
const Vuln = styled.div<{ $t: number; $x: number; $y: number }>`
  position: absolute;
  left: ${(x) => x.$x}%;
  top: ${(x) => x.$y}%;
  padding: 3px 9px;
  white-space: nowrap;
  border-radius: 999px;
  background: ${HOT};
  color: #fff;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 10px;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  box-shadow: 0 6px 18px -8px rgba(201, 52, 106, 0.8);
  transform: translate(-50%, 0);
  animation: ${(x) => vulnPop(x.$t)} ${T}s cubic-bezier(0.16, 1, 0.3, 1) infinite both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: translate(-50%, 0);
  }

  @media (max-width: 620px) {
    font-size: 8.5px;
    padding: 2px 7px;
  }
`;

const rowBase = css`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 22px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 11px;

  @media (max-width: 1000px) {
    padding: 12px 15px;
    font-size: 9.5px;
    gap: 7px;
  }
`;

const BarWrap = styled.div`
  position: relative;
  border-top: 1px solid var(--line);
`;

const Probing = styled.div`
  ${rowBase};
  color: var(--ink-faint);

  .crit {
    flex-shrink: 0;
    padding: 3px 9px;
    border-radius: 999px;
    background: ${HOT};
    color: #fff;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-size: 9.5px;
    animation: ${critIn} ${T}s cubic-bezier(0.16, 1, 0.3, 1) infinite both;
    ${reduce}
  }
  .live {
    overflow: hidden;
    animation: ${liveOut} ${T}s ease-in-out infinite both;
    ${reduce}
    display: inline-flex;
    align-items: center;
    gap: 7px;
    color: var(--hot-ink);
  }
  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${HOT};
    animation: ${rattle} 0.45s ease-in-out infinite;
    ${reduce}
  }
  .chip {
    padding: 2px 8px;
    border-radius: 999px;
    border: 1px solid rgba(201, 52, 106, 0.3);
    background: rgba(201, 52, 106, 0.08);
    color: var(--hot-ink);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    font-size: 9.5px;
  }
  .plus {
    color: var(--ink-faint);
  }
`;

const Chip = styled.span<{ $t: number }>`
  animation: ${(x) => chipIn(x.$t)} ${T}s cubic-bezier(0.16, 1, 0.3, 1) infinite both;
  ${reduce}
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

          {/* everything it threw that went nowhere, and stayed on the map */}
          {ROUNDS.map((r, ri) =>
            r.miss.map((m, mi) => (
              <Miss key={`m${ri}-${mi}`} d={arc(pt(r.from), at(m), (mi % 2 ? 1 : -1) * (3 + mi * 2.2))} pathLength={1} $t={r.at + mi * (BURST / r.miss.length)} />
            )),
          )}

          {ROUNDS.map((r, i) => (
            <HitGlow key={`hg${i}`} d={arc(pt(r.from), at(r.hit), r.bow)} $t={r.at + HIT_AT} />
          ))}
          {ROUNDS.map((r, i) => (
            <Hit key={`h${i}`} d={arc(pt(r.from), at(r.hit), r.bow)} pathLength={1} $t={r.at + HIT_AT} />
          ))}

          {NODES.map((n) => (
            <g key={n.id}>
              {n.on !== undefined && <Shock cx={n.x} cy={n.y} $t={n.on} />}
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

          <AgentHalo cx={AGENT.x} cy={AGENT.y} r={8} />
          <circle cx={AGENT.x} cy={AGENT.y} r={2.9} fill={DEEP} />
          <circle cx={AGENT.x} cy={AGENT.y} r={1.1} fill={HOT} />
          <text x={AGENT.x} y={AGENT.y + 9} fontSize='3.4px' textAnchor='middle' fontFamily='var(--font-mono), monospace' fill={DEEP}>
            agent
          </text>
        </Map>

        {ROUNDS.map((r) => {
          const target = at(r.hit);
          return (
            <Vuln key={`v${r.vuln}`} $t={r.at + HIT_AT + 0.35} $x={((target.x + r.cx) / 142) * 100} $y={target.y + r.cy}>
              {r.vuln}
            </Vuln>
          );
        })}
      </Field>

      <BarWrap>
        <Probing>
          <span className='crit'>critical</span>
          <span className='live'>
            <span className='dot' />
            probing
          </span>
          {ROUNDS.map((r, i) => (
            <Chip key={`c${r.vuln}`} $t={r.at + HIT_AT + 0.35}>
              {i > 0 && <span className='plus'>+ </span>}
              <span className='chip'>{r.vuln}</span>
            </Chip>
          ))}
        </Probing>
      </BarWrap>
    </Panel>
  </Frame>
);
