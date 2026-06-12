'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Container, Eyebrow, Reveal } from './primitives';

const Section = styled.section`
  background: var(--paper-3);
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
  max-width: 640px;
  margin-bottom: 60px;
  h2 {
    margin: 18px 0 0;
    font-size: clamp(28px, 3.6vw, 44px);
    line-height: 1.06;
    font-weight: 600;
    letter-spacing: -0.03em;
    color: var(--ink);
  }
  p {
    margin: 18px 0 0;
    font-size: 18px;
    line-height: 1.6;
    color: var(--ink-soft);
  }
`;

const flow = keyframes`
  0% { transform: translateX(-10%); opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { transform: translateX(420%); opacity: 0; }
`;

const Pipe = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`;

const Connector = styled.div`
  position: absolute;
  top: 64px;
  left: 33.33%;
  width: 33.33%;
  height: 2px;
  transform: translateX(-50%);
  background: repeating-linear-gradient(90deg, var(--line-strong) 0 6px, transparent 6px 12px);
  overflow: visible;
  &::after {
    content: '';
    position: absolute;
    top: -3px;
    left: 0;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--signal-bright);
    box-shadow: 0 0 10px rgba(31, 215, 147, 0.6);
    animation: ${flow} 3s linear infinite;
  }
  &.c2 {
    left: 66.66%;
    &::after {
      animation-delay: 1.5s;
    }
  }
  @media (max-width: 880px) {
    display: none;
  }
`;

const Card = styled.div`
  position: relative;
  background: var(--paper-2);
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  padding: 26px 24px 24px;
  box-shadow: var(--shadow-soft);
`;

const StepTop = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

const Num = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 9px;
  background: var(--ink);
  color: var(--paper-2);
  font-family: var(--font-mono), monospace;
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const StepTag = styled.div`
  font-family: var(--font-mono), monospace;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-faint);
`;

const StepTitle = styled.h3`
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--ink);
`;

const StepDesc = styled.p`
  margin: 0 0 18px;
  font-size: 15px;
  line-height: 1.55;
  color: var(--ink-mute);
`;

/* mini visuals */
const Term = styled.div`
  font-family: var(--font-mono), monospace;
  font-size: 12.5px;
  background: var(--panel);
  border: 1px solid var(--panel-line);
  border-radius: 10px;
  padding: 12px 13px;
  color: #c9c9d2;
  display: flex;
  align-items: center;
  gap: 8px;
  .pmt {
    color: var(--signal-bright);
  }
  .cmd b {
    color: #fff;
    font-weight: 500;
  }
`;

const blink = keyframes`0%,49%{opacity:1}50%,100%{opacity:0}`;
const Caret = styled.span`
  width: 7px;
  height: 14px;
  background: var(--accent);
  display: inline-block;
  margin-left: auto;
  border-radius: 1px;
  animation: ${blink} 1.05s steps(1) infinite;
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  .chip {
    font-family: var(--font-mono), monospace;
    font-size: 11.5px;
    color: var(--ink-soft);
    padding: 7px 11px;
    border-radius: 8px;
    border: 1px solid var(--line);
    background: var(--paper-3);
  }
  .chip.live {
    border-color: rgba(17, 168, 119, 0.3);
    background: var(--signal-soft);
    color: var(--signal);
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .chip.live::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--signal-bright);
  }
`;

const Dests = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  .d {
    font-size: 12px;
    color: var(--ink-soft);
    padding: 7px 12px;
    border-radius: 8px;
    border: 1px solid var(--line);
    background: var(--paper-3);
  }
`;

export const LandingHowItWorks = () => {
  return (
    <Section>
      <Inner>
        <Reveal>
          <Head>
            <Eyebrow>How it works</Eyebrow>
            <h2>Capture runtime context automatically.</h2>
            <p>Our own eBPF runtime captures the context across your entire environment and exports it in OpenTelemetry. No application changes, no developer effort, no operational overhead.</p>
          </Head>
        </Reveal>

        <Reveal delay={70}>
          <Pipe>
            <Connector />
            <Connector className='c2' />

            <Card>
              <StepTop>
                <Num>1</Num>
                <StepTag>Install</StepTag>
              </StepTop>
              <StepTitle>One command, any environment</StepTitle>
              <StepDesc>Install Odigos on Kubernetes or Linux. It maps your applications, infrastructure, data flows, dependencies, and AI workloads automatically.</StepDesc>
              <Term>
                <span className='pmt'>❯</span>
                <span className='cmd'>
                  odigos <b>install</b>
                </span>
                <Caret />
              </Term>
            </Card>

            <Card>
              <StepTop>
                <Num>2</Num>
                <StepTag>Capture</StepTag>
              </StepTop>
              <StepTitle>Runtime context, automatically</StepTitle>
              <StepDesc>The eBPF runtime reconstructs the functions, queries, and dependencies behind live traffic in real time. No code changes, no manual instrumentation. Any signal, the moment you need it.</StepDesc>
              <Chips>
                <span className='chip live'>eBPF probe attached</span>
                <span className='chip'>trace</span>
                <span className='chip'>profile</span>
                <span className='chip'>logs</span>
              </Chips>
            </Card>

            <Card>
              <StepTop>
                <Num>3</Num>
                <StepTag>Use</StepTag>
              </StepTop>
              <StepTitle>Context for every consumer</StepTitle>
              <StepDesc>Export it to your stack, your teams, and your AI in OpenTelemetry, with zero lock-in. Observe, explain, secure, act.</StepDesc>
              <Dests>
                <span className='d'>Datadog</span>
                <span className='d'>Grafana</span>
                <span className='d'>Splunk</span>
                <span className='d'>your AI</span>
              </Dests>
            </Card>
          </Pipe>
        </Reveal>
      </Inner>
    </Section>
  );
};
