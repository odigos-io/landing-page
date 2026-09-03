'use client';

import React from 'react';
import styled, { keyframes, css } from 'styled-components';

/* Hero art: one agent, four steps, one transaction.

   The estate is drawn once from a fixed seed so hydration matches. The agent
   sweeps it first, a fan of probes that mostly find nothing and stay as faint
   scars. Then the route it found travels the estate, and each stop is named by
   the technique rather than by the application. One control sits on the map
   and is never called. When the last step lands the whole route flares, and
   the bar turns over: every finding was ranked low, and the path is critical. */

const T = 16;
const p = (s: number) => Math.max(0, Math.min(100, (s / T) * 100));

const HOT = '#c9346a';
const DEEP = '#1c1633';
const GREY = 'rgba(24, 20, 54, 0.3)';

const AGENT = { x: 13, y: 50 };

/* the four steps, named by technique, in viewBox units (142 x 100) */
const STOPS = [
  { x: 34, y: 70, name: '01 ssrf', on: 3.6, lab: 'below' },
  { x: 60, y: 31, name: '02 known cve', on: 5.6, lab: 'above' },
  { x: 90, y: 64, name: '03 zero-day', on: 7.6, lab: 'below' },
  { x: 116, y: 27, name: '04 forged trust', on: 9.6, lab: 'above' },
];

/* the control that should have run and never did */
const SKIPPED = { x: 102, y: 82, name: 'control never ran' };

/* from, to, bow off the straight line. -1 is the agent */
const PATH: [number, number, number][] = [
  [-1, 0, 9],
  [0, 1, -6],
  [1, 2, -10],
  [2, 3, -5],
];
const SEG_AT = [2.4, 4.4, 6.4, 8.4];

const PROBES: [number, number][] = [
  [30, 22],
  [60, 31],
  [46, 52],
  [90, 64],
  [26, 76],
  [118, 16],
];
const PROBE_AT = 0.5;

const SKIP_AT = 9.0;
const FLARE = 11.6;
const VERDICT = 12.1;

/* ---------------- geometry ---------------- */

type Pt = { x: number; y: number };

const curve = (a: Pt, b: Pt, bow: number) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const cx = (a.x + b.x) / 2 + (-dy / len) * bow;
  const cy = (a.y + b.y) / 2 + (dx / len) * bow;
  return { d: `M${a.x} ${a.y} Q${cx} ${cy} ${b.x} ${b.y}`, cx, cy };
};

const sample = (a: Pt, b: Pt, cx: number, cy: number, n: number) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n;
    const u = 1 - t;
    return { x: u * u * a.x + 2 * u * t * cx + t * t * b.x, y: u * u * a.y + 2 * u * t * cy + t * t * b.y };
  });

const at = (i: number): Pt => (i < 0 ? AGENT : STOPS[i]);

const ROUTE = PATH.map(([f, t, bow]) => {
  const c = curve(at(f), at(t), bow);
  return { ...c, pts: sample(at(f), at(t), c.cx, c.cy, 8) };
});

/* ---------------- motion ---------------- */

const fieldIn = keyframes`
  0%{opacity:0}
  ${p(0.8)}%,100%{opacity:1}`;

const probe = (s: number) => keyframes`
  0%,${p(s)}%{stroke-dashoffset:1;opacity:0}
  ${p(s + 0.05)}%{opacity:.55}
  ${p(s + 0.45)}%{stroke-dashoffset:0;opacity:.55}
  ${p(s + 1.5)}%,100%{stroke-dashoffset:0;opacity:.11}`;

const draw = (s: number) => keyframes`
  0%,${p(s)}%{stroke-dashoffset:1;opacity:0}
  ${p(s + 0.1)}%{opacity:1}
  ${p(s + 1.3)}%,${p(FLARE)}%{stroke-dashoffset:0;opacity:1;stroke-width:1}
  ${p(FLARE + 0.7)}%{stroke-dashoffset:0;opacity:1;stroke-width:2.3}
  ${p(FLARE + 1.7)}%,100%{stroke-dashoffset:0;opacity:1;stroke-width:1.4}`;

const glow = (s: number) => keyframes`
  0%,${p(FLARE)}%{opacity:0;stroke-width:1}
  ${p(FLARE + 0.7)}%{opacity:.45;stroke-width:7}
  ${p(FLARE + 1.7)}%,100%{opacity:.26;stroke-width:5.5}`;

