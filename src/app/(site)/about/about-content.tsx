'use client';

import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { LandingHeader, LandingFooter } from '@/containers/landing';
import { Container, Eyebrow, Reveal, TrialCTA, DemoCTA } from '@/containers/landing/primitives';
import { INVESTORS } from '@/constants';

/* ----------------------------------------------------------------
   Hero / mission
----------------------------------------------------------------- */
const Hero = styled.section`
  background: var(--paper);
  border-bottom: 1px solid var(--line);
`;

const HeroInner = styled(Container)`
  padding-top: 108px;
  padding-bottom: 96px;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 64px;
  align-items: center;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    gap: 48px;
    padding-top: 80px;
    padding-bottom: 64px;
  }
`;

const HeroCopy = styled.div`
  max-width: 640px;
  h1 {
    margin: 18px 0 0;
    font-size: clamp(36px, 5.2vw, 60px);
    line-height: 1.04;
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

const HeroVisual = styled.div`
  position: relative;
  border-radius: var(--r-lg);
  background: linear-gradient(180deg, var(--paper-2), var(--paper));
  border: 1px solid var(--line);
  box-shadow: var(--shadow-soft);
  padding: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px);
    background-size: 38px 38px;
    -webkit-mask-image: radial-gradient(75% 75% at 50% 40%, #000, transparent 78%);
    mask-image: radial-gradient(75% 75% at 50% 40%, #000, transparent 78%);
    pointer-events: none;
  }

  img {
    position: relative;
    width: 100%;
    max-width: 360px;
    height: auto;
  }

  @media (max-width: 1000px) {
    padding: 40px;
  }
`;

/* ----------------------------------------------------------------
   Mission narrative
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

const MissionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const MissionCard = styled.div`
  position: relative;
  padding: 32px 30px;
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  background: var(--paper-2);
  box-shadow: var(--shadow-soft);
  transition: transform 0.2s ease, box-shadow 0.25s ease, border-color 0.2s ease;
  height: 100%;
  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-lift);
    border-color: var(--line-strong);
  }
  .idx {
    font-family: var(--font-mono), monospace;
    font-size: 12px;
    letter-spacing: 0.1em;
    color: var(--ink-faint);
  }
  h3 {
    margin: 18px 0 0;
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
`;

/* ----------------------------------------------------------------
   What we do / capabilities
----------------------------------------------------------------- */
const ValueGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const ValueCard = styled.div`
  padding: 32px 30px;
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  background: var(--paper-2);
  box-shadow: var(--shadow-soft);
  transition: transform 0.2s ease, box-shadow 0.25s ease, border-color 0.2s ease;
  height: 100%;
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
`;

/* ----------------------------------------------------------------
   Investors strip
----------------------------------------------------------------- */
const InvestorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const InvestorCard = styled.a`
  display: flex;
  flex-direction: column;
  padding: 30px;
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  background: var(--paper-2);
  box-shadow: var(--shadow-soft);
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.25s ease, border-color 0.2s ease;
  height: 100%;
  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-lift);
    border-color: var(--line-strong);
  }

  .logo {
    height: 52px;
    width: 100%;
    border-radius: 12px;
    background: var(--paper-3);
    border: 1px solid var(--line);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 22px;
  }
  .logo img {
    max-height: 30px;
    width: auto;
    object-fit: contain;
  }
  h3 {
    margin: 20px 0 0;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--ink);
  }
  p {
    margin: 10px 0 0;
    font-size: 15px;
    line-height: 1.6;
    color: var(--ink-mute);
  }
`;

/* ----------------------------------------------------------------
   Closing CTA (dark panel)
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

  .mesh {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image: linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
    background-size: 46px 46px;
    -webkit-mask-image: radial-gradient(70% 90% at 50% 0%, #000, transparent 75%);
    mask-image: radial-gradient(70% 90% at 50% 0%, #000, transparent 75%);
  }
  .glow {
    position: absolute;
    top: -120px;
    left: 50%;
    width: 700px;
    height: 460px;
    transform: translateX(-50%);
    pointer-events: none;
    background: radial-gradient(closest-side, rgba(91, 67, 241, 0.34), transparent 70%);
  }

  h2 {
    position: relative;
    margin: 22px auto 0;
    max-width: 20ch;
    font-size: clamp(28px, 4.4vw, 50px);
    line-height: 1.06;
    font-weight: 600;
    letter-spacing: -0.035em;
    color: #fff;
  }
  .lead {
    position: relative;
    margin: 18px auto 0;
    max-width: 52ch;
    font-size: 17px;
    line-height: 1.6;
    color: var(--panel-mute);
  }
`;

const Ctas = styled.div`
  position: relative;
  margin-top: 36px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
`;

/* ----------------------------------------------------------------
   Content data
----------------------------------------------------------------- */
const MISSION_BEATS = [
  {
    title: 'Production changed. Its tools did not.',
    body: 'Coding agents ship faster than any team can watch. One attacker with a model now does what took a team, moving as permitted calls between services. Logs record what someone predicted would matter. Neither was predicted.',
  },
  {
    title: 'One record, from outside the process.',
    body: 'Odigos DeepBPF, our own eBPF runtime, records what ran inside every service, from outside the process, with nothing in your code. Every language, including legacy Java and stripped Go binaries. Under 1% CPU, exported as OpenTelemetry you own.',
  },
  {
    title: 'One record, every purpose.',
    body: 'Record production once. Every purpose reads from it. An engineer or an AI agent after a page. A policy your team approved on every call. A coding agent after every deploy. It runs in production at 11 enterprises.',
  },
];

