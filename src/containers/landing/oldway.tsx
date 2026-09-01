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
  padding: 13px 20px;
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

/* the session itself */
const Term = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px 20px 18px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 12px;
  line-height: 1.72;
  @media (max-width: 560px) {
    padding: 16px 14px 16px;
    font-size: 11.5px;
  }
`;

const Ask = styled.div`
  display: flex;
  gap: 9px;
  color: var(--ink);
  padding-bottom: 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid var(--line);

  span:first-child {
    color: var(--ink-faint);
  }
`;

const ping = keyframes`0%,100%{transform:scale(1);opacity:.5}50%{transform:scale(1.45);opacity:1}`;
const stepIn = (d: number) => keyframes`
  0%,${d}%{opacity:0;transform:translateY(4px)}
  ${d + 8}%,100%{opacity:1;transform:none}`;

const Turn = styled.div<{ $d: number }>`
  display: flex;
  gap: 10px;
  animation: ${(p) => stepIn(p.$d)} 6s ease both;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
  & + & {
    margin-top: 13px;
  }

  > i {
    flex-shrink: 0;
    width: 7px;
    height: 7px;
    margin-top: 7px;
    border-radius: 50%;
    background: var(--accent);
  }
  &:last-of-type > i {
    animation: ${ping} 1.9s ease-in-out infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    &:last-of-type > i {
      animation: none;
    }
  }

  .body {
    min-width: 0;
    flex: 1;
  }
  .say {
    display: block;
    color: var(--ink-soft);
  }
  .say b {
    font-weight: 500;
    color: var(--ink);
  }
  .call {
    display: block;
    color: var(--ink);
  }
  .call .srv {
    color: var(--accent);
  }
  .call .arg {
    color: var(--ink-faint);
  }
  .call .str {
    color: var(--signal-ink);
  }

  /* the result branch, drawn so it never depends on a glyph */
  .out {
    display: block;
    position: relative;
    margin-top: 3px;
    padding-left: 18px;
    color: var(--ink-mute);
  }
  .out::before {
    content: '';
    position: absolute;
    left: 1px;
    top: 2px;
    width: 8px;
    height: 8px;
    border-left: 1.2px solid var(--line-strong);
    border-bottom: 1.2px solid var(--line-strong);
    border-bottom-left-radius: 3px;
  }
  .out b {
    color: var(--hot-ink);
    font-weight: 600;
  }
  .out .val {
    color: var(--ink);
  }
`;

/* the inline diff, the way a coding agent shows one */
const Hunk = styled.div`
  margin-top: 7px;
  margin-left: 18px;
  border-left: 1px solid var(--line);
  padding: 2px 0 2px 12px;
  color: var(--ink-mute);

  .ln {
    color: var(--ink-mute);
    padding-right: 12px;
  }
  /* hanging indent so a wrapped code line lines up with the code, not the gutter */
  .row,
  .plus {
    padding-left: 3.4ch;
    text-indent: -3.4ch;
  }
  .plus {
    display: block;
    margin: 0 -0px 0 -12px;
    padding-left: 12px;
    background: rgba(201, 52, 106, 0.07);
    color: var(--ink);
  }
  .plus b {
    color: var(--hot-ink);
    font-weight: 600;
  }
`;

const Cost = styled.div<{ $ours?: boolean }>`
  margin-top: auto;
  padding-top: 20px;
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
  font-family: var(--font-display), sans-serif;
  font-size: 14.5px;
  color: var(--ink-faint);

  b {
    font-size: 23px;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: ${({ $ours }) => ($ours ? 'var(--signal-ink)' : 'var(--hot-ink)')};
  }