const ride = (s: number, pts: Pt[]) => {
  const dur = 1.25;
  const frames = pts.map((pt, i) => `${p(s + (i / (pts.length - 1)) * dur)}%{transform:translate(${pt.x.toFixed(2)}px,${pt.y.toFixed(2)}px)}`).join('\n  ');
  return keyframes`
  0%,${p(s)}%{opacity:0;transform:translate(${pts[0].x.toFixed(2)}px,${pts[0].y.toFixed(2)}px)}
  ${p(s + 0.1)}%{opacity:1}
  ${frames}
  ${p(s + dur + 0.15)}%,100%{opacity:0}`;
};

const stopOn = (s: number) => keyframes`
  0%,${p(s)}%{fill:${GREY};r:2}
  ${p(s + 0.35)}%{fill:${HOT};r:3.8}
  ${p(s + 0.85)}%,${p(FLARE)}%{fill:${HOT};r:2.7}
  ${p(FLARE + 0.7)}%{fill:${HOT};r:4}
  ${p(FLARE + 1.7)}%,100%{fill:${HOT};r:2.9}`;

const ringOn = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0;transform:scale(.35)}
  ${p(s + 0.45)}%{opacity:.55;transform:scale(1)}
  ${p(s + 1.4)}%,100%{opacity:0;transform:scale(2.4)}`;

const labelOn = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0}
  ${p(s + 0.45)}%,100%{opacity:1}`;

const skipIn = keyframes`
  0%,${p(SKIP_AT)}%{opacity:0}
  ${p(SKIP_AT + 0.8)}%,100%{opacity:1}`;

const verdictIn = keyframes`
  0%,${p(VERDICT)}%{opacity:0;transform:translateY(8px)}
  ${p(VERDICT + 0.7)}%,100%{opacity:1;transform:none}`;

const calmOut = keyframes`
  0%,${p(VERDICT)}%{opacity:1;transform:none}
  ${p(VERDICT + 0.5)}%,100%{opacity:0;transform:translateY(-8px)}`;

const twinkle = (d: number) => keyframes`
  0%,100%{opacity:${(0.22 + d * 0.12).toFixed(2)}}
  50%{opacity:${(0.4 + d * 0.14).toFixed(2)}}`;

const agentPulse = keyframes`
  0%,100%{opacity:.3;transform:scale(.86)}
  50%{opacity:.05;transform:scale(1.55)}`;

const agentRing = keyframes`
  0%,100%{opacity:.5;transform:scale(1)}
  50%{opacity:.85;transform:scale(1.13)}`;

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

/* cx, cy, count, spread, depth */
const CLUSTERS: [number, number, number, number, number][] = [
  [34, 70, 7, 10, 0.9],
  [60, 31, 7, 11, 0.9],
  [90, 64, 7, 11, 0.9],
  [116, 27, 6, 9, 0.8],
  [102, 82, 5, 8, 0.5],
  [30, 22, 5, 9, 0.4],
  [46, 52, 5, 8, 0.45],
  [132, 62, 4, 7, 0.3],
  [70, 92, 5, 9, 0.3],
  [26, 76, 4, 7, 0.35],
];

