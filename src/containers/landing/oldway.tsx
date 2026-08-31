'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Container, Eyebrow, Reveal } from './primitives';

const Section = styled.section`
  background: var(--paper);
  border-bottom: 1px solid var(--line);
`;

const Inner = styled(Container)`
  padding-top: 96px;
  padding-bottom: 96px;
  @media (max-width: 1000px) {
    padding-top: 64px;
    padding-bottom: 64px;
  }
`;

const Head = styled.div`
  max-width: 780px;
  h2 {
    margin: 18px 0 0;
    font-size: clamp(28px, 3.6vw, 46px);
    line-height: 1.04;
    font-weight: 600;
    letter-spacing: -0.035em;
    color: var(--ink);
  }
  h2 .mute {
    display: block;
    color: var(--ink-faint);
  }
  p {
    margin: 20px 0 0;
    font-size: 18.5px;
    line-height: 1.55;
    color: var(--ink-soft);
    max-width: 620px;
  }
`;

const Stage = styled.div`
  margin-top: 52px;
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  background: var(--paper-2);
  box-shadow: var(--shadow-soft);
  overflow: hidden;
  @media (max-width: 1000px) {
    margin-top: 38px;
  }
`;

const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 24px;
  background: var(--paper-3);
  border-bottom: 1px solid var(--line);
  font-family: var(--font-mono), monospace;
  font-size: 11.5px;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: var(--ink-faint);
  @media (max-width: 640px) {
    padding: 12px 18px;
  }
`;

const Body = styled.div`
  padding: 30px 24px 26px;
  @media (max-width: 640px) {
    padding: 22px 18px 20px;
  }
`;

const breathe = keyframes`0%,100%{opacity:.6;transform:rotate(0deg) scale(.92)}50%{opacity:1;transform:rotate(45deg) scale(1)}`;

const Msg = styled.div`
  border-left: 2px solid rgba(91, 67, 241, 0.28);
  padding-left: 20px;
  margin-bottom: 26px;
  @media (max-width: 640px) {
    padding-left: 14px;
  }
`;

const From = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 11px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);

  svg {
    flex-shrink: 0;
    transform-origin: center;
    animation: ${breathe} 3.2s ease-in-out infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    svg {
      animation: none;
    }
  }
`;

const Quote = styled.p`
  margin: 0 0 18px;
  font-size: clamp(17px, 1.8vw, 21px);
  line-height: 1.42;
  letter-spacing: -0.015em;
  color: var(--ink);
  max-width: 640px;
`;

const Attached = styled.div`
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-faint);
  margin-bottom: 9px;
`;

const typeIn = keyframes`
  0%,26%{opacity:0;transform:translateX(-6px)}
  34%,100%{opacity:1;transform:none}`;

const Diff = styled.pre`
  margin: 0;
  padding: 20px 22px;
  border-radius: 12px;
  background: #fbfaf7;
  border: 1px solid var(--line);
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: clamp(12.5px, 1.15vw, 14px);
  line-height: 1.85;
  color: var(--ink-mute);
  overflow-x: auto;

  .add {
    display: block;
    margin: 0 -22px;
    padding: 0 22px;
    background: rgba(17, 168, 119, 0.09);
    color: var(--ink);
    animation: ${typeIn} 9s cubic-bezier(0.16, 1, 0.3, 1) infinite;
  }
  .add b {
    color: var(--signal-ink);
    font-weight: 600;
  }
  .cmt {
    color: #a5a29a;
  }
  .tel {
    color: var(--ink-mute);
  }
  .add .why {
    color: rgba(12, 122, 88, 0.72);
    font-weight: 400;
  }
  @media (prefers-reduced-motion: reduce) {
    .add {
      animation: none;
    }
  }
`;

const step = keyframes`
  from{opacity:.28}
  to{opacity:1}`;

const Train = styled.div`
  margin-top: 26px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  .s {
    display: inline-flex;
    align-items: center;
    padding: 9px 15px;
    border-radius: 999px;
    border: 1px solid var(--line);
    background: var(--paper);
    font-size: 14.5px;
    color: var(--ink-mute);
    animation: ${step} 1.6s linear both;
  }
  .s:nth-child(1) {
    animation-delay: 0.4s;
  }
  .s:nth-child(3) {
    animation-delay: 0.9s;
  }
  .s:nth-child(5) {
    animation-delay: 1.4s;
  }
  .s:nth-child(7) {
    animation-delay: 1.9s;
  }
  .a {
    color: var(--line-strong);
    font-size: 15px;
  }
  .cost {
    margin-left: auto;
    display: inline-flex;
    align-items: baseline;
    gap: 9px;
    font-size: 15px;
    color: var(--ink-faint);
    animation: ${step} 1.6s linear both;
    animation-delay: 2.4s;
  }
  .cost b {
    font-size: 22px;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--hot-ink);
  }
  @media (max-width: 780px) {
    .cost {
      margin-left: 0;
      width: 100%;
      margin-top: 6px;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .s,
    .cost {
      animation: none;
    }
  }
`;

