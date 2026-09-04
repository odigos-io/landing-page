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
  { id: 'gw', x: 26, y: 50, name: 'gateway', ly: 9, step: 1, on: 1.5 },
  { id: 'tk', x: 54, y: 26, name: 'tickets-api', ly: -10.5, step: 2, on: 3.1 },
  { id: 'ac', x: 50, y: 76, name: '', ly: 8 },
  { id: 'nt', x: 79, y: 13, name: '', ly: 8 },
  { id: 'pm', x: 86, y: 48, name: 'payments-api', lx: 0, ly: 10.5, step: 3, on: 4.4 },
  { id: 'sr', x: 76, y: 86, name: '', ly: 8 },
  { id: 'fr', x: 112, y: 72, name: 'fraud-svc', ly: -8.5 },
  { id: 'st', x: 118, y: 30, name: 'settlement', ly: -8.5, step: 4, on: 5.3 },
  { id: 'lg', x: 128, y: 58, name: '', lx: 4, ly: 9 },
];

const AGENT = { x: 9, y: 50 };

/* four defences between the attacker and the ledger. each falls as it is beaten. */
const PERIMETER = 19;
/* the only control actually in the path, and it is only at the edge */
const EDGE = { x: 19, at: 1.0, label: 'waf', c: '#4a6fa5' };

/* EDR covers hosts, so it covers the boxes */
const EDR_C = '#3f8a7d';
const EDR_AT = 1.8;

/* ADR covers one application, from inside it */
const ADR_C = '#a67c3d';
const ADR_AT = 2.6;
const ADR_ON = 'tk';

/* what each one is actually looking at */
const WATCHERS = [
  { k: 'waf', w: 'the edge', at: 1.0, c: '#4a6fa5' },
  { k: 'edr', w: 'the hosts', at: 1.8, c: EDR_C },
  { k: 'adr', w: 'one app at a time', at: 2.6, c: ADR_C },
];

const BLOCKED_AT = 5.9;
const SHARDS = 7;
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

/* Four rounds. Each one probes from every foothold it already has, not just
   the newest one, so the fan widens as it goes. That is the difference between
   a person working a thread and a model working all of them. */
