'use client';

import React from 'react';
import styled from 'styled-components';
import { LandingHeader, LandingFooter } from '@/containers/landing';
import { Container, Eyebrow, Reveal, DemoCTA } from '@/containers/landing/primitives';

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
  -webkit-mask-image: radial-gradient(120% 78% at 50% -8%, #000 30%, transparent 72%);
  mask-image: radial-gradient(120% 78% at 50% -8%, #000 30%, transparent 72%);
`;

const HeroInner = styled(Container)`
  position: relative;
  padding-top: 84px;
  padding-bottom: 72px;
  text-align: center;
  @media (max-width: 1000px) {
    padding-top: 56px;
    padding-bottom: 52px;
  }
`;

const HeroH1 = styled.h1`
  margin: 18px auto 0;
  max-width: 17ch;
  font-size: clamp(34px, 5vw, 62px);
  line-height: 1.03;
  font-weight: 600;
  letter-spacing: -0.038em;
  color: var(--ink);

  em {
    font-style: normal;
    color: var(--ink-faint);
  }
`;

const HeroSub = styled.p`
  margin: 24px auto 0;
  max-width: 60ch;
  font-size: clamp(17px, 1.75vw, 20px);
  line-height: 1.55;
  color: var(--ink-soft);
`;

const HeroCtas = styled.div`
  margin-top: 32px;
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
`;

const Caps = styled.div`
  margin-top: 60px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  text-align: left;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 14px;
    margin-top: 44px;
  }
`;

const Cap = styled.div`
  padding: 22px 20px;
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  background: var(--paper-2);
  box-shadow: var(--shadow-soft);

  .h {
    font-size: 17px;
    font-weight: 600;
    letter-spacing: -0.015em;
    color: var(--ink);
  }
  .d {
    margin-top: 8px;
    font-family: var(--font-mono), monospace;
    font-size: 13px;
    line-height: 1.6;
    color: var(--ink-mute);
  }
`;

/* ----------------------------------------------------------------
   Scenarios
----------------------------------------------------------------- */
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
  max-width: 820px;
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
    max-width: 620px;
  }
`;

const Cards = styled.div`
  margin-top: 46px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

const ScenarioCard = styled.div`
  padding: 26px 24px;
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  background: var(--paper-2);
  box-shadow: var(--shadow-soft);

  h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--ink);
  }
  p {
    margin: 12px 0 0;
    font-size: 15.5px;
    line-height: 1.55;
    color: var(--ink-mute);
  }
`;

/* ----------------------------------------------------------------
   The attack walkthrough
----------------------------------------------------------------- */
const Flow = styled.div`
  margin-top: 46px;
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  overflow: hidden;
  background: var(--paper-2);
  box-shadow: var(--shadow-soft);
`;

const FlowBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 13px 22px;
  background: var(--paper-3);
  border-bottom: 1px solid var(--line);
  font-family: var(--font-mono), monospace;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-faint);
`;

const Steps = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Step = styled.div`
  padding: 22px 20px;
  border-right: 1px solid var(--line);
  &:last-child {
    border-right: none;
  }
  @media (max-width: 900px) {
    border-right: none;
    border-bottom: 1px solid var(--line);
  }

  .n {
    font-family: var(--font-mono), monospace;
    font-size: 10.5px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--accent);
  }
  .svc {
    margin-top: 10px;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -0.015em;
    color: var(--ink);
  }
  .code {
    margin-top: 8px;
    font-family: var(--font-mono), monospace;
    font-size: 12.5px;
    color: var(--ink);
    word-break: break-word;
  }
  .note {
    margin-top: 8px;
    font-size: 13.5px;
    line-height: 1.5;
    color: var(--ink-mute);
  }
`;

const Missing = styled.div`
  padding: 22px;
  border-top: 1px solid var(--line);
  background: rgba(201, 52, 106, 0.05);
  display: flex;
  align-items: baseline;
  gap: 14px;
  flex-wrap: wrap;

  .lbl {
    font-family: var(--font-mono), monospace;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--hot-ink);
  }
  .fn {
    font-family: var(--font-mono), monospace;
    font-size: clamp(15px, 1.6vw, 19px);
    font-weight: 600;
    color: var(--ink);
  }
  .state {
    font-family: var(--font-mono), monospace;
    font-size: 13.5px;
    color: var(--hot-ink);
  }
`;

