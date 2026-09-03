'use client';

import React from 'react';
import styled, { keyframes, css } from 'styled-components';

/* Hero art: one agent, one transaction, four services.

   The estate is drawn once from a fixed seed so hydration matches. The agent
   sits off the left edge and sweeps the whole surface first, a fan of probes
   that mostly go nowhere and stay on the map as faint grey. Then the route it
   found lights up in order, each hop a finding a scanner ranks low, each one
   tailored to what that service actually runs. The fraud service is on the map
   with a dashed edge that never lights, because it is never called. When the
   last hop lands the whole route flares at once. Not one link is a CVE. */

const T = 18;
const p = (s: number) => Math.max(0, Math.min(100, (s / T) * 100));

const HOT = '#c9346a';
const DEEP = '#1c1633';
const GREY = 'rgba(24, 20, 54, 0.32)';

const AGENT = { x: 13, y: 50 };

/* the services that matter, in viewBox units (142 x 100) */
const HUBS = [
  { x: 36, y: 76, name: '01 gateway', on: 3.9, lab: 'below' },
  { x: 62, y: 30, name: '02 tickets-api', on: 6.1, lab: 'above' },
  { x: 92, y: 64, name: '03 payments-api', on: 8.5, lab: 'below' },
  { x: 118, y: 26, name: 'fraud-svc', on: -1, lab: 'above' },
  { x: 124, y: 76, name: '04 settlement', on: 11.1, lab: 'below2' },
];

/* from, to, bow off the straight line. -1 is the agent itself */
const PATH: [number, number, number][] = [
  [-1, 0, 8],
  [0, 1, -7],
  [1, 2, -8],
  [2, 4, -7],
];
const SEG_AT = [2.6, 4.8, 7.2, 9.8];

/* where the agent probes first. most of these go nowhere */
const PROBES: [number, number][] = [
  [22, 26],
  [48, 12],
  [40, 50],
  [62, 30],
  [24, 66],
  [76, 50],
  [92, 64],
  [78, 90],
  [118, 26],
  [104, 44],
];
const PROBE_AT = 0.5;

const SKIP_AT = 10.4;
const FLARE = 13.2;
const VERDICT = 13.7;

const RECON = { at: 0.9, x: 21, y: 8, w: 29, find: 'reads the public surface and ranks every finding below medium', tail: '2,100 endpoints · 40 seconds' };

/* the technique on each hop, pinned to the route it travelled */
const PILLS = [
  { name: 'ssrf', sev: 'low', ox: -1, oy: 5 },
  { name: 'known cve', sev: 'medium', ox: -7, oy: 2 },
  { name: 'zero-day', sev: 'no signature', ox: 7, oy: -3 },
  { name: 'mass assignment', sev: 'low', ox: 3, oy: -6 },
];

/* ---------------- geometry ---------------- */

type Pt = { x: number; y: number };

/* a quadratic bow between two points, so the route reads as movement */
const curve = (a: Pt, b: Pt, bow: number) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const cx = (a.x + b.x) / 2 + (-dy / len) * bow;
  const cy = (a.y + b.y) / 2 + (dx / len) * bow;
  return { d: `M${a.x} ${a.y} Q${cx} ${cy} ${b.x} ${b.y}`, cx, cy };
};

/* points along that bow, so a comet can ride it with plain transforms */
const sample = (a: Pt, b: Pt, cx: number, cy: number, n: number) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n;
    const u = 1 - t;
    return { x: u * u * a.x + 2 * u * t * cx + t * t * b.x, y: u * u * a.y + 2 * u * t * cy + t * t * b.y };
  });

const at = (i: number): Pt => (i < 0 ? AGENT : HUBS[i]);

const ROUTE = PATH.map(([f, t, bow]) => {
  const c = curve(at(f), at(t), bow);
  return { ...c, pts: sample(at(f), at(t), c.cx, c.cy, 8) };
});

/* ---------------- motion ---------------- */

const fieldIn = keyframes`
  0%{opacity:0}
  ${p(0.8)}%,100%{opacity:1}`;

