'use client';

import React from 'react';
import styled from 'styled-components';
import { LandingHeader, LandingFooter, LandingProduct, LandingHowItWorks, LandingCTA, LandingPlatform, FeatureRows, TECH_FEATURES } from '@/containers/landing';
import { PageHero } from '@/containers/landing/page-hero';
import { HeroArt, TECHNOLOGY_STORY } from '@/containers/landing/hero-art';
import { Container, Eyebrow, Reveal, TrialCTA } from '@/containers/landing/primitives';
import { DOCS_LINK } from '@/constants';

/* ---------------- what it reads ---------------- */
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

const Spec = styled.dl`
  margin: 48px 0 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  @media (max-width: 960px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    margin-top: 36px;
  }
`;

const Row = styled.div`
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  background: var(--paper-2);
  box-shadow: var(--shadow-soft);
  padding: 22px 22px 20px;
  dt {
    font-family: var(--font-mono), monospace;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--accent);
  }
  dd {
    margin: 12px 0 0;
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
  }
  dd span {
    font-family: var(--font-mono), monospace;
    font-size: 12.5px;
    padding: 6px 10px;
    border-radius: 8px;
    border: 1px solid var(--line-strong);
    background: var(--paper-3);
    color: var(--ink-soft);
  }
`;

const DocsLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 46px;
  padding: 0 20px;
  border-radius: 12px;
  border: 1px solid var(--line-strong);
  background: var(--paper-2);
  color: var(--ink);
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: border-color 0.2s ease, background 0.2s ease;
  &:hover {
    border-color: var(--ink-faint);
    background: var(--paper);
  }
`;

const SPEC = [
  { k: 'Languages', v: ['Go', 'Java', 'Python', 'Node.js', 'Rust', 'C++', 'stripped static binaries'] },
  { k: 'Where it runs', v: ['Kubernetes', 'virtual machines', 'bare metal', 'Linux'] },
  { k: 'What it captures', v: ['traces', 'metrics', 'logs', 'function arguments', 'return values', 'call stacks'] },
  { k: 'Where it goes', v: ['any OpenTelemetry backend', 'Datadog', 'Grafana', 'Splunk', 'your AI agents'] },
];

export const TechnologyContent = () => {
  return (
    <div className='landing-root'>
      <LandingHeader />
      <main>
        <PageHero
          eyebrow='Technology'
          title={
            <>
              Everyone else&rsquo;s eBPF <em>stops at the syscall.</em>
            </>
          }
          sub={
            <>
              <b>Odigos DeepBPF</b> reads what happens inside a running process: <b>the functions that ran, the arguments they carried, the values they returned, in every language.</b> Whatever you ask
              for, it captures on request, and Autofocus captures on its own the moment a service drifts. Everything exports as OpenTelemetry. Nothing loads into your application to do it.
            </>
          }
          visual={<HeroArt story={TECHNOLOGY_STORY} />}
          primary={<TrialCTA />}
          secondary={
            <DocsLink href={DOCS_LINK} target='_blank' rel='noreferrer'>
              Read the docs
            </DocsLink>
          }
        />

        <FeatureRows eyebrow='The part that took years' title='Inside the process. Nothing in it.' lede='Three things at once, which is the part that took years: function-level depth, captured on demand, from entirely outside your process.' items={TECH_FEATURES} />

        <LandingProduct
          eyebrow='What a capture is'
          title={
            <>
              Every capture is one line <span className='mute'>you can read.</span>
            </>
          }
          desc='A capture names a workload and a function. Autofocus opens them when a service drifts; engineers and AI agents open them on request. Either way it is scoped per cluster, reversible, and governed by RBAC, so reading a value out of production is an action somebody authorised rather than a side effect of an AI agent.'
        />

        <LandingHowItWorks />

        <LandingPlatform />

        <Section>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>Coverage</Eyebrow>
                <h2>
                  What it reads, <span className='mute'>and where it sends it.</span>
                </h2>
                <p>Automatic language detection on install. Nothing to declare, nothing to annotate, and the export format is the one you already own.</p>
              </Head>
            </Reveal>
            <Reveal delay={70}>
              <Spec>
                {SPEC.map((s) => (
                  <Row key={s.k}>
                    <dt>{s.k}</dt>
                    <dd>
                      {s.v.map((v) => (
                        <span key={v}>{v}</span>
                      ))}
                    </dd>
                  </Row>
                ))}
              </Spec>
            </Reveal>
          </Inner>
        </Section>

        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  );
};