const CapIcon = ({ d }: { d: string }) => (
  <svg width='22' height='22' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
    <path d={d} stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

const CAPABILITIES = [
  {
    icon: 'M3 12h4l3 8 4-16 3 8h4',
    title: 'Inside the application',
    body: 'Ordinary eBPF sees the kernel: a socket, a file. Ours reads inside the process: which function ran, what it was handed, what it returned. Every language, nothing in your code.',
  },
  {
    icon: 'M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4Z',
    title: 'Outside the process',
    body: 'Odigos never enters your process. A bad question, or a bad release of ours, stops at our sensor. Every capture has a named approver, masking, and an audit trail.',
  },
  {
    icon: 'M4 7h16M4 12h16M4 17h10M18 14v6M15 17h6',
    title: 'Odigos Autofocus',
    body: 'When a service drifts, Odigos captures deeper on that path on its own: arguments, return values, the calls underneath. Point at any function and it captures that too. Seconds, not a deploy cycle.',
  },
  {
    icon: 'M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M18 18l-2.5-2.5M6 18l2.5-2.5M18 6l-2.5 2.5',
    title: 'Proven at scale',
    body: 'A Fortune 500 benchmarked it on 1.04 million cores: up to 27.6% less CPU than its bytecode agent. 11 enterprises run it in production. SOC 2 audited.',
  },
];

const AboutContent = () => {
  return (
    <div className='landing-root'>
      <LandingHeader />
      <main>
        {/* Hero / mission */}
        <Hero>
          <HeroInner>
            <Reveal>
              <HeroCopy>
                <Eyebrow>About Odigos</Eyebrow>
                <h1>We built the record of what production did.</h1>
                <p>
                  Odigos is the production context platform. Odigos DeepBPF, our own eBPF runtime, records what ran inside every service, on which request, with what inputs and result. Nothing in your code, from
                  outside the process. Engineers, AI agents and policies your team approved read from that one record.
                </p>
              </HeroCopy>
            </Reveal>
            <Reveal delay={120}>
              <HeroVisual>
                <Image src='/assets/odigos/logo_grid.svg' alt='Odigos' priority width={360} height={360} />
              </HeroVisual>
            </Reveal>
          </HeroInner>
        </Hero>

        {/* Mission narrative */}
        <Section>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>Our mission</Eyebrow>
                <h2>AI is on both sides of production now.</h2>
                <p>Coding agents write it. Attackers with a model probe it. The tools watching production were built for code people typed by hand, and they record what someone thought to log.</p>
              </Head>
            </Reveal>
            <MissionGrid>
              {MISSION_BEATS.map((beat, i) => (
                <Reveal key={beat.title} delay={i * 60}>
                  <MissionCard>
                    <span className='idx'>{String(i + 1).padStart(2, '0')} / 03</span>
                    <h3>{beat.title}</h3>
                    <p>{beat.body}</p>
                  </MissionCard>
                </Reveal>
              ))}
            </MissionGrid>
          </Inner>
        </Section>

        {/* What we do */}
        <Section $alt>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>What we build</Eyebrow>
                <h2>Deep inside the application. Never in it.</h2>
                <p>Depth used to mean risk. Safety meant shallow. Reading from outside the process with our own eBPF removed that trade-off, at a scale of a million cores.</p>
              </Head>
            </Reveal>
            <ValueGrid>
              {CAPABILITIES.map((cap, i) => (
                <Reveal key={cap.title} delay={i * 60}>
                  <ValueCard>
                    <span className='ic'>
                      <CapIcon d={cap.icon} />
                    </span>
                    <h3>{cap.title}</h3>
                    <p>{cap.body}</p>
                  </ValueCard>
                </Reveal>
              ))}
            </ValueGrid>
          </Inner>
        </Section>

        {/* Investors */}
        <Section>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>Investors</Eyebrow>
                <h2>Backed by infrastructure investors.</h2>
                <p>The funds that backed the last generation of infrastructure companies are backing the production context platform.</p>
              </Head>
            </Reveal>
            <InvestorGrid>
              {INVESTORS.map((investor, i) => (
                <Reveal key={investor.name} delay={i * 60}>
                  <InvestorCard href={investor.url} target='_blank' rel='noreferrer noopener'>
                    <span className='logo'>
                      <Image src={investor.image} alt={investor.name} width={investor.imageWidth || 120} height={investor.imageHeight || 40} />
                    </span>
                    <h3>{investor.name}</h3>
                    <p>{investor.description}</p>
                  </InvestorCard>
                </Reveal>
              ))}
            </InvestorGrid>
          </Inner>
        </Section>

        {/* Closing CTA */}
        <CtaSection>
          <Container>
            <Reveal>
              <CtaCard>
                <span className='mesh' />
                <span className='glow' />
                <Eyebrow $light>Start today</Eyebrow>
                <h2>Install today. First answer tomorrow.</h2>
                <p className='lead'>
                  One command on Kubernetes, VMs or bare metal. Success criteria written first, on one service. Start a 14-day trial, or get a walkthrough from the team that built the runtime.
                </p>
                <Ctas>
                  <TrialCTA />
                  <DemoCTA />
                </Ctas>
              </CtaCard>
            </Reveal>
          </Container>
        </CtaSection>
      </main>
      <LandingFooter />
    </div>
  );
};

export default AboutContent;
