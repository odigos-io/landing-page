'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

/* Bespoke visuals for the "Under the hood" section. Light treatment so the
   body of the page stays cohesively light. Pure CSS/SVG. */

const grow = keyframes`from{transform:scaleX(0)}to{transform:scaleX(1)}`;
const fadeUp = keyframes`from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}`;
const sweep = keyframes`0%{transform:translateX(-120%)}100%{transform:translateX(360%)}`;
const dash = keyframes`to{stroke-dashoffset:0}`;
const flow = keyframes`0%{offset-distance:0%;opacity:0}12%{opacity:1}88%{opacity:1}100%{offset-distance:100%;opacity:0}`;
const pulse = keyframes`0%,100%{opacity:.5;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}`;
const blink = keyframes`0%,49%{opacity:1}50%,100%{opacity:0}`;

const Wrap = styled.div`
  position: relative;
  z-index: 1;
  width: 86%;
  max-width: 380px;
  font-family: var(--font-mono), 'Geist Mono', monospace;
`;

/* ---------------- 1. DEPTH — call stack ---------------- */
const StackRow = styled.div<{ $depth: number; $i: number; $hot?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 46px;
  align-items: center;
  gap: 10px;
  padding-left: ${({ $depth }) => $depth * 18}px;
  margin-bottom: 8px;
  animation: ${grow} 0.5s ease both;
  animation-delay: ${({ $i }) => 0.08 + $i * 0.09}s;
  .label {
    font-size: 11.5px;
    color: ${({ $hot }) => ($hot ? 'var(--hot)' : 'var(--ink-mute)')};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ms {
    text-align: right;
    font-size: 10.5px;
    color: ${({ $hot }) => ($hot ? 'var(--hot)' : 'var(--ink-faint)')};
  }
`;
const Bar = styled.div<{ $w: number; $hot?: boolean; $i: number }>`
  position: relative;
  height: 16px;
  margin-top: 5px;
  border-radius: 5px;
  width: ${({ $w }) => $w}%;
  transform-origin: left;
  animation: ${grow} 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: ${({ $i }) => 0.12 + $i * 0.09}s;
  background: ${({ $hot }) => ($hot ? '#ff3d7a' : 'rgba(91,67,241,.72)')};
  box-shadow: ${({ $hot }) => ($hot ? '0 4px 14px rgba(255,77,133,.32)' : '0 2px 8px rgba(91,67,241,.16)')};
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    width: 30%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.55), transparent);
    animation: ${sweep} 3.4s ease-in-out infinite;
    opacity: ${({ $hot }) => ($hot ? 0.8 : 0.4)};
  }
`;
const Callout = styled.div`
  margin-top: 12px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 11px;
  border-radius: 9px;
  background: rgba(255, 77, 133, 0.08);
  border: 1px solid rgba(255, 77, 133, 0.28);
  font-size: 10.5px;
  color: var(--hot-ink);
  font-family: var(--font-display), sans-serif;
  animation: ${grow} 0.5s ease both;
  animation-delay: 0.7s;
  b {
    color: var(--ink);
  }
`;

const STACK = [
  { name: 'POST /checkout', depth: 0, w: 100, ms: '402ms' },
  { name: 'auth.verify', depth: 1, w: 16, ms: '38ms' },
  { name: 'cart.load', depth: 1, w: 28, ms: '64ms' },
  { name: 'pg.query orders', depth: 2, w: 74, ms: '274ms', hot: true },
  { name: 'cache.set', depth: 1, w: 6, ms: '4ms' },
];

export const DepthVisual = () => (
  <Wrap>
    {STACK.map((s, i) => (
      <div key={s.name}>
        <StackRow $depth={s.depth} $i={i} $hot={s.hot}>
          <span className='label'>
            {s.depth > 0 ? '↳ ' : ''}
            {s.name}
          </span>
          <span className='ms'>{s.ms}</span>
        </StackRow>
        <div style={{ paddingLeft: s.depth * 18 }}>
          <Bar $w={s.w} $hot={s.hot} $i={i} />
        </div>
      </div>
    ))}
    <Callout>
      <b>pg.query orders</b> · missing index · +274ms
    </Callout>
  </Wrap>
);


/* ---------------- 1. INSIDE vs OUTSIDE the service ---------------- */
const InWrap = styled.div`
  width: 100%;
  max-width: 470px;
  padding: 20px 30px 4px;
  display: flex;
  flex-direction: column;
  gap: 0;
  @media (max-width: 700px) {
    padding: 0 2px;
  }
