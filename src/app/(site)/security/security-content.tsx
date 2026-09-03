'use client';

import React from 'react';
import styled from 'styled-components';
import { LandingHeader, LandingFooter } from '@/containers/landing';
import { Container, Eyebrow, Reveal, DemoCTA, TrialCTA } from '@/containers/landing/primitives';
import { SecurityArt } from './security-art';

/* ---------------- shared ---------------- */
const Section = styled.section<{ $alt?: boolean }>`
  background: ${({ $alt }) => ($alt ? 'var(--paper-3)' : 'var(--paper)')};
  border-bottom: 1px solid var(--line);
`;

const Inner = styled(Container)`
  padding-top: 92px;
  padding-bottom: 92px;
  @media (max-width: 1000px) {
    padding-top: 60px;
    padding-bottom: 60px;
  }
`;

const Head = styled.div`
  max-width: 840px;
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
    font-size: 18px;
    line-height: 1.6;
    color: var(--ink-soft);
    max-width: 640px;
  }
`;

/* ---------------- hero ---------------- */
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
  -webkit-mask-image: radial-gradient(120% 78% at 50% -8%, #000 30%, transparent 72%);
  mask-image: radial-gradient(120% 78% at 50% -8%, #000 30%, transparent 72%);
`;

const HeroInner = styled(Container)`
  position: relative;
  padding-top: 64px;
  padding-bottom: 56px;
  display: grid;
  grid-template-columns: 1.02fr 1.12fr;
  > * {
    min-width: 0;
  }
  gap: 56px;
  align-items: center;
  @media (max-width: 1040px) {
    grid-template-columns: 1fr;
    > * {
      min-width: 0;
    }
    gap: 40px;
    padding-top: 48px;
    padding-bottom: 48px;
  }
`;

const HeroH1 = styled.h1`
  margin: 18px 0 0;
  font-size: clamp(32px, 4vw, 50px);
  line-height: 1.03;
  font-weight: 600;
  letter-spacing: -0.038em;
  color: var(--ink);

  em {
    font-style: normal;
    display: block;
    color: var(--ink-faint);
  }
`;

const HeroSub = styled.p`
  margin: 24px 0 0;
  max-width: 52ch;
  font-size: clamp(16.5px, 1.6vw, 19px);
  line-height: 1.55;
  color: var(--ink-soft);

  b {
    font-weight: 600;
    color: var(--ink);
  }
`;

const HeroWhat = styled.p`
  margin: 22px 0 0;
  max-width: 520px;
  font-family: var(--font-mono), monospace;
  font-size: 12.5px;
  line-height: 1.7;
  color: var(--ink-faint);
`;

const HeroCtas = styled.div`
  margin-top: 32px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

/* ---------------- numbered list ---------------- */
/* ---------------- one trace, three services ---------------- */
/* ---------------- running it ---------------- */
const Facts = styled.div`
  margin-top: 44px;
  border-top: 1px solid var(--line);
`;

const Fact = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  > * {
    min-width: 0;
  }
  gap: 40px;
  padding: 26px 0;
  border-bottom: 1px solid var(--line);

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  h3 {
    margin: 0;
    font-size: 17px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--ink);
  }
  p {
    margin: 0;
    font-size: 15.5px;
    line-height: 1.65;
    color: var(--ink-mute);
  }
  code {
    font-family: var(--font-mono), monospace;
    font-size: 13.5px;
    color: var(--ink);
  }
`;

/* ---------------- why now ---------------- */
const Clock = styled.div`
  margin-top: 44px;
`;

const ClockLine = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.1fr 1fr;
  > * {
    min-width: 0;
  }
  gap: 2px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }

  .seg {
    display: block;
    padding: 20px 20px 22px;
    border-top: 3px solid var(--line-strong);
    font-size: 14.5px;
    line-height: 1.5;
    color: var(--ink-faint);
  }
  .seg b {
    display: block;
    margin-bottom: 6px;
    font-family: var(--font-mono), monospace;
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ink-mute);
  }
  .warm {
    border-top-color: var(--accent);
  }
  .warm b {
    color: var(--accent);
  }
  .hot {
    border-top-color: var(--hot);
  }
  .hot b {
    color: var(--hot-ink);
  }
  .hot {
    color: var(--ink);
  }
`;

/* ---------------- proof of vendor ---------------- */
const Trust = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  > * {
    min-width: 0;
  }
  gap: 48px;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  h2 {
    margin: 14px 0 0;
    font-size: clamp(26px, 3vw, 36px);
    font-weight: 600;
    letter-spacing: -0.025em;
    line-height: 1.12;
    color: var(--ink);
  }
  p {
    margin: 14px 0 0;
    font-size: 16px;
    line-height: 1.65;
    color: var(--ink-mute);
  }
`;

const TrustLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  overflow: hidden;

  a {
    padding: 18px 20px;
    background: var(--paper-2);
    font-family: var(--font-mono), monospace;
    font-size: 13px;
    color: var(--ink);
    text-decoration: none;
    transition: background 0.15s ease;
  }
  a:hover {
    background: var(--paper-3);
    color: var(--accent);
  }
`;

/* ---------------- the finding ---------------- */
const Split = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.06fr;
  > * {
    min-width: 0;
  }
  gap: 56px;
  align-items: center;
  @media (max-width: 940px) {
    grid-template-columns: 1fr;
    > * {
      min-width: 0;
    }
    gap: 36px;
  }
`;

const Finding = styled.div`
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  overflow: hidden;
  background: var(--paper-2);
  box-shadow: var(--shadow-lift);
`;

const FindingBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 13px 18px;
  border-bottom: 1px solid var(--line);
  background: var(--paper-3);
  font-family: var(--font-mono), monospace;
  font-size: 10.5px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--ink-faint);

  .hot {
    color: var(--hot-ink);
  }
`;

const FindingBody = styled.div`
  padding: 6px 0;

  @media (max-width: 640px) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    > * {
      width: max-content;
      min-width: 100%;
    }
  }
`;

const Field = styled.div<{ $hot?: boolean }>`
  display: grid;
  grid-template-columns: 96px 1fr;
  > * {
    min-width: 0;
  }
  gap: 14px;
  align-items: baseline;
  padding: 9px 18px;
  background: ${({ $hot }) => ($hot ? 'rgba(201,52,106,0.06)' : 'transparent')};

  .k {
    font-family: var(--font-mono), monospace;
    font-size: 10.5px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ink-faint);
  }
  .v {
    font-family: var(--font-mono), monospace;
    font-size: clamp(11.5px, 1.05vw, 13px);
    line-height: 1.5;
    word-break: break-all;
    color: ${({ $hot }) => ($hot ? 'var(--hot-ink)' : 'var(--ink)')};
  }
`;

const FindingFoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 13px 18px;
  border-top: 1px solid var(--line);
  font-family: var(--font-mono), monospace;
  font-size: 11px;
  color: var(--ink-faint);

  .act {
    color: var(--signal-ink);
  }
`;

/* ---------------- the structural gaps ---------------- */
const Gaps = styled.div`
  margin-top: 46px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  > * {
    min-width: 0;
  }
  gap: 2px;
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  overflow: hidden;
  background: var(--line);

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const Gap = styled.div`
  display: flex;
  gap: 16px;
  padding: 26px 24px;
  background: var(--paper-2);

  .n {
    flex-shrink: 0;
    font-family: var(--font-mono), monospace;
    font-size: 11px;
    letter-spacing: 0.1em;
    color: var(--accent);
    padding-top: 3px;
  }
  h3 {
    margin: 0;
    font-size: 17.5px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--ink);
  }
  p {
    margin: 9px 0 0;
    font-size: 15px;
    line-height: 1.6;
    color: var(--ink-mute);
  }
`;

/* ---------------- baseline vs observed ---------------- */
const Diff = styled.div`
  margin-top: 46px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  > * {
    min-width: 0;
  }
  gap: 20px;
  @media (max-width: 940px) {
    grid-template-columns: 1fr;
    > * {
      min-width: 0;
    }
  }
`;

const DiffCol = styled.div<{ $hot?: boolean }>`
  border: 1px solid ${({ $hot }) => ($hot ? 'rgba(201,52,106,0.3)' : 'var(--line)')};
  border-radius: var(--r-lg);
  overflow: hidden;
  background: var(--paper-2);
  box-shadow: ${({ $hot }) => ($hot ? '0 24px 56px -30px rgba(201,52,106,0.42)' : 'var(--shadow-soft)')};
`;

const DiffBar = styled.div<{ $hot?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 18px;
  border-bottom: 1px solid ${({ $hot }) => ($hot ? 'rgba(201,52,106,0.2)' : 'var(--line)')};
  background: ${({ $hot }) => ($hot ? 'rgba(201,52,106,0.05)' : 'var(--paper-3)')};
  font-family: var(--font-mono), monospace;
  font-size: 10.5px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ $hot }) => ($hot ? 'var(--hot-ink)' : 'var(--signal-ink)')};

  .n {
    letter-spacing: 0.08em;
    text-transform: none;
    color: var(--ink-faint);
  }