const Takeaway = styled.p`
  margin: 28px 0 0;
  max-width: 760px;
  font-size: 18px;
  line-height: 1.6;
  color: var(--ink-soft);

  b {
    font-weight: 600;
    color: var(--ink);
  }
`;

/* ----------------------------------------------------------------
   Comparison
----------------------------------------------------------------- */
const Table = styled.div`
  margin-top: 46px;
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  overflow: hidden;
  background: var(--paper-2);
  box-shadow: var(--shadow-soft);
  overflow-x: auto;
`;

const Row = styled.div<{ $head?: boolean; $ours?: boolean }>`
  display: grid;
  grid-template-columns: 1.1fr 1.3fr 1.3fr;
  gap: 20px;
  padding: ${({ $head }) => ($head ? '13px 24px' : '22px 24px')};
  border-bottom: 1px solid var(--line);
  background: ${({ $head, $ours }) => ($head ? 'var(--paper-3)' : $ours ? 'rgba(91,67,241,0.04)' : 'transparent')};
  box-shadow: ${({ $ours }) => ($ours ? 'inset 3px 0 0 var(--accent)' : 'none')};
  min-width: 680px;
  &:last-child {
    border-bottom: none;
  }

  .h {
    font-family: var(--font-mono), monospace;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ink-faint);
  }
  .who {
    font-size: 16.5px;
    font-weight: ${({ $ours }) => ($ours ? 600 : 500)};
    letter-spacing: -0.01em;
    color: ${({ $ours }) => ($ours ? 'var(--ink)' : 'var(--ink-mute)')};
  }
  .c {
    font-size: 15.5px;
    line-height: 1.5;
    color: ${({ $ours }) => ($ours ? 'var(--ink)' : 'var(--ink-mute)')};
  }
`;

const Foot = styled.p`
  margin: 18px 0 0;
  font-family: var(--font-mono), monospace;
  font-size: 12px;
  color: var(--ink-faint);
`;

/* ----------------------------------------------------------------
   Close
----------------------------------------------------------------- */
const CloseSection = styled.section`
  background: var(--paper);
`;

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

const CloseCtas = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;

const CAPS = [
  { h: 'Function-level evidence', d: 'arguments · return values · execution paths' },
  { h: 'One connected execution path', d: 'follow identity and data across services' },
  { h: 'Under 1% CPU overhead', d: 'out-of-process eBPF instrumentation' },
];

const SCENARIOS = [
  { h: "Wrong customer's data.", p: "A valid caller reaches another customer's record. Connect identity to ownership." },
  { h: 'No shell. Still an exploit.', p: 'No new process. No suspicious socket. The secret leaves through a function return.' },
  { h: 'The fraud check never ran.', p: 'A forged flag crosses Kafka. A worker trusts it. The required control is bypassed.' },
];

const STEPS = [
  { n: '01 / caller', svc: 'Client request', code: 'fraud_checked: true', note: 'Untrusted input' },
  { n: '02 / java', svc: 'payments-api', code: 'publish(payment)', note: 'Copies the client field' },
  { n: '03 / kafka', svc: 'payments.queued', code: 'flag: true', note: 'Carries it across the boundary' },
  { n: '04 / python', svc: 'settlement-worker', code: 'settle(payment)', note: 'Trusts the flag' },
];

/* Competitors are described by approach rather than by name, deliberately. */
const APPROACHES = [
  { who: 'Application detection and response', start: 'Application threat detection', ask: 'Function-to-function continuity across services' },
  { who: 'Runtime application self-protection', start: 'Inline application protection', ask: 'The attack path beyond a single process' },
  { who: 'Kernel-event tooling', start: 'Kernel events and user-space hooks', ask: 'The business meaning behind permitted operations' },
  { who: 'Cloud and workload platforms', start: 'Cloud, workload and application context', ask: 'Who accessed which data, through which execution path' },
  { who: 'Odigos', start: 'Functions, arguments and return values', ask: 'Identity, function and data across services', ours: true },
];

