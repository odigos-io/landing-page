'use client';

import React from 'react';
import styled, { keyframes, css } from 'styled-components';

/* Hero art: the trace that looks perfect.

   Five spans, every one green, every check passed, 200 OK. Then the two
   attributes that must agree are pulled out of two different spans, and they
   do not. Nothing here is an error. The breach is the relationship between
   two values that no single span contains. */

const T = 9.6;
const p = (s: number) => Math.max(0, Math.min(100, (s / T) * 100));

const rowIn = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0;transform:translateX(-8px)}
  ${p(s + 0.5)}%,100%{opacity:1;transform:none}`;

const tickIn = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0;transform:scale(.4)}
  ${p(s + 0.35)}%,100%{opacity:1;transform:scale(1)}`;

const pull = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0;transform:translateY(10px)}
  ${p(s + 0.6)}%,100%{opacity:1;transform:none}`;

const clash = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0;transform:scale(.5) rotate(-8deg)}
  ${p(s + 0.4)}%{opacity:1;transform:scale(1.25) rotate(0deg)}
  ${p(s + 0.7)}%,100%{opacity:1;transform:scale(1) rotate(0deg)}`;

const flare = (s: number) => keyframes`
  0%,${p(s)}%{box-shadow:0 0 0 0 rgba(201,52,106,0)}
  ${p(s + 0.35)}%{box-shadow:0 0 0 7px rgba(201,52,106,.16)}
  ${p(s + 0.9)}%,100%{box-shadow:0 0 0 0 rgba(201,52,106,0)}`;

const float = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}`;
const blink = keyframes`0%,100%{opacity:.35}50%{opacity:1}`;

const reduce = css`
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: none;
  }
`;

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
  gap: 14px;
  padding: 14px 22px;
  background: var(--paper-3);
  border-bottom: 1px solid var(--line);
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 11.5px;
  color: var(--ink-mute);
  @media (max-width: 1000px) {
    padding: 12px 16px;
    font-size: 11px;
  }

  .ok {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    color: var(--signal-ink);
    white-space: nowrap;
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

const Spans = styled.div`
  padding: 16px 22px 18px;
  @media (max-width: 1000px) {
    padding: 14px 16px 16px;
  }

  @media (max-width: 640px) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    > * {
      width: max-content;
      min-width: 100%;
    }
  }
`;

const Span = styled.div<{ $t: number; $depth: number }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 0;
  padding-left: ${({ $depth }) => $depth * 16}px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: clamp(11.5px, 1.1vw, 13px);
  animation: ${(x) => rowIn(x.$t)} ${T}s cubic-bezier(0.16, 1, 0.3, 1) both;
  ${reduce}

  .fn {
    color: var(--ink);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .lib {
    color: var(--ink-faint);
    flex-shrink: 0;
  }
  .ms {
    margin-left: auto;
    flex-shrink: 0;
    color: var(--ink-faint);
  }
  .tick {
    flex-shrink: 0;
    color: var(--signal);
    display: inline-flex;
    animation: ${(x) => tickIn(x.$t + 0.3)} ${T}s ease both;
    ${reduce}
  }
`;

/* the two values that have to agree */
const Pulled = styled.div<{ $t: number }>`
  border-top: 1px solid var(--line);
  background: linear-gradient(180deg, #fdfcff, #f8f6ff);
  padding: 20px 22px 22px;
  animation: ${(x) => pull(x.$t)} ${T}s cubic-bezier(0.16, 1, 0.3, 1) both;
  ${reduce}
  @media (max-width: 1000px) {
    padding: 16px;
  }

  .cap {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--accent);
  }
`;

const Pair = styled.div`
  margin-top: 14px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  > * {
    min-width: 0;
  }
  align-items: center;
  gap: 14px;
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    > * {
      min-width: 0;
    }
    gap: 10px;
  }
`;

const Val = styled.div<{ $t: number }>`
  padding: 13px 15px;
  border-radius: 11px;
  border: 1px solid rgba(201, 52, 106, 0.34);
  background: var(--paper-2);
  animation: ${(x) => flare(x.$t)} ${T}s ease both;
  ${reduce}

  .k {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 11px;
    color: var(--ink-faint);
  }
  .v {
    margin-top: 5px;
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: clamp(17px, 1.9vw, 22px);
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--hot-ink);
  }
  .src {
    margin-top: 5px;
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 10.5px;
    color: var(--ink-faint);
  }
`;

const Neq = styled.div<{ $t: number }>`
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1.6px solid var(--hot-ink);
  color: var(--hot-ink);
  font-size: 20px;
  font-weight: 600;
  animation: ${(x) => clash(x.$t)} ${T}s cubic-bezier(0.16, 1, 0.3, 1) both;
  ${reduce}
  @media (max-width: 560px) {
    justify-self: start;
    width: 32px;
    height: 32px;
    font-size: 16px;
  }
`;

const Foot = styled.div<{ $t: number }>`
  margin-top: 16px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: clamp(11.5px, 1.1vw, 13px);
  line-height: 1.6;
  color: var(--ink-mute);
  animation: ${(x) => pull(x.$t)} ${T}s ease both;
  ${reduce}

  b {
    color: var(--ink);
    font-weight: 600;
  }
`;

const Tick = () => (
  <svg width='11' height='11' viewBox='0 0 14 14' fill='none' aria-hidden>
    <path d='M2 7.4 5.2 10.5 12 3.5' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

const SPANS = [
  { fn: 'GET /api/portfolios/1002', lib: 'tomcat', ms: '11ms', d: 0, t: 0.2 },
  { fn: 'JwtAuthFilter.authenticate', lib: 'spring-security', ms: '2ms', d: 1, t: 0.9 },
  { fn: 'PortfolioService.getPortfolio', lib: 'spring', ms: '2ms', d: 2, t: 1.6 },
  { fn: 'PortfolioRepository.findById', lib: 'spring-data', ms: '7ms', d: 3, t: 2.3 },
  { fn: 'SELECT ... WHERE id = ?', lib: 'postgresql', ms: '6ms', d: 4, t: 3.0 },
];

export const SecurityArt = () => (
  <Frame>
    <Panel>
      <Bar>
        <span>one request · 8.4M like it in the baseline</span>
        <span className='ok'>
          <i className='dot' />
          200 OK
        </span>
      </Bar>

      <Spans>
        {SPANS.map((s) => (
          <Span key={s.fn} $t={s.t} $depth={s.d}>
            <span className='tick'>
              <Tick />
            </span>
            <span className='fn'>{s.fn}</span>
            <span className='lib'>{s.lib}</span>
            <span className='ms'>{s.ms}</span>
          </Span>
        ))}
      </Spans>

      <Pulled $t={4.4}>
        <div className='cap'>two attributes that must agree</div>
        <Pair>
          <Val $t={5.6}>
            <div className='k'>enduser.id</div>
            <div className='v'>1001</div>
            <div className='src'>from JwtAuthFilter.authenticate</div>
          </Val>
          <Neq $t={6.0}>&ne;</Neq>
          <Val $t={5.6}>
            <div className='k'>return.owner_id</div>
            <div className='v'>1002</div>
            <div className='src'>from PortfolioRepository.findById</div>
          </Val>
        </Pair>
        <Foot $t={6.8}>
          <b>Neither value appears in the HTTP response.</b> Every check passed. The caller read a record they do not own.
        </Foot>
      </Pulled>
    </Panel>
  </Frame>
);
