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
  max-width: 820px;
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
`;

const Pair = styled.div`
  margin-top: 52px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
  align-items: stretch;
  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    margin-top: 38px;
  }
`;

const Card = styled.div<{ $ours?: boolean }>`
  display: flex;
  flex-direction: column;
  border-radius: var(--r-lg);
  overflow: hidden;
  border: 1px solid ${({ $ours }) => ($ours ? 'rgba(91,67,241,0.22)' : 'var(--line)')};
  background: var(--paper-2);
  box-shadow: ${({ $ours }) => ($ours ? '0 30px 64px -34px rgba(24,20,54,0.3)' : 'var(--shadow-soft)')};
`;

const CardBar = styled.div<{ $ours?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 13px 22px;
  border-bottom: 1px solid ${({ $ours }) => ($ours ? 'rgba(91,67,241,0.16)' : 'var(--line)')};
  background: ${({ $ours }) => ($ours ? 'rgba(91,67,241,0.05)' : 'var(--paper-3)')};
  font-family: var(--font-mono), monospace;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ $ours }) => ($ours ? 'var(--accent)' : 'var(--ink-faint)')};
  @media (max-width: 560px) {
    padding: 12px 16px;
    font-size: 10px;
  }
`;

const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px 22px 20px;
  @media (max-width: 560px) {
    padding: 20px 16px 18px;
  }
`;

const breathe = keyframes`0%,100%{opacity:.6;transform:rotate(0deg) scale(.92)}50%{opacity:1;transform:rotate(45deg) scale(1)}`;

const From = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  font-family: var(--font-mono), monospace;
  font-size: 10.5px;
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
  margin: 0 0 20px;
  font-size: clamp(15.5px, 1.5vw, 17.5px);
  line-height: 1.45;
  letter-spacing: -0.012em;
  color: var(--ink);
  min-height: 3.2em;
`;

const Label = styled.div`
  font-family: var(--font-mono), monospace;
  font-size: 10.5px;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: var(--ink-faint);
  margin-bottom: 9px;
`;

const Code = styled.pre`
  margin: 0;
  padding: 16px 16px;
  border-radius: 11px;
  background: #fbfaf7;
  border: 1px solid var(--line);
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 11.5px;
  line-height: 1.85;
  color: var(--ink-mute);
  overflow-x: auto;

  .cmt {
    color: #a5a29a;
  }
  .add {
    display: block;
    margin: 0 -16px;
    padding: 0 16px;
    background: rgba(201, 52, 106, 0.07);
    color: var(--ink);
  }
  .add b {
    color: var(--hot-ink);
    font-weight: 600;
  }
`;

/* the agent calling Odigos itself */
const ping = keyframes`0%,100%{transform:scale(1);opacity:.55}50%{transform:scale(1.5);opacity:1}`;
const stepIn = (d: number) => keyframes`
  0%,${d}%{opacity:0;transform:translateY(5px)}
  ${d + 9}%,100%{opacity:1;transform:none}`;

const Calls = styled.div`
  border-radius: 11px;
  border: 1px solid rgba(91, 67, 241, 0.2);
  background: linear-gradient(180deg, #fdfcff, #f8f6ff);
  padding: 15px 15px 16px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 11.5px;
  line-height: 1.6;
`;

const Call = styled.div<{ $d: number }>`
  animation: ${(p) => stepIn(p.$d)} 4.6s ease both;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
  & + & {
    margin-top: 13px;
  }

  .fn {
    display: flex;
    align-items: baseline;
    gap: 8px;
    color: var(--ink);
  }
  .fn i {
    flex-shrink: 0;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--accent);
    transform: translateY(-1px);
    animation: ${ping} 1.9s ease-in-out infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    .fn i {
      animation: none;
    }
  }
  .fn b {
    font-weight: 500;
    color: var(--accent);
  }
  .fn .arg {
    color: var(--ink-mute);
  }
  .fn .str {
    color: var(--signal-ink);
  }

  /* the result branch, drawn rather than typed so it never depends on a glyph */
  .out {
    position: relative;
    margin: 4px 0 0 3px;
    padding-left: 20px;
    color: var(--ink-mute);
  }
  .out::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 9px;
    height: 9px;
    border-left: 1.2px solid rgba(91, 67, 241, 0.4);
    border-bottom: 1.2px solid rgba(91, 67, 241, 0.4);
    border-bottom-left-radius: 3px;
  }
  .out .val {
    color: var(--ink);
  }
  .out b {
    color: var(--hot-ink);
    font-weight: 600;
  }
  .out .ms {
    color: var(--ink-faint);
  }
`;

