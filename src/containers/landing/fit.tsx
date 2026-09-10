'use client';

import React from 'react';
import styled from 'styled-components';
import { Container, Eyebrow, Reveal } from './primitives';
import { BinaryVisual, AiVisual, DepthVisual } from './feature-visuals';

/* The mechanism, once, in the fewest words: what it reads, how it gets
   there, what it feeds. */

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
  max-width: 760px;
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
    margin: 18px 0 0;
    max-width: 640px;
    font-size: 18px;
    line-height: 1.6;
    color: var(--ink-soft);
  }
  p b {
    font-weight: 600;
    color: var(--ink);
  }
`;

const Grid = styled.div`
  margin-top: 48px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    margin-top: 36px;
  }
  & > div {
    height: 100%;
  }
`;

const Card = styled.div`
  height: 100%;
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  background: var(--paper-2);
  box-shadow: var(--shadow-soft);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Panel = styled.div<{ $scale?: number }>`
  position: relative;
  height: 250px;
  flex: none;
  background: linear-gradient(180deg, var(--paper-2), var(--paper));
  border-bottom: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 16px 12px;
  & > * {
    transform: scale(${({ $scale }) => $scale ?? 0.78});
    transform-origin: center;
  }
  @media (max-width: 960px) {
    height: 270px;
    & > * {
      transform: scale(${({ $scale }) => ($scale ?? 0.78) + 0.12});
    }
  }
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 44px;
    background: linear-gradient(180deg, rgba(251, 250, 247, 0), var(--paper));
    pointer-events: none;
  }
`;

const Body = styled.div`
  padding: 20px 22px 24px;
  h3 {
    margin: 0;
    font-size: 19px;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--ink);
  }
  p {
    margin: 8px 0 0;
    font-size: 15px;
    line-height: 1.55;
    color: var(--ink-soft);
  }
`;

const CARDS: { title: string; body: string; visual: React.ReactNode; scale?: number }[] = [
  {
    title: 'Every service on day one',
    body: 'Every language, every version, every binary. Even the ones nobody owns. One command.',
    visual: <BinaryVisual />,
    scale: 0.66,
  },
  {
    title: 'Odigos Autofocus',
    body: 'Captures deeper where a service drifts, inside the scope your policy sets.',
    visual: <AiVisual />,
  },
  {
    title: 'Feeds what you already run',
    body: 'Exports OpenTelemetry into Datadog, Grafana, Splunk or your SIEM. Deeper data, same dashboards, no migration.',
    visual: <DepthVisual />,
  },
];

export const LandingFit = () => (
  <Section>
    <Inner>
      <Reveal>
        <Head>
          <Eyebrow>The technology</Eyebrow>
          <h2>
            Inside every service. <span className='mute'>From outside the code.</span>
          </h2>
          <p>
            <b>Odigos DeepBPF</b> is an eBPF runtime built from scratch to see inside the application, not just the kernel. The functions that ran, the values they carried, as it happens. Under 1% CPU. Nothing loads into your process.
          </p>
        </Head>
      </Reveal>
      <Grid>
        {CARDS.map((c, i) => (
          <Reveal key={c.title} delay={i * 70}>
            <Card>
              <Panel $scale={c.scale}>{c.visual}</Panel>
              <Body>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </Body>
            </Card>
          </Reveal>
        ))}
      </Grid>
    </Inner>
  </Section>
);