const Payoff = styled.div`
  margin-top: 18px;
  padding-top: 20px;
  border-top: 1px solid var(--line);
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  .s {
    display: inline-flex;
    align-items: center;
    padding: 9px 15px;
    border-radius: 999px;
    border: 1px solid rgba(17, 168, 119, 0.34);
    background: var(--signal-soft);
    font-size: 14.5px;
    color: var(--signal-ink);
  }
  .a {
    color: rgba(17, 168, 119, 0.5);
    font-size: 15px;
  }
  .cost {
    margin-left: auto;
    display: inline-flex;
    align-items: baseline;
    gap: 9px;
    font-size: 15px;
    color: var(--ink-faint);
  }
  .cost b {
    font-size: 22px;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--signal-ink);
  }
  @media (max-width: 780px) {
    .cost {
      margin-left: 0;
      width: 100%;
      margin-top: 6px;
    }
  }
`;

export const LandingOldWay = () => {
  return (
    <Section>
      <Inner>
        <Reveal>
          <Head>
            <Eyebrow>What one round of feedback costs</Eyebrow>
            <h2>
              Your AI iterates in seconds. <span className='mute'>Every iteration costs you a deploy.</span>
            </h2>
          </Head>
        </Reveal>

        <Reveal delay={80}>
          <Stage>
            <Bar>
              <span>one turn of the loop</span>
                <span>and what it costs to take it</span>
            </Bar>
            <Body>
              <Msg>
                <From>
                  <svg width='11' height='11' viewBox='0 0 12 12' fill='none' aria-hidden>
                    <path d='M6 0.6c.35 2.6 2.44 4.69 5.04 5.04v.72C8.44 6.71 6.35 8.8 6 11.4h-.72C4.93 8.8 2.84 6.71.24 6.36v-.72C2.84 5.29 4.93 3.2 5.28.6z' fill='currentColor' />
                  </svg>
                  your agent
                </From>
                <Quote>applyDiscount may be returning zero for some carts. Nothing here records what it returned, so ship this and I will know after the next occurrence.</Quote>
                <Attached>suggested change · promo.go · already instrumented since 2024</Attached>
                <Diff>
                  {'  func applyDiscount(code string, cart float64) float64 {\n'}
                  <span className='cmt'>{'      // telemetry somebody wrote when this shipped\n'}</span>
                  <span className='tel'>{'      span := tracer.Start(ctx, "applyDiscount")\n'}</span>
                  <span className='tel'>{'      metrics.Inc("discount.applied")\n'}</span>
                  <span className='tel'>{'      log.Info("discount requested", "code", code)\n'}</span>
                  {'\n'}
                  {'      rule := rules.For(code)\n'}
                  {'      if rule == nil {\n'}
                  <span className='add'>
                    {'+         '}
                    <b>log.Info(&quot;discount&quot;, &quot;code&quot;, code, &quot;returned&quot;, 0.0)</b>
                    <span className='why'>{'   // the only line that answers today'}</span>
                  </span>
                  {'          return 0\n'}
                  {'      }\n'}
                  {'      return cart * rule.Pct'}
                </Diff>
              </Msg>

              <Train>
                <span className='s'>pull request</span>
                <span className='a'>→</span>
                <span className='s'>review</span>
                <span className='a'>→</span>
                <span className='s'>release</span>
                <span className='a'>→</span>
                <span className='s'>wait for it to happen again</span>
                <span className='cost'>
                  <b>6 days</b> for one round of feedback
                </span>
              </Train>

              <Payoff>
                <span className='s'>ask Odigos</span>
                <span className='a'>&rarr;</span>
                <span className='s'>read the value out of the running service</span>
                <span className='cost'>
                  <b>seconds</b> and it can ask the next one
                </span>
              </Payoff>
            </Body>
          </Stage>
        </Reveal>
      </Inner>
    </Section>
  );
};
