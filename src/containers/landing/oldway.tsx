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
  overflow: hidden;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 11.5px;
`;

const CallsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 14px;
  border-bottom: 1px solid rgba(91, 67, 241, 0.14);
  background: rgba(91, 67, 241, 0.045);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);

  .n {
    color: var(--ink-faint);
    letter-spacing: 0.1em;
    text-transform: none;
  }
`;

const CallList = styled.div`
  padding: 13px 14px 14px;
`;

const Call = styled.div<{ $d: number }>`
  animation: ${(p) => stepIn(p.$d)} 4.2s ease both;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
  & + & {
    margin-top: 13px;
    padding-top: 13px;
    border-top: 1px dashed rgba(91, 67, 241, 0.16);
  }

  .head {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent);
    flex-shrink: 0;
    animation: ${ping} 1.7s ease-in-out infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    .dot {
      animation: none;
    }
  }
  .fn {
    color: var(--accent);
    font-weight: 500;
  }
  .ms {
    margin-left: auto;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    color: var(--ink-faint);
    font-size: 10.5px;
  }
  .ms svg {
    color: var(--signal);
  }
  .args {
    display: block;
    margin-top: 5px;
    padding-left: 14px;
    color: var(--ink-faint);
    line-height: 1.7;
  }
  .args em {
    font-style: normal;
    color: var(--accent);
  }
  .res {
    display: block;
    margin-top: 5px;
    padding-left: 14px;
    color: var(--ink-mute);
    line-height: 1.7;
  }
  .res .ar {
    color: var(--signal);
  }
  .res b {
    color: var(--hot-ink);
    font-weight: 600;
  }
  .res .val {
    color: var(--ink);
  }
`;

const Tick = () => (
  <svg width='9' height='9' viewBox='0 0 14 14' fill='none' aria-hidden>
    <path d='M2 7.4 5.2 10.5 12 3.5' stroke='currentColor' strokeWidth='2.4' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

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
            <Eyebrow>The same incident, twice</Eyebrow>
            <h2>
              Same agent. Same theory. <span className='mute'>Only one of them can check it.</span>
            </h2>
          </Head>
        </Reveal>

        <Reveal delay={80}>
          <Pair>
            <Card>
              <CardBar>
                <span>without Odigos</span>
                <span>it asks you</span>
              </CardBar>
              <Body>
                <From>
                  <Spark />
                  your agent
                </From>
                <Quote>applyDiscount may be returning zero for some carts. Nothing here records what it returned, so ship this and I will know after the next occurrence.</Quote>

                <Label>the change it needs you to make</Label>
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
                <span>it checks for itself</span>
              </CardBar>
              <Body>
                <From>
                  <Spark />
                  your agent
                </From>
                <Quote>applyDiscount may be returning zero for some carts. Nothing here records what it returned, so I will read it out of production myself.</Quote>

                <Label>what it does instead, over MCP</Label>
                <Calls>
                  <CallsBar>
                    <span>mcp · odigos</span>
                    <span className='n'>3 calls · 2.4s</span>
                  </CallsBar>
                  <CallList>
                    <Call $d={4}>
                      <div className='head'>
                        <i className='dot' />
                        <span className='fn'>find_functions</span>
                        <span className='ms'>
                          0.4s <Tick />
                        </span>
                      </div>
                      <span className='args'>
                        service <em>&quot;checkout&quot;</em> · match <em>&quot;discount&quot;</em>
                      </span>
                      <span className='res'>
                        <span className='ar'>&larr;</span> 84 functions · <span className='val'>applyDiscount</span> promo.go:41
                      </span>
                    </Call>

                    <Call $d={26}>
                      <div className='head'>
                        <i className='dot' />
                        <span className='fn'>capture</span>
                        <span className='ms'>
                          1.2s <Tick />
                        </span>
                      </div>
                      <span className='args'>
                        fn <em>&quot;applyDiscount&quot;</em> · args <em>true</em> · returns <em>true</em>
                      </span>
                      <span className='res'>
                        <span className='ar'>&larr;</span> attached · nothing redeployed
                      </span>
                    </Call>

                    <Call $d={48}>
                      <div className='head'>
                        <i className='dot' />
                        <span className='fn'>read</span>
                        <span className='ms'>
                          0.8s <Tick />
                        </span>
                      </div>
                      <span className='res'>
                        <span className='ar'>&larr;</span> code <span className='val'>&quot;BLACK50&quot;</span> · returned <b>0.00</b>
                      </span>
                    </Call>
                  </CallList>
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