`;

const DiffBody = styled.div`
  padding: 12px 8px 14px;

  @media (max-width: 640px) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    > * {
      width: max-content;
      min-width: 100%;
    }
  }
`;

const TraceRow = styled.div<{ $depth: number; $new?: boolean; $slow?: boolean; $ghost?: boolean }>`
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 7px 10px;
  padding-left: ${({ $depth }) => 10 + $depth * 15}px;
  border-radius: 7px;
  background: ${({ $new, $slow }) => ($new || $slow ? 'rgba(201,52,106,0.07)' : 'transparent')};
  font-family: var(--font-mono), monospace;
  font-size: clamp(11px, 1.05vw, 12.5px);

  .fn {
    flex-shrink: 0;
    font-family: var(--font-display), 'Geist', sans-serif;
    font-size: 14px;
    color: ${({ $new, $slow }) => ($new || $slow ? 'var(--ink)' : 'var(--ink-mute)')};
    white-space: nowrap;
  }
  .sym {
    min-width: 0;
    color: var(--ink-faint);
    font-size: 10.5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .tag {
    flex-shrink: 0;
    padding: 2px 7px;
    border-radius: 999px;
    background: rgba(201, 52, 106, 0.12);
    color: var(--hot-ink);
    font-size: 9.5px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .ms {
    margin-left: auto;
    flex-shrink: 0;
    color: ${({ $slow }) => ($slow ? 'var(--hot-ink)' : 'var(--ink-faint)')};
  }
  .gap {
    display: block;
    width: 132px;
    height: 1px;
    border-top: 1px dashed var(--line-strong, var(--line));
  }
`;

/* ---------------- the attack ---------------- */
const Chain = styled.div`
  margin-top: 46px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  > * {
    min-width: 0;
  }
  gap: 18px;
  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    > * {
      min-width: 0;
    }
  }
`;

const Path = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  overflow: hidden;
  background: var(--paper-2);
  box-shadow: var(--shadow-soft);
`;

const PathBar = styled.div`
  padding: 12px 20px;
  border-bottom: 1px solid var(--line);
  background: var(--paper-3);
  font-family: var(--font-mono), monospace;
  font-size: 10.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-faint);
`;

const PathBody = styled.div`
  padding: 22px 20px 20px;
  flex: 1;
  display: flex;
  flex-direction: column;

  h3 {
    margin: 0;
    font-size: 19px;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--ink);
  }
  p {
    margin: 12px 0 0;
    font-size: 15px;
    line-height: 1.55;
    color: var(--ink-mute);
  }
  .ev {
    margin-top: 18px;
    padding-top: 16px;
    border-top: 1px dashed var(--line-strong);
    font-family: var(--font-mono), monospace;
    font-size: 12.5px;
    line-height: 1.65;
    color: var(--ink);
  }
  .ev .k {
    display: block;
    font-size: 10.5px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 6px;
  }
  .blind {
    margin-top: auto;
    padding-top: 16px;
    font-size: 13.5px;
    line-height: 1.5;
    color: var(--ink-faint);
  }
  .blind b {
    color: var(--hot-ink);
    font-weight: 600;
  }
`;

const Verdict = styled.div`
  margin-top: 34px;
  padding: 26px 26px;
  border-radius: var(--r-lg);
  border: 1px solid rgba(201, 52, 106, 0.3);
  background: rgba(201, 52, 106, 0.045);
  max-width: 900px;

  p {
    margin: 0;
    font-size: clamp(17px, 1.8vw, 21px);
    line-height: 1.5;
    letter-spacing: -0.012em;
    color: var(--ink);
  }
  b {
    font-weight: 600;
  }
  .q {
    color: var(--hot-ink);
  }
`;

/* ---------------- how it works ---------------- */
/* ---------------- close ---------------- */
const CloseInner = styled(Container)`
  padding-top: 96px;
  padding-bottom: 110px;
  text-align: center;
  @media (max-width: 1000px) {
    padding-top: 64px;
    padding-bottom: 76px;
  }

  h2 {
    margin: 18px auto 0;
    max-width: 20ch;
    font-size: clamp(30px, 4.2vw, 52px);
    line-height: 1.04;
    font-weight: 600;
    letter-spacing: -0.035em;
    color: var(--ink);
  }
  p {
    margin: 20px auto 0;
    max-width: 52ch;
    font-size: 18px;
    line-height: 1.6;
    color: var(--ink-soft);
  }
`;

const CloseNote = styled.p`
  margin: 22px auto 0;
  max-width: 460px;
  font-family: var(--font-mono), monospace;
  font-size: 12.5px;
  letter-spacing: 0.02em;
  color: var(--ink-faint);

  a {
    color: var(--ink-mute);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  a:hover {
    color: var(--ink);
  }
`;

const CloseCtas = styled.div`
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
`;

/* ---------------- content ---------------- */



const FACTS = [
  {
    h: 'You already have tracing. This sits underneath it.',
    p: 'A trace tells you a request touched four services and how long each one took. It does not tell you which function ran inside them, what it was handed, or that the call had never appeared on that route before. Odigos captures the calls underneath the span.',
  },
  {
    h: 'It will not drown your analysts.',
    p: 'One deviation on its own is noise, and it is scored as noise. Nothing reaches an analyst until several classes line up on one privileged request: a new egress, plus a library that route has never reached, plus a tenant mismatch.',
  },
  {
    h: 'The capture does not leave your estate.',
    p: 'Odigos runs in your own cluster and exports as OpenTelemetry to a destination you own. Redaction is configured before anything is written, and there is no path that sends your payloads to us.',
  },
  {
    h: 'Nobody writes rules for it.',
    p: 'There is a learning window, not a tuning phase. It watches a route for two weeks and forms the baseline itself. The signals are structural rather than statistical: a call edge, a peer or a library either appears on that route or it does not, so a normal deploy that adds one edge barely registers.',
  },
  {
    h: 'The baseline keeps the relation, never the value.',
    p: 'For a check like tenant identity against the row that came back, Odigos keeps the relation and how often the two agree. The values are not kept in the baseline. Where a finding needs the value itself, as in the capture above, it is scoped to that function on that workload, governed by RBAC and policy, and redacted by default.',
  },
  {
    h: 'Under 1% CPU.',
    p: 'Measured out of process across 1.04 million cores, with effectively no added latency. The capture never loads into your process, so a bad release of ours cannot take your application down with it.',
  },
  {
    h: 'It attaches to what is already running.',
    p: 'Kernel-attached uprobes into the JVM, V8, CPython and the Go runtime, on Kubernetes and on bare-metal VMs. It reads cleartext request and response payloads including TLS-terminated traffic. No SDK, no code change, no redeploy.',
  },
];



const GAPS = [
  {
    h: 'Your sensors watch side effects.',
    p: 'Endpoint, cloud and network tools read packets, syscalls and audit logs. All of it sits downstream of the application logic, and this attack never reached any of it.',
  },
  {
    h: 'They watch one process at a time.',
    p: 'A chain that crosses four services inside one transaction is, to a per-process sensor, four unremarkable requests on four healthy hosts.',
  },
  {
    h: 'The traffic is encrypted.',
    p: 'What crosses the network is opaque, and the keys cannot ship to a sensor. The payload is only in the clear inside the process that handles it.',
  },
  {
    h: 'No sensor records what actually ran.',
    p: 'Which function executed, with which arguments, along which path. That is the layer the attack lived in, and nothing in your estate writes it down.',
  },
];

const BASELINE = [
  { fn: 'a customer submits a ticket', sym: 'POST /api/tickets', d: 0 },
  { fn: 'create the record', sym: 'TicketController.create', d: 1 },
  { fn: 'render the template', sym: 'TemplateRenderer.render', d: 2 },
  { fn: '', sym: '', d: 3, ghost: true },
  { fn: '', sym: '', d: 3, ghost: true },
  { fn: 'write to the database', sym: 'TicketRepository.save', d: 1 },
];

const OBSERVED = [
  { fn: 'a customer submits a ticket', sym: 'POST /api/tickets', d: 0 },
  { fn: 'create the record', sym: 'TicketController.create', d: 1 },
  { fn: 'render the template', sym: 'TemplateRenderer.render', d: 2, slow: true },
  { fn: 'read the text as code', sym: 'SpelExpressionParser.parse', d: 3, isNew: true },
  { fn: 'run whatever it read', sym: 'ReflectiveMethodExecutor.execute', d: 3, isNew: true },
  { fn: 'write to the database', sym: 'TicketRepository.save', d: 1 },
];

const EVIDENCE = [
  { k: 'service', v: 'tickets-api · java' },
  { k: 'function', v: 'SpelExpressionParser.parse' },
  { k: 'called with', v: '"${T(java.lang.System).getenv(\'DATABASE_URL\')}"', hot: true },
  { k: 'returned', v: '"postgres://svc_settle@prod-db-01/led\u2022\u2022\u2022\u2022\u2022\u2022"', hot: true },
  { k: 'reached by', v: 'POST /api/tickets · unauthenticated' },
];


export const SecurityContent = () => {
  return (
    <div className='landing-root'>
      <LandingHeader />
      <main>
        <HeroSection>
          <HeroBackdrop />
          <HeroInner>
            <div>
            <Reveal>
              <Eyebrow>Odigos Security</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <HeroH1>
                Nation-state firepower <em>is now a subscription.</em>
              </HeroH1>
            </Reveal>
            <Reveal delay={120}>
              <HeroSub>
                One operator with an AI chains three weaknesses your scanner ranked low and one nobody had seen into a single path across four services, without tripping a single control. Odigos records which functions actually ran in
                live production, <b>so when you are asked what happened, the answer already exists</b>.
              </HeroSub>
            </Reveal>
            <Reveal delay={180}>
              <HeroCtas>
                <DemoCTA label='Talk to our security team' variant='primary' />
                <TrialCTA variant='secondary' />
              </HeroCtas>
              <HeroWhat>One eBPF runtime on the node. It reads the calls your services actually make across a request, and it learns what each route is supposed to do.</HeroWhat>
            </Reveal>
            </div>
            <Reveal delay={140}>
              <SecurityArt />
            </Reveal>
          </HeroInner>
        </HeroSection>

        <Section>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>Why the stack missed it</Eyebrow>
                <h2>
                  Nothing you own was misconfigured. <span className='mute'>Everything you own was looking somewhere else.</span>
                </h2>
                <p>
                  The controls in your estate watch the effects an attack leaves behind. This one left none. Four structural gaps, and no amount of tuning closes any of them.
                </p>
              </Head>
            </Reveal>

            <Reveal delay={70}>
              <Gaps>
                {GAPS.map((g, i) => (
                  <Gap key={g.h}>
                    <span className='n'>{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3>{g.h}</h3>
                      <p>{g.p}</p>
                    </div>
                  </Gap>
                ))}
              </Gaps>
            </Reveal>

            <Reveal delay={110}>
              <Verdict>
                <p>
                  Every one of these is a property of where the sensor sits, not of how well it is configured. The attack ran <b>inside the application, in the gaps between your services</b>, and the only place
                  it was ever visible <span className='q'>had no sensor on it</span>.
                </p>
              </Verdict>
            </Reveal>
          </Inner>
        </Section>

        <Section $alt>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>Detection without signatures</Eyebrow>
                <h2>
                  The exploit is two function calls that were not there yesterday.
                </h2>
                <p>Nobody had a signature for this call graph, and nobody needed one. It learns the call graph each route normally produces, then surfaces the edges that have never appeared on it.</p>
              </Head>
            </Reveal>

            <Reveal delay={70}>
              <Diff>
                <DiffCol>
                  <DiffBar>
                    <span>baseline · example</span>
                    <span className='n'>two weeks of ordinary traffic</span>
                  </DiffBar>
                  <DiffBody>
                    {BASELINE.map((r, i) => (
                      <TraceRow key={r.fn || `gap-${i}`} $depth={r.d} $ghost={r.ghost}>
                        {r.ghost ? (
                          <span className='gap' />
                        ) : (
                          <>
                            <span className='fn'>{r.fn}</span>
                            <span className='sym'>{r.sym}</span>
                          </>
                        )}
                      </TraceRow>
                    ))}
                  </DiffBody>
                </DiffCol>

                <DiffCol $hot>
                  <DiffBar $hot>
                    <span>observed · example</span>
                    <span className='n'>two calls that were never there</span>
                  </DiffBar>
                  <DiffBody>
                    {OBSERVED.map((r) => (
                      <TraceRow key={r.fn} $depth={r.d} $new={r.isNew} $slow={r.slow}>
                        <span className='fn'>{r.fn}</span>
                        {r.isNew && <span className='tag'>new</span>}
                        
                        <span className='sym'>{r.sym}</span>
                      </TraceRow>
                    ))}
                  </DiffBody>
                </DiffCol>
              </Diff>
            </Reveal>

          </Inner>
        </Section>

        <Section>
          <Inner>
            <Split>
              <Reveal>
                <Head>
                  <Eyebrow>When something lands</Eyebrow>
                  <h2>
                    The finding is the function.
                  </h2>
                  <p>
                    The exact function, the argument it was handed and the value it gave back. Everything a responder would otherwise spend the night reconstructing was written down while it was still running.
                  </p>
                  <p>
                    And because the finding names the function, so can the policy. A FunctionPolicy scopes to that one call on that one route. The first attempt is what you are reading above. The next one
                    does not get that far. No proxy in front of the service, and no redeploy.
                  </p>
                </Head>
              </Reveal>

              <Reveal delay={80}>
                <Finding>
                  <FindingBar>
                    <span>finding · example</span>
                    <span className='hot'>secret read · recorded</span>
                  </FindingBar>
                  <FindingBody>
                    {EVIDENCE.map((r) => (
                      <Field key={r.k} $hot={r.hot}>
                        <span className='k'>{r.k}</span>
                        <span className='v'>{r.v}</span>
                      </Field>
                    ))}
                  </FindingBody>
                  <FindingFoot>
                    <span className='act'>policy written from this finding</span>
                    <span>scoped to one call</span>
                  </FindingFoot>
                </Finding>
              </Reveal>
            </Split>
          </Inner>
        </Section>

        <Section>
          <Inner>
            <Trust>
              <div>
                <Eyebrow>Before you run it</Eyebrow>
                <h2>The probe is open source.</h2>
                <p>Your team can read exactly what it attaches to and what it reads before it goes anywhere near production. No closed agent, no proprietary format, and the telemetry stays yours.</p>
              </div>
              <TrustLinks>
                <a href='https://github.com/odigos-io/odigos'>Read the source</a>
                <a href='https://trust.odigos.io'>Trust center and SOC 2</a>
                <a href='https://docs.odigos.io/quickstart/introduction'>What it attaches to</a>
              </TrustLinks>
            </Trust>
          </Inner>
        </Section>

        <Section $alt>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>Running it</Eyebrow>
                <h2>It runs beside your application, never inside it.</h2>
              </Head>
            </Reveal>

            <Reveal delay={70}>
              <Facts>
                {FACTS.map((x) => (
                  <Fact key={x.h}>
                    <h3>{x.h}</h3>
                    <p>{x.p}</p>
                  </Fact>
                ))}
              </Facts>
            </Reveal>
          </Inner>
        </Section>

        <Section>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>Why now</Eyebrow>
                <h2>Baselines are earned, not installed.</h2>
                <p>
                  Odigos learns what each route normally does across two weeks of ordinary traffic. Which means the record you will want for the incident in March is the record you have to be keeping in
                  January.
                </p>
              </Head>
            </Reveal>

            <Reveal delay={70}>
              <Clock>
                <ClockLine>
                  <span className='seg cold'>
                    <b>nothing deployed</b>
                    no comparison is possible
                  </span>
                  <span className='seg warm'>
                    <b>two weeks of traffic</b>
                    the baseline forms
                  </span>
                  <span className='seg hot'>
                    <b>the incident</b>
                    you can say what changed
                  </span>
                </ClockLine>
              </Clock>
            </Reveal>

            <Reveal delay={110}>
              <Verdict>
                <p>
                  Deploy a probe the day after an incident and all you get is a picture of a system that has <b>already been rearranged</b>. Evidence is the one thing in your security program that{' '}
                  <span className='q'>cannot be bought retroactively</span>.
                </p>
              </Verdict>
            </Reveal>
          </Inner>
        </Section>

        <Section>
          <CloseInner>
            <Reveal>
              <Eyebrow>Start somewhere</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <h2>Pick the service you would least like to explain.</h2>
            </Reveal>
            <Reveal delay={120}>
              <p>Put Odigos on it for two weeks. At the end you have the call graph for every route it serves, or you have our answer for why we could not see it.</p>
            </Reveal>
            <Reveal delay={180}>
              <CloseCtas>
                <TrialCTA label='Start on one service' />
                <DemoCTA label='Talk to our security team' />
              </CloseCtas>
            </Reveal>
            <Reveal delay={230}>
              <CloseNote>
                One command, one service, no code change. Two weeks is how long the baseline takes, which is why the trial is fourteen days. <a href='https://docs.odigos.io/quickstart/introduction'>Read the deployment guide</a>.
              </CloseNote>
            </Reveal>
          </CloseInner>
        </Section>
      </main>
      <LandingFooter />
    </div>
  );
};
