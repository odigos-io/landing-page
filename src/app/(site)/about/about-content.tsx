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
    title: 'The problem changed.',
    body: 'AI writes the code now, and it ships to production faster than any team can watch it. The tools meant to catch it were built twenty years ago, for software people typed by hand.',
  },
  {
    title: 'We rebuilt the layer underneath.',
    body: 'Out-of-process eBPF that sees inside any running service, captures any signal on demand, and physically cannot take production down. Deep, safe, and dynamic at the same time, for the first time.',
  },
  {
    title: 'Every AI in production will need it.',
    body: 'We built it first, and it already runs inside some of the most demanding production environments on earth.',
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
    title: 'Deep by default',
    body: 'Out-of-process eBPF reaches inside any running service to read the signals other agents never see, no SDK and no code changes required.',
  },
  {
    icon: 'M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4Z',
    title: 'Safe by design',
    body: 'Running out of process means an issue in observability physically cannot take production down. Depth without the blast radius.',
  },
  {
    icon: 'M4 7h16M4 12h16M4 17h10M18 14v6M15 17h6',
    title: 'Dynamic on demand',
    body: 'Turn any signal on or off at runtime. Capture exactly what a question needs, when it is asked, without a redeploy.',
  },
  {
    icon: 'M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M18 18l-2.5-2.5M6 18l2.5-2.5M18 6l-2.5 2.5',
    title: 'Built for AI-era scale',
    body: 'The same platform runs inside some of the most demanding production environments on earth, ready for the AI that runs them next.',
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
                <Eyebrow>We are Odigos</Eyebrow>
                <h1>We brought observability to AI.</h1>
                <p>
                  AI writes the code now, and it ships faster than any team can watch it. We rebuilt the layer underneath so the systems running production
                  can finally see themselves. Deep, safe, and dynamic at the same time, for the first time.
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
                <h2>The observability layer for software that writes itself.</h2>
                <p>The tools meant to catch production were built for code people typed by hand. We rebuilt the layer underneath for the way software ships now.</p>
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
                <h2>Deep, safe, and dynamic at the same time.</h2>
                <p>Three things were always a trade-off in observability. Out-of-process eBPF lets us deliver all three at once.</p>
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
                <p>The funds that backed the last generation of infrastructure companies are backing the one that replaces them.</p>
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
                <h2>See your production the way an AI would.</h2>
                <p className='lead'>
                  Root cause in seconds, not days. No redeploy, no war room. Start a 14-day trial or get a walkthrough with the team that built it.
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