const build = () => {
  let s = 20260904;
  const rnd = () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
  const nodes: { x: number; y: number; r: number; d: number }[] = [];
  const links: { x1: number; y1: number; x2: number; y2: number; o: number }[] = [];

  CLUSTERS.forEach(([cx, cy, n, spread, depth], ci) => {
    for (let i = 0; i < n; i++) {
      const a = rnd() * Math.PI * 2;
      const dist = 3.5 + rnd() * spread;
      const x = cx + Math.cos(a) * dist;
      const y = cy + Math.sin(a) * dist * 0.78;
      nodes.push({ x, y, r: 0.45 + rnd() * 0.6 * (0.5 + depth), d: rnd() });
      links.push({ x1: cx, y1: cy, x2: x, y2: y, o: 0.05 + depth * 0.07 });
    }
    const next = CLUSTERS[(ci + 3) % CLUSTERS.length];
    links.push({ x1: cx, y1: cy, x2: next[0], y2: next[1], o: 0.045 });
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

const rowBase = css`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 22px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 11px;

  @media (max-width: 1000px) {
    padding: 12px 15px;
    font-size: 10px;
  }
`;

const Bar = styled.div`
  ${rowBase};
  justify-content: space-between;
  border-bottom: 1px solid var(--line);
  background: var(--paper-3);
  color: var(--ink-faint);

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
  aspect-ratio: 1.5 / 1;
  overflow: hidden;
  background: radial-gradient(85% 130% at 5% 50%, rgba(201, 52, 106, 0.08), transparent 55%), linear-gradient(180deg, #fdfcfe, #f8f6fa);
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
  stroke-width: 0.26;
`;

const Node = styled.circle<{ $d: number }>`
  fill: ${GREY};
  animation: ${(x) => twinkle(x.$d)} ${(x) => (5 + x.$d * 6).toFixed(1)}s ease-in-out infinite;
  ${reduce}
`;

const Probe = styled.line<{ $t: number }>`
  stroke: ${HOT};
  stroke-width: 0.3;
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
  filter: blur(2.5px);
  animation: ${(x) => glow(x.$t)} ${T}s ease-out infinite both;
  ${reduce}
`;

const Seg = styled.path<{ $t: number }>`
  fill: none;
  stroke: ${HOT};
  stroke-width: 1;
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
  fill: rgba(201, 52, 106, 0.2);
  r: 3.6;
  animation: ${(x) => x.$k} ${T}s linear infinite both;
  ${reduce}
`;

const Stop = styled.circle<{ $t: number }>`
  fill: ${GREY};
  r: 2;
  animation: ${(x) => stopOn(x.$t)} ${T}s cubic-bezier(0.16, 1, 0.3, 1) infinite both;
  ${reduce}
`;

const Ring = styled.circle<{ $t: number }>`
  fill: none;
  stroke: ${HOT};
  stroke-width: 0.45;
  r: 4.4;
  transform-box: fill-box;
  transform-origin: center;
  opacity: 0;
  animation: ${(x) => ringOn(x.$t)} ${T}s ease-out infinite both;
  ${reduce}
`;

const StopLabel = styled.text<{ $t: number }>`
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 3.6px;
  letter-spacing: 0.12px;
  text-anchor: middle;
  fill: ${HOT};
  opacity: 0;
  animation: ${(x) => labelOn(x.$t)} ${T}s linear infinite both;
  ${reduce}
`;

const SkipLabel = styled.text`
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 3.2px;
  text-anchor: middle;
  fill: rgba(24, 20, 54, 0.42);
  animation: ${skipIn} ${T}s linear infinite both;
  ${reduce}
`;

const SkipEdge = styled.path`
  fill: none;
  stroke: rgba(24, 20, 54, 0.26);
  stroke-width: 0.36;
  stroke-dasharray: 1.7 1.7;
  animation: ${skipIn} ${T}s linear infinite both;
  ${reduce}
`;

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
  font-size: 3.6px;
  letter-spacing: 0.18px;
  text-anchor: middle;
  fill: ${DEEP};
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
`;

export const SecurityArt = () => (
  <Frame>
    <Panel>
      <Bar>
        <span>one agent · four services · one transaction</span>
        <span className='lab'>
          <span className='dot' />
          nothing raised an alert
        </span>
      </Bar>

      <Field>
        <Map viewBox='0 0 142 100' preserveAspectRatio='xMidYMid slice' aria-hidden>
          {MAP.links.map((l, i) => (
            <Edge key={`l${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} $o={l.o} />
          ))}
          {MAP.nodes.map((n, i) => (
            <Node key={`n${i}`} cx={n.x} cy={n.y} r={n.r} $d={n.d} />
          ))}

          {PROBES.map(([x, y], i) => (
            <Probe key={`pr${i}`} x1={AGENT.x} y1={AGENT.y} x2={x} y2={y} pathLength={1} $t={PROBE_AT + i * 0.14} />
          ))}

          <SkipEdge d={curve(STOPS[2], SKIPPED, -5).d} />
          <circle cx={SKIPPED.x} cy={SKIPPED.y} r={2} fill={GREY} />
          <SkipLabel x={SKIPPED.x} y={SKIPPED.y + 7.6}>
            {SKIPPED.name}
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

          {STOPS.map((h, i) => (
            <g key={`stop${i}`}>
              <Ring cx={h.x} cy={h.y} $t={h.on} />
              <Stop cx={h.x} cy={h.y} $t={h.on} />
              <StopLabel x={h.x} y={h.lab === 'above' ? h.y - 5.4 : h.y + 8} $t={h.on}>
                {h.name}
              </StopLabel>
            </g>
          ))}

          <AgentHalo cx={AGENT.x} cy={AGENT.y} r={9.5} />
          <AgentRing cx={AGENT.x} cy={AGENT.y} r={5.6} />
          <circle cx={AGENT.x} cy={AGENT.y} r={3.1} fill={DEEP} />
          <circle cx={AGENT.x} cy={AGENT.y} r={1.2} fill={HOT} />
          <AgentLabel x={AGENT.x} y={AGENT.y + 11.5}>
            ai agent
          </AgentLabel>
        </Map>
      </Field>

      <VerdictWrap>
        <Calm>
          <span className='pill'>triaged</span>
          <span>four findings, every one closed on its own merits</span>
        </Calm>
        <Verdict>
          <span className='crit'>critical</span>
          <span className='txt'>the path, not the parts</span>
        </Verdict>
      </VerdictWrap>
    </Panel>
  </Frame>
);