`;

const Cap = styled.div<{ $ours?: boolean }>`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 10.5px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ $ours }) => ($ours ? 'var(--accent)' : 'var(--ink-faint)')};
`;

const seeIn = keyframes`
  from{opacity:0;transform:translateY(9px)}
  to{opacity:1;transform:none}`;

const Box = styled.div<{ $ours?: boolean; $delay: string }>`
  margin-top: 10px;
  border-radius: 13px;
  border: 1px solid ${({ $ours }) => ($ours ? 'rgba(91,67,241,0.3)' : 'var(--line)')};
  background: ${({ $ours }) => ($ours ? 'var(--paper-2)' : 'var(--paper-3)')};
  box-shadow: ${({ $ours }) => ($ours ? '0 14px 34px rgba(24,20,54,0.1)' : 'none')};
  padding: 18px 20px;
  font-family: var(--font-mono), ui-monospace, monospace;
  animation: ${seeIn} 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: ${({ $delay }) => $delay};
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  .line {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 14px;
    font-size: clamp(13px, 1.2vw, 15px);
    color: ${({ $ours }) => ($ours ? 'var(--ink)' : 'var(--ink-mute)')};
  }
  .line + .line {
    margin-top: 10px;
  }
  .v {
    color: var(--accent);
  }
  .bad {
    color: var(--hot-ink);
    font-weight: 600;
  }
  .t {
    color: var(--ink-faint);
    font-size: 12.5px;
  }
`;

const Edge = styled.div`
  margin: 22px 0 6px;
  position: relative;
  height: 1px;
  background: repeating-linear-gradient(90deg, var(--line-strong) 0 6px, transparent 6px 12px);

  span {
    position: absolute;
    top: -9px;
    left: 50%;
    transform: translateX(-50%);
    padding: 0 12px;
    background: var(--paper-2);
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 10.5px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ink-faint);
    white-space: nowrap;
  }
`;

export const BinaryVisual = () => (
  <InWrap>
    <Cap>
      <span>everyone else stops here</span>
      <span>the syscall</span>
    </Cap>
    <Box $delay='0.05s'>
      <div className='line'>
        <span>POST /orders</span>
        <span className='t'>214ms · 200 OK</span>
      </div>
      <div className='line'>
        <span>GET /cart</span>
        <span className='t'>31ms · 200 OK</span>
      </div>
      <div className='line'>
        <span className='t'>that is the whole story they can tell</span>
      </div>
    </Box>

    <Edge>
      <span>the edge of your service</span>
    </Edge>

    <Cap $ours>
      <span>odigos reads here</span>
      <span>inside the code</span>
    </Cap>
    <Box $ours $delay='0.35s'>
      <div className='line'>
        <span>
          applyDiscount(<span className='v'>&quot;BLACK50&quot;</span>, <span className='v'>$49.00</span>)
        </span>
      </div>
      <div className='line'>
        <span>
          returned <span className='bad'>$0.00</span>
        </span>
        <span className='t'>on every call</span>
      </div>
      <div className='line'>
        <span className='t'>the value that explains the drop, out of a running service</span>
      </div>
    </Box>
  </InWrap>
);

/* ---------------- 2. SAFE — overhead gauge ---------------- */
const Gauge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  width: 100%;
`;
const Ring = styled.svg`
  width: 168px;
  height: 168px;
  .track {
    fill: none;
    stroke: rgba(18, 18, 21, 0.08);
    stroke-width: 10;
  }
  .arc {
    fill: none;
    stroke: url(#safeg);
    stroke-width: 10;
    stroke-linecap: round;
    stroke-dasharray: 471;
    stroke-dashoffset: 466;
    animation: ${dash} 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: 0.2s;
  }
`;
const GaugeCenter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  .v {
    font-family: var(--font-display), sans-serif;
    font-size: 34px;
    font-weight: 600;
    letter-spacing: -0.03em;
    color: var(--ink);
  }
  .k {
    margin-top: 2px;
    font-size: 9.5px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ink-mute);
  }
`;
const Pills = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  .pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 10.5px;
    padding: 6px 11px;
    border-radius: 999px;
    border: 1px solid var(--line-strong);
    background: var(--paper-2);
    color: var(--ink-mute);
  }
  .pill .dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--signal);
  }
`;

export const SafeVisual = () => (
  <Wrap style={{ display: 'flex', justifyContent: 'center' }}>
    <Gauge>
      <div style={{ position: 'relative', width: 168, height: 168 }}>
        <Ring viewBox='0 0 168 168'>
          <defs>
            <linearGradient id='safeg' x1='0' y1='0' x2='1' y2='1'>
              <stop stopColor='#12bda9' />
              <stop offset='1' stopColor='#11a877' />
            </linearGradient>
          </defs>
          <circle className='track' cx='84' cy='84' r='75' />
          <circle className='arc' cx='84' cy='84' r='75' transform='rotate(-90 84 84)' />
        </Ring>
        <GaugeCenter>
          <div className='v'>&lt;1%</div>
          <div className='k'>CPU overhead</div>
        </GaugeCenter>
      </div>
      <Pills>
        <span className='pill'>
          <span className='dot' /> out-of-process
        </span>
        <span className='pill'>kernel-enforced</span>
        <span className='pill'>no in-process agent</span>
      </Pills>
    </Gauge>
  </Wrap>
);

