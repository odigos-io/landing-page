'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

/* Hero art: the two ways to change what production tells you.

   Left, the SDLC, drawn as the artifacts it actually produces: a diff, a pull
   request waiting on reviewers, a CI queue, a release window on Thursday. Each
   one arrives slowly, and at the end of the whole animation nothing has
   shipped.

   Middle, production, running the entire time.

   Right, the ADLC: an agent asks production a question and production answers
   on the spot. Four complete exchanges land in the same window, each in about a
   second, and the closing line says what that difference is worth.

   All motion is opacity/transform on one timeline. */

const DUR = '13s';
const W = 700;
const H = 470;

/* ── left: what shipping a change actually looks like ─────────────────────── */
const LX = 24;
const LW = 226;
const STEPS = [
  {
    at: 6,
    y: 66,
    h: 82,
    head: 'charge.go',
    tag: '1 file changed',
    lines: [
      { t: '- return risk(u)', kind: 'del' as const },
      { t: '+ log.Info("risk", score)', kind: 'add' as const },
    ],
  },
  { at: 28, y: 158, h: 62, head: 'pull request #4821', tag: 'waiting', lines: [{ t: 'needs 2 reviewers', kind: 'muted' as const }] },
  { at: 50, y: 230, h: 62, head: 'ci · pipeline', tag: 'queued', lines: [{ t: 'behind 14 other jobs', kind: 'muted' as const }] },
  { at: 72, y: 302, h: 62, head: 'release window', tag: 'thursday', lines: [{ t: 'not shipped yet', kind: 'muted' as const }] },
];

/* ── right: what asking production looks like ─────────────────────────────── */
const RX = 452;
const RW = 224;
const ASKS = [
  { at: 10, y: 66, q: 'why is checkout p99 up 3x?', a: 'fraudScore() · 240ms' },
  { at: 28, y: 148, q: 'what is it waiting on?', a: 'risk-api · 3 retries' },
  { at: 46, y: 230, q: 'what did it send?', a: 'userId u_8843 · 249.90' },
  { at: 64, y: 312, q: 'who else calls it?', a: '2 services · 1.4k/min' },
];

/* ── middle: production ───────────────────────────────────────────────────── */
const PROD = { x: 288, y: 96, w: 126, h: 276 };
const NODES = [
  { x: 24, y: 46 },
  { x: 78, y: 74 },
  { x: 34, y: 118 },
  { x: 92, y: 148 },
  { x: 30, y: 196 },
  { x: 86, y: 226 },
];

const HOLD = 94;

/* ── motion ───────────────────────────────────────────────────────────────── */
const slowIn = (r: number) => keyframes`
  0%,${r}%{opacity:0;transform:translateY(8px)}
  ${r + 6}%{opacity:1;transform:none}
  ${HOLD}%{opacity:1;transform:none}
  ${HOLD + 3}%,100%{opacity:0;transform:none}`;

const snapIn = (r: number) => keyframes`
  0%,${r}%{opacity:0;transform:translateY(5px)}
  ${r + 1.6}%{opacity:1;transform:none}
  ${HOLD}%{opacity:1;transform:none}
  ${HOLD + 3}%,100%{opacity:0;transform:none}`;

const ping = (r: number) => keyframes`
  0%,${r}%{opacity:0;transform:scale(.4)}
  ${r + 1}%{opacity:.6}
  ${r + 6}%,100%{opacity:0;transform:scale(2.4)}`;

const closeIn = keyframes`
  0%,84%{opacity:0;transform:translateY(6px)}
  88%{opacity:1;transform:none}
  ${HOLD}%{opacity:1;transform:none}
  ${HOLD + 3}%,100%{opacity:0;transform:none}`;

const breathe = keyframes`0%,100%{opacity:.4}50%{opacity:1}`;
const drift = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}`;
const float = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}`;