const ROUNDS = [
  { at: 0.4, from: 'agent', origins: ['agent'], miss: ['ac', 'nt'], hit: 'gw', bow: 6, vuln: 'ssrf', cx: 0, cy: 12.5 },
  { at: 1.9, from: 'gw', origins: ['agent', 'gw'], miss: ['ac', 'sr', 'nt'], hit: 'tk', bow: -5, vuln: 'auth bypass', cx: 0, cy: 12.5 },
  { at: 3.1, from: 'tk', origins: ['agent', 'gw', 'tk'], miss: ['nt', 'lg', 'sr'], hit: 'pm', bow: -5, vuln: 'unknown call', cx: 0, cy: 12.5 },
  { at: 4.2, from: 'pm', origins: ['gw', 'tk', 'pm'], miss: ['lg', 'fr', 'nt'], hit: 'st', bow: -5, vuln: 'token reuse', cx: 0, cy: 12.5 },
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
  ${p(s + 0.02)}%{opacity:.95}
  ${p(s + 0.12)}%{stroke-dashoffset:0;opacity:.95}
  ${p(s + 0.4)}%{stroke-dashoffset:0;opacity:.6}
  ${p(s + 0.7)}%{stroke-dashoffset:0;opacity:.12}
  ${p(s + 1.0)}%,100%{stroke-dashoffset:0;opacity:.05}`;

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
  ${p(s + 0.8)}%,100%{opacity:0;transform:scale(1.9)}`;

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

/* the edge holds. it simply has no reason to object. */
const edgeHold = keyframes`
  0%,${p(EDGE.at - 0.5)}%{opacity:.45}
  ${p(EDGE.at)}%{opacity:.95}
  ${p(EDGE.at + 0.5)}%,100%{opacity:.45}`;

const allowed = keyframes`
  0%,${p(EDGE.at - 0.1)}%{opacity:0}
  ${p(EDGE.at + 0.15)}%{opacity:1}
  ${p(EDGE.at + 1.5)}%{opacity:1}
  ${p(EDGE.at + 2.1)}%,100%{opacity:.5}`;

/* coverage arrives, and then sits there covering the wrong thing */
const coverIn = (t: number) => keyframes`
  0%,${p(t)}%{opacity:0}
  ${p(t + 0.4)}%{opacity:.16}
  ${p(t + 1.6)}%,100%{opacity:.11}`;

const zoneName = (t: number) => keyframes`
  0%,${p(t)}%{opacity:0}
  ${p(t + 0.4)}%,100%{opacity:.7}`;

/* ours follows the calls rather than the boxes */
const ribbonIn = keyframes`
  0%,${p(BLOCKED_AT - 1.4)}%{opacity:0;stroke-dashoffset:1}
  ${p(BLOCKED_AT - 0.5)}%{opacity:.55;stroke-dashoffset:0}
  ${p(BLOCKED_AT + 0.4)}%,100%{opacity:.4;stroke-dashoffset:0}`;

/* a watcher notices the request, has no reason to flag it, and goes quiet */
const watching = (t: number) => keyframes`
  0%,${p(t - 0.3)}%{opacity:.3}
  ${p(t)}%{opacity:.85}
  ${p(t + 0.7)}%,100%{opacity:.42}`;

/* our line holds, and the attempt against it is refused */
const holdIn = keyframes`
  0%,${p(BLOCKED_AT - 0.4)}%{opacity:.35}
  ${p(BLOCKED_AT)}%{opacity:1}
  ${p(BLOCKED_AT + 0.5)}%,100%{opacity:1}`;

const refused = keyframes`
  0%,${p(BLOCKED_AT)}%{opacity:0;stroke-dashoffset:1}
  ${p(BLOCKED_AT + 0.05)}%{opacity:1}
  ${p(BLOCKED_AT + 0.3)}%{opacity:1;stroke-dashoffset:0}
  ${p(BLOCKED_AT + 0.55)}%{opacity:.25;stroke-dashoffset:0}
  ${p(BLOCKED_AT + 0.9)}%,100%{opacity:.18;stroke-dashoffset:0}`;


const sweep = keyframes`
  0%,100%{transform:rotate(-54deg)}
  50%{transform:rotate(54deg)}`;

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
  stroke: rgba(24, 20, 54, 0.1);
  stroke-width: 0.45;
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
  font-size: 3.4px;
  letter-spacing: 0.04px;
  text-anchor: middle;
  fill: ${DEEP};
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
  stroke: ${({ $t }) => ($t === undefined ? 'rgba(24,20,54,0.13)' : LINE)};
  stroke-width: 0.6;
  ${({ $t }) =>
    $t !== undefined &&
    css`
      animation: ${nodeOn($t)} ${T}s cubic-bezier(0.16, 1, 0.3, 1) infinite both;
    `}

  /* at rest a hit node stays lit, or the white numeral sits on white */
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    ${({ $t }) => $t !== undefined && `fill: ${HOT}; stroke: ${HOT}; r: 4.6;`}
  }
`;

const Shock = styled.circle<{ $t: number }>`
  fill: none;
  stroke: ${HOT};
  stroke-width: 0.5;
  r: 5;
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

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
  }
`;

const Label = styled.text<{ $t?: number }>`
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 3.4px;
  text-anchor: middle;
  fill: rgba(24, 20, 54, 0.34);
  ${({ $t }) =>
    $t !== undefined &&
    css`
      animation: ${labelOn($t)} ${T}s linear infinite both;
    `}
  ${reduce}
`;

const AttackerLabel = styled.text`
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 3.2px;
  letter-spacing: 0.05px;
  text-anchor: middle;
  fill: ${HOT};
  font-weight: 600;
