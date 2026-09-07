'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

/* One incident, two outcomes, on one chart, and the reason said out loud.

   Grey, without Odigos: latency climbs, the page comes at 03:12 with a
   graph and three log lines. Nothing from inside the code was captured,
   so the fix lands at 05:40.

   Violet, with Odigos: the latency starts drifting at 02:52. Odigos sees
   the drift twenty minutes before the alert and turns up capture on that
   path. So when the same page comes at 03:12, the root cause is already
   recorded. Fixed 03:31. One thought at a time, held long enough to read. */

const T = '24s';

/* chart space 1000 x 330; baseline y 262, plateau y 110, SLO y 196 */
const RISE = 'M-5 262 L140 262 C175 262 190 215 199 196 C212 168 218 110 232 110';
const WITHOUT = `${RISE} L262 112 L300 108 L340 112 L380 108 L420 113 L460 108 L500 112 L540 109 L580 113 L620 108 L660 112 L700 109 L740 113 L780 108 L820 112 L850 110 L878 110 C886 110 884 262 892 262 L1005 262`;
const WITH = `${RISE} L262 112 L290 110 L300 110 C308 110 306 262 315 262 L1005 262`;
const WEDGE = 'M315 262 L300 110 L340 112 L380 108 L420 113 L460 108 L500 112 L540 109 L580 113 L620 108 L660 112 L700 109 L740 113 L780 108 L820 112 L850 110 L878 110 C886 110 884 262 892 262 Z';

const X_DRIFT = 14;
const X_PAGE = 23;
const X_FIX = 31.5;
const X_LATE = 89.2;
const Y_PLATEAU = 33.3;
const Y_BASE = 79.4;
const Y_SLO = 59.4;

/* the line draws at 0.25 loop percent per x percent and pauses while a
   thought is on screen, so every label appears when the line reaches it */
const R = 0.25;
const G_START = 2;
const G_DRIFT = G_START + X_DRIFT * R; /* 5.5 */
const G_PAGE = 16; /* the climb from the drift to the page takes ~2.5 s */
const G_RESUME = 24;
const G_LATE = G_RESUME + (X_LATE - X_PAGE) * R; /* 40.5 */
const G_END = 43;
const HAND = 45.5;
const V_START = 51;
const V_DRIFT = V_START + X_DRIFT * R; /* 54.5 */
const V_PAGE = 70.5; /* the climb takes ~3.8 s and the thoughts land along it */
const V_PAGE_RESUME = 80;
const V_FIX = V_PAGE_RESUME + (X_FIX - X_PAGE) * R; /* 82.1 */
const V_END = 88;
const PAYOFF = 89.5;

