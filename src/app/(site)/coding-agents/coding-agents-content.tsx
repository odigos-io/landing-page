'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { LandingHeader, LandingFooter, LandingCTA } from '@/containers/landing';
import { PageHero } from '@/containers/landing/page-hero';
import { Container, DemoCTA } from '@/containers/landing/primitives';
import { CodingAgentsArt } from './coding-agents-art';

const MCP_DOCS = 'https://docs.odigos.io/enterprise/mcp/overview';
const DocsLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  padding: 0 20px;
  border: 1px solid var(--line-strong);
  border-radius: 12px;
  background: var(--paper-2);
  font-size: 15px;
  font-weight: 500;
  color: var(--ink);
  text-decoration: none;
  &:hover {
    border-color: var(--accent);
  }
`;
const Section = styled.section<{ $alt?: boolean }>`
  background: ${({ $alt }) => ($alt ? 'var(--paper-3)' : 'var(--paper)')};
  border-bottom: 1px solid var(--line);
`;
const Inner = styled(Container)`
  padding-top: 88px;
  padding-bottom: 88px;
  @media (max-width: 960px) {
    padding-top: 60px;
    padding-bottom: 60px;
  }
`;
const Head = styled.div`
  max-width: 760px;
  h2 {
    margin: 0;
    font-size: clamp(28px, 3.5vw, 44px);
    line-height: 1.1;
    font-weight: 600;
    letter-spacing: -0.035em;
  }
  p {
    margin: 20px 0 0;
    max-width: 66ch;
    font-size: 18px;
    line-height: 1.6;
    color: var(--ink-soft);
  }
`;
const Connections = styled.dl`
  margin: 36px 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 36px;
  > div {
    border-top: 1px solid var(--line-strong);
    padding-top: 22px;
  }
  dt {
    font-size: 20px;
    line-height: 1.2;
    letter-spacing: -0.025em;
    font-weight: 600;
  }
  dd {
    margin: 14px 0 0;
    font-size: 15.5px;
    line-height: 1.65;
    color: var(--ink-soft);
  }
  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
`;
const NextLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  margin-top: 24px;
  color: var(--accent);
  font-size: 15px;
  line-height: 1.5;
  text-underline-offset: 4px;
`;
const Case = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: start;
  > * {
    min-width: 0;
  }
  .label {
    display: block;
    font-size: 14px;
    color: var(--accent);
    margin-bottom: 18px;
  }
  h2 {
    margin: 0;
    font-size: clamp(28px, 3.1vw, 38px);
    line-height: 1.12;
    font-weight: 600;
    letter-spacing: -0.03em;
  }
  p {
    font-size: 16px;
    line-height: 1.7;
    color: var(--ink-soft);
    margin: 20px 0 0;
  }
  a {
    display: inline-flex;
    min-height: 44px;
    align-items: center;
    margin-top: 18px;
    color: var(--accent);
    font-size: 15px;
    text-underline-offset: 4px;
  }
  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    gap: 36px;
  }
`;
const Verification = styled.figure`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  a.capture {
    display: block;
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    border: 1px solid var(--line-strong);
    border-radius: 12px;
    overflow: hidden;
  }
  img {
    display: block;
    width: 100%;
    max-width: 100%;
    height: auto;
  }
  figcaption p {
    margin-top: 16px;
    font-size: 15px;
    line-height: 1.6;
  }
  strong {
    color: var(--ink);
    font-weight: 600;
  }
`;
const Access = styled.div`
  margin-top: 36px;
  padding: 28px 30px;
  border: 1px solid var(--line);
  border-radius: var(--r);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  p {
    max-width: 70ch;
    margin: 0;
    font-size: 15.5px;
    line-height: 1.7;
    color: var(--ink-soft);
  }
  strong {
    color: var(--ink);
    font-weight: 600;
  }