`;

/* a wall, while it is still holding */
/* EDR: a halo on every host. it covers the boxes and nothing between them. */
const EdrZone = styled.circle`
  fill: ${EDR_C};
  opacity: 0;
  animation: ${coverIn(EDR_AT)} ${T}s ease-out infinite both;
  ${reduce}
`;

/* ADR: one application, from the inside */
const AdrZone = styled.circle`
  fill: none;
  stroke: ${ADR_C};
  stroke-width: 0.7;
  stroke-dasharray: 2.2 1.8;
  opacity: 0;
  animation: ${coverIn(ADR_AT)} ${T}s ease-out infinite both;
  ${reduce}
`;

const ZoneName = styled.text<{ $t: number; $c: string }>`
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 3.1px;
  letter-spacing: 0.08px;
  text-anchor: middle;
  fill: ${(x) => x.$c};
  opacity: 0;
  animation: ${(x) => zoneName(x.$t)} ${T}s ease-out infinite both;
  ${reduce}
`;

/* ours traces the calls themselves */
const Ribbon = styled.path`
  fill: none;
  stroke: ${HOT};
  stroke-width: 8;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0;
  filter: blur(2.6px);
  animation: ${ribbonIn} ${T}s ease-out infinite both;
  ${reduce}
`;

const EdgeWall = styled.rect`
  fill: ${EDGE.c};
  animation: ${edgeHold} ${T}s ease-in-out infinite both;
  ${reduce}
`;

const EdgeName = styled.text`
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 3.4px;
  font-weight: 600;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  text-anchor: middle;
  fill: ${EDGE.c};
`;

const Allowed = styled.text`
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 3px;
  letter-spacing: 0.06px;
  text-anchor: middle;
  fill: #3f8a5c;
  animation: ${allowed} ${T}s linear infinite both;
  ${reduce}
`;

/* and the pieces it comes apart into */


const Outside = styled.rect`
  fill: rgba(201, 52, 106, 0.075);
`;





/* a radar arc that never stops turning */
const Sweep = styled.g`
  transform-box: view-box;
  transform-origin: ${AGENT.x}px ${AGENT.y}px;
  animation: ${sweep} 2.8s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const AgentHalo = styled.circle`
  fill: ${HOT};
  transform-box: fill-box;
  transform-origin: center;
  animation: ${agentPulse} 1.5s ease-in-out infinite;
  ${reduce}
`;

const rowBase = css`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
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

const Watchers = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 11px 22px;
  border-top: 1px solid var(--line);
  background: var(--paper-3);
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 9.5px;
  color: var(--ink-faint);

  @media (max-width: 1000px) {
    padding: 9px 15px;
    gap: 9px;
    font-size: 8.5px;
  }
`;

const Watch = styled.span<{ $t: number; $c: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  animation: ${(x) => watching(x.$t)} ${T}s ease-out infinite both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.55;
  }

  b {
    font-weight: 600;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: var(--ink-mute);
  }
  i {
    font-style: normal;
    color: var(--ink-faint);
  }
  .q {
    width: 6px;
    height: 6px;
    border-radius: 2px;
    background: ${(x) => x.$c};
    opacity: 0.55;
  }
`;

const Probing = styled.div`
  ${rowBase};
  flex-wrap: nowrap;
  overflow: hidden;
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
    display: inline-block;
    white-space: nowrap;
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
    white-space: nowrap;
  }
`;

const Chip = styled.span<{ $t: number }>`
  flex-shrink: 0;
  white-space: nowrap;
  animation: ${(x) => chipIn(x.$t)} ${T}s cubic-bezier(0.16, 1, 0.3, 1) infinite both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: none;
  }
