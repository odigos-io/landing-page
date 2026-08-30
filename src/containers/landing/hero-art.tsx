'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

/* Hero art: the evidence.

   Not a loop, not a diagram of a process. Two blocks. What every tool in the
   category saw, which is nothing wrong. And what Odigos captured out of the
   running system, which is the bug: a promo function returning a zero discount
   on every call, with no error and no latency, for six days.

   The contrast is the argument. A smarter model over the top block never gets
   to the bottom one. */

const DUR = '9s';

const IN = (r: number) => keyframes`
  0%,${r}%{opacity:0;transform:translateY(7px)}
  ${r + 4}%,100%{opacity:1;transform:none}`;

const countIn = (r: number) => keyframes`
  0%,${r}%{opacity:0;transform:translateY(9px) scale(.96)}
  ${r + 5}%,100%{opacity:1;transform:none}`;

const blink = keyframes`0%,100%{opacity:.3}50%{opacity:1}`;
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
  padding: 26px 26px 24px;
  @media (max-width: 1000px) {
    padding: 22px 18px 20px;
  }
`;

const Cap = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-faint);
`;

/* what the rest of the category can see */
const Clean = styled.div<{ $kf: ReturnType<typeof keyframes> }>`
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  animation: ${(p) => p.$kf} ${DUR} cubic-bezier(0.16, 1, 0.3, 1) both;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  span {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 8px 12px;
    border-radius: 999px;
    border: 1px solid var(--line);
    background: var(--paper-3);
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 12px;
    color: var(--ink-faint);
  }
  .ok {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--line-strong);
  }
`;

const Rule = styled.div`
  margin: 22px 0 20px;
  height: 1px;
  background: rgba(24, 20, 54, 0.09);
`;

/* what Odigos pulled out of the running process */
const Evidence = styled.div<{ $kf: ReturnType<typeof keyframes> }>`
  border: 1px solid rgba(255, 61, 122, 0.42);
  background: #fff;
  border-radius: 14px;
  padding: 20px 20px 18px;
  box-shadow: 0 14px 34px rgba(24, 20, 54, 0.1);
  animation: ${(p) => p.$kf} ${DUR} cubic-bezier(0.16, 1, 0.3, 1) both;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  .fn {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: clamp(13px, 1.15vw, 15.5px);
    color: var(--ink);
    letter-spacing: -0.01em;
  }
  .arg {
    display: grid;
    grid-template-columns: 74px 1fr;
    gap: 10px;
    padding-left: 16px;
    margin-top: 7px;
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: clamp(12px, 1.05vw, 14px);
  }
  .k {
    color: var(--ink-faint);
  }
  .v {
    color: var(--accent);
  }
`;

/* the fact that makes the card impossible rather than ordinary */
const Tag = styled.div`
  display: inline-block;
  margin-bottom: 14px;
  padding: 5px 10px;
  border-radius: 7px;
  background: rgba(255, 61, 122, 0.08);
  border: 1px solid rgba(255, 61, 122, 0.28);
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: clamp(11px, 0.95vw, 12.5px);
  letter-spacing: 0.01em;
  color: #c9346a;
`;

const Returned = styled.div`
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px dashed rgba(255, 61, 122, 0.32);
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;

  .lbl {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #b05c7d;
  }
  .val {
    font-size: clamp(30px, 3vw, 42px);
    font-weight: 600;
    letter-spacing: -0.03em;
    color: #d63a6f;
    line-height: 1;
  }
  .was {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: clamp(11.5px, 1vw, 13px);
    color: var(--ink-faint);
    text-decoration: line-through;
    text-decoration-color: rgba(24, 20, 54, 0.3);
  }
`;

/* the line that makes it a scandal rather than a number */
const Kicker = styled.div`
  margin-top: 10px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: clamp(12.5px, 1.1vw, 14.5px);
  letter-spacing: -0.01em;
  color: #c9346a;
`;

const Blast = styled.div<{ $kf: ReturnType<typeof keyframes> }>`
  margin-top: 18px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
  animation: ${(p) => p.$kf} ${DUR} cubic-bezier(0.16, 1, 0.3, 1) both;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  .cost {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: clamp(12px, 1.05vw, 13.5px);
    color: var(--ink);
  }
  .cost b {
    color: #c9346a;
    font-weight: 600;
  }
  .how {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 11px;
    letter-spacing: 0.06em;
    color: var(--signal-ink);
  }
  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #11a877;
    animation: ${blink} 1.7s ease-in-out infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    .dot {
      animation: none;
    }
  }
`;

export const HeroArt = () => {
  return (
    <Frame>
      <Panel>
        <Cap>what the rest of your observability stack saw</Cap>
        <Clean $kf={IN(2)}>
          <span>
            <i className='ok' /> errors 0.1%
          </span>
          <span>
            <i className='ok' /> p99 normal
          </span>
          <span>
            <i className='ok' /> no alerts
          </span>
          <span>
            <i className='ok' /> 12 spans, all green
          </span>
        </Clean>

        <Rule />

        <Cap>what odigos read out of the process</Cap>
        <Evidence $kf={IN(18)}>
          <Tag>never instrumented · no symbols · nothing redeployed</Tag>
          <div className='fn'>applyPromo(</div>
          <div className='arg'>
            <span className='k'>promoId</span>
            <span className='v'>&quot;BLACK50&quot;</span>
          </div>
          <div className='arg'>
            <span className='k'>userId</span>
            <span className='v'>8843</span>
          </div>
          <div className='fn'>)</div>

          <Returned>
            <span className='lbl'>returned</span>
            <span className='val'>0.00</span>
            <span className='was'>should have been 24.50</span>
          </Returned>
          <Kicker>on every call. no error. 4ms.</Kicker>
        </Evidence>

        <Blast $kf={countIn(46)}>
          <span className='cost'>
            running for <b>six days</b> before anyone asked
          </span>
          <span className='how'>
            <i className='dot' /> captured live · nothing in the process · 1.2s
          </span>
        </Blast>
      </Panel>
    </Frame>
  );
};
