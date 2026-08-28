'use client';

import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { Container, Eyebrow, Reveal } from './primitives';

/* The actual console. Everything else on this page is a claim about the
   product, so the product itself has to show up once. */

const Section = styled.section`
  background: var(--paper-3);
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
  max-width: 700px;
  h2 {
    margin: 14px 0 0;
    font-size: clamp(28px, 3.6vw, 46px);
    line-height: 1.08;
    letter-spacing: -0.032em;
    font-weight: 600;
    color: var(--ink);
    .mute {
      color: var(--ink-faint);
    }
  }
  p {
    margin: 18px 0 0;
    font-size: 17px;
    line-height: 1.62;
    color: var(--ink-soft);
  }
`;

const Shot = styled.div`
  position: relative;
  margin-top: 42px;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(18, 18, 21, 0.12);
  box-shadow: var(--shadow-panel);
  background: #0b0b0d;
  line-height: 0;

  img {
    width: 100%;
    height: auto;
  }

  /* the screenshot is 1440 wide; on phones it would become unreadable mush,
     so it scrolls sideways inside its own frame instead of shrinking */
  @media (max-width: 720px) {
    overflow-x: auto;
    overscroll-behavior-x: contain;
    img {
      width: 900px;
      max-width: none;
    }
  }
`;

const Notes = styled.div`
  margin-top: 26px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  div {
    border-top: 1px solid var(--line-strong);
    padding-top: 14px;
  }
  h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--ink);
  }
  p {
    margin: 6px 0 0;
    font-size: 13.5px;
    line-height: 1.55;
    color: var(--ink-mute);
  }
`;

export const LandingProduct = () => {
  return (
    <Section>
      <Inner>
        <Reveal>
          <Head>
            <Eyebrow>The console</Eyebrow>
            <h2>
              Everything you capture, <span className='mute'>on one screen.</span>
            </h2>
            <p>Pick what to capture, shape it while it is still in flight, and send it wherever you want. Nothing here is a black box: every rule is visible, reversible, and scoped per cluster.</p>
          </Head>
        </Reveal>

        <Reveal delay={70}>
          <Shot>
            <Image src='/assets/renders/product_preview.png' alt='The Odigos console: detected sources, in-flight actions and export destinations for a production cluster' width={1440} height={900} sizes='(max-width: 1200px) 100vw, 1200px' />
          </Shot>
        </Reveal>

        <Reveal delay={120}>
          <Notes>
            <div>
              <h3>Sources find themselves</h3>
              <p>Every workload is detected with its language and runtime. Nothing to tag, nothing to annotate, nothing to redeploy.</p>
            </div>
            <div>
              <h3>Actions run in flight</h3>
              <p>Mask PII, sample errors, add Kubernetes attributes. The data is shaped before it ever leaves your cluster.</p>
            </div>
            <div>
              <h3>Destinations are yours</h3>
              <p>Datadog, Splunk, Grafana, Clickhouse, Prometheus, and 40 more, as many at once as you want. It is OpenTelemetry, so you can leave whenever you like.</p>
            </div>
          </Notes>
        </Reveal>
      </Inner>
    </Section>
  );
};
