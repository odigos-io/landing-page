'use client';

import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { Container, Reveal } from './primitives';

const Section = styled.section`
  background: var(--paper-3);
  border-bottom: 1px solid var(--line);
`;

const Inner = styled(Container)`
  padding-top: 56px;
  padding-bottom: 56px;
  display: flex;
  align-items: center;
  gap: 48px;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 28px;
  }
`;

const Left = styled.div`
  flex-shrink: 0;
  max-width: 320px;
  .otel {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    font-family: var(--font-mono), monospace;
    font-size: 11.5px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ink-mute);
  }
  .otel img {
    filter: grayscale(1) brightness(0);
    opacity: 0.55;
  }
  h3 {
    margin: 14px 0 0;
    font-size: 23px;
    font-weight: 600;
    letter-spacing: -0.025em;
    line-height: 1.15;
    color: var(--ink);
  }
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  .chip {
    font-size: 14px;
    font-weight: 450;
    color: var(--ink-soft);
    padding: 9px 15px;
    border-radius: 10px;
    border: 1px solid var(--line);
    background: var(--paper-2);
    transition: border-color 0.18s ease, color 0.18s ease;
  }
  .chip:hover {
    border-color: var(--line-strong);
    color: var(--ink);
  }
  .more {
    color: var(--ink-mute);
    border-style: dashed;
  }
`;

const DESTINATIONS = ['Datadog', 'Grafana', 'New Relic', 'Splunk', 'Honeycomb', 'Jaeger', 'Tempo', 'Loki', 'Prometheus', 'SigNoz'];

export const LandingIntegrations = () => {
  return (
    <Section>
      <Inner>
        <Reveal>
          <Left>
            <span className='otel'>
              <Image src='/assets/opentelemetry.svg' alt='OpenTelemetry' width={16} height={16} />
              OpenTelemetry native
            </span>
            <h3>Send your data anywhere. No lock-in.</h3>
          </Left>
        </Reveal>
        <Reveal delay={80}>
          <Chips>
            {DESTINATIONS.map((d) => (
              <span className='chip' key={d}>
                {d}
              </span>
            ))}
            <span className='chip more'>+ 40 more</span>
          </Chips>
        </Reveal>
      </Inner>
    </Section>
  );
};
