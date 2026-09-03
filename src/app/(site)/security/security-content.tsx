'use client';

import React from 'react';
import styled from 'styled-components';
import { LandingHeader, LandingFooter } from '@/containers/landing';
import { Container, Eyebrow, Reveal, DemoCTA } from '@/containers/landing/primitives';

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
  padding-top: 86px;
  padding-bottom: 76px;
  @media (max-width: 1000px) {
    padding-top: 56px;
    padding-bottom: 54px;
  }
`;

const HeroH1 = styled.h1`
  margin: 18px 0 0;
  max-width: 18ch;
  font-size: clamp(34px, 5.1vw, 62px);
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
  margin: 26px 0 0;
  max-width: 62ch;
  font-size: clamp(17px, 1.75vw, 20px);
  line-height: 1.55;
  color: var(--ink-soft);

  b {
    font-weight: 600;
    color: var(--ink);
  }
`;

const HeroCtas = styled.div`
  margin-top: 32px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const Caps = styled.div`
  margin-top: 58px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 14px;
    margin-top: 42px;
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
    font-size: 12.5px;
    line-height: 1.6;
    color: var(--ink-mute);
  }
`;

/* ---------------- numbered list ---------------- */
const Points = styled.ol`
  margin: 44px 0 0;
  padding: 0;
  list-style: none;
  max-width: 900px;
  border-top: 1px solid var(--line);

  li {
    display: flex;
    gap: 20px;
    align-items: baseline;
    padding: 18px 0;
    border-bottom: 1px solid var(--line);
    font-size: 17.5px;
    line-height: 1.5;
    color: var(--ink-soft);
  }
  .n {
    flex-shrink: 0;
    font-family: var(--font-mono), monospace;
    font-size: 12px;
    letter-spacing: 0.1em;
    color: var(--accent);
  }
`;

/* ---------------- the attack ---------------- */
const Chain = styled.div`
  margin-top: 46px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  @media (max-width: 980px) {
    grid-template-columns: 1fr;
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
const Flow = styled.div`
  margin-top: 46px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Stage = styled.div`
  padding: 26px 24px;
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  background: var(--paper-2);
  box-shadow: var(--shadow-soft);

  .n {
    font-family: var(--font-mono), monospace;
    font-size: 10.5px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--accent);
  }
  h3 {
    margin: 12px 0 0;
    font-size: 21px;
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
  .tag {
    margin-top: 18px;
    display: inline-block;
    padding: 5px 11px;
    border-radius: 999px;
    background: var(--paper-3);
    border: 1px solid var(--line);
    font-family: var(--font-mono), monospace;
    font-size: 11.5px;
    color: var(--ink-soft);
  }
`;

const Rule = styled.p`
  margin: 34px 0 0;
  max-width: 820px;
  font-size: clamp(18px, 1.9vw, 22px);
  line-height: 1.45;
  letter-spacing: -0.015em;
  color: var(--ink);

  b {
    font-weight: 600;
  }
`;

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

const CloseCtas = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;

/* ---------------- content ---------------- */
const CAPS = [
  { h: 'Function-level evidence', d: 'arguments · return values · execution paths' },
  { h: 'One connected execution path', d: 'follow identity and data across services' },
  { h: 'Under 1% CPU overhead', d: 'out of process · no SDK · no redeploy' },
];

const THREAT = [
  'Recon, exploit chaining and lateral movement now run at machine speed.',
  'Autonomous agents find zero-days before human researchers do.',
  'Signatures and CVE feeds arrive after the exploit has already executed.',
  'The window between disclosure and weaponisation has collapsed to hours.',
];

const GAP = [
  'Endpoint, cloud and web tooling observe side effects: packets, syscalls, audit logs. All of it downstream of the application logic.',
  'A per-process view is blind to a chained attack that traverses services.',
  'Encrypted traffic is opaque on the network, and the keys cannot ship to a sensor.',
  'Nothing shows which function ran, with which arguments, along which control-flow path.',
];

const PATHS = [
  {
    bar: 'broken authorisation',
    h: 'A read behind the gateway.',
    p: 'The front door held. An internal service is trusted to read any account, so a request forwarded through it returned a customer the session never authenticated as.',
    k: 'the evidence',
    ev: 'authenticated 1001\nreturned  owner 1002',
    blind: 'A normal, authorised database read. Nothing at the edge, and nothing in the process, looks wrong.',
  },
  {
    bar: 'expression injection',
    h: 'A secret with no syscall.',
    p: 'A template expression hidden in an uploaded file reached a process-wide cache and printed other customers into the attacker’s own document.',
    k: 'the evidence',
    ev: 'arg.0    "${T(...).DB_PASSWORD}"\nreturn   "prod-db: Pa$$w0rd..."',
    blind: 'No new process. No socket. No file. The read never leaves the heap, so there is nothing for a kernel sensor to trip on.',
  },
  {
    bar: 'cross-service trust',
    h: 'One wire, read two ways.',
    p: 'A single payment message was parsed by two services using two JSON libraries that disagree on duplicate keys. The screener cleared one beneficiary; settlement paid another.',
    k: 'the evidence',
    ev: 'screener  payee = clean name\nsettled   payee = sanctioned',
    blind: 'Both services behaved correctly in isolation. The flaw lives in the gap between them, which no single-service view contains.',
  },
];