`;

export const SecurityArt = () => (
  <Frame>
    <Panel>
      <Field>
        <Map viewBox='0 0 142 100' preserveAspectRatio='xMidYMid meet' aria-hidden>
          <defs>
            <linearGradient id='scan' x1='0' y1='0' x2='1' y2='0'>
              <stop offset='0%' stopColor={HOT} stopOpacity='0.3' />
              <stop offset='100%' stopColor={HOT} stopOpacity='0' />
            </linearGradient>
          </defs>
          <Outside x={0} y={0} width={PERIMETER} height={100} />

          {/* the one control in the path, which lets a well formed request through */}
          <EdgeWall x={EDGE.x - 0.7} y={10} width={1.4} height={80} />
          <EdgeName x={EDGE.x} y={6.5}>
            {EDGE.label}
          </EdgeName>
          <Allowed x={EDGE.x + 17} y={22}>
            request allowed
          </Allowed>

          {/* what EDR covers: every host, and nothing running between them */}
          {NODES.map((n) => (
            <EdrZone key={`edr${n.id}`} cx={n.x} cy={n.y} r={8} />
          ))}
          <ZoneName x={at('ac').x - 6} y={at('ac').y + 16} $t={EDR_AT} $c={EDR_C}>
            edr covers the hosts
          </ZoneName>

          {/* what ADR covers: one application */}
          <AdrZone cx={at(ADR_ON).x} cy={at(ADR_ON).y} r={13} />
          <ZoneName x={at(ADR_ON).x + 6} y={at(ADR_ON).y - 17} $t={ADR_AT} $c={ADR_C}>
            adr covers one app
          </ZoneName>

          {EDGES.map(([a, b, bow]) => (
            <Edge key={`e${a}${b}`} d={arc(at(a), at(b), bow)} />
          ))}

          <SkipEdge d={arc(at(SKIP[0]), at(SKIP[1]), SKIP[2])} />
          <SkipNote x={at('fr').x - 8} y={at('fr').y + 18}>
            fraud check skipped
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
              <Dot cx={n.x} cy={n.y} r={n.on !== undefined ? 3.2 : 2.3} $t={n.on} />
              {n.step !== undefined && n.on !== undefined && (
                <Num x={n.x} y={n.y} $t={n.on}>
                  {n.step}
                </Num>
              )}
              {n.name && (
                <Label x={n.x + (n.lx ?? 0)} y={n.y + (n.ly ?? 8)} $t={n.on}>
                  {n.name}
                </Label>
              )}
            </g>
          ))}

          {/* what we cover: the calls, which is the part the path runs through */}
          {ROUNDS.map((r, i) => (
            <Ribbon key={`rb${i}`} d={arc(pt(r.from), at(r.hit), r.bow)} pathLength={1} />
          ))}
          <ZoneName x={66} y={72} $t={BLOCKED_AT - 1.2} $c={HOT}>
            odigos covers the calls between them
          </ZoneName>


          <Sweep>
            <path d={`M ${AGENT.x} ${AGENT.y} L ${AGENT.x + 34} ${AGENT.y - 4.6} L ${AGENT.x + 34} ${AGENT.y + 4.6} Z`} fill='url(#scan)' />
          </Sweep>

          <AgentHalo cx={AGENT.x} cy={AGENT.y} r={8} />
          <circle cx={AGENT.x} cy={AGENT.y} r={2.9} fill={DEEP} />
          <circle cx={AGENT.x} cy={AGENT.y} r={1.1} fill={HOT} />
          <AttackerLabel x={AGENT.x} y={AGENT.y + 8.6}>
            ai
          </AttackerLabel>
          <AttackerLabel x={AGENT.x} y={AGENT.y + 12.4}>
            attacker
          </AttackerLabel>
        </Map>


      </Field>

      <Watchers>
        {WATCHERS.map((w) => (
          <Watch key={w.k} $t={w.at} $c={w.c}>
            <span className='q' />
            <b>{w.k}</b>
            <i>{w.w} · no alert</i>
          </Watch>
        ))}
      </Watchers>

      <BarWrap>
        <Probing>
          <span className='crit'>stopped at the call</span>
          <span className='live'>
            <span className='dot' />
            probing every foothold at once
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
