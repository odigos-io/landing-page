'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

/* 03:12, two screens.

   One alert wakes two people. The screen on the left holds what metrics
   and logs can tell you, which is almost nothing, and the cause was never
   recorded. The screen on the right holds what Odigos had already
   recorded before anything was wrong: the function, the real call and the
   value it returned, the query that found nothing, the orders, the deploy.

   The consequence sits under each: 4h 12m against 9 min.

   Sizes use a --px unit tied to the container width, so the whole
   composition scales with the hero slot. */

const T = '14s';

const float = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}`;

/* every keyframe moves a main-thread property as well as opacity, so a
   headless capture advances the loop the way a browser does */
/* text never renders at partial opacity: it is hidden, then cut straight to
   full strength and slides into place. A half faded label would fail a
   contrast audit at whatever moment the audit happens to sample. */
const rise = (from: number, to: number) => keyframes`
  0%, ${from}% { opacity: 0; visibility: hidden; margin-top: calc(10 * var(--px)); }
  ${from + 0.01}% { opacity: 1; visibility: visible; }
  ${to}%, 95% { opacity: 1; visibility: visible; margin-top: 0; }
  100% { opacity: 0; visibility: hidden; margin-top: calc(10 * var(--px)); }
`;
const fade = (from: number, to: number) => keyframes`
  0%, ${from}% { opacity: 0; visibility: hidden; margin-top: calc(3 * var(--px)); }
  ${from + 0.01}% { opacity: 1; visibility: visible; }
  ${to}%, 95% { opacity: 1; visibility: visible; margin-top: 0; }
  100% { opacity: 0; visibility: hidden; margin-top: calc(3 * var(--px)); }
`;
const sweep = (from: number, to: number) => keyframes`
  0%, ${from}% { width: 0%; opacity: 0.4; }
  ${to}%, 95% { width: 100%; opacity: 1; }
  100% { width: 0%; opacity: 0.4; }
`;
const drawWire = keyframes`
  0%, 6% { stroke-dashoffset: 200; opacity: 0; }
  16%, 95% { stroke-dashoffset: 0; opacity: 1; }
  100% { stroke-dashoffset: 200; opacity: 0; }
`;
const land = keyframes`
  0%, 68% { opacity: 0; visibility: hidden; margin-top: calc(8 * var(--px)); transform: scale(0.8); }
  68.01% { opacity: 1; visibility: visible; }
  75% { opacity: 1; visibility: visible; margin-top: 0; transform: scale(1.05); }
  79%, 95% { opacity: 1; visibility: visible; margin-top: 0; transform: scale(1); }
  100% { opacity: 0; visibility: hidden; margin-top: calc(8 * var(--px)); transform: scale(0.8); }
`;
const ping = keyframes`
  0%, 6% { box-shadow: 0 0 0 0 rgba(255, 93, 143, 0.5); }
  12% { box-shadow: 0 0 0 calc(7 * var(--px)) rgba(255, 93, 143, 0); }
  100% { box-shadow: 0 0 0 calc(4 * var(--px)) rgba(255, 93, 143, 0.18); }
