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

const Quote = styled.p`
  margin: 0 0 26px;
  font-size: clamp(17px, 1.8vw, 21px);
  line-height: 1.4;
  letter-spacing: -0.015em;
  color: var(--ink);
  max-width: 640px;
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
  @media (prefers-reduced-motion: reduce) {
    .add {
      animation: none;
    }
  }
`;

const step = keyframes`
  0%,8%{opacity:.28}
  16%,100%{opacity:1}`;

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
    animation: ${step} 9s linear infinite;
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
    animation: ${step} 9s linear infinite;
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
  margin-top: 30px;
  padding-top: 24px;
  border-top: 1px solid var(--line);
  display: flex;
  align-items: baseline;
  gap: 14px;
  flex-wrap: wrap;
  font-size: clamp(17px, 1.7vw, 20px);
  letter-spacing: -0.015em;
  color: var(--ink);

  b {
    font-weight: 600;
  }
  .t {
    font-family: var(--font-mono), monospace;
    font-size: 14px;
    color: var(--signal-ink);
    padding: 5px 11px;
    border-radius: 999px;
    background: var(--signal-soft);
  }
`;

export const LandingOldWay = () => {
  return (
    <Section>
      <Inner>
        <Reveal>
          <Head>
            <Eyebrow>The part AI did not make faster</Eyebrow>
            <h2>
              Writing the fix was never the hard part. <span className='mute'>Knowing what to fix is.</span>
            </h2>
            <p>An agent can read every line of your repository, form a theory and open the pull request. What it cannot do is find out what the code actually did in production, because nobody recorded that value. So the work comes back to your team, and the answer waits for a release.</p>
          </Head>
        </Reveal>

        <Reveal delay={80}>
          <Stage>
            <Bar>
              <span>what comes back instead of an answer</span>
              <span>every time</span>
            </Bar>
            <Body>
              <Quote>&ldquo;The rule lookup inside applyDiscount is probably coming back empty for some carts. I cannot confirm that from the data I have. Add this log line, ship it, and I will tell you after the next occurrence.&rdquo;</Quote>

              <Diff>
                {'  func applyDiscount(code string, cart float64) float64 {\n'}
                {'      rule := rules.For(code)\n'}
                <span className='add'>
                  {'+     '}
                  <b>log.Info(&quot;promo&quot;, &quot;code&quot;, code, &quot;rule&quot;, rule)</b>
                </span>
                {'      if rule == nil {\n'}
                {'          return 0\n'}
                {'      }'}
              </Diff>

              <Train>
                <span className='s'>pull request</span>
                <span className='a'>→</span>
                <span className='s'>review</span>
                <span className='a'>→</span>
                <span className='s'>release</span>
                <span className='a'>→</span>
                <span className='s'>wait for it to happen again</span>
                <span className='cost'>
                  <b>6 days</b> before anyone knows if the theory was right
                </span>
              </Train>

              <Payoff>
                <span>
                  Odigos answers it now, <b>without touching the code.</b>
                </span>
                <span className='t'>seconds</span>
              </Payoff>
            </Body>
          </Stage>
        </Reveal>
      </Inner>
    </Section>
  );
};
