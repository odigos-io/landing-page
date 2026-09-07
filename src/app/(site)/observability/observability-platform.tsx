'use client';

import React from 'react';
import styled from 'styled-components';
import { Container, Eyebrow, Reveal } from '@/containers/landing/primitives';

/* The three parts of the platform an observability buyer asks about after
   the demo: the control plane, the pipeline, and Autofocus. Moved here from
   the old product overview so one page carries the whole story. */

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
  max-width: 820px;
  margin-bottom: 44px;
  h2 {
    margin: 18px 0 0;
    font-size: clamp(28px, 3.6vw, 46px);
    line-height: 1.05;
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
    max-width: 640px;
    font-size: 18px;
    line-height: 1.6;
    color: var(--ink-soft);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  @media (max-width: 900px) {
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
    color: var(--accent);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h3 {
    margin: 20px 0 0;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--ink);
  }
  & > p {
    margin: 11px 0 0;
    font-size: 15.5px;
    line-height: 1.6;
    color: var(--ink-mute);
  }
`;

const Bullets = styled.ul`
  margin: 18px 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Bullet = styled.li`
  display: grid;
  grid-template-columns: 16px 1fr;
  gap: 10px;
  font-size: 14.5px;
  line-height: 1.5;
  color: var(--ink-mute);
  .dot {
    margin-top: 8px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--signal-bright);
  }
  b {
    color: var(--ink);
    font-weight: 600;
  }
`;

const CentralIcon = () => (
  <svg width='22' height='22' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
    <rect x='4' y='3' width='16' height='5' rx='1.4' stroke='currentColor' strokeWidth='1.6' />
    <rect x='4' y='14' width='16' height='5' rx='1.4' stroke='currentColor' strokeWidth='1.6' />
    <path d='M8 5.5h.01M8 16.5h.01' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
  </svg>
);

const PipelineIcon = () => (
  <svg width='22' height='22' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
    <path d='M3 7h11M3 12h18M3 17h8' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
    <circle cx='18' cy='7' r='2.2' stroke='currentColor' strokeWidth='1.6' />
    <circle cx='15' cy='17' r='2.2' stroke='currentColor' strokeWidth='1.6' />
  </svg>
);

const AutofocusIcon = () => (
  <svg width='22' height='22' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
    <path d='M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
    <circle cx='12' cy='12' r='2.4' stroke='currentColor' strokeWidth='1.6' />
  </svg>
);

const PILLARS = [
  {
    icon: <CentralIcon />,
    title: 'Odigos Central',
    desc: 'One control plane for every fleet. Manage, scale and govern the whole estate without touching application code.',
    bullets: [
      <>
        <b>Capture scope, masking and approval</b> set once, across the organization
      </>,
      <>
        <b>One view</b> across Kubernetes, virtual machines and bare metal
      </>,
      <>
        <b>Authentication, RBAC and audit trail</b> in one place
      </>,
    ],
  },
  {
    icon: <PipelineIcon />,
    title: 'Pipeline',
    desc: 'Your telemetry, your rules. Shape every signal in your own cluster and send it anywhere. No vendor owns your data.',
    bullets: [
      <>
        <b>Enrich and transform</b> with custom attributes, masking and aggregation
      </>,
      <>
        <b>Sampling</b> that keeps what matters and cuts the bill
      </>,
      <>
        <b>Send anywhere:</b> any OpenTelemetry backend, zero lock-in
      </>,
    ],
  },
  {
    icon: <AutofocusIcon />,
    title: 'Odigos Autofocus',
    desc: 'It senses where the fire is and looks there first. When a service drifts, capture deepens on that path before anyone asks.',
    bullets: [
      <>
        <b>Follows the drift:</b> deeper capture starts the moment a service degrades
      </>,
      <>
        <b>On request too:</b> any function, any service, in seconds, without a redeploy
      </>,
      <>
        <b>Inside your limits:</b> scope and approval set once, every capture audited
      </>,
    ],
  },
];

export const ObservabilityPlatform = () => (
  <Section>
    <Inner>
      <Reveal>
        <Head>
          <Eyebrow>The platform underneath</Eyebrow>
          <h2>
            One install. <span className='mute'>Governed end to end.</span>
          </h2>
          <p>Central control, your data on your terms, and capture that moves to the problem on its own. From ten services to tens of thousands without changing how teams work.</p>
        </Head>
      </Reveal>
      <Grid>
        {PILLARS.map((p, i) => (
          <Reveal key={p.title} delay={i * 60}>
            <Card>
              <span className='ic'>{p.icon}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <Bullets>
                {p.bullets.map((b, bi) => (
                  <Bullet key={bi}>
                    <span className='dot' />
                    <span>{b}</span>
                  </Bullet>
                ))}
              </Bullets>
            </Card>
          </Reveal>
        ))}
      </Grid>
    </Inner>
  </Section>
);