const Frame = styled.div`
  animation: ${float} 16s ease-in-out infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
const Panel = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  border: 1px solid rgba(91, 67, 241, 0.14);
  background: linear-gradient(180deg, #ffffff 0%, #fcfbff 58%, #f6f3fd 100%);
  box-shadow: var(--shadow-panel);
  svg {
    display: block;
    width: 100%;
    height: auto;
  }
`;
const Slow = styled.g<{ $kf: ReturnType<typeof keyframes> }>`
  animation: ${(p) => p.$kf} ${DUR} cubic-bezier(0.33, 1, 0.68, 1) infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
  }
`;
const Snap = styled.g<{ $kf: ReturnType<typeof keyframes> }>`
  animation: ${(p) => p.$kf} ${DUR} cubic-bezier(0.16, 1, 0.3, 1) infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
  }
`;
const Ping = styled.circle<{ $kf: ReturnType<typeof keyframes> }>`
  fill: none;
  stroke: #11a877;
  stroke-width: 1.4;
  transform-box: fill-box;
  transform-origin: center;
  animation: ${(p) => p.$kf} ${DUR} ease-out infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0;
  }
`;
const Close = styled.g`
  animation: ${closeIn} ${DUR} cubic-bezier(0.16, 1, 0.3, 1) infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
  }
`;

const Svg = styled.svg`
  .kick {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }
  .kick.slow {
    fill: var(--ink-mute);
  }
  .kick.fast {
    fill: #0e9a6c;
  }
  .gloss {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 11px;
    fill: var(--ink-faint);
  }
  .card {
    fill: #fff;
    stroke: rgba(24, 20, 54, 0.13);
    stroke-width: 1.2;
  }
  .cardHead {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 11.5px;
    fill: var(--ink);
  }
  .cardTag {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 10px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    fill: var(--ink-faint);
  }
  .code {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 11px;
  }
  .code.del {
    fill: #c9346a;
  }
  .code.add {
    fill: #0e9a6c;
  }
  .code.muted {
    fill: var(--ink-mute);
  }
  .qCard {
    fill: rgba(91, 67, 241, 0.05);
    stroke: rgba(91, 67, 241, 0.3);
    stroke-width: 1.2;
  }
  .aCard {
    fill: rgba(17, 168, 119, 0.06);
    stroke: rgba(17, 168, 119, 0.34);
    stroke-width: 1.2;
  }
  .q {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 11.5px;
    fill: var(--accent);
  }
  .a {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 11.5px;
    fill: #0c7a58;
  }
  .who {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 9px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    fill: var(--ink-faint);
  }
  .prodBox {
    fill: rgba(255, 255, 255, 0.66);
    stroke: rgba(91, 67, 241, 0.2);
    stroke-width: 1.2;
  }
  .prodLabel {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    fill: var(--ink-mute);
  }
  .node {
    fill: #fff;
    stroke: rgba(91, 67, 241, 0.35);
    stroke-width: 1.2;
  }
  .link {
    stroke: rgba(91, 67, 241, 0.18);
    stroke-width: 1;
  }
  .badge {
    fill: #fff;
    stroke-width: 1.2;
  }
  .badgeSlow {
    stroke: rgba(24, 20, 54, 0.2);
  }
  .badgeFast {
    stroke: rgba(17, 168, 119, 0.45);
  }
  .badgeTxt {
    font-family: var(--font-display), system-ui, sans-serif;
    font-size: 14px;
    font-weight: 600;
  }
  .badgeTxt.slow {
    fill: var(--ink);
  }
  .badgeTxt.fast {
    fill: #0e9a6c;
  }
  .closeTxt {
    font-family: var(--font-display), system-ui, sans-serif;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: -0.01em;
    fill: var(--ink);
  }
  .closeTxt tspan {
    fill: #0e9a6c;
  }
  .live {
    animation: ${breathe} 1.7s ease-in-out infinite;
  }
  .swarm {
    animation: ${drift} 3.4s ease-in-out infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    .live,
    .swarm {
      animation: none;
    }
  }
  @media (max-width: 620px) {
    .gloss,
    .cardTag {
      display: none;
    }
    .q,
    .a,
    .cardHead,
    .code {
      font-size: 14px;
    }
    .kick {
      font-size: 15px;
    }
    .closeTxt {
      font-size: 17px;
    }
  }
`;