const drawG = keyframes`
  0%, ${G_START}% { width: 0; }
  ${G_DRIFT}% { width: ${X_DRIFT}%; animation-timing-function: ease-in-out; }
  ${G_PAGE}%, ${G_RESUME}% { width: ${X_PAGE}%; }
  ${G_END}%, 100% { width: 100%; }
`;
const drawV = keyframes`
  0%, ${V_START}% { width: 0; }
  ${V_DRIFT}% { width: ${X_DRIFT}%; animation-timing-function: ease-in-out; }
  ${V_PAGE}%, ${V_PAGE_RESUME}% { width: ${X_PAGE}%; }
  ${V_FIX}% { width: ${X_FIX}%; }
  ${V_END}%, 100% { width: 100%; }
`;
/* appear at `at`; optionally fall to `to` after `off` */
const show = (at: number, off = 0, to = 0.5) => keyframes`
  0%, ${at}% { opacity: 0; margin-top: 3px; }
  ${at + 1}%${off ? `, ${off}%` : ', 100%'} { opacity: 1; margin-top: 0; }
  ${off ? `${off + 1.5}%, 100% { opacity: ${to}; margin-top: 0; }` : ''}
`;
const ghost = keyframes`
  0%, ${HAND}% { stroke: #b5b1a6; }
  ${HAND + 2.5}%, 100% { stroke: #dedbd3; }
`;
const caption = keyframes`
  0%, ${HAND + 0.8}% { opacity: 0; margin-top: 4px; }
  ${HAND + 2}%, ${V_START - 0.3}% { opacity: 1; margin-top: 0; }
  ${V_START + 1.2}%, 100% { opacity: 0; margin-top: 0; }
`;
const wedge = keyframes`
  0%, ${PAYOFF}% { fill-opacity: 0; }
  ${PAYOFF + 2.5}%, 100% { fill-opacity: 1; }
`;
const pulse = keyframes`
  0%, ${V_PAGE}% { box-shadow: 0 0 0 4px rgba(255, 93, 143, 0.2); }
  ${V_PAGE + 0.8}% { box-shadow: 0 0 0 11px rgba(255, 93, 143, 0.28); }
  ${V_PAGE + 2.5}%, 100% { box-shadow: 0 0 0 4px rgba(255, 93, 143, 0.2); }
`;
const veil = keyframes`
  0%, 97.5% { opacity: 0; margin-top: 1px; }
  100% { opacity: 1; margin-top: 0; }
`;
const float = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}`;

const kPage = show(G_PAGE);
const kLate = show(G_LATE, HAND);
const kBub1 = show(G_PAGE, HAND, 0.5);
const kBub1a = show(G_PAGE + 2.6, HAND, 0.5);
const kBub1b = show(G_PAGE + 5.2, HAND, 0.5);
const kBub1Off = keyframes`
  0%, ${PAYOFF - 1}% { opacity: 1; margin-top: 0; }
  ${PAYOFF + 1}%, 100% { opacity: 0; margin-top: 1px; }
`;
const kLegendV = show(HAND + 0.8);
const kDrift = show(V_DRIFT);
const kBub2 = show(V_DRIFT);
/* thought one: four beats, then it steps aside for thought two */
const kT1 = show(V_DRIFT, V_PAGE - 0.8, 0);
const kT1a = show(V_DRIFT + 4, V_PAGE - 0.8, 0);
const kT1b = show(V_DRIFT + 8, V_PAGE - 0.8, 0);
const kT1c = show(V_DRIFT + 12, V_PAGE - 0.8, 0);
const kT2 = show(V_PAGE);
const kT2a = show(V_PAGE + 2.6);
const kT2b = show(V_PAGE + 5.4);
const kFix = show(V_FIX);
const kSoon = show(PAYOFF + 1);

const Frame = styled.div`
  position: relative;
  animation: ${float} 9s ease-in-out infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Panel = styled.div`
  position: relative;
  width: 100%;
  background: var(--paper-2);
  border: 1px solid var(--line);
  border-radius: 22px;
  box-shadow: var(--shadow-panel);
  padding: 20px 22px 16px;
  overflow: hidden;
  container-type: inline-size;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 22px;
  margin-bottom: 16px;
  font-family: var(--font-mono), monospace;
  font-size: 10.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 500;
  color: var(--ink-mute);
  .title {
    white-space: nowrap;
  }
  .legend {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .legend span {
    display: flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
    height: 22px;
  }
  .legend span::before {
    content: '';
    width: 14px;
    height: 2px;
    border-radius: 1px;
    background: #b5b1a6;
  }
  .legend .v {
    padding: 0 10px 0 9px;
    border-radius: 999px;
    background: var(--ink);
    color: #fff;
    opacity: 0;
    animation: ${kLegendV} ${T} linear infinite;
  }
  .legend .v::before {
    background: var(--accent);
  }
  @container (max-width: 480px) {
    .title {
      display: none;
    }
  }
`;

