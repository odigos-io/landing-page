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
const Wire = styled.div`
  margin-top: 44px;
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  overflow: hidden;
  background: var(--paper-2);
  box-shadow: var(--shadow-lift);
`;

const WireBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 13px 20px;
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

const WireBody = styled.div`
  padding: 10px 0;

  @media (max-width: 640px) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    > * {
      width: max-content;
      min-width: 100%;
    }
  }
`;

const WireRow = styled.div<{ $depth: number; $state?: string }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 20px;
  padding-left: ${({ $depth }) => 20 + $depth * 22}px;
  background: ${({ $state }) => ($state ? 'rgba(201,52,106,0.06)' : 'transparent')};
  font-family: var(--font-mono), monospace;
  font-size: clamp(11px, 1.05vw, 13px);

  .svc {
    flex-shrink: 0;
    width: 108px;
    color: var(--ink-faint);
    font-size: 10.5px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .fn {
    color: ${({ $state }) => ($state === 'gone' ? 'var(--ink-faint)' : $state ? 'var(--ink)' : 'var(--ink-mute)')};
    text-decoration: ${({ $state }) => ($state === 'gone' ? 'line-through' : 'none')};
    white-space: nowrap;
  }
  .tag {
    flex-shrink: 0;
    margin-left: auto;
    padding: 2px 8px;
    border-radius: 999px;
    background: rgba(201, 52, 106, 0.12);
    color: var(--hot-ink);
    font-size: 9.5px;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }
`;

const WireFoot = styled.div`
  padding: 16px 20px;
  border-top: 1px solid var(--line);
  font-size: 15px;
  line-height: 1.6;
  color: var(--ink-mute);

  b {
    font-family: var(--font-mono), monospace;
    font-size: 13.5px;
    font-weight: 500;
    color: var(--ink);
  }
`;

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
    color: ${({ $new, $slow }) => ($new || $slow ? 'var(--ink)' : 'var(--ink-mute)')};
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
    h: 'It will not drown your analysts.',
    p: 'One deviation on its own is noise, and it is scored as noise. Nothing reaches an analyst until several classes line up on one privileged request: a new egress, plus a library that route has never reached, plus a tenant mismatch.',
  },
  {
    h: 'There is nothing to tune.',
    p: 'The signals are structural rather than statistical. A call edge, a peer or a library either appears on that route or it does not. Baselines are learned per route, so a normal deploy that adds one edge barely registers.',
  },
  {
    h: 'It learns relations, not your data.',
    p: 'For a check like tenant identity against the row that came back, Odigos stores the relation and how often the two agree. The values themselves are never kept. What may be captured, and by whom, is governed by RBAC and policy, and every capture is scoped to the workload you point it at.',
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

const WIRE = [
  { svc: 'payments-api', fn: 'POST /api/payments  {amount, payee, fraud_checked}', d: 0, tag: 'user field', state: 'new' },
  { svc: 'java', fn: 'PaymentController.create', d: 1 },
  { svc: 'kafka', fn: 'payments.queued  publish', d: 1 },
  { svc: 'fraud-svc · go', fn: 'FraudCheck.run', d: 2, tag: 'not called', state: 'gone' },
  { svc: 'settlement', fn: 'payments.queued  process', d: 1 },
  { svc: 'python', fn: 'Settlement.execute  \u2192 PAID', d: 2, tag: 'unscreened', state: 'new' },
];


const BASELINE = [
  { fn: 'POST /api/tickets', ms: '12ms', d: 0 },
  { fn: 'TicketController.create', ms: '3ms', d: 1 },
  { fn: 'ExpressionResolver.resolve', ms: '1ms', d: 2 },
  { fn: '', ms: '', d: 3, ghost: true },
  { fn: '', ms: '', d: 3, ghost: true },
  { fn: 'TicketRepository.save', ms: '6ms', d: 1 },
];

const OBSERVED = [
  { fn: 'POST /api/tickets', ms: '95ms', d: 0 },
  { fn: 'TicketController.create', ms: '5ms', d: 1 },
  { fn: 'ExpressionResolver.resolve', ms: '80ms', d: 2, slow: true },
  { fn: 'SpelExpressionParser.parse', ms: '2ms', d: 3, isNew: true },
  { fn: 'ReflectiveMethodExecutor.execute', ms: '60ms', d: 3, isNew: true },
  { fn: 'TicketRepository.save', ms: '6ms', d: 1 },
];

const EVIDENCE = [
  { k: 'process', v: 'tickets-api · pid 4417 · java' },
  { k: 'package', v: 'org.springframework.expression.spel' },
  { k: 'function', v: 'SpelExpressionParser.parse' },
  { k: 'called with', v: '"${T(java.lang.System).getenv(\'DB_PASSWORD\')}"', hot: true },
  { k: 'returned', v: '"prod-db-01: Pa$$w0rd-9f2c..."', hot: true },
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
                Every service returned 200. <em>The screen said cleared.</em>
              </HeroH1>
            </Reveal>
            <Reveal delay={120}>
              <HeroSub>
                An AI agent read a public job listing, then read another customer&rsquo;s account. No shell, and no failed request anywhere in the trace. Every service returned 200 because every service did
                exactly what it was told. The only evidence was in the calls between them, and in what those calls carried.
              </HeroSub>
            </Reveal>
            <Reveal delay={180}>
              <HeroCtas>
                <TrialCTA />
                <DemoCTA />
              </HeroCtas>
              <HeroWhat>One eBPF runtime on the node. It sees every function call in every service, and it learns what each route is supposed to do.</HeroWhat>
            </Reveal>
            </div>
            <Reveal delay={140}>
              <SecurityArt />
            </Reveal>
          </HeroInner>
        </HeroSection>

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
                    <span>baseline</span>
                    <span className='n'>2.1M renders · 14 days</span>
                  </DiffBar>
                  <DiffBody>
                    {BASELINE.map((r, i) => (
                      <TraceRow key={r.fn || `gap-${i}`} $depth={r.d} $ghost={r.ghost}>
                        {r.ghost ? <span className='gap' /> : <span className='fn'>{r.fn}</span>}
                        <span className='ms'>{r.ms}</span>
                      </TraceRow>
                    ))}
                  </DiffBody>
                </DiffCol>

                <DiffCol $hot>
                  <DiffBar $hot>
                    <span>observed</span>
                    <span className='n'>2 new spans · 80x slower</span>
                  </DiffBar>
                  <DiffBody>
                    {OBSERVED.map((r) => (
                      <TraceRow key={r.fn} $depth={r.d} $new={r.isNew} $slow={r.slow}>
                        <span className='fn'>{r.fn}</span>
                        {r.isNew && <span className='tag'>new</span>}
                        {r.slow && <span className='tag'>80x slower</span>}
                        <span className='ms'>{r.ms}</span>
                      </TraceRow>
                    ))}
                  </DiffBody>
                </DiffCol>
              </Diff>
            </Reveal>

            <Reveal delay={110}>
              <Verdict>
                <p>
                  The exploit only <b>read memory</b>. It never leaves the heap, so there is <span className='q'>no syscall</span> for a kernel or endpoint sensor to trip on. Odigos sees the function call itself:
                  the expression it was handed, and the secret it returned.
                </p>
              </Verdict>
            </Reveal>
          </Inner>
        </Section>

        <Section>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>Cross-service trust</Eyebrow>
                <h2>The fraud service never set that flag. The attacker typed it.</h2>
                <p>
                  Every payment is supposed to pass fraud screening, which sets an internal <code>fraud_checked</code> flag. The settlement worker trusts that flag and skips re-screening. The API copies every field of
                  the request body onto the payment, so the attacker sent the flag himself.
                </p>
              </Head>
            </Reveal>

            <Reveal delay={70}>
              <Wire>
                <WireBar>
                  <span>one trace · three services · three languages</span>
                  <span className='hot'>fraud check never ran</span>
                </WireBar>
                <WireBody>
                  {WIRE.map((r) => (
                    <WireRow key={r.fn} $depth={r.d} $state={r.state}>
                      <span className='svc'>{r.svc}</span>
                      <span className='fn'>{r.fn}</span>
                      {r.tag && <span className='tag'>{r.tag}</span>}
                    </WireRow>
                  ))}
                </WireBody>
                <WireFoot>
                  Two things are wrong at once, and both are in the trace. <b>fraud_checked arrived in the user&rsquo;s HTTP body</b>, where it has never once appeared before, and the{' '}
                  <b>FraudCheck.run span is missing</b> from a trace that always contains it. Both services behaved correctly on their own. Both logged 200. The flag&rsquo;s origin is in neither service&rsquo;s
                  logs. The agent never wrote an exploit. It filled in a field.
                </WireFoot>
              </Wire>
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
                    We name the line of code. <span className='mute'>Not the alert.</span>
                  </h2>
                  <p>
                    Not a severity and a service name. The exact function, the argument it was handed and the value it gave back. Everything a responder would otherwise spend the night reconstructing
                    is already in the finding.
                  </p>
                  <p>
                    And because the finding sits at the function, so does the fix. A FunctionPolicy blocks that call inside the process, with nothing in front of it and no redeploy.
                  </p>
                </Head>
              </Reveal>

              <Reveal delay={80}>
                <Finding>
                  <FindingBar>
                    <span>finding</span>
                    <span className='hot'>secret read · blocked</span>
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
                    <span className='act'>blocked at the function</span>
                    <span>no redeploy</span>
                  </FindingFoot>
                </Finding>
              </Reveal>
            </Split>
          </Inner>
        </Section>

        <Section $alt>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>Running it</Eyebrow>
                <h2>What it does to your environment.</h2>
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
          <CloseInner>
            <Reveal>
              <Eyebrow>Bring us one</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <h2>Do not buy another alert. Demand the execution path.</h2>
            </Reveal>
            <Reveal delay={120}>
              <p>Send us the incident your current tools could not explain. We will show you the trace, or we will tell you we cannot see it.</p>
            </Reveal>
            <Reveal delay={180}>
              <CloseCtas>
                <DemoCTA label='Send us the incident' variant='primary' />
                <TrialCTA variant='secondary' />
              </CloseCtas>
            </Reveal>
            <Reveal delay={230}>
              <CloseNote>
                One service, one command, no redeploy. <a href='https://docs.odigos.io/quickstart/introduction'>Read the deployment guide</a> or see{' '}
                <a href='https://trust.odigos.io'>what the probe reads and what it stores</a>.
              </CloseNote>
            </Reveal>
          </CloseInner>
        </Section>
      </main>
      <LandingFooter />
    </div>
  );
};