`;

const kAlert = rise(0, 6);
const kWireDot = fade(14, 18);
const kThin = rise(10, 19);
const kThinBody = fade(16, 24);
const kThinFoot = fade(24, 30);
const kRich = rise(32, 42);
const kR1 = fade(48, 54);
const kR2 = fade(51, 57);
const kR3 = fade(54, 60);
const kR4 = fade(57, 63);
const kR5 = fade(60, 66);
const kRichLab = fade(64, 69);
const kD1 = sweep(38, 50);
const kD2 = sweep(41, 53);
const kD3 = sweep(44, 56);

const Frame = styled.div`
  position: relative;
  animation: ${float} 9s ease-in-out infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Panel = styled.div`
  --px: 0.15625cqw;
  --sans: var(--font-sans), system-ui, sans-serif;
  --mono: var(--font-mono), ui-monospace, monospace;

  position: relative;
  width: 100%;
  aspect-ratio: 640 / 460;
  container-type: inline-size;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 22px;
  background: radial-gradient(120% 78% at 50% -6%, var(--paper-2) 0%, var(--paper) 52%, var(--paper-3) 100%);
  box-shadow: var(--shadow-panel);
  font-family: var(--sans);
  color: var(--ink);

  /* ---------------- the shared alert ---------------- */
  .alert {
    position: absolute;
    left: 50%;
    top: calc(20 * var(--px));
    margin-left: calc(-172 * var(--px));
    z-index: 6;
    display: flex;
    align-items: center;
    gap: calc(9 * var(--px));
    padding: calc(8 * var(--px)) calc(15 * var(--px)) calc(8 * var(--px)) calc(12 * var(--px));
    background: var(--paper-2);
    border: 1px solid var(--line-strong);
    border-radius: 999px;
    box-shadow: 0 calc(10 * var(--px)) calc(22 * var(--px)) calc(-14 * var(--px)) rgba(18, 18, 21, 0.35);
    white-space: nowrap;
    opacity: 0;
    animation: ${kAlert} ${T} cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
  }
  .alert .dot {
    width: calc(8 * var(--px));
    height: calc(8 * var(--px));
    border-radius: 50%;
    background: var(--hot);
    animation: ${ping} ${T} ease-out infinite;
  }
  .alert .t {
    font-family: var(--mono);
    font-size: calc(13 * var(--px));
    font-weight: 600;
    color: var(--ink);
  }
  .alert .sep {
    width: 1px;
    height: calc(12 * var(--px));
    background: var(--line-strong);
  }
  .alert .msg {
    font-size: calc(12.5 * var(--px));
    color: var(--ink-soft);
  }

  .wires {
    position: absolute;
    inset: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  .wires path {
    stroke-dasharray: 200;
    animation: ${drawWire} ${T} ease-out infinite;
  }
  .wires circle {
    opacity: 0;
    animation: ${kWireDot} ${T} ease-out infinite;
  }

  /* ---------------- the two screens ---------------- */
  .screen {
    position: absolute;
    border-radius: calc(13 * var(--px));
    overflow: hidden;
    border: 1px solid var(--line-strong);
    background: var(--paper-2);
    opacity: 0;
  }
  .screen .bar {
    height: calc(29 * var(--px));
    display: flex;
    align-items: center;
    gap: calc(8 * var(--px));
    padding: 0 calc(12 * var(--px));
    border-bottom: 1px solid var(--line);
    background: linear-gradient(180deg, #ffffff, #fcfbf8);
  }
  .screen .lights {
    display: flex;
    gap: calc(4 * var(--px));
  }
  .screen .lights i {
    width: calc(6 * var(--px));
    height: calc(6 * var(--px));
    border-radius: 50%;
    background: var(--line-strong);
    display: block;
  }
  .screen .name {
    font-size: calc(12 * var(--px));
  }
  .screen .body {
    padding: calc(13 * var(--px)) calc(14 * var(--px));
  }
  .screen .lab {
    font-size: calc(11 * var(--px));
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink-mute);
  }
  .screen .big {
    font-family: var(--mono);
    font-weight: 600;
    line-height: 1;
    letter-spacing: -0.03em;
    word-spacing: -0.16em;
    margin-top: calc(5 * var(--px));
  }

  /* the thin screen */
  .thin {
    left: calc(24 * var(--px));
    top: calc(96 * var(--px));
    width: calc(284 * var(--px));
    height: calc(296 * var(--px));
    z-index: 2;
    background: #fdfcfa;
    transform: perspective(1500px) rotateY(6deg) rotateZ(-1.4deg);
    box-shadow: 0 calc(14 * var(--px)) calc(32 * var(--px)) calc(-18 * var(--px)) rgba(18, 18, 21, 0.3);
    animation: ${kThin} ${T} cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
  }
  .thin .name {
    color: var(--ink-mute);
  }
  .thin .col {
    width: calc(226 * var(--px));
    opacity: 0;
    animation: ${kThinBody} ${T} ease-out infinite;
  }
  .sparse {
    display: flex;
    flex-direction: column;
    gap: calc(3 * var(--px));
  }
  .sparse i {
    display: block;
    height: calc(4 * var(--px));
    border-radius: 1px;
    position: relative;
  }
  .sparse i::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: calc(1.5 * var(--px));
    height: 1px;
    background: repeating-linear-gradient(90deg, var(--line-strong) 0 calc(1.6 * var(--px)), transparent calc(1.6 * var(--px)) calc(4.2 * var(--px)));
  }
  .sparse .have {
    position: absolute;
    top: 0;
    width: calc(1.6 * var(--px));
    height: calc(4 * var(--px));
    background: var(--ink-soft);
    border-radius: 1px;
    z-index: 2;
  }
  .metric {
    display: flex;
    align-items: flex-end;
    gap: calc(8 * var(--px));
    margin-top: calc(14 * var(--px));
  }
  .metric span {
    font-family: var(--mono);
    font-size: calc(11 * var(--px));
    color: var(--ink-mute);
    padding-bottom: calc(2 * var(--px));
  }
  .metric svg {
    width: calc(104 * var(--px));
    height: calc(27 * var(--px));
  }
  .log {
    font-family: var(--mono);
    font-size: calc(11.5 * var(--px));
    color: var(--ink-soft);
    line-height: calc(17 * var(--px));
  }
  .void {
    position: relative;
    height: calc(56 * var(--px));
    margin-top: calc(12 * var(--px));
  }
  .void .r {
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    border-top: 1px dashed var(--line);
  }
  .void .say {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
  }
  .void .say b {
    font-weight: 450;
    font-size: calc(12.5 * var(--px));
    color: var(--ink-faint);
    background: #fdfcfa;
    padding: calc(2 * var(--px)) calc(8 * var(--px)) calc(2 * var(--px)) 0;
  }
  .thin .foot {
    margin-top: calc(10 * var(--px));
    padding-top: calc(10 * var(--px));
    border-top: 1px solid var(--line);
    opacity: 0;
    animation: ${kThinFoot} ${T} ease-out infinite;
  }
  .thin .big {
    font-size: calc(38 * var(--px));
    color: var(--ink);
  }

  /* the rich screen */
  .rich {
    left: calc(282 * var(--px));
    top: calc(112 * var(--px));
    width: calc(332 * var(--px));
    height: calc(294 * var(--px));
    z-index: 4;
    transform: perspective(1500px) rotateY(-5deg) rotateZ(1.1deg);
    box-shadow: 0 calc(34 * var(--px)) calc(56 * var(--px)) calc(-22 * var(--px)) rgba(18, 18, 21, 0.34);
    animation: ${kRich} ${T} cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
  }
  .rich .lights i:first-child {
    background: var(--accent);
  }
  .rich .name {
    color: var(--ink);
    font-weight: 500;
  }
  .rich .since {
    margin-left: auto;
    font-family: var(--mono);
    font-size: calc(11 * var(--px));
    color: #3b2bb8;
    background: var(--accent-soft);
    border-radius: calc(5 * var(--px));
    padding: calc(2 * var(--px)) calc(6 * var(--px));
  }
  .dense {
    display: flex;
    flex-direction: column;
    gap: calc(3 * var(--px));
  }
  .dense i {
    display: block;
    height: calc(4 * var(--px));
    border-radius: 1px;
    width: 0;
  }
  .dense .d1 {
    background: repeating-linear-gradient(90deg, var(--accent) 0 calc(1.6 * var(--px)), transparent calc(1.6 * var(--px)) calc(4.2 * var(--px)));
    animation: ${kD1} ${T} cubic-bezier(0.3, 0.7, 0.3, 1) infinite;
  }
  .dense .d2 {
    background: repeating-linear-gradient(90deg, #8a78f5 0 calc(1.6 * var(--px)), transparent calc(1.6 * var(--px)) calc(3.8 * var(--px)));
    animation: ${kD2} ${T} cubic-bezier(0.3, 0.7, 0.3, 1) infinite;
  }
  .dense .d3 {
    background: repeating-linear-gradient(90deg, #b3a7f8 0 calc(1.6 * var(--px)), transparent calc(1.6 * var(--px)) calc(4.6 * var(--px)));
    animation: ${kD3} ${T} cubic-bezier(0.3, 0.7, 0.3, 1) infinite;
  }
  .rows {
    margin-top: calc(12 * var(--px));
    border-top: 1px solid var(--line);
  }
  .row {
    padding: calc(4.5 * var(--px)) 0;
    border-bottom: 1px solid var(--line);
    font-family: var(--mono);
    font-size: calc(11.5 * var(--px));
    line-height: calc(15 * var(--px));
    color: var(--ink-soft);
    letter-spacing: -0.012em;
    display: flex;
    gap: calc(7 * var(--px));
    align-items: baseline;
    opacity: 0;
  }
  .row .k {
    color: var(--ink-mute);
    flex: none;
  }
  .row .v {
    color: var(--ink);
    font-weight: 500;
  }
  .row .bad {
    color: var(--hot-ink);
    font-weight: 600;
  }
  .row .ok {
    color: var(--accent);
    font-weight: 500;
  }
  .row .far {
    margin-left: auto;
    flex: none;
  }
  .row.q {
    display: block;
  }
  .row.r1 {
    animation: ${kR1} ${T} ease-out infinite;
  }
  .row.r2 {
    animation: ${kR2} ${T} ease-out infinite;
  }
  .row.r3 {
    animation: ${kR3} ${T} ease-out infinite;
  }
  .row.r4 {
    animation: ${kR4} ${T} ease-out infinite;
  }
  .row.r5 {
    animation: ${kR5} ${T} ease-out infinite;
  }
  .rich .foot {
    margin-top: calc(8 * var(--px));
  }
  .rich .lab {
    opacity: 0;
    animation: ${kRichLab} ${T} ease-out infinite;
  }
  .rich .big {
    font-size: calc(46 * var(--px));
    color: var(--signal-ink);
    margin-top: calc(4 * var(--px));
    transform-origin: left center;
    opacity: 0;
    animation: ${land} ${T} cubic-bezier(0.2, 0.9, 0.3, 1.4) infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .alert,
    .wires path,
    .wires circle,
    .screen,
    .thin .col,
    .thin .foot,
    .dense i,
    .row,
    .rich .lab,
    .rich .big {
      animation: none;
      opacity: 1;
      visibility: visible;
      margin-top: 0;
      stroke-dashoffset: 0;
    }
    .dense i {
      width: 100%;
    }
    .rich .big {
      transform: none;
      margin-top: calc(4 * var(--px));
    }
    .thin .foot {
      margin-top: calc(10 * var(--px));
    }
    .rich .foot {
      margin-top: calc(8 * var(--px));
    }
    .rows {
      margin-top: calc(12 * var(--px));
    }
    .metric {
      margin-top: calc(14 * var(--px));
    }
    .void {
      margin-top: calc(12 * var(--px));
    }
  }
`;

