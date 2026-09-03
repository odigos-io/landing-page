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

const T = 7.6;
const p = (s: number) => Math.max(0, Math.min(100, (s / T) * 100));

const HOT = '#c9346a';
const DEEP = '#1c1633';
const GREY = 'rgba(24, 20, 54, 0.3)';

const AGENT = { x: 12, y: 88 };

/* the four steps, named by technique, in viewBox units (142 x 100) */
const STOPS = [
  { x: 36, y: 76, name: '01 ssrf', on: 1.0, side: 'right' },
  { x: 63, y: 58, name: '02 known cve', on: 1.5, side: 'right' },
  { x: 86, y: 43, name: '03 zero-day', on: 2.05, side: 'right' },
  { x: 110, y: 26, name: '04 forged token', on: 2.6, side: 'left' },
];

/* the control that should have run and never did */
const SKIPPED_ON_SEG = 2; /* the control sits on the route between 03 and 04 */

/* from, to, bow off the straight line. -1 is the agent */
const PATH: [number, number, number][] = [
  [-1, 0, 6],
  [0, 1, -5],
  [1, 2, 5],
  [2, 3, -5],
];
const SEG_AT = [0.5, 1.05, 1.6, 2.15];

const PROBES: [number, number][] = [
  [34, 30],
  [63, 58],
  [52, 68],
  [86, 43],
  [78, 88],
  [116, 62],
];
const PROBE_AT = 0.05;

const SKIP_AT = 2.85;
const FLARE = 3.05;
const VERDICT = 3.4;

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

const SKIP = ROUTE[SKIPPED_ON_SEG].pts[3];

/* ---------------- motion ---------------- */

const fieldIn = keyframes`
  0%{opacity:0}
  ${p(0.8)}%,100%{opacity:1}`;

const probe = (s: number) => keyframes`
  0%,${p(s)}%{stroke-dashoffset:1;opacity:0}
  ${p(s + 0.03)}%{opacity:.5}
  ${p(s + 0.22)}%{stroke-dashoffset:0;opacity:.5}
  ${p(s + 0.7)}%,100%{stroke-dashoffset:0;opacity:.1}`;

const draw = (s: number) => keyframes`
  0%,${p(s)}%{stroke-dashoffset:1;opacity:0}
  ${p(s + 0.06)}%{opacity:1}
  ${p(s + 0.55)}%,${p(FLARE)}%{stroke-dashoffset:0;opacity:1;stroke-width:1.35}
  ${p(FLARE + 0.4)}%{stroke-dashoffset:0;opacity:1;stroke-width:2.9}
  ${p(FLARE + 1)}%,100%{stroke-dashoffset:0;opacity:1;stroke-width:1.8}`;

const glow = (s: number) => keyframes`
  0%,${p(FLARE)}%{opacity:0;stroke-width:1}
  ${p(FLARE + 0.4)}%{opacity:.45;stroke-width:8}
  ${p(FLARE + 1)}%,100%{opacity:.26;stroke-width:6}`;

const ride = (s: number, pts: Pt[]) => {
  const dur = 0.55;
  const frames = pts.map((pt, i) => `${p(s + (i / (pts.length - 1)) * dur)}%{transform:translate(${pt.x.toFixed(2)}px,${pt.y.toFixed(2)}px)}`).join('\n  ');
  return keyframes`
  0%,${p(s)}%{opacity:0;transform:translate(${pts[0].x.toFixed(2)}px,${pts[0].y.toFixed(2)}px)}
  ${p(s + 0.06)}%{opacity:1}
  ${frames}
  ${p(s + dur + 0.1)}%,100%{opacity:0}`;
};

const stopOn = (s: number) => keyframes`
  0%,${p(s)}%{fill:${GREY};r:2}
  ${p(s + 0.2)}%{fill:${HOT};r:4}
  ${p(s + 0.42)}%,${p(FLARE)}%{fill:${HOT};r:2.9}
  ${p(FLARE + 0.4)}%{fill:${HOT};r:4.3}
  ${p(FLARE + 1)}%,100%{fill:${HOT};r:3.1}`;

const ringOn = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0;transform:scale(.35)}
  ${p(s + 0.28)}%{opacity:.55;transform:scale(1)}
  ${p(s + 0.9)}%,100%{opacity:0;transform:scale(2.4)}`;

const labelOn = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0}
  ${p(s + 0.28)}%,100%{opacity:1}`;

const skipIn = keyframes`
  0%,${p(SKIP_AT)}%{opacity:0}
  ${p(SKIP_AT + 0.5)}%,100%{opacity:1}`;

const verdictIn = keyframes`
  0%,${p(VERDICT)}%{opacity:0;transform:translateY(8px)}
  ${p(VERDICT + 0.45)}%,100%{opacity:1;transform:none}`;

const calmOut = keyframes`
  0%,${p(VERDICT)}%{opacity:1;transform:none}
  ${p(VERDICT + 0.32)}%,100%{opacity:0;transform:translateY(-8px)}`;

