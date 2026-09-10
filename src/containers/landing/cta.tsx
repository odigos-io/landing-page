'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { ModalType, useModalStore } from '@/store';
import { usePlausible } from '@/hooks';
import { Container, Reveal, HUBSPOT_DEMO_URL } from './primitives';

const Section = styled.section`
  background: var(--paper);
  padding: 56px 0;
`;

const Band = styled(Container)``;

const Card = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 26px;
  background: radial-gradient(120% 140% at 15% 0%, #1a1a20, var(--panel) 55%);
  border: 1px solid var(--panel-line);
  box-shadow: var(--shadow-panel);
  padding: 76px 56px;
  text-align: center;

  @media (max-width: 700px) {
    padding: 52px 24px;
    border-radius: 20px;
  }
`;

const Mesh = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
  background-size: 46px 46px;
  -webkit-mask-image: radial-gradient(70% 90% at 50% 0%, #000, transparent 75%);
  mask-image: radial-gradient(70% 90% at 50% 0%, #000, transparent 75%);
`;

const Glow = styled.div`
  position: absolute;
  top: -120px;
  left: 50%;
  width: 700px;
  height: 460px;
  transform: translateX(-50%);
  pointer-events: none;
  background: radial-gradient(closest-side, rgba(91, 67, 241, 0.34), transparent 70%);
`;

const Eyebrow = styled.div`
  position: relative;
  font-family: var(--font-mono), monospace;
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--panel-mute);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--signal);
  }
`;

const Title = styled.h2`
  position: relative;
  margin: 22px auto 0;
  max-width: 18ch;
  font-size: clamp(28px, 4.4vw, 50px);
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.035em;
  color: #fff;
  text-wrap: balance;
`;

const Ctas = styled.div`
  position: relative;
  margin-top: 36px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
`;

const Primary = styled.button`
  height: 52px;
  padding: 0 24px;
  border-radius: 13px;
  border: none;
  background: var(--paper-2);
  color: var(--ink);
  font-family: var(--font-display), sans-serif;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  transition:
    transform 0.12s ease,
    box-shadow 0.2s ease;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
  &:hover {
    box-shadow: 0 14px 38px -10px rgba(0, 0, 0, 0.6);
  }
  &:active {
    transform: translateY(1px);
  }
  svg {
    transition: transform 0.2s ease;
  }
  &:hover svg {
    transform: translateX(3px);
  }
`;

const Ghost = styled(Link)`
  height: 52px;
  padding: 0 24px;
  border-radius: 13px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.04);
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  transition:
    border-color 0.2s ease,
    background 0.2s ease;
  &:hover {
    border-color: rgba(255, 255, 255, 0.45);
    background: rgba(255, 255, 255, 0.08);
  }
`;

const PrimaryLink = styled(Ghost)`
  background: var(--paper-2);
  color: var(--ink);
  border-color: var(--paper-2);
  &:hover {
    background: #ece9ff;
    border-color: #ece9ff;
  }
`;

const Note = styled.p`
  position: relative;
  margin: 22px auto 0;
  max-width: 54ch;
  font-size: 16px;
  line-height: 1.65;
  color: #c9c7d1;
`;

const CONTENT: Record<
  'platform' | 'security' | 'coding-agents',
  { eyebrow: string; title: string; primaryLabel: string; primaryHref: string | null; secondaryLabel: string; secondaryHref: string; note: string }
> = {
  platform: {
    eyebrow: 'The Production Context Platform',
    title: 'Stop guessing. Ask production.',
    primaryLabel: 'Book an AI demo',
    primaryHref: HUBSPOT_DEMO_URL,
    secondaryLabel: 'Explore Odigos MCP',
    secondaryHref: 'https://docs.odigos.io/enterprise/mcp/overview',
    note: 'One agent. One service. See how Odigos helps answer a production question.',
  },
  security: {
    eyebrow: 'Production context for security',
    title: 'Understand the attack. Contain the threat.',
    primaryLabel: 'Talk to our security team',
    primaryHref: HUBSPOT_DEMO_URL,
    secondaryLabel: 'Explore the technology',
    secondaryHref: '/technology',
    note: 'See the evidence, assess the blast radius and explore the right response for your team.',
  },
  'coding-agents': {
    eyebrow: 'Odigos Enterprise MCP',
    title: 'Bring a production question to your next coding session.',
    primaryLabel: 'See it with your agent',
    primaryHref: HUBSPOT_DEMO_URL,
    secondaryLabel: 'Read the MCP setup guide',
    secondaryHref: 'https://docs.odigos.io/enterprise/mcp/overview',
    note: 'Connect your agent, your instrumentation and your telemetry backend.',
  },
};

export const LandingCTA = ({ audience = 'platform' }: { audience?: keyof typeof CONTENT }) => {
  const setModal = useModalStore((s) => s.setModal);
  const { trackClick } = usePlausible();
  const content = CONTENT[audience];

  return (
    <Section>
      <Band>
        <Reveal>
          <Card>
            <Mesh />
            <Glow />
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <Title>{content.title}</Title>
            <Ctas>
              {content.primaryHref ? (
                <PrimaryLink
                  href={content.primaryHref}
                  data-track='cta'
                  data-track-label={content.primaryLabel}
                  onClick={() => trackClick(content.primaryLabel)}
                >
                  {content.primaryLabel}
                </PrimaryLink>
              ) : (
                <Primary
                  data-track='cta'
                  data-track-label='Start 14-day trial'
                  onClick={() => {
                    trackClick('Start 14-day trial');
                    setModal(ModalType.TRIAL);
                  }}
                >
                  Start 14-day trial
                  <svg width='16' height='16' viewBox='0 0 16 16' fill='none' aria-hidden>
                    <path d='M3 8h9M8.5 3.5 13 8l-4.5 4.5' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' />
                  </svg>
                </Primary>
              )}
              <Ghost href={content.secondaryHref} data-track='cta' data-track-label={content.secondaryLabel} onClick={() => trackClick(content.secondaryLabel)}>
                {content.secondaryLabel}
              </Ghost>
            </Ctas>
            <Note>{content.note}</Note>
          </Card>
        </Reveal>
      </Band>
    </Section>
  );
};