/* a probe shoots out, finds nothing, and stays on the map as a scar */
const probe = (s: number) => keyframes`
  0%,${p(s)}%{stroke-dashoffset:1;opacity:0}
  ${p(s + 0.05)}%{opacity:.75}
  ${p(s + 0.4)}%{stroke-dashoffset:0;opacity:.75}
  ${p(s + 1.4)}%,100%{stroke-dashoffset:0;opacity:.16}`;

const draw = (s: number) => keyframes`
  0%,${p(s)}%{stroke-dashoffset:1;opacity:0}
  ${p(s + 0.1)}%{opacity:1}
  ${p(s + 1.3)}%,${p(FLARE)}%{stroke-dashoffset:0;opacity:1;stroke-width:.95}
  ${p(FLARE + 0.6)}%{stroke-dashoffset:0;opacity:1;stroke-width:2.2}
  ${p(FLARE + 1.6)}%,100%{stroke-dashoffset:0;opacity:1;stroke-width:1.35}`;

const glow = (s: number) => keyframes`
  0%,${p(FLARE)}%{opacity:0;stroke-width:1}
  ${p(FLARE + 0.6)}%{opacity:.5;stroke-width:6.5}
  ${p(FLARE + 1.6)}%,100%{opacity:.3;stroke-width:5}`;

/* a comet rides each bow while it draws */
const ride = (s: number, pts: Pt[]) => {
  const dur = 1.25;
  const frames = pts.map((pt, i) => `${p(s + (i / (pts.length - 1)) * dur)}%{transform:translate(${pt.x.toFixed(2)}px,${pt.y.toFixed(2)}px)}`).join('\n  ');
  return keyframes`
  0%,${p(s)}%{opacity:0;transform:translate(${pts[0].x.toFixed(2)}px,${pts[0].y.toFixed(2)}px)}
  ${p(s + 0.1)}%{opacity:1}
  ${frames}
  ${p(s + dur + 0.15)}%,100%{opacity:0}`;
};

const hubOn = (s: number) => keyframes`
  0%,${p(s)}%{fill:${GREY};r:2}
  ${p(s + 0.35)}%{fill:${HOT};r:3.7}
  ${p(s + 0.85)}%,${p(FLARE)}%{fill:${HOT};r:2.6}
  ${p(FLARE + 0.6)}%{fill:${HOT};r:3.9}
  ${p(FLARE + 1.6)}%,100%{fill:${HOT};r:2.8}`;

const ringOn = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0;transform:scale(.35)}
  ${p(s + 0.45)}%{opacity:.6;transform:scale(1)}
  ${p(s + 1.4)}%,100%{opacity:0;transform:scale(2.4)}`;

const clusterOn = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0}
  ${p(s + 0.8)}%,${p(FLARE)}%{opacity:.5}
  ${p(FLARE + 0.6)}%,100%{opacity:.85}`;

const labelOn = (s: number) => keyframes`
  0%,${p(s)}%{fill:${GREY}}
  ${p(s + 0.4)}%,100%{fill:${HOT}}`;

const skipIn = keyframes`
  0%,${p(SKIP_AT)}%{opacity:0}
  ${p(SKIP_AT + 0.8)}%,100%{opacity:1}`;

const pillIn = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0;transform:translate(-50%,-50%) scale(.85)}
  ${p(s + 0.5)}%,${p(FLARE)}%{opacity:1;transform:translate(-50%,-50%) scale(1)}
  ${p(FLARE + 0.6)}%{opacity:1;transform:translate(-50%,-50%) scale(1.09)}
  ${p(FLARE + 1.6)}%,100%{opacity:1;transform:translate(-50%,-50%) scale(1)}`;

const capIn = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0;transform:translate(-50%,7px)}
  ${p(s + 0.5)}%,${p(s + 2.4)}%{opacity:1;transform:translate(-50%,0)}
  ${p(s + 2.9)}%,100%{opacity:0;transform:translate(-50%,-7px)}`;

const washIn = keyframes`
  0%,${p(FLARE)}%{opacity:0;transform:scale(.7)}
  ${p(FLARE + 1)}%{opacity:1;transform:scale(1.04)}
  ${p(FLARE + 1.8)}%,100%{opacity:.85;transform:scale(1)}`;

const verdictIn = keyframes`
  0%,${p(VERDICT)}%{opacity:0;transform:translateY(8px)}
  ${p(VERDICT + 0.7)}%,100%{opacity:1;transform:none}`;

