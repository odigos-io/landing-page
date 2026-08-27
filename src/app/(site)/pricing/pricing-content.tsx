'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { LandingHeader, LandingFooter } from '@/containers/landing';
import { Container, Eyebrow, Reveal, TrialCTA, DemoCTA } from '@/containers/landing/primitives';
import { ModalType, useModalStore } from '@/store';
import { usePlausible } from '@/hooks';
import { PLANS, FAQ, GITHUB_LINK } from '@/constants';

const HUBSPOT_DEMO_URL =
  'https://cta-service-cms2.hubspot.com/web-interactives/public/v1/track/redirect?encryptedPayload=AVxigLKKpYFkaGHLV2SjisuKL8vGZv8GBmHLZBbEO8WEPKpvVFGLbCJ75h5TYp0EunqgNph6y6otczaQIcIVW%2Bjg6QKGujbcqjfJbc0ppMX0vfLpYVru76VnnU3%2FWnz91xJehZPt8GVQCH9oQWAKvhLTOMypjCua0VKp16%2Bf%2BFCDMSrqktcXUfrk&webInteractiveContentId=208657275164&portalId=50932826';

/* ----------------------------------------------------------------
   Shared section scaffolding
----------------------------------------------------------------- */
const Section = styled.section<{ $alt?: boolean }>`
  background: ${({ $alt }) => ($alt ? 'var(--paper-3)' : 'var(--paper)')};
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
  max-width: 680px;
  margin-bottom: 56px;
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

/* ----------------------------------------------------------------
   Hero
----------------------------------------------------------------- */
const Hero = styled(Container)`
  padding-top: 112px;
  padding-bottom: 72px;
  @media (max-width: 1000px) {
    padding-top: 80px;
    padding-bottom: 56px;
  }
`;

const HeroHead = styled.div`
  max-width: 760px;
  h1 {
    margin: 18px 0 0;
    font-size: clamp(28px, 4.4vw, 50px);
    line-height: 1.06;
    font-weight: 600;
    letter-spacing: -0.035em;
    color: var(--ink);
  }
  p {
    margin: 22px 0 0;
    font-size: 18px;
    line-height: 1.6;
    color: var(--ink-soft);
  }
`;

const HeroCtas = styled.div`
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const HeroNote = styled.p`
  margin: 22px 0 0;
  font-family: var(--font-mono), monospace;
  font-size: 12px;
  letter-spacing: 0.04em;
  color: var(--ink-mute);
`;

/* ----------------------------------------------------------------
   Tier cards
----------------------------------------------------------------- */
const Tiers = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const Tier = styled.div<{ $featured?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 34px 32px;
  border: 1px solid ${({ $featured }) => ($featured ? 'var(--line-strong)' : 'var(--line)')};
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
  .price {
    margin: 16px 0 0;
    display: flex;
    align-items: baseline;
    gap: 8px;
    .amount {
      font-size: 34px;
      font-weight: 600;
      letter-spacing: -0.03em;
      color: var(--ink);
    }
    .unit {
      font-family: var(--font-mono), monospace;
      font-size: 12px;
      letter-spacing: 0.04em;
      color: var(--ink-mute);
    }
  }
  .desc {
    margin: 12px 0 0;
    font-size: 15.5px;
    line-height: 1.6;
    color: var(--ink-mute);
  }
`;

const FeaturedTag = styled.span`
  position: absolute;
  top: 20px;
  right: 20px;
  font-family: var(--font-mono), monospace;
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
  padding: 5px 10px;
  border-radius: 999px;
  border: 1px solid var(--line-strong);
  background: var(--accent-soft);
`;

const TierActions = styled.div`
  margin-top: 26px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  & > * {
    width: 100%;
  }
`;

const GitHubBtn = styled(Link)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 50px;
  padding: 0 22px;
  border-radius: 12px;
  font-family: var(--font-display), 'Geist', sans-serif;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -0.01em;
  text-decoration: none;
  background: var(--paper-2);
  color: var(--ink);
  border: 1px solid var(--line-strong);
  transition: border-color 0.2s ease, background 0.2s ease;
  &:hover {
    border-color: var(--ink);
  }
  &:active {
    transform: translateY(1px);
  }
`;

const SalesBtn = styled(Link)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 50px;
  padding: 0 22px;
  border-radius: 12px;
  font-family: var(--font-display), 'Geist', sans-serif;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -0.01em;
  text-decoration: none;
  background: var(--paper-2);
  color: var(--ink);
  border: 1px solid var(--line-strong);
  transition: border-color 0.2s ease, background 0.2s ease;
  &:hover {
    border-color: var(--ink);
  }
  &:active {
    transform: translateY(1px);
  }
`;

/* ----------------------------------------------------------------
   Comparison tables
----------------------------------------------------------------- */
const Compare = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const ColHead = styled.div`
  display: grid;
  grid-template-columns: 1fr 160px 160px;
  align-items: center;
  gap: 12px;
  padding: 0 24px 14px;
  border-bottom: 1px solid var(--line);

  .label {
    font-family: var(--font-mono), monospace;
    font-size: 11.5px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--ink-faint);
  }
  .col {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-family: var(--font-mono), monospace;
    font-size: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink);
    font-weight: 500;
  }
  .col.enterprise::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent);
  }
  .col.oss::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--signal);
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr 88px 88px;
    gap: 8px;
    padding: 0 16px 12px;
    .col {
      font-size: 10px;
      letter-spacing: 0.06em;
    }
  }