const STAGES = [
  {
    n: '01 · baseline',
    h: 'Learn what is normal.',
    p: 'Odigos observes how each service actually behaves and distils it into a compact behavioural fingerprint of steady state, learned per route.',
    tag: 'a compact fingerprint',
  },
  {
    n: '02 · detect',
    h: 'Catch what diverges.',
    p: 'New activity is matched against that fingerprint. An unfamiliar call edge, a new egress, an argument that carries something it never carried, an identity that does not match the object returned.',
    tag: 'no signatures · no rules',
  },
  {
    n: '03 · remediate',
    h: 'Stop it where it happens.',
    p: 'A policy acts at the function itself, blocking the call or rewriting the response, in milliseconds, with nothing in the data path and no redeploy.',
    tag: 'blocked in place',
  },
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
                Every service returned 200. <em>The screen said cleared.</em>
              </HeroH1>
            </Reveal>
            <Reveal delay={120}>
              <HeroSub>
                An agent went from a public job listing to another customer&rsquo;s account, a statement full of everyone else&rsquo;s, and an <b>$8.5M wire past a green sanctions screen</b>. No shell. No syscall. No failed
                request. The only evidence lived in the shape of the calls across services.
              </HeroSub>
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
                <Eyebrow>The threat</Eyebrow>
                <h2>
                  Every attacker now has <span className='mute'>nation-state firepower.</span>
                </h2>
              </Head>
            </Reveal>
            <Reveal delay={70}>
              <Points>
                {THREAT.map((t, i) => (
                  <li key={t}>
                    <span className='n'>{String(i + 1).padStart(2, '0')}</span>
                    <span>{t}</span>
                  </li>
                ))}
              </Points>
            </Reveal>
          </Inner>
        </Section>

        <Section $alt>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>The gap</Eyebrow>
                <h2>
                  Today&rsquo;s tools watch the symptoms. <span className='mute'>By then the exploit already ran.</span>
                </h2>
              </Head>
            </Reveal>
            <Reveal delay={70}>
              <Points>
                {GAP.map((t, i) => (
                  <li key={t}>
                    <span className='n'>{String(i + 1).padStart(2, '0')}</span>
                    <span>{t}</span>
                  </li>
                ))}
              </Points>
            </Reveal>
          </Inner>
        </Section>

        <Section>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>Three silent paths, one session</Eyebrow>
                <h2>
                  Nothing was broken. <span className='mute'>Everything was permitted.</span>
                </h2>
                <p>Each of these is a real class of attack. None of them trips a rule, raises an error, or leaves a mark on any single service.</p>
              </Head>
            </Reveal>

            <Reveal delay={70}>
              <Chain>
                {PATHS.map((p) => (
                  <Path key={p.h}>
                    <PathBar>{p.bar}</PathBar>
                    <PathBody>
                      <h3>{p.h}</h3>
                      <p>{p.p}</p>
                      <div className='ev'>
                        <span className='k'>{p.k}</span>
                        {p.ev.split('\n').map((l) => (
                          <div key={l}>{l}</div>
                        ))}
                      </div>
                      <div className='blind'>{p.blind}</div>
                    </PathBody>
                  </Path>
                ))}
              </Chain>
            </Reveal>

            <Reveal delay={110}>
              <Verdict>
                <p>
                  None of these is a bug in one service. <b>Each is a gap that only shows up across two.</b> A read behind the gateway, an expression that dumps a shared cache, a wire two parsers disagree on.
                  Only a trace that crosses both services <span className='q'>sees it at all</span>.
                </p>
              </Verdict>
            </Reveal>
          </Inner>
        </Section>

        <Section $alt>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>How runtime defence works</Eyebrow>
                <h2>
                  Learn what is normal. <span className='mute'>Stop what is not.</span>
                </h2>
              </Head>
            </Reveal>
            <Reveal delay={70}>
              <Flow>
                {STAGES.map((s) => (
                  <Stage key={s.n}>
                    <div className='n'>{s.n}</div>
                    <h3>{s.h}</h3>
                    <p>{s.p}</p>
                    <span className='tag'>{s.tag}</span>
                  </Stage>
                ))}
              </Flow>
            </Reveal>
            <Reveal delay={110}>
              <Rule>
                Learn the baseline, catch what diverges, and shut it down in place. <b>No signatures, no rules, no redeploy.</b>
              </Rule>
            </Reveal>
          </Inner>
        </Section>

        <Section>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>When something lands</Eyebrow>
                <h2>
                  We name the line of code. <span className='mute'>Not the alert.</span>
                </h2>
                <p>
                  Exact function, package and process executing the attack, with the arguments it was called with and the value it returned. Blocking happens at the function, not the firewall, in milliseconds,
                  with no agent in the data path.
                </p>
              </Head>
            </Reveal>
          </Inner>
        </Section>

        <Section>
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
        </Section>
      </main>
      <LandingFooter />
    </div>
  );
};