const calmOut = keyframes`
  0%,${p(VERDICT)}%{opacity:1;transform:none}
  ${p(VERDICT + 0.5)}%,100%{opacity:0;transform:translateY(-8px)}`;

const twinkle = (d: number) => keyframes`
  0%,100%{opacity:${(0.34 + d * 0.16).toFixed(2)}}
  50%{opacity:${(0.58 + d * 0.2).toFixed(2)}}`;

/* the agent is always there, breathing */
const agentPulse = keyframes`
  0%,100%{opacity:.32;transform:scale(.86)}
  50%{opacity:.06;transform:scale(1.5)}`;

const agentRing = keyframes`
  0%,100%{opacity:.55;transform:scale(1)}
  50%{opacity:.9;transform:scale(1.12)}`;

const float = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}`;
const blink = keyframes`0%,100%{opacity:.35}50%{opacity:1}`;

const reduce = css`
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: none;
  }
`;

/* ---------------- the estate ---------------- */

/* cx, cy, count, spread, depth (0 far, 1 near) */
const CLUSTERS: [number, number, number, number, number][] = [
  [36, 76, 9, 11, 1],
  [62, 30, 10, 12, 1],
  [92, 64, 10, 12, 1],
  [118, 26, 7, 9, 0.7],
  [124, 76, 8, 10, 0.7],
  [48, 12, 6, 9, 0.35],
  [78, 90, 7, 10, 0.35],
  [108, 94, 5, 8, 0.3],
  [40, 50, 6, 8, 0.5],
  [136, 48, 5, 7, 0.3],
  [76, 50, 6, 9, 0.45],
  [104, 44, 5, 7, 0.4],
  [22, 26, 5, 8, 0.3],
  [24, 68, 5, 8, 0.35],
];

const build = () => {
  let s = 20260903;
  const rnd = () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
  const nodes: { x: number; y: number; r: number; d: number; c: number }[] = [];
  const links: { x1: number; y1: number; x2: number; y2: number; o: number }[] = [];

  CLUSTERS.forEach(([cx, cy, n, spread, depth], ci) => {
    for (let i = 0; i < n; i++) {
      const a = rnd() * Math.PI * 2;
      const dist = 3 + rnd() * spread;
      const x = cx + Math.cos(a) * dist;
      const y = cy + Math.sin(a) * dist * 0.78;
      nodes.push({ x, y, r: 0.45 + rnd() * 0.7 * (0.5 + depth), d: rnd(), c: ci });
      links.push({ x1: cx, y1: cy, x2: x, y2: y, o: 0.08 + depth * 0.12 });
    }
    /* a few long hauls so the estate reads as connected, not as islands */
    const next = CLUSTERS[(ci + 2) % CLUSTERS.length];
    links.push({ x1: cx, y1: cy, x2: next[0], y2: next[1], o: 0.07 });
  });

  return { nodes, links };
};

const MAP = build();

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

const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 13px 20px;
  border-bottom: 1px solid var(--line);
  background: var(--paper-3);
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 11px;
  color: var(--ink-faint);

  @media (max-width: 1000px) {
    padding: 11px 14px;
    font-size: 10px;
  }

  .lab {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    white-space: nowrap;
    color: var(--signal-ink);
  }
  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--signal);
    animation: ${blink} 2s ease-in-out infinite;
    ${reduce}
  }
`;