`;

export const CodingAgentsContent = () => (
  <div className='landing-root'>
    <LandingHeader />
    <main>
      <PageHero
        eyebrow='Production context for coding agents'
        title={
          <>
            Give your agent the power to <em>investigate production.</em>
          </>
        }
        sub={
          <>
            Odigos lets your agent request the runtime evidence it needs to connect a failure to the responsible code.{' '}
            <b>Propose the fix with evidence. Verify it against new traffic.</b>
          </>
        }
        visual={<CodingAgentsArt />}
        primary={<DemoCTA label='See it with your agent' variant='primary' />}
        secondary={
          <DocsLink href={MCP_DOCS} target='_blank' rel='noreferrer'>
            Explore Odigos MCP
          </DocsLink>
        }
        note='Available with Odigos Enterprise. Connect an MCP-compatible client.'
      />
      <Section>
        <Inner>
          <Case>
            <div>
              <span className='label'>OdiShop demo · from diagnosis to verified fix</span>
              <h2>The evidence changed the code. New traffic verified the fix.</h2>
              <p>
                The checkout investigation pointed Cursor to the policy inside FulfillmentGate. It replaced the single replica-skew limit with a region-aware
                policy: us-east kept a tight limit, and eu-west allowed the higher lag expected in that region.
              </p>
              <p>
                In your application, review the proposed limits and deploy through your existing workflow. Then check new traffic against the original failure.
                A successful rollout is the start of verification.
              </p>
              <Link href='/blog/cursormcpblog'>Read the complete walkthrough</Link>
            </div>
            <Verification>
              <span className='label'>OdiShop demo · Cursor verification</span>
              <a
                className='capture'
                href='/assets/blogs/cursormcpblog/step-8.png'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Open the original Cursor verification image at full size'
              >
                <Image
                  src='/assets/blogs/cursormcpblog/step-8.png'
                  alt='Cursor verifies the OdiShop checkout after deploying the region-aware fix.'
                  width={797}
                  height={951}
                  sizes='(max-width: 480px) 100vw, 352px'
                />
              </a>
              <figcaption>
                <p>
                  <strong>Both regions returned HTTP 200 after deployment.</strong> Cursor reported no new 409s in roughly 90 seconds of Jaeger traces. The
                  custom method span returned allowed=true, including for eu-west.
                </p>
                <a href='/assets/blogs/cursormcpblog/step-8.png' target='_blank' rel='noopener noreferrer'>
                  Open full-size verification
                </a>
              </figcaption>
            </Verification>
          </Case>
        </Inner>
      </Section>
      <Section $alt>
        <Inner>
          <Head>
            <h2>Bring this investigation to your codebase.</h2>
            <p>
              The OdiShop demo used Cursor, Odigos and Jaeger. Connect an MCP-compatible agent, Odigos Enterprise and your telemetry backend to give your agent
              the same ability to investigate.
            </p>
          </Head>
          <Connections>
            <div>
              <dt>Your agent and repository</dt>
              <dd>Source code lets the agent interpret the captured behavior and propose a change for your team to review.</dd>
            </div>
            <div>
              <dt>Odigos Enterprise MCP</dt>
              <dd>Inspect services and instrumentation. Control profiling and request new capture rules on running workloads.</dd>
            </div>
            <div>
              <dt>Your telemetry backend</dt>
              <dd>Give the agent access to query the resulting traces. Jaeger supplied that evidence in the demo; Odigos sent it as OpenTelemetry.</dd>
            </div>
          </Connections>
          <Access>
            <p>
              <strong>Your team controls capture access.</strong> Start with inspection. Enable write access for authorized instrumentation changes, and remove
              temporary rules when the investigation is complete.
            </p>
            <DocsLink href={MCP_DOCS} target='_blank' rel='noreferrer'>
              Read the MCP setup guide
            </DocsLink>
          </Access>
          <NextLink href='/observability'>See how agents collect the missing runtime evidence →</NextLink>
        </Inner>
      </Section>
      <LandingCTA audience='coding-agents' />
    </main>
    <LandingFooter />
  </div>
);