/* ---------------- 3. AI — live evidence flow ---------------- */
const Flow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;
const Nodes = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Node = styled.div<{ $accent?: boolean }>`
  position: relative;
  z-index: 2;
  width: 104px;
  padding: 14px 12px;
  border-radius: 13px;
  background: ${({ $accent }) => ($accent ? 'rgba(91,67,241,.07)' : 'var(--paper-3)')};
  border: 1px solid ${({ $accent }) => ($accent ? 'rgba(91,67,241,.32)' : 'var(--line)')};
  text-align: center;
  .ic {
    width: 30px;
    height: 30px;
    margin: 0 auto 9px;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ $accent }) => ($accent ? 'rgba(91,67,241,.12)' : 'var(--paper-2)')};
    border: 1px solid ${({ $accent }) => ($accent ? 'transparent' : 'var(--line)')};
    color: ${({ $accent }) => ($accent ? 'var(--accent)' : 'var(--signal)')};
  }
  .t {
    font-size: 11px;
    color: var(--ink);
    font-weight: 500;
  }
  .s {
    margin-top: 2px;
    font-size: 9.5px;
    color: var(--ink-mute);
  }
`;
const Line = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: visible;
  path {
    fill: none;
    stroke: rgba(18, 18, 21, 0.16);
    stroke-width: 1.5;
    stroke-dasharray: 4 5;
  }
  circle {
    fill: var(--accent);
    offset-path: path('M 104 40 L 276 40');
    animation: ${flow} 2.6s ease-in-out infinite;
  }
`;
const Req = styled.div`
  font-size: 10px;
  color: var(--ink-mute);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  span.dim {
    color: var(--ink-faint);
  }
`;
const Evidence = styled.div`
  width: 100%;
  padding: 11px 13px;
  border-radius: 11px;
  background: var(--signal-soft);
  border: 1px solid rgba(17, 168, 119, 0.25);
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 11px;
  color: var(--ink-soft);
  .chk {
    width: 18px;
    height: 18px;
    border-radius: 6px;
    background: var(--signal);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  b {
    color: var(--ink);
    font-weight: 600;
  }
  .live {
    margin-left: auto;
    font-size: 9px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--signal-ink);
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }
  .live::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--signal-bright);
    animation: ${pulse} 1.8s infinite;
  }
  .caret {
    display: inline-block;
    width: 6px;
    height: 11px;
    background: var(--accent);
    animation: ${blink} 1s steps(1) infinite;
  }
`;
const Spark = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='none' aria-hidden>
    <path d='M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
    <circle cx='12' cy='12' r='2.2' stroke='currentColor' strokeWidth='1.8' />
  </svg>
);
const Cube = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='none' aria-hidden>
    <path d='M12 3 4 7v10l8 4 8-4V7l-8-4Z' stroke='currentColor' strokeWidth='1.6' strokeLinejoin='round' />
    <path d='M4 7l8 4 8-4M12 11v10' stroke='currentColor' strokeWidth='1.6' strokeLinejoin='round' />
  </svg>
);
const Check = () => (
  <svg width='11' height='11' viewBox='0 0 16 16' fill='none' aria-hidden>
    <path d='M3 8.4 6.3 11.7 13 4.5' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

export const AiVisual = () => (
  <Wrap>
    <Flow>
      <Nodes>
        <Node $accent>
          <span className='ic'>
            <Spark />
          </span>
          <div className='t'>AI agent</div>
          <div className='s'>investigating</div>
        </Node>
        <Line viewBox='0 0 380 80' preserveAspectRatio='none'>
          <path d='M 104 40 L 276 40' />
          <circle r='3.5' />
        </Line>
        <Node>
          <span className='ic'>
            <Cube />
          </span>
          <div className='t'>Production</div>
          <div className='s'>342 services</div>
        </Node>
      </Nodes>
      <Req>
        <span className='dim'>asks ❯</span> capture goroutine stack for checkout<span className='caret' />
      </Req>
      <Evidence>
        <span className='chk'>
          <Check />
        </span>
        <span>
          <b>stack + 14 spans</b> returned
        </span>
        <span className='live'>live</span>
      </Evidence>
    </Flow>
  </Wrap>
);