export const SecurityContent = () => {
  return (
    <div className='landing-root'>
      <LandingHeader />
      <main>
        <HeroSection>
          <HeroBackdrop />
          <HeroInner>
            <Reveal>
              <Eyebrow>Odigos Security</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <HeroH1>
                AI accelerates the attack. <em>Odigos exposes the execution.</em>
              </HeroH1>
            </Reveal>
            <Reveal delay={120}>
              <HeroSub>See which functions ran, what data moved, and where trust broke across services.</HeroSub>
            </Reveal>
            <Reveal delay={180}>
              <HeroCtas>
                <DemoCTA />
              </HeroCtas>
            </Reveal>
            <Caps>
              {CAPS.map((c, i) => (
                <Reveal key={c.h} delay={i * 60}>
                  <Cap>
                    <div className='h'>{c.h}</div>
                    <div className='d'>{c.d}</div>
                  </Cap>
                </Reveal>
              ))}
            </Caps>
          </HeroInner>
        </HeroSection>

        <Section>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>Valid requests. Malicious outcomes.</Eyebrow>
                <h2>
                  The breach hides <span className='mute'>in legitimate activity.</span>
                </h2>
              </Head>
            </Reveal>
            <Reveal delay={70}>
              <Cards>
                {SCENARIOS.map((s) => (
                  <ScenarioCard key={s.h}>
                    <h3>{s.h}</h3>
                    <p>{s.p}</p>
                  </ScenarioCard>
                ))}
              </Cards>
            </Reveal>
          </Inner>
        </Section>

        <Section $alt>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>Follow an attack</Eyebrow>
                <h2>
                  Four normal steps. <span className='mute'>One broken security control.</span>
                </h2>
              </Head>
            </Reveal>

            <Reveal delay={70}>
              <Flow>
                <FlowBar>
                  <span>the path the request took</span>
                  <span>every step permitted</span>
                </FlowBar>
                <Steps>
                  {STEPS.map((s) => (
                    <Step key={s.n}>
                      <div className='n'>{s.n}</div>
                      <div className='svc'>{s.svc}</div>
                      <div className='code'>{s.code}</div>
                      <div className='note'>{s.note}</div>
                    </Step>
                  ))}
                </Steps>
                <Missing>
                  <span className='lbl'>required step</span>
                  <span className='fn'>FraudCheck.run</span>
                  <span className='state'>expected &rarr; missing</span>
                </Missing>
              </Flow>
            </Reveal>

            <Reveal delay={110}>
              <Takeaway>
                The workflow settled without its mandatory check. This is the difference: not just a message sent or a process running, but <b>the origin, propagation and consequence of the attacker&rsquo;s input</b>.
              </Takeaway>
            </Reveal>
          </Inner>
        </Section>

        <Section>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>Compare the evidence, not the label</Eyebrow>
                <h2>
                  Application protection <span className='mute'>should not stop at the application boundary.</span>
                </h2>
              </Head>
            </Reveal>

            <Reveal delay={70}>
              <Table>
                <Row $head>
                  <span className='h'>approach</span>
                  <span className='h'>starting point</span>
                  <span className='h'>evidence to demand</span>
                </Row>
                {APPROACHES.map((a) => (
                  <Row key={a.who} $ours={a.ours}>
                    <span className='who'>{a.who}</span>
                    <span className='c'>{a.start}</span>
                    <span className='c'>{a.ask}</span>
                  </Row>
                ))}
              </Table>
            </Reveal>
            <Reveal delay={110}>
              <Foot>// CPU figure applies to instrumentation. Measurement scope and coverage available on request.</Foot>
            </Reveal>
          </Inner>
        </Section>

        <CloseSection>
          <CloseInner>
            <Reveal>
              <Eyebrow>Security</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <h2>Do not buy another alert. Demand the execution path.</h2>
            </Reveal>
            <Reveal delay={120}>
              <p>Bring the attack your current tools struggle to explain.</p>
            </Reveal>
            <Reveal delay={180}>
              <CloseCtas>
                <DemoCTA />
              </CloseCtas>
            </Reveal>
          </CloseInner>
        </CloseSection>
      </main>
      <LandingFooter />
    </div>
  );
};