const twinkle = (d: number) => keyframes`
  0%,100%{opacity:${(0.17 + d * 0.09).toFixed(2)}}
  50%{opacity:${(0.29 + d * 0.1).toFixed(2)}}`;

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
  [36, 76, 7, 10, 0.9],
  [63, 58, 7, 11, 0.9],
  [86, 43, 7, 11, 0.9],
  [110, 26, 6, 9, 0.8],
  [34, 30, 5, 9, 0.45],
  [52, 68, 5, 8, 0.4],
  [78, 88, 5, 9, 0.35],
  [116, 62, 5, 8, 0.4],
  [136, 90, 4, 7, 0.3],
  [16, 52, 4, 7, 0.3],
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
      links.push({ x1: cx, y1: cy, x2: x, y2: y, o: 0.032 + depth * 0.045 });
    }
    const next = CLUSTERS[(ci + 3) % CLUSTERS.length];
    links.push({ x1: cx, y1: cy, x2: next[0], y2: next[1], o: 0.03 });
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
  stroke-width: 1.35;
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

const StopLabel = styled.text<{ $t: number; $anchor: string }>`
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 3.6px;
  letter-spacing: 0.12px;
  text-anchor: ${(x) => x.$anchor};
  fill: ${HOT};
  opacity: 0;
  animation: ${(x) => labelOn(x.$t)} ${T}s linear infinite both;
  ${reduce}
`;

const SkipLabel = styled.text`
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 3.2px;
  text-anchor: end;
  fill: rgba(24, 20, 54, 0.42);
  animation: ${skipIn} ${T}s linear infinite both;
  ${reduce}
`;

/* a ring on the route with a line through it */
const SkipMark = ({ $x, $y }: { $x: number; $y: number }) => (
  <SkipG>
    <circle cx={$x} cy={$y} r={3.4} fill='#fdfcfe' stroke='rgba(24,20,54,0.42)' strokeWidth={0.5} />
    <line x1={$x - 2.4} y1={$y + 2.4} x2={$x + 2.4} y2={$y - 2.4} stroke='rgba(24,20,54,0.42)' strokeWidth={0.5} />
  </SkipG>
);

const SkipG = styled.g`
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

const VerdictWrap = styled.div`
  position: relative;
  border-top: 1px solid var(--line);
`;

const Calm = styled.div`
  ${rowBase};
  color: var(--ink-faint);
  animation: ${calmOut} ${T}s cubic-bezier(0.16, 1, 0.3, 1) infinite both;

  /* the two bars are stacked, so reduced motion shows the resting end state only */
  @media (prefers-reduced-motion: reduce) {
    display: none;
  }

  .pill {
    padding: 3px 9px;
    border-radius: 999px;
    border: 1px solid var(--line);
    background: var(--paper-3);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-size: 9.5px;
  }
  .lab {
    margin-left: auto;
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
  @media (max-width: 700px) {
    .lab {
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
`;

export const SecurityArt = () => (
  <Frame>
    <Panel>
      <Field>
        <Map viewBox='0 0 142 100' preserveAspectRatio='xMidYMid slice' aria-hidden>
          {MAP.links.map((l, i) => (
            <Edge key={`l${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} $o={l.o} />
          ))}
          {MAP.nodes.map((n, i) => (
            <Node key={`n${i}`} cx={n.x} cy={n.y} r={n.r} $d={n.d} />
          ))}

          {PROBES.map(([x, y], i) => (
            <Probe key={`pr${i}`} x1={AGENT.x} y1={AGENT.y} x2={x} y2={y} pathLength={1} $t={PROBE_AT + i * 0.05} />
          ))}


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
              <StopLabel x={h.side === 'left' ? h.x - 6 : h.x + 6} y={h.y + 1.3} $anchor={h.side === 'left' ? 'end' : 'start'} $t={h.on}>
                {h.name}
              </StopLabel>
            </g>
          ))}

          {/* the control the route passed straight through */}
          <SkipMark $x={SKIP.x} $y={SKIP.y} />
          <SkipLabel x={SKIP.x - 4} y={SKIP.y - 6}>
            control never fired
          </SkipLabel>

          <AgentHalo cx={AGENT.x} cy={AGENT.y} r={9.5} />
          <AgentRing cx={AGENT.x} cy={AGENT.y} r={5.6} />
          <circle cx={AGENT.x} cy={AGENT.y} r={3.2} fill={DEEP} />
          <circle cx={AGENT.x} cy={AGENT.y} r={1.25} fill={HOT} />
        </Map>
      </Field>

      <VerdictWrap>
        <Calm>
          <span className='pill'>triaged</span>
          <span>four findings, every one closed on its own merits</span>
          <span className='lab'>
            <span className='dot' />
            no alert raised
          </span>
        </Calm>
        <Verdict>
          <span className='crit'>critical</span>
          <span className='txt'>the path, not the parts</span>
        </Verdict>
      </VerdictWrap>
    </Panel>
  </Frame>
);