const Chart = styled.div`
  position: relative;
  height: 330px;
  background-image: linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 100% 20%, 13.4% 100%;
  background-position: 0 100%, 4.2% 0;

  .slo {
    position: absolute;
    left: 0;
    right: 0;
    top: ${Y_SLO}%;
    border-top: 1px dashed rgba(201, 52, 106, 0.35);
  }
  .slo b {
    position: absolute;
    left: 0;
    top: -15px;
    font: 500 10.5px/1 var(--font-mono), monospace;
    letter-spacing: 0.08em;
    color: var(--hot-ink);
  }
  .ticks {
    position: absolute;
    left: 0;
    right: 0;
    top: calc(${Y_BASE}% + 44px);
    font: 400 10.5px/1 var(--font-mono), monospace;
    letter-spacing: 0.06em;
    color: var(--ink-faint);
  }
  .ticks span {
    position: absolute;
    transform: translateX(-50%);
  }

  .reveal {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 0;
    overflow: hidden;
  }
  .reveal.g {
    animation: ${drawG} ${T} linear infinite;
    z-index: 1;
  }
  .reveal.v {
    animation: ${drawV} ${T} linear infinite;
    z-index: 2;
  }
  .layer {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100cqw;
  }
  svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
  }
  .curve {
    fill: none;
    stroke-width: 2px;
    stroke-linejoin: round;
    vector-effect: non-scaling-stroke;
  }
  .curve.g {
    stroke: #b5b1a6;
    animation: ${ghost} ${T} linear infinite;
  }
  .curve.v {
    stroke: var(--accent);
  }
  .wedge {
    fill: rgba(91, 67, 241, 0.07);
    fill-opacity: 0;
    animation: ${wedge} ${T} linear infinite;
  }

  .caption {
    position: absolute;
    left: ${(X_FIX + X_LATE) / 2 + 2}%;
    top: calc(${Y_PLATEAU}% + 46px);
    transform: translateX(-50%);
    white-space: nowrap;
    font: 500 13px/1.3 var(--font-display), sans-serif;
    color: var(--ink);
    text-align: center;
    opacity: 0;
    z-index: 3;
    animation: ${caption} ${T} linear infinite;
  }
  .caption small {
    display: block;
    margin-top: 4px;
    font: 400 10.5px/1 var(--font-mono), monospace;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--accent);
  }

  .pt {
    position: absolute;
    top: 0;
    height: 100%;
    width: 0;
    z-index: 3;
    opacity: 0;
  }
  .pt i {
    position: absolute;
    left: -4.5px;
    width: 9px;
    height: 9px;
    margin-top: -4.5px;
    border-radius: 50%;
    border: 1.5px solid #fff;
    box-sizing: border-box;
  }
  .pt > span {
    position: absolute;
    white-space: nowrap;
    font: 500 10.5px/1.4 var(--font-mono), monospace;
    letter-spacing: 0.04em;
  }
  .pt > span b {
    font-weight: 500;
  }
  .page {
    left: ${X_PAGE}%;
    animation: ${kPage} ${T} linear infinite;
  }
  .page i {
    top: ${Y_PLATEAU}%;
    background: var(--hot);
    box-shadow: 0 0 0 4px rgba(255, 93, 143, 0.2);
    animation: ${pulse} ${T} linear infinite;
  }
  .page span {
    right: 10px;
    top: calc(${Y_PLATEAU}% - 8px);
    color: var(--hot-ink);
  }
  .late {
    left: ${X_LATE}%;
    animation: ${kLate} ${T} linear infinite;
  }
  .late i {
    top: ${Y_BASE}%;
    background: #b5b1a6;
    box-shadow: 0 0 0 4px rgba(181, 177, 166, 0.25);
  }
  .late span {
    right: 0;
    top: calc(${Y_BASE}% + 12px);
    color: var(--ink-soft);
  }
  .drift {
    left: ${X_DRIFT}%;
    animation: ${kDrift} ${T} linear infinite;
  }
  .drift i {
    top: ${Y_BASE}%;
    background: var(--accent);
    box-shadow: 0 0 0 4px rgba(91, 67, 241, 0.2);
  }
  .drift span {
    left: 10px;
    top: calc(${Y_BASE}% + 12px);
    color: var(--accent);
  }
  .fix {
    left: ${X_FIX}%;
    animation: ${kFix} ${T} linear infinite;
  }
  .fix i {
    top: ${Y_BASE}%;
    background: var(--signal);
    box-shadow: 0 0 0 4px rgba(17, 168, 119, 0.2);
  }
  .fix span {
    left: 12px;
    top: calc(${Y_BASE}% - 20px);
    color: var(--signal);
  }

  /* what you know at 03:12: one bubble per act, above the plateau */
  .bub {
    position: absolute;
    top: 6px;
    z-index: 4;
    padding: 10px 13px 11px;
    border-radius: 12px;
    font: 400 12px/17px var(--font-mono), monospace;
    letter-spacing: 0;
    white-space: nowrap;
    opacity: 0;
  }
  .bubwrap {
    position: absolute;
    inset: 0;
    animation: ${kBub1Off} ${T} linear infinite;
  }
  .bub div {
    opacity: 0;
  }
  .bub .t1,
  .bub .t2 {
    opacity: 1;
  }
  .bub b {
    font-weight: 500;
  }
  .bub.one {
    left: calc(${X_PAGE}% + 16px);
    top: calc(${Y_PLATEAU}% + 22px);
    background: var(--paper-2);
    border: 1px solid var(--line-strong);
    color: var(--ink-mute);
    box-shadow: 0 12px 24px -18px rgba(24, 20, 54, 0.3);
    animation: ${kBub1} ${T} linear infinite;
  }
  .bub.one .h {
    color: var(--hot-ink);
    font-weight: 500;
    animation: ${kBub1} ${T} linear infinite;
  }
  .bub.one .a {
    animation: ${kBub1a} ${T} linear infinite;
  }
  .bub.one .b {
    color: var(--ink);
    animation: ${kBub1b} ${T} linear infinite;
  }
  .bub.two {
    right: 0;
    min-width: 296px;
    min-height: 89px;
    background: var(--panel);
    border: 1px solid var(--panel-line);
    color: var(--panel-mute);
    box-shadow: 0 18px 30px -18px rgba(11, 11, 13, 0.6);
    animation: ${kBub2} ${T} linear infinite;
  }
  .bub.two b {
    color: var(--panel-ink);
  }
  .bub.two .h {
    color: #c9bfff;
    font-weight: 500;
  }
  .bub.two .t2 {
    position: absolute;
    left: 13px;
    top: 10px;
  }
  .bub.two .t1 .h {
    animation: ${kT1} ${T} linear infinite;
  }
  .bub.two .t1 .a {
    animation: ${kT1a} ${T} linear infinite;
  }
  .bub.two .t1 .b {
    animation: ${kT1b} ${T} linear infinite;
  }
  .bub.two .t1 .c {
    animation: ${kT1c} ${T} linear infinite;
  }
  .bub.two .t2 .h {
    color: var(--hot);
    animation: ${kT2} ${T} linear infinite;
  }
  .bub.two .t2 .a {
    animation: ${kT2a} ${T} linear infinite;
  }
  .bub.two .t2 .b {
    color: #fff;
    animation: ${kT2b} ${T} linear infinite;
  }
  .bub.two .t2 .b b {
    color: var(--signal-bright);
  }

  .soon {
    position: absolute;
    left: ${(X_FIX + X_LATE) / 2 + 2}%;
    top: calc(${Y_PLATEAU}% + 30px);
    transform: translateX(-50%);
    text-align: center;
    white-space: nowrap;
    z-index: 3;
    opacity: 0;
    animation: ${kSoon} ${T} linear infinite;
  }
  .soon b {
    display: block;
    font-size: 26px;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--ink);
  }
  .soon small {
    display: block;
    margin-top: 6px;
    font: 400 11px/1 var(--font-mono), monospace;
    letter-spacing: 0.03em;
    color: var(--ink-mute);
  }
  .veil {
    position: absolute;
    inset: -40px -24px -24px;
    background: var(--paper-2);
    opacity: 0;
    pointer-events: none;
    z-index: 6;
    animation: ${veil} ${T} linear infinite;
  }
  .short {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
    }
    .reveal {
      width: 100% !important;
    }
    .curve.g {
      stroke: #dedbd3;
    }
    .pt,
    .soon,
    .bub.two,
    .bub.two .t2 div {
      opacity: 1;
    }
    .bub.two .t1 div {
      opacity: 0;
    }
    .late,
    .bub.one,
    .bub.one div {
      opacity: 0.55;
    }
    .caption {
      opacity: 0;
    }
    .wedge {
      fill-opacity: 1;
    }
    .veil {
      opacity: 0;
    }
  }

  @container (max-width: 480px) {
    height: 250px;
    background-size: 100% 25%, 20% 100%;
    .long {
      display: none;
    }
    .short {
      display: inline;
    }
    .ticks,
    .slo b,
    .soon small,
    .bubwrap,
    .caption small {
      display: none;
    }
    .soon b {
      font-size: 18px;
    }
    .soon {
      top: calc(${Y_PLATEAU}% + 22px);
    }
    .caption {
      top: calc(${Y_PLATEAU}% + 30px);
      font-size: 12px;
    }
    .fix span {
      top: calc(${Y_BASE}% + 26px);
      left: 0;
    }
    .bub.two {
      left: 0;
      top: auto;
      bottom: -6px;
      transform: translateY(100%);
    }
  }
`;

