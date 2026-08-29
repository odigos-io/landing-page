'use client';

import React from 'react';
import styled from 'styled-components';
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
  max-width: 640px;
  margin-bottom: 56px;
  h2 {
    margin: 18px 0 0;
    font-size: clamp(28px, 3.6vw, 46px);
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  padding: 32px 30px;
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  background: var(--paper-2);
  box-shadow: var(--shadow-soft);
  transition: transform 0.2s ease, box-shadow 0.25s ease, border-color 0.2s ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-lift);
    border-color: var(--line-strong);
  }
  .ic {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: var(--paper-3);
    border: 1px solid var(--line);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--accent);
  }
  h3 {
    margin: 20px 0 0;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--ink);
  }
  p {
    margin: 11px 0 0;
    font-size: 15.5px;
    line-height: 1.6;
    color: var(--ink-mute);
  }
  .metric {
    margin-top: 18px;
    font-family: var(--font-mono), monospace;
    font-size: 12px;
    letter-spacing: 0.02em;
    color: var(--signal-ink);
    display: inline-flex;
    align-items: center;
    gap: 7px;
  }
  .metric::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--signal-bright);
  }
`;

const Bolt = () => (
  <svg width='22' height='22' viewBox='0 0 24 24' fill='none' aria-hidden>
    <path d='M13 2 4 14h6l-1 8 9-12h-6l1-8Z' stroke='currentColor' strokeWidth='1.6' strokeLinejoin='round' />
  </svg>
);
const Shield = () => (
  <svg width='22' height='22' viewBox='0 0 24 24' fill='none' aria-hidden>
    <path d='M12 3 5 6v5c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Z' stroke='currentColor' strokeWidth='1.6' strokeLinejoin='round' />
    <path d='m9 12 2 2 4-4' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);
const Spark = () => (
  <svg width='22' height='22' viewBox='0 0 24 24' fill='none' aria-hidden>
    <path d='M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
    <circle cx='12' cy='12' r='2.4' stroke='currentColor' strokeWidth='1.6' />
  </svg>
);
const Hub = () => (
  <svg width='22' height='22' viewBox='0 0 24 24' fill='none' aria-hidden>
    <circle cx='12' cy='12' r='2.6' stroke='currentColor' strokeWidth='1.6' />
    <circle cx='5' cy='5' r='2' stroke='currentColor' strokeWidth='1.6' />
    <circle cx='19' cy='5' r='2' stroke='currentColor' strokeWidth='1.6' />
    <circle cx='5' cy='19' r='2' stroke='currentColor' strokeWidth='1.6' />
    <circle cx='19' cy='19' r='2' stroke='currentColor' strokeWidth='1.6' />
    <path d='m10.2 10.2-3.6-3.6M13.8 10.2l3.6-3.6M10.2 13.8l-3.6 3.6M13.8 13.8l3.6 3.6' stroke='currentColor' strokeWidth='1.6' />
  </svg>
);

const OUTCOMES = [
  {
    icon: <Spark />,
    title: 'AI SRE agents',
    desc: 'Autonomous incident response and root-cause analysis, running on context captured while the incident is still open.',
    metric: 'Vendor or in-house',
  },
  {
    icon: <Bolt />,
    title: 'Regression agents',
    desc: "One of the world's largest retailers built its own regression agent in-house, on Odigos runtime context.",
    metric: 'Built in-house',
  },
  {
    icon: <Shield />,
    title: 'Security agents',
    desc: 'Runtime detection and response with the full call path behind every signal, not just what crossed the network edge.',
    metric: 'Runtime, not the edge',
  },
  {
    icon: <Hub />,
    title: 'Your engineers',
    desc: 'The same captured data lands in Datadog, Grafana or Splunk, so an engineer can re-run the exact query the agent used to reach its answer.',
    metric: 'One shared truth',
  },
];

export const LandingOutcomes = () => {
  return (
    <Section>
      <Inner>
        <Reveal>
          <Head>
            <Eyebrow>What teams do with it</Eyebrow>
            <h2>One agent on the node. Every team downstream.</h2>
            <p>Your SREs and the agents your engineers build read the same context. One thing to roll out. One thing to secure. Not a different agent per use case, all fighting for the same CPU.</p>
          </Head>
        </Reveal>

        <Grid>
          {OUTCOMES.map((o, i) => (
            <Reveal key={o.title} delay={i * 60}>
              <Card>
                <span className='ic'>{o.icon}</span>
                <h3>{o.title}</h3>
                <p>{o.desc}</p>
                <span className='metric'>{o.metric}</span>
              </Card>
            </Reveal>
          ))}
        </Grid>
      </Inner>
    </Section>
  );
};