const Train = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 7px;
  flex-wrap: wrap;

  .s {
    padding: 6px 11px;
    border-radius: 999px;
    border: 1px solid var(--line);
    background: var(--paper);
    font-size: 12.5px;
    color: var(--ink-mute);
  }
  .a {
    color: var(--line-strong);
    font-size: 13px;
  }
`;

const Cost = styled.div<{ $ours?: boolean }>`
  margin-top: auto;
  padding-top: 18px;
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
  font-size: 14.5px;
  color: var(--ink-faint);

  b {
    font-size: 23px;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: ${({ $ours }) => ($ours ? 'var(--signal-ink)' : 'var(--hot-ink)')};
  }
`;

const Spark = () => (
  <svg width='11' height='11' viewBox='0 0 12 12' fill='none' aria-hidden>
    <path d='M6 0.6c.35 2.6 2.44 4.69 5.04 5.04v.72C8.44 6.71 6.35 8.8 6 11.4h-.72C4.93 8.8 2.84 6.71.24 6.36v-.72C2.84 5.29 4.93 3.2 5.28.6z' fill='currentColor' />
  </svg>
);

export const LandingOldWay = () => {
  return (
    <Section>
      <Inner>
        <Reveal>
          <Head>
            <Eyebrow>When your agent hits missing data</Eyebrow>
            <h2>
              Both agents need the same value. <span className='mute'>Only one can go and get it.</span>
            </h2>
          </Head>
        </Reveal>

        <Reveal delay={80}>
          <Pair>
            <Card>
              <CardBar>
                <span>without Odigos</span>
                <span>it opens a pull request</span>
              </CardBar>
              <Body>
                <From>
                  <Spark />
                  your agent
                </From>
                <Quote>I need what applyDiscount returned. Nothing records it, so here is a pull request that adds a log line. Ship it and I will know after the next occurrence.</Quote>

                <Label>the pull request it opens</Label>
                <Code>
                  {'func applyDiscount(code string, cart float64) {\n'}
                  <span className='cmt'>{'    // telemetry written in 2024\n'}</span>
                  {'    span := tracer.Start(ctx, "applyDiscount")\n'}
                  {'    metrics.Inc("discount.applied")\n'}
                  {'\n'}
                  {'    rule := rules.For(code)\n'}
                  {'    if rule == nil {\n'}
                  <span className='add'>
                    {'+       '}
                    <b>log.Info(&quot;returned&quot;, 0.0)</b>
                  </span>
                  {'        return 0'}
                </Code>

                <Train>
                  <span className='s'>pull request</span>
                  <span className='a'>→</span>
                  <span className='s'>review</span>
                  <span className='a'>→</span>
                  <span className='s'>release</span>
                  <span className='a'>→</span>
                  <span className='s'>wait for it to happen again</span>
                </Train>

                <Cost>
                  <b>hours to days</b> for one round of feedback
                </Cost>
              </Body>
            </Card>

            <Card $ours>
              <CardBar $ours>
                <span>with Odigos</span>
                <span>it queries production</span>
              </CardBar>
              <Body>
                <From>
                  <Spark />
                  your agent
                </From>
                <Quote>I need what applyDiscount returned. Nothing records it, so I am reading it out of production now.</Quote>

                <Label>the query it runs instead, over MCP</Label>
                <Calls>
                  <Call $d={4}>
                    <span className='fn'>
                      <i />
                      <span>
                        <b>find_functions</b>
                        <span className='arg'>(</span>
                        <span className='str'>&quot;checkout&quot;</span>
                        <span className='arg'>, </span>
                        <span className='str'>&quot;discount&quot;</span>
                        <span className='arg'>)</span>
                      </span>
                    </span>
                    <span className='out'>
                      84 functions · <span className='val'>applyDiscount</span> promo.go:41
                    </span>
                  </Call>

                  <Call $d={26}>
                    <span className='fn'>
                      <i />
                      <span>
                        <b>capture</b>
                        <span className='arg'>(</span>
                        <span className='str'>&quot;applyDiscount&quot;</span>
                        <span className='arg'>, args, returns)</span>
                      </span>
                    </span>
                    <span className='out'>
                      attached <span className='ms'>in 1.2s</span> · nothing redeployed
                    </span>
                  </Call>

                  <Call $d={48}>
                    <span className='fn'>
                      <i />
                      <span>
                        <b>read</b>
                        <span className='arg'>(</span>
                        <span className='str'>&quot;applyDiscount&quot;</span>
                        <span className='arg'>)</span>
                      </span>
                    </span>
                    <span className='out'>
                      code <span className='val'>&quot;BLACK50&quot;</span> · returned <b>0.00</b>
                    </span>
                  </Call>
                </Calls>

                <Cost $ours>
                  <b>seconds</b> and it can ask the next one
                </Cost>
              </Body>
            </Card>
          </Pair>
        </Reveal>
      </Inner>
    </Section>
  );
};
