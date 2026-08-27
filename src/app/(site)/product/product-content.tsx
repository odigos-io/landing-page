'use client';

import React from 'react';
import styled from 'styled-components';
import { LandingHeader, LandingFooter } from '@/containers/landing';
import { Container, Eyebrow, Reveal, TrialCTA, DemoCTA } from '@/containers/landing/primitives';
import { DepthVisual, SafeVisual, AiVisual } from '@/containers/landing/feature-visuals';

/* ----------------------------------------------------------------
   Hero
----------------------------------------------------------------- */
const HeroSection = styled.section`
  position: relative;
  overflow: hidden;
  background: var(--paper);
  border-bottom: 1px solid var(--line);
`;

const HeroBackdrop = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 58px 58px;
  background-position: center top;
  -webkit-mask-image: radial-gradient(120% 78% at 50% -8%, #000 30%, transparent 72%);
  mask-image: radial-gradient(120% 78% at 50% -8%, #000 30%, transparent 72%);
`;

const HeroBloom = styled.div`
  position: absolute;
  top: -340px;
  left: 50%;
  width: 1060px;
  height: 700px;
  transform: translateX(-50%);
  pointer-events: none;
  background: radial-gradient(closest-side, rgba(91, 67, 241, 0.1), rgba(91, 67, 241, 0) 70%);
`;

const HeroInner = styled(Container)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 92px;
  padding-bottom: 92px;
  @media (max-width: 1000px) {
    padding-top: 60px;
    padding-bottom: 60px;
  }
`;

const HeroH1 = styled.h1`
  margin: 26px 0 0;
  max-width: 18ch;
  font-size: clamp(34px, 5.2vw, 62px);
  line-height: 1.02;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: var(--ink);
`;

const HeroSub = styled.p`
  margin: 24px 0 0;
  max-width: 640px;
  font-size: 19px;
  line-height: 1.6;
  color: var(--ink-soft);
  @media (max-width: 1000px) {
    font-size: 17px;
  }
`;

const HeroCtas = styled.div`
  margin: 34px 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
`;

const HeroStats = styled.div`
  margin: 56px 0 0;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  @media (max-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
    margin-top: 40px;
  }
`;

const Stat = styled.div`
  padding: 22px 20px;
  border: 1px solid var(--line);
  border-radius: var(--r);
  background: var(--paper-2);
  box-shadow: var(--shadow-soft);
  text-align: left;
  .v {
    font-size: 30px;
    font-weight: 600;
    letter-spacing: -0.03em;
    color: var(--ink);
  }
  .k {
    margin-top: 8px;
    font-family: var(--font-mono), monospace;
    font-size: 11.5px;
    letter-spacing: 0.04em;
    line-height: 1.5;
    color: var(--ink-mute);
  }
`;

const HERO_STATS = [
  { v: '< 1%', k: 'CPU overhead' },
  { v: '0', k: 'Code changes' },
  { v: '6+', k: 'eBPF languages' },
  { v: 'OTel', k: 'Native, zero lock-in' },
];

/* ----------------------------------------------------------------
   Feature rows
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
  margin-bottom: 72px;
  @media (max-width: 1000px) {
    margin-bottom: 48px;
  }
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
    max-width: 560px;
  }
`;

const Rows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const Row = styled.article<{ $flip: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 56px;
  padding: 36px 0;
  border-top: 1px solid var(--line);

  & > .text {
    order: ${({ $flip }) => ($flip ? 2 : 1)};
  }
  & > .visual {
    order: ${({ $flip }) => ($flip ? 1 : 2)};
  }

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    gap: 28px;
    padding: 28px 0;
    & > .text,
    & > .visual {
      order: unset;
    }
  }
`;

const Text = styled.div`
  .idx {
    font-family: var(--font-mono), monospace;
    font-size: 12px;
    letter-spacing: 0.1em;
    color: var(--ink-faint);
  }
  h3 {
    margin: 16px 0 0;
    font-size: clamp(22px, 2.5vw, 29px);
    line-height: 1.14;
    font-weight: 600;
    letter-spacing: -0.025em;
    color: var(--ink);
    max-width: 20ch;
  }
  p {
    margin: 16px 0 0;
    font-size: 16.5px;
    line-height: 1.6;
    color: var(--ink-soft);
    max-width: 46ch;
  }
`;

const Bullets = styled.ul`
  margin: 22px 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 48ch;
`;

const Bullet = styled.li`
  display: grid;
  grid-template-columns: 18px 1fr;
  gap: 11px;
  font-size: 15.5px;
  line-height: 1.55;
  color: var(--ink-mute);

  .mark {
    margin-top: 3px;
    width: 18px;
    height: 18px;
    border-radius: 6px;
    background: var(--signal-soft);
    color: var(--signal);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  strong {
    color: var(--ink);
    font-weight: 600;
  }
`;

const Panel = styled.div`
  position: relative;
  border-radius: var(--r-lg);
  background: linear-gradient(180deg, var(--paper-2), var(--paper));
  border: 1px solid var(--line);
  box-shadow: var(--shadow-soft);
  overflow: hidden;
  aspect-ratio: 1.18 / 1;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px);
    background-size: 38px 38px;
    -webkit-mask-image: radial-gradient(80% 80% at 50% 50%, #000, transparent 78%);
    mask-image: radial-gradient(80% 80% at 50% 50%, #000, transparent 78%);
  }
`;

const PanelCap = styled.div`
  position: absolute;
  top: 14px;
  left: 16px;
  z-index: 2;
  font-family: var(--font-mono), monospace;
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-mute);
  display: inline-flex;
  align-items: center;
  gap: 7px;
  &::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--signal);
  }
`;

const Check = () => (
  <svg width='11' height='11' viewBox='0 0 16 16' fill='none' aria-hidden='true'>
    <path d='M3 8.4 6.3 11.7 13 4.5' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

/* Renders a bullet that may carry <strong> emphasis from the source copy. */
const renderBullet = (html: string) => {
  const parts = html.split(/(<strong>.*?<\/strong>)/g).filter(Boolean);
  return parts.map((part, i) => {
    const m = part.match(/^<strong>(.*?)<\/strong>$/);
    if (m) return <strong key={i}>{m[1]}</strong>;
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
};

type Feature = {
  cap: string;
  title: string;
  desc: string;
  bullets: string[];
  visual: React.ReactNode;
};

const FEATURES: Feature[] = [
  {
    cap: 'Zero-code coverage',
    title: 'See everything. Change nothing.',
    desc: 'No code edits. No redeploys. No restarts. Install Odigos and every service starts reporting.',
    bullets: [
      '<strong>Metrics, Traces, and Logs:</strong> Real-time health, performance, and full incident analysis',
      '<strong>Full Context Propagation:</strong> End-to-end traces across services, protocols, and infrastructure, even without headers',
      '<strong>Deep Coverage, Any Stack:</strong> Modern and legacy environments, every major language and runtime',
    ],
    visual: <DepthVisual />,
  },
  {
    cap: 'Any runtime',
    title: 'Tracing for the runtimes nobody else can reach.',
    desc: 'Automatic distributed tracing for the languages, platforms, and services other tools give up on.',
    bullets: [
      'Captured automatically by eBPF: <strong>Go, Java, Python, NodeJS, Rust, C++</strong>',
      'Native support for <strong>Kubernetes, Virtual Machines & Bare Metal</strong>',
      'eBPF-powered tracing for <strong>microservices, monoliths, and databases</strong>',
    ],
    visual: <AiVisual />,
  },
  {
    cap: 'Out-of-process',
    title: 'Out of your process. Out of your way.',
    desc: 'Deep visibility with the overhead of a rounding error.',
    bullets: [
      '<strong><1% CPU overhead</strong> and virtually zero added latency',
      '<strong>Scales effortlessly</strong> in Kubernetes and bare-metal deployments',
      '<strong>Safe for production</strong> without compromising performance',
    ],
    visual: <SafeVisual />,
  },
];

/* ----------------------------------------------------------------
   Platform pillars (Tower / Data Streams / Dynamic Rules)
----------------------------------------------------------------- */
const CardGrid = styled.div`
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

const CardBullets = styled.ul`
  margin: 18px 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CardBullet = styled.li`
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
  strong {
    color: var(--ink);
    font-weight: 600;
  }
`;

const TowerIcon = () => (
  <svg width='22' height='22' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
    <rect x='4' y='3' width='16' height='5' rx='1.4' stroke='currentColor' strokeWidth='1.6' />
    <rect x='4' y='14' width='16' height='5' rx='1.4' stroke='currentColor' strokeWidth='1.6' />
    <path d='M8 5.5h.01M8 16.5h.01' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
  </svg>
);

const StreamsIcon = () => (
  <svg width='22' height='22' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
    <path d='M3 7h11M3 12h18M3 17h8' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
    <circle cx='18' cy='7' r='2.2' stroke='currentColor' strokeWidth='1.6' />
    <circle cx='15' cy='17' r='2.2' stroke='currentColor' strokeWidth='1.6' />
  </svg>
);

const RulesIcon = () => (
  <svg width='22' height='22' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
    <path d='M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
    <circle cx='12' cy='12' r='2.4' stroke='currentColor' strokeWidth='1.6' />
  </svg>
);

type Pillar = {
  icon: React.ReactNode;
  title: string;
  desc: string;
  bullets: string[];
};

const PILLARS: Pillar[] = [
  {
    icon: <TowerIcon />,
    title: 'Odigos Tower',
    desc: 'One control plane for every fleet. Manage, scale, and govern your entire OpenTelemetry pipeline without touching application code.',
    bullets: ['Apply capture policies across the organization', 'Centralized control across Kubernetes, Virtual Machines, and Bare Metal', 'Centralized authentication and RBAC'],
  },
  {
    icon: <StreamsIcon />,
    title: 'Odigos Data Streams',
    desc: 'Your telemetry, your rules. Shape every signal and send it anywhere. No vendor owns your data again.',
    bullets: [
      '<strong>Enrich & Transform</strong> with custom attributes, masking, and aggregation',
      '<strong>Smart Sampling</strong> cuts data volume and cost by keeping only what matters',
      '<strong>Send Anywhere:</strong> any OpenTelemetry-compatible backend, zero lock-in',
    ],
  },
  {
    icon: <RulesIcon />,
    title: 'Odigos Dynamic Rules',
    desc: 'Trace what matters, the moment it matters. Turn deep tracing on for a critical path in real time. No code changes. No redeploy.',
    bullets: [
      '<strong>Real-time Adjustments:</strong> react to changing needs on the fly',
      '<strong>Zero Downtime:</strong> change anything without interrupting a service',
      '<strong>Effortless Management:</strong> centrally via UI or files',
    ],
  },
];

/* ----------------------------------------------------------------
   Closing CTA
----------------------------------------------------------------- */
const CtaSection = styled.section`
  background: var(--paper);
  padding: 28px 0 0;
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

const CtaCtas = styled.div`
  position: relative;
  margin-top: 36px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
`;

const CtaNote = styled.p`
  position: relative;
  margin: 22px 0 0;
  font-family: var(--font-mono), monospace;
  font-size: 12px;
  letter-spacing: 0.04em;
  color: var(--panel-mute);
`;

export const ProductContent = () => {
  return (
    <div className='landing-root'>
      <LandingHeader />
      <main>
        {/* Hero */}
        <HeroSection>
          <HeroBackdrop />
          <HeroBloom />
          <HeroInner>
            <Reveal>
              <Eyebrow>The product</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <HeroH1>See what your AI shipped.</HeroH1>
            </Reveal>
            <Reveal delay={120}>
              <HeroSub>
                Odigos sees inside every running service, including the code your AI wrote, and answers any question the moment production breaks. Captured with our own eBPF, exported in OpenTelemetry. No
                code changes, nothing to add to your apps, no redeploys.
              </HeroSub>
            </Reveal>
            <Reveal delay={180}>
              <HeroCtas>
                <TrialCTA />
                <DemoCTA />
              </HeroCtas>
            </Reveal>
            <HeroStats>
              {HERO_STATS.map((s, i) => (
                <Reveal key={s.k} delay={i * 60}>
                  <Stat>
                    <div className='v'>{s.v}</div>
                    <div className='k'>{s.k}</div>
                  </Stat>
                </Reveal>
              ))}
            </HeroStats>
          </HeroInner>
        </HeroSection>

        {/* Feature rows */}
        <Section>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>Why Odigos</Eyebrow>
                <h2>Deep visibility, with nothing to instrument.</h2>
                <p>Install once and every service starts reporting. Across modern and legacy stacks, captured at the kernel and exported in OpenTelemetry.</p>
              </Head>
            </Reveal>

            <Rows>
              {FEATURES.map((f, i) => (
                <Reveal key={f.title}>
                  <Row $flip={i % 2 === 1}>
                    <Text className='text'>
                      <span className='idx'>
                        {String(i + 1).padStart(2, '0')} / {String(FEATURES.length).padStart(2, '0')}
                      </span>
                      <h3>{f.title}</h3>
                      <p>{f.desc}</p>
                      <Bullets>
                        {f.bullets.map((b, bi) => (
                          <Bullet key={bi}>
                            <span className='mark'>
                              <Check />
                            </span>
                            <span>{renderBullet(b)}</span>
                          </Bullet>
                        ))}
                      </Bullets>
                    </Text>
                    <div className='visual'>
                      <Panel>
                        <PanelCap>{f.cap}</PanelCap>
                        {f.visual}
                      </Panel>
                    </div>
                  </Row>
                </Reveal>
              ))}
            </Rows>
          </Inner>
        </Section>

        {/* Platform pillars */}
        <Section $alt>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>The platform</Eyebrow>
                <h2>One pipeline. Governed end to end.</h2>
                <p>Centralized control, your data on your terms, and tracing you can reshape in real time. From ten services to tens of thousands without changing how teams work.</p>
              </Head>
            </Reveal>

            <CardGrid>
              {PILLARS.map((p, i) => (
                <Reveal key={p.title} delay={i * 60}>
                  <Card>
                    <span className='ic'>{p.icon}</span>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <CardBullets>
                      {p.bullets.map((b, bi) => (
                        <CardBullet key={bi}>
                          <span className='dot' />
                          <span>{renderBullet(b)}</span>
                        </CardBullet>
                      ))}
                    </CardBullets>
                  </Card>
                </Reveal>
              ))}
            </CardGrid>
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
                <CtaTitle>Root cause in seconds. Not days.</CtaTitle>
                <CtaCtas>
                  <TrialCTA />
                  <DemoCTA />
                </CtaCtas>
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
