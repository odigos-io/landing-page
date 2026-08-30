'use client';

import React from 'react';
import styled, { keyframes, css } from 'styled-components';

/* Hero art: the code, with production's answers sitting next to it.

   Every competitor in this category puts a dashboard in the hero. None of
   them show code. This shows the function, and beside each line the values
   it actually ran with a minute ago in production. The bug is visible in the
   picture: the rule lookup came back empty, so a valid zero went out as the
   discount and nothing ever threw. */

const T = 6.8;
const p = (s: number) => Math.max(0, Math.min(100, (s / T) * 100));

const arrive = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0;transform:translateX(-8px)}
  ${p(s + 0.45)}%,100%{opacity:1;transform:none}`;

const fin = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0}
  ${p(s + 0.5)}%,100%{opacity:1}`;

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
  padding: 15px 24px;
  background: var(--paper-3);
  border-bottom: 1px solid var(--line);
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 11.5px;
  color: var(--ink-mute);
  @media (max-width: 1000px) {
    padding: 13px 16px;
  }

  .live {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    font-size: 10.5px;
    color: var(--signal-ink);
    white-space: nowrap;
  }
  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--signal);
    animation: ${blink} 1.9s ease-in-out infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    .dot {
      animation: none;
    }
  }
`;

const Call = styled.div<{ $t: number }>`
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
  padding: 14px 24px;
  border-bottom: 1px solid var(--line);
  background: rgba(91, 67, 241, 0.035);
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: clamp(12.5px, 1.2vw, 14.5px);
  color: var(--ink);
  animation: ${(x) => arrive(x.$t)} ${T}s cubic-bezier(0.16, 1, 0.3, 1) both;
  ${reduce}
  @media (max-width: 1000px) {
    padding: 12px 16px;
  }

  .lbl {
    font-size: 10.5px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ink-faint);
  }
  .v {
    color: var(--accent);
  }
`;

const Code = styled.div`
  padding: 24px 24px 10px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: clamp(13px, 1.25vw, 15px);
  line-height: 2.15;
  @media (max-width: 1000px) {
    padding: 18px 16px 8px;
    line-height: 2;
  }
`;

const Line = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;

  .c {
    color: var(--ink);
    white-space: pre;
  }
  .kw {
    color: #8b6cf0;
  }
  .fn {
    color: var(--ink);
  }
  .lit {
    color: var(--ink-faint);
  }
`;

const Val = styled.span<{ $t: number; $bad?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  padding: 3px 10px;
  border-radius: 7px;
  font-size: clamp(11.5px, 1.1vw, 13px);
  line-height: 1.5;
  background: ${({ $bad }) => ($bad ? 'rgba(255,93,143,0.1)' : 'rgba(91,67,241,0.07)')};
  border: 1px solid ${({ $bad }) => ($bad ? 'rgba(255,93,143,0.34)' : 'rgba(91,67,241,0.18)')};
  color: ${({ $bad }) => ($bad ? 'var(--hot-ink)' : 'var(--accent)')};
  font-weight: ${({ $bad }) => ($bad ? 600 : 400)};
  margin-left: auto;
  animation: ${(x) => arrive(x.$t)} ${T}s cubic-bezier(0.16, 1, 0.3, 1) both;
  ${reduce}
`;

const Foot = styled.div<{ $t: number }>`
  margin-top: 6px;
  padding: 16px 24px 20px;
  border-top: 1px solid var(--line);
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 12px;
  color: var(--ink-faint);
  animation: ${(x) => fin(x.$t)} ${T}s cubic-bezier(0.16, 1, 0.3, 1) both;
  ${reduce}
  @media (max-width: 1000px) {
    padding: 14px 16px 16px;
  }

  b {
    color: var(--signal-ink);
    font-weight: 500;
  }
  .sep {
    color: var(--line-strong);
  }
`;

export const HeroArt = () => (
  <Frame>
    <Panel>
      <Bar>
        <span>checkout-svc / promo.go</span>
        <span className='live'>
          <i className='dot' />
          values from production
        </span>
      </Bar>

      <Call $t={0.5}>
        <span className='lbl'>the call we captured</span>
        <span>
          Apply(code <span className='v'>&quot;BLACK50&quot;</span>, cart <span className='v'>49.00</span>)
        </span>
      </Call>

      <Code>
        <Line>
          <span className='c'>
            <span className='kw'>func</span> Apply(code <span className='kw'>string</span>, cart <span className='kw'>float64</span>) <span className='kw'>float64</span> {'{'}
          </span>
        </Line>

        <Line>
          <span className='c'>{'    '}rule := rules.For(code)</span>
          <Val $t={1.4} $bad>
            rule = nil
          </Val>
        </Line>

        <Line>
          <span className='c'>
            {'    '}
            <span className='kw'>if</span> rule == nil {'{'}
          </span>
        </Line>

        <Line>
          <span className='c'>
            {'        '}
            <span className='kw'>return</span> 0
          </span>
          <Val $t={2.3} $bad>
            returned $0.00 to the customer
          </Val>
        </Line>

        <Line>
          <span className='c'>{'    }'}</span>
        </Line>

        <Line>
          <span className='c'>
            {'    '}
            <span className='kw'>return</span> cart * rule.Pct
          </span>
          <Val $t={3.1}>never reached</Val>
        </Line>

        <Line>
          <span className='c'>{'}'}</span>
        </Line>
      </Code>

      <Foot $t={3.9}>
        <b>read from 41,208 live calls</b>
        <span className='sep'>·</span>
        1.2 seconds
        <span className='sep'>·</span>
        no code change
      </Foot>
    </Panel>
  </Frame>
);