`;

const PROMPT = 'why is checkout revenue down 12%';
const OPENER = 'Traces look clean. 200s across POST /orders, p99 flat. The only thing I cannot see into is the discount path.';

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
              <Term>
                <Ask>
                  <span>&gt;</span>
                  <span>{PROMPT}</span>
                </Ask>

                <Turn $d={2}>
                  <i />
                  <div className='body'>
                    <span className='say'>{OPENER}</span>
                  </div>
                </Turn>

                <Turn $d={16}>
                  <i />
                  <div className='body'>
                    <span className='call'>Read(promo.go)</span>
                    <span className='out'>Read 84 lines</span>
                  </div>
                </Turn>

                <Turn $d={30}>
                  <i />
                  <div className='body'>
                    <span className='say'>applyDiscount returns early when the rule lookup misses, and nothing logs what it returned. I cannot confirm this from here.</span>
                  </div>
                </Turn>

                <Turn $d={46}>
                  <i />
                  <div className='body'>
                    <span className='call'>Update(promo.go)</span>
                    <span className='out'>Updated promo.go with 1 addition</span>
                    <Hunk>
                      <span className='ln'>41</span>
                      {'   rule := rules.For(code)'}
                      <br />
                      <span className='ln'>42</span>
                      {'   if rule == nil {'}
                      <br />
                      <span className='plus'>
                        <span className='ln'>43</span>
                        {'+  '}
                        <b>log.Info(&quot;discount&quot;, &quot;returned&quot;, 0.0)</b>
                      </span>
                      <span className='ln'>44</span>
                      {'      return 0'}
                    </Hunk>
                  </div>
                </Turn>

                <Turn $d={64}>
                  <i />
                  <div className='body'>
                    <span className='say'>
                      Opened <b>PR #4471</b>. Once it is reviewed and deployed I will know after the next occurrence.
                    </span>
                  </div>
                </Turn>

                <Cost>
                  <b>hours to days</b> before it can answer
                </Cost>
              </Term>
            </Card>

            <Card $ours>
              <CardBar $ours>
                <span>with Odigos</span>
                <span>it queries production</span>
              </CardBar>
              <Term>
                <Ask>
                  <span>&gt;</span>
                  <span>{PROMPT}</span>
                </Ask>

                <Turn $d={2}>
                  <i />
                  <div className='body'>
                    <span className='say'>{OPENER}</span>
                  </div>
                </Turn>

                <Turn $d={16}>
                  <i />
                  <div className='body'>
                    <span className='call'>
                      <span className='srv'>odigos</span>
                      <span className='arg'> - find_functions(</span>
                      <span className='str'>&quot;checkout&quot;</span>
                      <span className='arg'>, </span>
                      <span className='str'>&quot;discount&quot;</span>
                      <span className='arg'>)</span>
                    </span>
                    <span className='out'>
                      84 functions, <span className='val'>applyDiscount</span> at promo.go:41
                    </span>
                  </div>
                </Turn>

                <Turn $d={32}>
                  <i />
                  <div className='body'>
                    <span className='call'>
                      <span className='srv'>odigos</span>
                      <span className='arg'> - capture(</span>
                      <span className='str'>&quot;applyDiscount&quot;</span>
                      <span className='arg'>, args, returns)</span>
                    </span>
                    <span className='out'>attached in 1.2s, nothing redeployed</span>
                  </div>
                </Turn>

                <Turn $d={48}>
                  <i />
                  <div className='body'>
                    <span className='call'>
                      <span className='srv'>odigos</span>
                      <span className='arg'> - read(</span>
                      <span className='str'>&quot;applyDiscount&quot;</span>
                      <span className='arg'>)</span>
                    </span>
                    <span className='out'>
                      code <span className='val'>&quot;BLACK50&quot;</span>, cart <span className='val'>49.00</span>, returned <b>0.00</b>
                    </span>
                  </div>
                </Turn>

                <Turn $d={64}>
                  <i />
                  <div className='body'>
                    <span className='say'>
                      Found it. <b>BLACK50 is missing from the rules table</b>, so applyDiscount returns 0 and every order using it paid full price.
                    </span>
                  </div>
                </Turn>

                <Cost $ours>
                  <b>seconds</b> and it can ask the next one
                </Cost>
              </Term>
            </Card>
          </Pair>
        </Reveal>
      </Inner>
    </Section>
  );
};