const Dock = styled.div`
  @container (max-width: 480px) {
    height: 104px;
  }
`;

export const ObservabilityArt = () => (
  <Frame>
    <Panel role='img' aria-label='One incident, two outcomes. Without Odigos the engineer is paged at 03:12 with a graph and three log lines, nothing from inside the code was captured, and the outage ends at 05:40. With Odigos, the drift was seen twenty minutes before the alert and capture was turned up, so the page came with the root cause already recorded and the outage ended at 03:31.'>
      <Head>
        <span className='title'>p99 latency, checkout</span>
        <div className='legend'>
          <span className='g'>without Odigos</span>
          <span className='v'>with Odigos</span>
        </div>
      </Head>

      <Chart aria-hidden>
        <div className='slo'>
          <b>SLO 800 ms</b>
        </div>
        <div className='ticks'>
          <span style={{ left: '17.6%' }}>03:00</span>
          <span style={{ left: '44.5%' }}>04:00</span>
          <span style={{ left: '71.3%' }}>05:00</span>
        </div>

        <div className='reveal g'>
          <div className='layer'>
            <svg viewBox='0 0 1000 330' preserveAspectRatio='none' aria-hidden>
              <path className='curve g' d={WITHOUT} />
            </svg>
          </div>
        </div>
        <div className='reveal v'>
          <div className='layer'>
            <svg viewBox='0 0 1000 330' preserveAspectRatio='none' aria-hidden>
              <path className='wedge' d={WEDGE} />
              <path className='curve v' d={WITH} />
            </svg>
          </div>
        </div>

        <div className='caption'>
          Same incident, replayed
          <small>now with Odigos</small>
        </div>

        <div className='pt page'>
          <i />
          <span>
            <b>03:12</b> paged
          </span>
        </div>
        <div className='pt late'>
          <i />
          <span>
            <b>05:40</b> fixed
          </span>
        </div>
        <div className='pt drift'>
          <i />
          <span>
            <b>02:52</b> <span className='long'>drift begins</span>
          </span>
        </div>
        <div className='pt fix'>
          <i />
          <span>
            <b>03:31</b> fixed
          </span>
        </div>

        <div className='bubwrap'>
          <div className='bub one'>
            <div className='h'>03:12 · paged</div>
            <div className='a'>What you have: a graph, 3 log lines.</div>
            <div className='b'>Nothing captured from inside the code.</div>
          </div>
        </div>
        <div className='bub two'>
          <div className='t1'>
            <div className='h'>02:52 · latency drifting on checkout</div>
            <div className='a'>
              Raised trace sampling <b>1% to 90%</b>
            </div>
            <div className='b'>
              Instrumented <b>applyDiscount()</b>
            </div>
            <div className='c'>
              Captured <b>arguments and return values</b>
            </div>
          </div>
          <div className='t2'>
            <div className='h'>03:12 · paged</div>
            <div className='a'>Root cause already recorded:</div>
            <div className='b'>
              <b>applyDiscount()</b> runs 1 query per item
            </div>
          </div>
        </div>

        <div className='soon'>
          <b>2h 9m sooner</b>
          <small>the answer was waiting when the page came</small>
        </div>
        <div className='veil' />
      </Chart>
      <Dock />
    </Panel>
  </Frame>
);