`;

const GroupLabel = styled.h3`
  margin: 28px 0 4px;
  font-size: clamp(18px, 2vw, 22px);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--ink);
`;

const RowList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 160px 160px;
  align-items: center;
  gap: 12px;
  padding: 14px 24px;
  border: 1px solid var(--line);
  border-radius: var(--r);
  background: var(--paper-2);
  box-shadow: var(--shadow-soft);
  transition: border-color 0.2s ease, box-shadow 0.25s ease;
  &:hover {
    border-color: var(--line-strong);
  }

  .feature {
    font-size: 15.5px;
    line-height: 1.45;
    color: var(--ink);
  }
  .cell {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr 88px 88px;
    gap: 8px;
    padding: 12px 16px;
    .feature {
      font-size: 14px;
    }
  }
`;

const ValueTag = styled.span<{ $accent?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: var(--font-mono), monospace;
  font-size: 11.5px;
  letter-spacing: 0.02em;
  line-height: 1.3;
  padding: 5px 10px;
  border-radius: 999px;
  border: 1px solid ${({ $accent }) => ($accent ? 'var(--line-strong)' : 'var(--line)')};
  background: ${({ $accent }) => ($accent ? 'var(--accent-soft)' : 'var(--paper-3)')};
  color: ${({ $accent }) => ($accent ? 'var(--accent)' : 'var(--ink-mute)')};

  @media (max-width: 720px) {
    font-size: 10px;
    padding: 4px 7px;
  }
`;

const Check = () => (
  <svg width='20' height='20' viewBox='0 0 24 24' fill='none' aria-hidden>
    <circle cx='12' cy='12' r='9' stroke='var(--signal)' strokeWidth='1.6' />
    <path d='m8.5 12 2.4 2.4L15.5 9.5' stroke='var(--signal)' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

const Dash = () => (
  <svg width='20' height='20' viewBox='0 0 24 24' fill='none' aria-hidden>
    <circle cx='12' cy='12' r='9' stroke='var(--line-strong)' strokeWidth='1.6' />
    <path d='M8.5 12h7' stroke='var(--ink-faint)' strokeWidth='1.6' strokeLinecap='round' />
  </svg>
);

const Cell = ({ value, accent }: { value: boolean | string; accent?: boolean }) => {
  if (typeof value === 'boolean') {
    return <span className='cell'>{value ? <Check /> : <Dash />}</span>;
  }
  return (
    <span className='cell'>
      <ValueTag $accent={accent}>{value}</ValueTag>
    </span>
  );
};

/* ----------------------------------------------------------------
   FAQ accordion
----------------------------------------------------------------- */
const FaqList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 820px;
`;

const FaqItem = styled.div<{ $open: boolean }>`
  border: 1px solid ${({ $open }) => ($open ? 'var(--line-strong)' : 'var(--line)')};
  border-radius: var(--r);
  background: var(--paper-2);
  box-shadow: var(--shadow-soft);
  overflow: hidden;
  transition: border-color 0.2s ease;
`;

const FaqQuestion = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 22px 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: var(--font-display), 'Geist', sans-serif;
  font-size: 17px;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--ink);

  .sign {
    flex-shrink: 0;
    color: var(--ink-faint);
    transition: transform 0.25s ease, color 0.2s ease;
  }
`;

const FaqAnswer = styled.div<{ $open: boolean }>`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? '1fr' : '0fr')};
  transition: grid-template-rows 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  .clip {
    overflow: hidden;
  }
  p {
    margin: 0;
    padding: 0 24px 24px;
    font-size: 15.5px;
    line-height: 1.65;
    color: var(--ink-mute);
  }
`;

const FaqRow =({ title, description }: { title: string; description: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <FaqItem $open={open}>
      <FaqQuestion aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        {title}
        <svg className='sign' width='18' height='18' viewBox='0 0 18 18' fill='none' aria-hidden style={open ? { transform: 'rotate(45deg)', color: 'var(--accent)' } : undefined}>
          <path d='M9 3.5v11M3.5 9h11' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
        </svg>
      </FaqQuestion>
      <FaqAnswer $open={open}>
        <div className='clip'>
          <p>{description}</p>
        </div>
      </FaqAnswer>
    </FaqItem>
  );
};

/* ----------------------------------------------------------------
   Closing dark CTA
----------------------------------------------------------------- */
const CtaSection = styled.section`
  background: var(--paper);
  padding: 28px 0 56px;
