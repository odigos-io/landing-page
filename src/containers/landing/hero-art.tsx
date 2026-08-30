'use client';

import React from 'react';
import styled, { keyframes, css } from 'styled-components';

/* Hero art: the ladder.

   The big promise, not the function detail. An agent starts at the whole
   estate and walks down until the picture is one value, then walks back up
   and goes again. Resolution is drawn as type size, so the descent is legible
   without a caption, and the rail on the left carries both directions. */

const T = 7.4;
const p = (s: number) => Math.max(0, Math.min(100, (s / T) * 100));

const step = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0;transform:translateY(8px)}
  ${p(s + 0.5)}%,100%{opacity:1;transform:none}`;

const fin = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0}
  ${p(s + 0.5)}%,100%{opacity:1}`;

const draw = keyframes`from{transform:scaleY(0)}to{transform:scaleY(1)}`;
const float = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}`;

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
  padding: 15px 26px;
  background: var(--paper-3);
  border-bottom: 1px solid var(--line);
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 10.5px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--ink-faint);
  @media (max-width: 1000px) {
    padding: 13px 18px;
    font-size: 10px;
  }

  .both {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    color: var(--accent);
    white-space: nowrap;
  }
`;

const Body = styled.div`
  position: relative;
  padding: 26px 30px 22px 58px;
  @media (max-width: 1000px) {
    padding: 20px 18px 18px 46px;
  }
`;

/* the rail: one shaft, two directions */
const Rail = styled.div`
  position: absolute;
  left: 30px;
  top: 32px;
  bottom: 30px;
  width: 2px;
  background: linear-gradient(180deg, rgba(91, 67, 241, 0.5), rgba(17, 168, 119, 0.5));
  transform-origin: top center;
  animation: ${draw} 1.1s cubic-bezier(0.16, 1, 0.3, 1) both;
  @media (max-width: 1000px) {
    left: 22px;
  }
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Pip = styled.i<{ $t: number; $last?: boolean }>`
  position: absolute;
  left: -33px;
  @media (max-width: 1000px) {
    left: -29px;
  }
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid ${({ $last }) => ($last ? 'var(--accent)' : 'rgba(91,67,241,0.42)')};
  background: ${({ $last }) => ($last ? 'var(--accent)' : 'var(--paper-2)')};
  animation: ${(x) => fin(x.$t)} ${T}s ease both;
  ${reduce}
`;

const Rung = styled.div<{ $t: number; $i: number; $last?: boolean }>`
  position: relative;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  padding: ${({ $last }) => ($last ? '18px 0 4px' : '11px 0')};
  border-top: ${({ $i }) => ($i === 0 ? 'none' : '1px solid var(--line)')};
  animation: ${(x) => step(x.$t)} ${T}s cubic-bezier(0.16, 1, 0.3, 1) both;
  ${reduce}

  .scope {
    font-size: ${({ $i, $last }) => ($last ? '26px' : `${14 + $i * 2.3}px`)};
    font-weight: ${({ $last }) => ($last ? 600 : 500)};
    letter-spacing: ${({ $last }) => ($last ? '-0.03em' : '-0.015em')};
    line-height: 1.25;
    color: ${({ $last }) => ($last ? 'var(--ink)' : 'var(--ink-mute)')};
  }
  .saw {
    flex-shrink: 0;
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: ${({ $last }) => ($last ? '15px' : '12.5px')};
    color: ${({ $last }) => ('var(--ink-faint)')};
  }
  .saw b {
    font-weight: 600;
    color: var(--hot-ink);
  }
  @media (max-width: 480px) {
    .scope {
      font-size: ${({ $i, $last }) => ($last ? '22px' : `${13 + $i}px`)};
    }
  }
`;

const Again = styled.div<{ $t: number }>`
  position: relative;
  margin-top: 18px;
  display: flex;
  align-items: center;
  gap: 9px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 12px;
  color: var(--signal-ink);
  animation: ${(x) => fin(x.$t)} ${T}s ease both;
  ${reduce}
`;

const Foot = styled.div<{ $t: number }>`
  padding: 16px 22px 20px;
  border-top: 1px solid var(--line);
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 11.5px;
  color: var(--ink-faint);
  animation: ${(x) => fin(x.$t)} ${T}s ease both;
  ${reduce}
  @media (max-width: 1000px) {
    padding: 14px 18px 16px;
  }

  .sep {
    color: var(--line-strong);
  }
`;

const UpDown = () => (
  <svg width='13' height='13' viewBox='0 0 14 14' fill='none' aria-hidden>
    <path d='M4 1.5v11m-2.2-2.2L4 12.5l2.2-2.2M10 12.5v-11m-2.2 2.2L10 1.5l2.2 2.2' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

const LADDER: { scope: string; saw: React.ReactNode }[] = [
  { scope: '400 services', saw: 'nothing is failing' },
  { scope: 'one service', saw: 'checkout, p99 flat' },
  { scope: 'one request', saw: 'POST /orders, 214ms' },
  { scope: 'one function', saw: 'promo.Apply, no error' },
];

export const HeroArt = () => (
  <Frame>
    <Panel>
      <Bar>
        <span>your agent, moving through production</span>
        <span className='both'>
          <UpDown />
          both directions
        </span>
      </Bar>

      <Body>
        <Rail />
        {LADDER.map((r, i) => (
          <Rung key={r.scope} $t={0.4 + i * 0.55} $i={i}>
            <Pip $t={0.4 + i * 0.55} />
            <span className='scope'>{r.scope}</span>
            <span className='saw'>{r.saw}</span>
          </Rung>
        ))}

        <Rung $t={2.8} $i={4} $last>
          <Pip $t={2.8} $last />
          <span className='scope'>one value</span>
          <span className='saw'>
            it returned <b>$0.00</b> instead of $24.50
          </span>
        </Rung>

        <Again $t={3.8}>
          <UpDown />
          then back up, and down again, until it is not a theory
        </Again>
      </Body>

      <Foot $t={4.4}>
        any service in the cluster
        <span className='sep'>·</span>
        about a second per step
        <span className='sep'>·</span>
        no code change
      </Foot>
    </Panel>
  </Frame>
);