export const ObservabilityArt = () => (
  <Frame>
    <Panel
      role='img'
      aria-label='One alert at 03:12, checkout degraded and revenue down 12 percent, wakes two engineers. The screen without Odigos holds a p99 latency line, two log lines that say only POST slash checkout 200, and the words cause was never recorded. It resolved in 4 hours 12 minutes. The screen with Odigos has been recording deeply since 02:41 and holds the function applyDiscount at promo.go line 41, the call applyDiscount with BLACK50 and 49.00 which returned 0.00, the query that came back with 0 rows, 312 orders charged full price, and deploy 4812. It resolved in 9 minutes.'
    >
      <div className='alert' aria-hidden>
        <span className='dot' />
        <span className='t'>03:12</span>
        <span className='sep' />
        <span className='msg'>checkout degraded, revenue down 12%</span>
      </div>

      <svg className='wires' viewBox='0 0 640 460' fill='none' preserveAspectRatio='none' aria-hidden>
        <path d='M287 50 C 246 62, 196 68, 158 88' stroke='#d8d4c9' strokeWidth='1' />
        <path d='M353 50 C 398 70, 425 92, 452 111' stroke='#d8d4c9' strokeWidth='1' />
        <circle cx='158' cy='89' r='2.6' fill='#d8d4c9' />
        <circle cx='452' cy='112' r='2.6' fill='#5b43f1' />
      </svg>

      <section className='screen thin' aria-hidden>
        <div className='bar'>
          <div className='lights'>
            <i />
            <i />
            <i />
          </div>
          <div className='name'>without Odigos</div>
        </div>
        <div className='body'>
          <div className='col'>
            <div className='sparse'>
              <i>
                <span className='have' style={{ left: 0 }} />
                <span className='have' style={{ left: 'calc(21 * var(--px))' }} />
                <span className='have' style={{ left: 'calc(46 * var(--px))' }} />
              </i>
              <i />
              <i />
            </div>

            <div className='metric'>
              <span>p99</span>
              <svg viewBox='0 0 104 27' fill='none' aria-hidden>
                <path
                  d='M1 21 L11 20 L21 21 L31 19 L41 20 L51 18 L61 19 L71 14 L81 9 L91 6 L103 4'
                  stroke='#d8d4c9'
                  strokeWidth='1.25'
                  strokeLinejoin='round'
                  strokeLinecap='round'
                />
              </svg>
            </div>

            <div style={{ marginTop: 'calc(9 * var(--px))' }}>
              <div className='log'>03:11:58&nbsp; POST /checkout 200</div>
              <div className='log'>03:12:04&nbsp; POST /checkout 200</div>
            </div>

            <div className='void'>
              <div className='r' style={{ top: 'calc(6 * var(--px))' }} />
              <div className='r' style={{ top: 'calc(20 * var(--px))' }} />
              <div className='r' style={{ top: 'calc(34 * var(--px))' }} />
              <div className='r' style={{ top: 'calc(48 * var(--px))' }} />
              <div className='say'>
                <b>cause was never recorded</b>
              </div>
            </div>

            <div className='foot'>
              <div className='lab'>resolved in</div>
              <div className='big'>4h 12m</div>
            </div>
          </div>
        </div>
      </section>

      <section className='screen rich' aria-hidden>
        <div className='bar'>
          <div className='lights'>
            <i />
            <i />
            <i />
          </div>
          <div className='name'>with Odigos</div>
          <div className='since'>deep since 02:41</div>
        </div>
        <div className='body'>
          <div className='dense'>
            <i className='d1' />
            <i className='d2' />
            <i className='d3' />
          </div>

          <div className='rows'>
            <div className='row r1'>
              <span className='k'>func</span>
              <span className='v'>applyDiscount</span>
              <span className='far k'>promo.go:41</span>
            </div>
            <div className='row r2'>
              <span>
                applyDiscount(<span className='ok'>&quot;BLACK50&quot;</span>, 49.00) &#8594; <span className='bad'>0.00</span>
              </span>
            </div>
            <div className='row q r3'>
              <div>SELECT rate FROM promo_rules</div>
              <div style={{ display: 'flex' }}>
                <span>WHERE code = &quot;BLACK50&quot;</span>
                <span className='bad' style={{ marginLeft: 'auto' }}>
                  0 rows
                </span>
              </div>
            </div>
            <div className='row r4'>
              <span className='v'>312</span>
              <span>orders charged full price</span>
            </div>
            <div className='row r5'>
              <span className='k'>deploy</span>
              <span className='v'>4812</span>
            </div>
          </div>

          <div className='foot'>
            <div className='lab'>resolved in</div>
            <div className='big'>9 min</div>
          </div>
        </div>
      </section>
    </Panel>
  </Frame>
);