export const HeroArt = () => {
  return (
    <Frame>
      <Panel>
        <Svg
          viewBox={`0 0 ${W} ${H}`}
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          role='img'
          aria-label='On the left, shipping a code change: a diff, a pull request waiting on reviewers, a CI queue and a release window on Thursday, and nothing has shipped. In the middle, production running live. On the right, an agent asking production four questions and getting each answered in about a second.'
        >
          {/* ── SDLC ───────────────────────────────────────────────────── */}
          <text className='kick slow' x={LX} y='32'>
            SDLC
          </text>
          <text className='gloss' x={LX + 58} y='32'>
            ship a code change
          </text>

          {STEPS.map((s, i) => (
            <Slow key={i} $kf={slowIn(s.at)}>
              <rect className='card' x={LX} y={s.y} width={LW} height={s.h} rx='10' />
              <text className='cardHead' x={LX + 14} y={s.y + 22}>
                {s.head}
              </text>
              <text className='cardTag' x={LX + LW - 14} y={s.y + 22} textAnchor='end'>
                {s.tag}
              </text>
              {s.lines.map((l, j) => (
                <text key={j} className={`code ${l.kind}`} x={LX + 14} y={s.y + 44 + j * 17}>
                  {l.t}
                </text>
              ))}
            </Slow>
          ))}

          <rect className='badge badgeSlow' x={LX + 62} y='386' width='102' height='28' rx='14' />
          <text className='badgeTxt slow' x={LX + 113} y='405' textAnchor='middle'>
            3 weeks
          </text>

          {/* ── production ─────────────────────────────────────────────── */}
          <text className='prodLabel' x={PROD.x + PROD.w / 2} y={PROD.y - 14} textAnchor='middle'>
            production
          </text>
          <rect className='prodBox' x={PROD.x} y={PROD.y} width={PROD.w} height={PROD.h} rx='16' />
          <g className='swarm'>
            {NODES.map((n, i) => (
              <React.Fragment key={i}>
                {i > 0 && <line className='link' x1={PROD.x + NODES[i - 1].x} y1={PROD.y + NODES[i - 1].y} x2={PROD.x + n.x} y2={PROD.y + n.y} />}
                <circle className='node' cx={PROD.x + n.x} cy={PROD.y + n.y} r='7' />
              </React.Fragment>
            ))}
          </g>
          <circle className='live' cx={PROD.x + PROD.w / 2 - 26} cy={PROD.y + PROD.h - 22} r='3.6' fill='#11a877' />
          <text className='who' x={PROD.x + PROD.w / 2 - 16} y={PROD.y + PROD.h - 18}>
            live
          </text>

          {/* the deploy that never arrives inside this window */}
          <path d={`M${LX + LW + 8},${PROD.y + 150} H${PROD.x - 8}`} stroke='rgba(24,20,54,.16)' strokeWidth='1.4' strokeDasharray='4 5' />
          <text className='who' x={(LX + LW + PROD.x) / 2} y={PROD.y + 142} textAnchor='middle'>
            deploy
          </text>

          {/* every question reaches production and comes straight back */}
          {ASKS.map((a, i) => (
            <React.Fragment key={`p${i}`}>
              <path d={`M${PROD.x + PROD.w + 8},${a.y + 30} H${RX - 8}`} stroke='rgba(17,168,119,.32)' strokeWidth='1.4' />
              <Ping cx={PROD.x + PROD.w - 4} cy={a.y + 30} r='7' $kf={ping(a.at)} />
            </React.Fragment>
          ))}

          {/* ── ADLC ───────────────────────────────────────────────────── */}
          <text className='kick fast' x={RX} y='32'>
            ADLC
          </text>
          <text className='gloss' x={RX + 58} y='32'>
            ask production directly
          </text>

          {ASKS.map((a, i) => (
            <Snap key={i} $kf={snapIn(a.at)}>
              <rect className='qCard' x={RX} y={a.y} width={RW} height='30' rx='9' />
              <text className='q' x={RX + 12} y={a.y + 20}>
                {a.q}
              </text>
              <rect className='aCard' x={RX} y={a.y + 34} width={RW} height='30' rx='9' />
              <text className='a' x={RX + 12} y={a.y + 54}>
                {a.a}
              </text>
            </Snap>
          ))}

          <rect className='badge badgeFast' x={RX + 62} y='386' width='102' height='28' rx='14' />
          <text className='badgeTxt fast' x={RX + 113} y='405' textAnchor='middle'>
            1.2s each
          </text>

          {/* ── the point ──────────────────────────────────────────────── */}
          <Close>
            <path d={`M${LX},436 H${W - LX}`} stroke='rgba(24,20,54,.08)' strokeWidth='1' />
            <text className='closeTxt' x={W / 2} y='458' textAnchor='middle'>
              Still nothing shipped. <tspan>Four answers already in hand.</tspan>
            </text>
          </Close>
        </Svg>
      </Panel>
    </Frame>
  );
};