`;

const CtaCard = styled.div`
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

const CtaMesh = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
  background-size: 46px 46px;
  -webkit-mask-image: radial-gradient(70% 90% at 50% 0%, #000, transparent 75%);
  mask-image: radial-gradient(70% 90% at 50% 0%, #000, transparent 75%);
`;

const CtaGlow = styled.div`
  position: absolute;
  top: -120px;
  left: 50%;
  width: 700px;
  height: 460px;
  transform: translateX(-50%);
  pointer-events: none;
  background: radial-gradient(closest-side, rgba(91, 67, 241, 0.34), transparent 70%);
`;

const CtaEyebrow = styled.div`
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

const CtaTitle = styled.h2`
  position: relative;
  margin: 22px auto 0;
  max-width: 18ch;
  font-size: clamp(28px, 4.4vw, 50px);
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.035em;
  color: #fff;
`;

const CtaButtons = styled.div`
  position: relative;
  margin-top: 36px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
`;

const CtaPrimary = styled.button`
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
  transition: transform 0.12s ease, box-shadow 0.2s ease;
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

const CtaGhost = styled(Link)`
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
  transition: border-color 0.2s ease, background 0.2s ease;
  &:hover {
    border-color: rgba(255, 255, 255, 0.45);
    background: rgba(255, 255, 255, 0.08);
  }
`;

const CtaNote = styled.p`
  position: relative;
  margin: 22px 0 0;
  font-family: var(--font-mono), monospace;
  font-size: 12px;
  letter-spacing: 0.04em;
  color: var(--panel-mute);
`;

/* ----------------------------------------------------------------
   Icons
----------------------------------------------------------------- */
const GitIcon = () => (
  <svg width='22' height='22' viewBox='0 0 24 24' fill='none' aria-hidden>
    <path
      d='M12 3a9 9 0 0 0-2.85 17.54c.45.08.62-.2.62-.43v-1.7c-2.5.55-3.03-1.06-3.03-1.06-.41-1.04-1-1.32-1-1.32-.82-.56.06-.55.06-.55.9.06 1.38.93 1.38.93.8 1.38 2.1.98 2.62.75.08-.58.32-.98.57-1.2-2-.23-4.1-1-4.1-4.45 0-.98.35-1.79.93-2.42-.1-.23-.4-1.15.08-2.4 0 0 .76-.24 2.5.93a8.6 8.6 0 0 1 4.55 0c1.73-1.17 2.5-.93 2.5-.93.48 1.25.18 2.17.09 2.4.58.63.92 1.44.92 2.42 0 3.46-2.1 4.22-4.11 4.44.33.28.61.83.61 1.67v2.47c0 .24.16.52.62.43A9 9 0 0 0 12 3Z'
      stroke='currentColor'
      strokeWidth='1.4'
      strokeLinejoin='round'
    />
  </svg>
);

const EnterpriseIcon = () => (
  <svg width='22' height='22' viewBox='0 0 24 24' fill='none' aria-hidden>
    <path d='M4 20V7l7-3 7 3v13' stroke='currentColor' strokeWidth='1.6' strokeLinejoin='round' />
    <path d='M4 20h16M9 20v-4h4v4M8 11h.01M11 11h.01M8 14h.01M11 14h.01M14 11h.01M14 14h.01' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
  </svg>
);

/* ----------------------------------------------------------------
   Page
----------------------------------------------------------------- */
export const PricingContent = () => {
  const setModal = useModalStore((s) => s.setModal);
  const { trackClick } = usePlausible();

  return (
    <div className='landing-root'>
      <LandingHeader />
      <main>
        {/* Hero */}
        <Section>
          <Hero>
            <Reveal>
              <HeroHead>
                <Eyebrow>Pricing</Eyebrow>
                <h1>Start free. Scale to production.</h1>
                <p>
                  Run Odigos open source yourself, or start a 14-day enterprise trial with full eBPF depth, multi-cluster, security, and support. No credit card.
                </p>
                <HeroCtas>
                  <TrialCTA />
                  <DemoCTA label='Talk to sales' />
                </HeroCtas>
                <HeroNote>Open source · Exports to OpenTelemetry, zero lock-in · No code changes</HeroNote>
              </HeroHead>
            </Reveal>
          </Hero>
        </Section>

        {/* Tiers */}
        <Section>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>Two ways to run</Eyebrow>
                <h2>Pick the path that fits your stack.</h2>
                <p>The same zero-code capture underneath. Self-host the open source project, or get production-grade depth and support with Enterprise.</p>
              </Head>
            </Reveal>

            <Tiers>
              <Reveal delay={0}>
                <Tier>
                  <span className='ic'>
                    <GitIcon />
                  </span>
                  <h3>Open Source</h3>
                  <div className='price'>
                    <span className='amount'>Free</span>
                    <span className='unit'>Apache 2.0</span>
                  </div>
                  <p className='desc'>Free and open source. Run it yourself.</p>
                  <TierActions>
                    <GitHubBtn href={GITHUB_LINK} target='_blank' rel='noreferrer' data-track='cta' data-track-label='GitHub' onClick={() => trackClick('GitHub')}>
                      <GitIcon />
                      GitHub
                    </GitHubBtn>
                  </TierActions>
                </Tier>
              </Reveal>

              <Reveal delay={60}>
                <Tier $featured>
                  <FeaturedTag>14-day trial</FeaturedTag>
                  <span className='ic'>
                    <EnterpriseIcon />
                  </span>
                  <h3>Enterprise</h3>
                  <div className='price'>
                    <span className='amount'>Custom</span>
                    <span className='unit'>Talk to sales</span>
                  </div>
                  <p className='desc'>Production grade. 14 days free, no credit card.</p>
                  <TierActions>
                    <TrialCTA />
                    <SalesBtn href={HUBSPOT_DEMO_URL} data-track='cta' data-track-label='Talk to sales' onClick={() => trackClick('Talk to sales')}>
                      Talk to sales
                    </SalesBtn>
                  </TierActions>
                </Tier>
              </Reveal>
            </Tiers>
          </Inner>
        </Section>

        {/* Comparison */}
        <Section $alt>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>Compare plans</Eyebrow>
                <h2>Everything in each plan, line by line.</h2>
                <p>Open source covers core OpenTelemetry tracing. Enterprise adds low-overhead eBPF depth, database tracing, multi-cluster administration, and 24/7 support.</p>
              </Head>
            </Reveal>

            <Reveal>
              <Compare>
                <ColHead>
                  <span className='label'>Capability</span>
                  <span className='col oss'>Open Source</span>
                  <span className='col enterprise'>Enterprise</span>
                </ColHead>

                <RowList>
                  {PLANS.base.map((item) => (
                    <Row key={item.label}>
                      <span className='feature'>{item.label}</span>
                      <Cell value={item.oss} />
                      <Cell value={item.enterprise} accent />
                    </Row>
                  ))}
                </RowList>

                <GroupLabel>Low overhead eBPF capture</GroupLabel>
                <RowList>
                  {PLANS.ebpf.map((item) => (
                    <Row key={item.label}>
                      <span className='feature'>{item.label}</span>
                      <Cell value={item.oss} />
                      <Cell value={item.enterprise} accent />
                    </Row>
                  ))}
                </RowList>

                <GroupLabel>Database Extended Distributed Tracing</GroupLabel>
                <RowList>
                  {PLANS.databases.map((item) => (
                    <Row key={item.label}>
                      <span className='feature'>{item.label}</span>
                      <Cell value={item.oss} />
                      <Cell value={item.enterprise} accent />
                    </Row>
                  ))}
                </RowList>
              </Compare>
            </Reveal>
          </Inner>
        </Section>

        {/* FAQ */}
        <Section>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>Learn more</Eyebrow>
                <h2>Frequently asked questions.</h2>
                <p>The short answers teams ask before they start. Reach out to sales if you need more depth.</p>
              </Head>
            </Reveal>

            <FaqList>
              {FAQ.map((card, i) => (
                <Reveal key={card.title} delay={i * 60}>
                  <FaqRow title={card.title} description={card.description} />
                </Reveal>
              ))}
            </FaqList>
          </Inner>
        </Section>

        {/* Closing CTA */}
        <CtaSection>
          <Container>
            <Reveal>
              <CtaCard>
                <CtaMesh />
                <CtaGlow />
                <CtaEyebrow>Live in production in minutes</CtaEyebrow>
                <CtaTitle>Start free today. Move to production when you are ready.</CtaTitle>
                <CtaButtons>
                  <CtaPrimary
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
                  </CtaPrimary>
                  <CtaGhost href={HUBSPOT_DEMO_URL} data-track='cta' data-track-label='Get a demo' onClick={() => trackClick('Get a demo')}>
                    Get a demo
                  </CtaGhost>
                </CtaButtons>
                <CtaNote>Our own eBPF · Exports to OpenTelemetry, zero lock-in · No code changes</CtaNote>
              </CtaCard>
            </Reveal>
          </Container>
        </CtaSection>
      </main>
      <LandingFooter />
    </div>
  );
};
