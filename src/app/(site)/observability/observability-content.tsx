'use client';

import React from 'react';
import styled from 'styled-components';
import { LandingHeader, LandingFooter, LandingProof, LandingCTA, FeatureRows, type FeatureItem } from '@/containers/landing';
import { PageHero } from '@/containers/landing/page-hero';
import { ObservabilityArt } from './observability-art';
import { ObservabilityPlatform } from './observability-platform';
import { ObservabilityAgents } from './observability-agents';
import { Container, Eyebrow, Reveal } from '@/containers/landing/primitives';
import { DepthVisual, BinaryVisual, AiVisual } from '@/containers/landing/feature-visuals';

/* ---------------- what agents find ---------------- */
const Section = styled.section`
  background: var(--paper);
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
    max-width: 640px;
    font-size: 18px;
    line-height: 1.6;
    color: var(--ink-soft);
  }
`;

const Finds = styled.div`
  margin-top: 48px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    margin-top: 36px;
  }
`;

const Find = styled.article`
  display: flex;
  flex-direction: column;
  border-radius: var(--r-lg);
  overflow: hidden;
  border: 1px solid var(--line);
  background: var(--paper-2);
  box-shadow: var(--shadow-soft);
`;

const Prompt = styled.div`
  padding: 18px 20px 16px;
  background: var(--panel);
  border-bottom: 1px solid var(--panel-line);
  font-family: var(--font-mono), monospace;
  .q {
    display: flex;
    gap: 10px;
    font-size: 13px;
    line-height: 1.55;
    color: #fff;
  }
  .q .pmt {
    color: var(--accent);
    flex: none;
  }
  .a {
    margin-top: 10px;
    display: flex;
    gap: 10px;
    font-size: 12.5px;
    line-height: 1.55;
    color: var(--panel-mute);
  }
  .a .pmt {
    color: var(--signal-bright);
    flex: none;
  }
  .a b {
    color: var(--panel-ink);
    font-weight: 500;
  }
  .t {
    margin-top: 12px;
    font-size: 10.5px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--panel-mute);
  }
`;

const FindBody = styled.div`
  padding: 20px 20px 22px;
  .k {
    font-family: var(--font-mono), monospace;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--accent);
  }
  h3 {
    margin: 10px 0 0;
    font-size: 20px;
    line-height: 1.2;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--ink);
  }
  p {
    margin: 10px 0 0;
    font-size: 15px;
    line-height: 1.6;
    color: var(--ink-soft);
  }
`;

const FINDS = [
  {
    k: 'Bugs',
    q: 'Why did every order with BLACK50 pay full price?',
    a: (
      <>
        <b>BLACK50 is missing from the rules table.</b> The discount path returns zero, silently, for 312 orders since 02:58.
      </>
    ),
    t: 'seconds · no deploy',
    title: 'The bug that never logged anything.',
    body: 'The request returned 200. The trace was clean. The value was wrong. An AI agent on Odigos reads what the code did on the failing request, instead of asking someone to add a log line and wait for it to happen again.',
  },
  {
    k: 'Performance',
    q: 'Why is checkout at 402ms when the other services are flat?',
    a: (
      <>
        <b>One query behind the cart lookup runs once per line item.</b> Forty calls on a forty-item cart. Batch it.
      </>
    ),
    t: 'seconds · live traffic',
    title: 'The regression that hid inside a green dashboard.',
    body: 'Tracing from every service shows where the time goes. When the hot path is inside a service nobody instrumented, the AI agent asks for the calls underneath it and gets them from live production.',
  },
  {
    k: 'Root cause',
    q: 'What changed before the 3am pages started?',
    a: (
      <>
        <b>A retry flag flipped in the 22:40 deploy</b> sends every failed payment to the slow region. Revert one config key.
      </>
    ),
    t: 'seconds · across 6 services',
    title: 'The cause, three services away from the symptom.',
    body: 'Symptoms surface where you look. Causes live where you do not. An AI agent that can follow a request across every service, and read inside any of them, stops at the cause instead of the first thing that looks wrong.',
  },
];

const FEATURES: FeatureItem[] = [
  {
    cap: 'Day one',
    title: 'Every trace from every service, the day you install.',
    desc: 'Distributed tracing across every service and language, and the protocols between them, with no code changes and no redeploys. Context follows the request end to end, even where headers never did. Metrics, traces and logs land in the backends you already run, as OpenTelemetry you own.',
    visual: <DepthVisual />,
    tags: ['metrics, traces, logs', 'OpenTelemetry', 'no code changes'],
  },
  {
    cap: 'Any runtime',
    title: 'The runtimes most tools skip.',
    desc: 'Go, Java, Python, Node, Rust, C++, and the stripped, statically linked binaries other tools give up on. Kubernetes, virtual machines and bare metal. Microservices, monoliths and the databases behind them. The legacy estate is where incidents hide, and it is covered on day one.',
    visual: <BinaryVisual />,
    tags: ['Go, Java, Python, Node, Rust, C++', 'Kubernetes, VMs, bare metal', 'legacy and modern'],
  },
  {
    cap: 'Odigos Autofocus',
    title: 'When the trace runs out, the rest is already captured.',
    desc: 'A trace tells you where the time went. It does not tell you why the discount returned zero. Autofocus senses the drift and captures what the code did on that path, with what inputs, while it is happening. Anything it did not catch, an engineer or an AI agent asks for and gets in seconds. No pull request, no deploy, no waiting for the next occurrence.',
    visual: <AiVisual />,
    tags: ['Autofocus', 'answered in seconds', 'no redeploys'],
  },
];

export const ObservabilityContent = () => {
  return (
    <div className='landing-root'>
      <LandingHeader />
      <main>
        <PageHero
          eyebrow='Observability on the production context platform'
          title={
            <>
              Wake up to the root cause. <em>Not to the alert.</em>
            </>
          }
          sub={
            <>
              Every service traced from day one, with nothing in your code. When one drifts, Odigos Autofocus captures what the code did while it happens. <b>Your engineers and AI agents open the
              laptop to the answer.</b>
            </>
          }
          visual={<ObservabilityArt />}
        />

        <Section>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>What AI agents find</Eyebrow>
                <h2>
                  Three incidents. <span className='mute'>Zero deploys.</span>
                </h2>
                <p>Each of these becomes a pull request and a wait on the stack you run today. On Odigos, the AI agent gets the answer from live production and moves on to the fix.</p>
              </Head>
            </Reveal>
            <Finds>
              {FINDS.map((f, i) => (
                <Reveal key={f.k} delay={i * 70}>
                  <Find>
                    <Prompt>
                      <div className='q'>
                        <span className='pmt' aria-hidden>❯</span>
                        <span>{f.q}</span>
                      </div>
                      <div className='a'>
                        <span className='pmt' aria-hidden>✓</span>
                        <span>{f.a}</span>
                      </div>
                      <div className='t'>{f.t}</div>
                    </Prompt>
                    <FindBody>
                      <span className='k'>{f.k}</span>
                      <h3>{f.title}</h3>
                      <p>{f.body}</p>
                    </FindBody>
                  </Find>
                </Reveal>
              ))}
            </Finds>
          </Inner>
        </Section>

        <FeatureRows
          eyebrow='What you get on day one'
          title='Tracing you own. Answers you never had to log.'
          lede='Full distributed tracing with no code changes, across the modern stack and the legacy one, plus the one thing tracing never had: an answer from inside the code.'
          items={FEATURES}
        />

        <ObservabilityPlatform />
        <ObservabilityAgents />
        <LandingProof />
        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  );
};