const Field = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1.46 / 1;
  overflow: hidden;
  background: radial-gradient(90% 120% at 4% 50%, rgba(201, 52, 106, 0.09), transparent 55%), radial-gradient(110% 85% at 82% 24%, rgba(91, 67, 241, 0.05), transparent 60%),
    linear-gradient(180deg, #fdfcfe, #f8f6fa);
`;

const Map = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  animation: ${fieldIn} ${T}s linear infinite both;
  ${reduce}
`;

const Edge = styled.line<{ $o: number }>`
  stroke: rgba(24, 20, 54, ${(x) => x.$o});
  stroke-width: 0.28;
`;

const Node = styled.circle<{ $d: number }>`
  fill: ${GREY};
  animation: ${(x) => twinkle(x.$d)} ${(x) => (5 + x.$d * 6).toFixed(1)}s ease-in-out infinite;
  ${reduce}
`;

const HotNode = styled.circle<{ $t: number }>`
  fill: ${HOT};
  animation: ${(x) => clusterOn(x.$t)} ${T}s ease-out infinite both;
  ${reduce}
`;

const Wash = styled.ellipse`
  fill: rgba(201, 52, 106, 0.07);
  transform-box: fill-box;
  transform-origin: center;
  animation: ${washIn} ${T}s cubic-bezier(0.16, 1, 0.3, 1) infinite both;
  ${reduce}
`;

const Probe = styled.line<{ $t: number }>`
  stroke: ${HOT};
  stroke-width: 0.32;
  stroke-linecap: round;
  stroke-dasharray: 1;
  opacity: 0;
  animation: ${(x) => probe(x.$t)} ${T}s cubic-bezier(0.3, 0, 0.2, 1) infinite both;
  ${reduce}
`;

const Glow = styled.path<{ $t: number }>`
  fill: none;
  stroke: ${HOT};
  stroke-linecap: round;
  opacity: 0;
  filter: blur(2px);
  animation: ${(x) => glow(x.$t)} ${T}s ease-out infinite both;
  ${reduce}
`;

const Seg = styled.path<{ $t: number }>`
  fill: none;
  stroke: ${HOT};
  stroke-width: 0.95;
  stroke-linecap: round;
  stroke-dasharray: 1;
  animation: ${(x) => draw(x.$t)} ${T}s cubic-bezier(0.4, 0, 0.2, 1) infinite both;
  ${reduce}
`;

const Comet = styled.circle<{ $k: ReturnType<typeof keyframes> }>`
  fill: ${HOT};
  r: 1.5;
  animation: ${(x) => x.$k} ${T}s linear infinite both;
  ${reduce}
`;

const CometHalo = styled.circle<{ $k: ReturnType<typeof keyframes> }>`
  fill: rgba(201, 52, 106, 0.22);
  r: 3.4;
  animation: ${(x) => x.$k} ${T}s linear infinite both;
  ${reduce}
`;

const Hub = styled.circle<{ $t: number }>`
  fill: ${GREY};
  r: 2;
  animation: ${(x) => hubOn(x.$t)} ${T}s cubic-bezier(0.16, 1, 0.3, 1) infinite both;
  ${reduce}
`;

const Ring = styled.circle<{ $t: number }>`
  fill: none;
  stroke: ${HOT};
  stroke-width: 0.45;
  r: 4.2;
  transform-box: fill-box;
  transform-origin: center;
  opacity: 0;
  animation: ${(x) => ringOn(x.$t)} ${T}s ease-out infinite both;
  ${reduce}
`;

const HubLabel = styled.text<{ $t: number }>`
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 3.2px;
  letter-spacing: 0.1px;
  text-anchor: middle;
  fill: ${GREY};
  animation: ${(x) => labelOn(x.$t)} ${T}s linear infinite both;
  ${reduce}
`;

const SkipLabel = styled.text`
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 2.8px;
  text-anchor: middle;
  fill: rgba(24, 20, 54, 0.45);
  animation: ${skipIn} ${T}s linear infinite both;
  ${reduce}
`;

const SkipEdge = styled.path`
  fill: none;
  stroke: rgba(24, 20, 54, 0.3);
  stroke-width: 0.38;
  stroke-dasharray: 1.6 1.6;
  animation: ${skipIn} ${T}s linear infinite both;
  ${reduce}
`;

/* ---------------- the agent ---------------- */

const AgentHalo = styled.circle`
  fill: ${HOT};
  transform-box: fill-box;
  transform-origin: center;
  animation: ${agentPulse} 3.6s ease-in-out infinite;
  ${reduce}
`;

const AgentRing = styled.circle`
  fill: none;
  stroke: ${HOT};
  stroke-width: 0.5;
  transform-box: fill-box;
  transform-origin: center;
  animation: ${agentRing} 3.6s ease-in-out infinite;
  ${reduce}
`;

const AgentLabel = styled.text`
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 3.3px;
  letter-spacing: 0.16px;
  text-anchor: middle;
  fill: ${DEEP};
`;

/* ---------------- captions ---------------- */

const Cap = styled.div<{ $t: number; $x: number; $y: number; $w: number }>`
  position: absolute;
  left: ${(x) => x.$x}%;
  top: ${(x) => x.$y}%;
  width: ${(x) => x.$w}%;
  min-width: 150px;
  max-width: 250px;
  padding: 9px 11px;
  border: 1px solid rgba(201, 52, 106, 0.24);
  border-radius: 10px;
  background: rgba(255, 253, 254, 0.95);
  backdrop-filter: blur(3px);
  box-shadow: 0 12px 28px -16px rgba(24, 20, 54, 0.45);
  animation: ${(x) => capIn(x.$t)} ${T}s cubic-bezier(0.16, 1, 0.3, 1) infinite both;
  ${reduce}

  .top {
    display: flex;
    align-items: center;
    gap: 7px;
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 9px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--hot-ink);
  }
  .sev {
    margin-left: auto;
    padding: 1px 6px;
    border-radius: 999px;
    border: 1px solid var(--line);
    background: var(--paper-3);
    color: var(--ink-faint);
    letter-spacing: 0.08em;
  }
  .find {
    margin-top: 5px;
    font-size: 12px;
    line-height: 1.35;
    color: var(--ink);
  }
  .tail {
    margin-top: 5px;
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 9.5px;
    line-height: 1.4;
    color: var(--ink-faint);
  }

  @media (max-width: 1000px) {
    min-width: 126px;
    padding: 7px 9px;
    .find {
      font-size: 11px;
    }
    .tail {
      font-size: 8.5px;
    }
  }
`;

const Pill = styled.div<{ $t: number; $x: number; $y: number }>`
  position: absolute;
  left: ${(x) => x.$x}%;
  top: ${(x) => x.$y}%;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 9px;
  white-space: nowrap;
  border: 1px solid rgba(201, 52, 106, 0.32);
  border-radius: 999px;
  background: rgba(255, 253, 254, 0.96);
  box-shadow: 0 6px 16px -10px rgba(24, 20, 54, 0.5);
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 10px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--hot-ink);
  animation: ${(x) => pillIn(x.$t)} ${T}s cubic-bezier(0.16, 1, 0.3, 1) infinite both;
  ${reduce}

  .sev {
    padding-left: 6px;
    border-left: 1px solid var(--line);
    color: var(--ink-faint);
    letter-spacing: 0.04em;
  }

  @media (max-width: 700px) {
    display: none;
  }
`;

const ChainStrip = styled.div`
  display: none;

  @media (max-width: 700px) {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
    padding: 9px 14px;
    border-bottom: 1px solid var(--line);
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 9px;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: var(--hot-ink);
  }

  .arw {
    color: var(--ink-faint);
  }
`;

const VerdictWrap = styled.div`
  position: relative;
  border-top: 1px solid var(--line);
`;

const rowBase = css`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 20px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 11px;

  @media (max-width: 1000px) {
    padding: 11px 14px;
    font-size: 10px;
  }
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
  .n {
    margin-left: auto;
    white-space: nowrap;
  }
  @media (max-width: 1000px) {
    .n {
      display: none;
    }
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

  .crit {
    padding: 3px 9px;
    border-radius: 999px;
    background: ${HOT};
    color: #fff;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-size: 9.5px;
  }
  .txt {
    color: var(--ink);
  }
  .clock {
    margin-left: auto;
    white-space: nowrap;
    color: var(--ink-faint);
  }
  @media (max-width: 1000px) {
    .clock {
      display: none;
    }
  }
`;

export const SecurityArt = () => (
  <Frame>
    <Panel>
      <Bar>
        <span>one agent · four services · one transaction</span>
        <span className='lab'>
          <span className='dot' />
          every finding ranked low
        </span>
      </Bar>

      <ChainStrip>
        {PILLS.map((pl, i) => (
          <React.Fragment key={pl.name}>
            {i > 0 && <span className='arw'>&rsaquo;</span>}
            <span>{pl.name}</span>
          </React.Fragment>
        ))}
      </ChainStrip>

      <Field>
        <Map viewBox='0 0 142 100' preserveAspectRatio='xMidYMid slice' aria-hidden>
          <Wash cx={74} cy={54} rx={62} ry={38} />

          {MAP.links.map((l, i) => (
            <Edge key={`l${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} $o={l.o} />
          ))}
          {MAP.nodes.map((n, i) => (
            <Node key={`n${i}`} cx={n.x} cy={n.y} r={n.r} $d={n.d} />
          ))}

          {/* the sweep. most of it finds nothing and stays on the map */}
          {PROBES.map(([x, y], i) => (
            <Probe key={`pr${i}`} x1={AGENT.x} y1={AGENT.y} x2={x} y2={y} pathLength={1} $t={PROBE_AT + i * 0.12} />
          ))}

          {/* every cluster the agent reached takes on colour */}
          {MAP.nodes.map((n, i) => {
            if (n.c > 4 || HUBS[n.c].on < 0) return null;
            return <HotNode key={`h${i}`} cx={n.x} cy={n.y} r={n.r} $t={HUBS[n.c].on} />;
          })}

          {/* the call that should have happened and never did */}
          <SkipEdge d={curve(HUBS[2], HUBS[3], 6).d} />
          <SkipLabel x={HUBS[3].x + 2} y={HUBS[3].y + 8}>
            never called
          </SkipLabel>

          {ROUTE.map((r, i) => (
            <Glow key={`g${i}`} d={r.d} $t={SEG_AT[i]} />
          ))}
          {ROUTE.map((r, i) => (
            <Seg key={`s${i}`} d={r.d} pathLength={1} $t={SEG_AT[i]} />
          ))}
          {ROUTE.map((r, i) => {
            const k = ride(SEG_AT[i], r.pts);
            return (
              <g key={`c${i}`}>
                <CometHalo cx={0} cy={0} $k={k} />
                <Comet cx={0} cy={0} $k={k} />
              </g>
            );
          })}

          {HUBS.map((h, i) => (
            <g key={`hub${i}`}>
              {h.on > 0 && <Ring cx={h.x} cy={h.y} $t={h.on} />}
              {h.on > 0 ? <Hub cx={h.x} cy={h.y} $t={h.on} /> : <circle cx={h.x} cy={h.y} r={2} fill={GREY} />}
              {h.on > 0 ? (
                <HubLabel x={h.x} y={h.lab === 'above' ? h.y - 5 : h.lab === 'below2' ? h.y + 9.5 : h.y + 7.4} $t={h.on}>
                  {h.name}
                </HubLabel>
              ) : (
                <text x={h.x} y={h.lab === 'above' ? h.y - 5 : h.lab === 'below2' ? h.y + 9.5 : h.y + 7.4} fontSize='3.2px' textAnchor='middle' fontFamily='var(--font-mono), monospace' fill={GREY}>
                  {h.name}
                </text>
              )}
            </g>
          ))}

          {/* the agent */}
          <AgentHalo cx={AGENT.x} cy={AGENT.y} r={9} />
          <AgentRing cx={AGENT.x} cy={AGENT.y} r={5.4} />
          <circle cx={AGENT.x} cy={AGENT.y} r={3} fill={DEEP} />
          <circle cx={AGENT.x} cy={AGENT.y} r={1.15} fill={HOT} />
          <AgentLabel x={AGENT.x} y={AGENT.y + 11}>
            ai agent
          </AgentLabel>
        </Map>

        <Cap $t={RECON.at} $x={RECON.x} $y={RECON.y} $w={RECON.w}>
          <div className='top'>
            <span>recon</span>
            <span className='sev'>no cve</span>
          </div>
          <div className='find'>{RECON.find}</div>
          <div className='tail'>{RECON.tail}</div>
        </Cap>

        {PILLS.map((pl, i) => {
          const m = ROUTE[i].pts[4];
          return (
            <Pill key={pl.name} $t={SEG_AT[i] + 1.2} $x={((m.x + pl.ox) / 142) * 100} $y={m.y + pl.oy}>
              <span>{pl.name}</span>
              <span className='sev'>{pl.sev}</span>
            </Pill>
          );
        })}
      </Field>

      <VerdictWrap>
        <Calm>
          <span className='pill'>triaged</span>
          <span>four findings, every one closed on its own merits</span>
          <span className='n'>0 incidents raised</span>
        </Calm>
        <Verdict>
          <span className='crit'>critical</span>
          <span className='txt'>the path, not the parts</span>
          <span className='clock'>chained in 1.4s</span>
        </Verdict>
      </VerdictWrap>
    </Panel>
  </Frame>
);
