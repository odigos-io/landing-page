'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { LandingHeader, LandingFooter, LandingProduct, LandingCTA } from '@/containers/landing';
import { PageHero } from '@/containers/landing/page-hero';
import { Container, DemoCTA } from '@/containers/landing/primitives';

const MCP_DOCS = 'https://docs.odigos.io/enterprise/mcp/overview';
const KERNEL = 'https://github.com/torvalds/linux/blob/v6.18';
const Section = styled.section`
  background: var(--paper);
  border-bottom: 1px solid var(--line);
`;
const Inner = styled(Container)`
  padding-block: 88px;
  @media (max-width: 850px) {
    padding-block: 60px;
  }
`;
const Head = styled.div`
  max-width: 850px;
  h2 {
    margin: 0;
    font-size: clamp(30px, 3.6vw, 46px);
    line-height: 1.1;
    font-weight: 600;
    letter-spacing: -0.035em;
    text-wrap: balance;
  }
  p {
    margin: 22px 0 0;
    max-width: 70ch;
    font-size: 18px;
    line-height: 1.65;
    color: var(--ink-soft);
  }
`;
const DocsLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  padding: 0 20px;
  border-radius: 12px;
  border: 1px solid var(--line-strong);
  background: var(--paper-2);
  color: var(--ink);
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  &:hover {
    border-color: var(--accent);
  }
`;
const Architecture = styled.figure`
  margin: 0;
  padding: 24px;
  border: 1px solid var(--line-strong);
  border-radius: 24px;
  background: var(--paper-2);
  box-shadow: var(--shadow-panel);
  .application {
    padding: 22px;
    border: 1px solid var(--line-strong);
    border-radius: 14px;
  }
  .label {
    margin: 0;
    color: var(--ink-mute);
    font-size: 12px;
    line-height: 1.5;
  }
  .languages {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 22px;
    margin-top: 16px;
    color: var(--ink);
    font-size: 21px;
    font-weight: 600;
    letter-spacing: -0.025em;
  }
  .values {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 18px;
  }
  .values span {
    padding: 6px 9px;
    background: var(--paper-3);
    border-radius: 6px;
    font-family: var(--font-mono), monospace;
    font-size: 11px;
    color: var(--ink-soft);
  }
  .application .note {
    margin: 16px 0 0;
    font-size: 13px;
    color: var(--ink-soft);
  }
  .boundary {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 18px 0;
    font-size: 13px;
    color: var(--accent);
  }
  .boundary svg {
    flex-shrink: 0;
  }
  .kernel {
    padding: 22px;
    border: 1px solid #51456e;
    border-radius: 14px;
    background: var(--panel);
    color: var(--panel-ink);
  }
  .kernel .label {
    color: #bcb7c9;
  }
  .kernel h3 {
    margin: 9px 0 0;
    font-size: 25px;
    font-weight: 600;
    letter-spacing: -0.025em;
  }
  .gate {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 14px;
    margin-top: 20px;
  }
  .gate > div {
    min-width: 0;
  }
  .gate strong {
    display: block;
    color: #dfd2ff;
    font-size: 14px;
    font-weight: 500;
  }
  .gate p {
    margin: 7px 0 0;
    color: #c1bdc9;
    font-size: 12px;
    line-height: 1.6;
  }
  .gate svg {
    color: #9d8bbd;
  }
  .agent {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: 18px;
    padding-top: 18px;
    border-top: 1px solid var(--line);
    font-size: 13px;
    color: var(--ink-soft);
  }
  .agent b {
    color: var(--accent);
    font-weight: 600;
  }
  figcaption {
    margin-top: 12px;
    color: var(--ink-mute);
    font-size: 11.5px;
    line-height: 1.55;
  }
  @media (max-width: 500px) {
    padding: 18px;
    .application,
    .kernel {
      padding: 18px;
    }
    .languages {
      font-size: 18px;
      gap: 10px 18px;
    }
    .gate {
      grid-template-columns: 1fr;
      gap: 10px;
    }
    .gate svg {
      transform: rotate(90deg);
    }
    .agent {
      align-items: start;
      flex-direction: column;
      gap: 6px;
    }
  }
`;
const OutsideView = () => (
  <Architecture aria-label='DeepBPF collects application context from outside the process using kernel-verified eBPF programs'>
    <div className='application'>
      <p className='label'>Your application process</p>
      <div className='languages'>
        <span>Java</span>
        <span>Python</span>
        <span>Node.js</span>
        <span>Go</span>
      </div>
      <div className='values'>
        <span>functions</span>
        <span>arguments</span>
        <span>return values</span>
      </div>
      <p className='note'>No instrumentation loaded into the application.</p>
    </div>
    <div className='boundary'>
      <svg width='16' height='28' viewBox='0 0 16 28' fill='none' aria-hidden>
        <path d='M8 26V3M3 8l5-5 5 5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      </svg>
      <span>Deep visibility from outside the process</span>
    </div>
    <div className='kernel'>
      <p className='label'>Linux kernel · outside the application</p>
      <h3>Odigos DeepBPF</h3>
      <div className='gate'>
        <div>
          <strong>eBPF verifier</strong>
          <p>Checks programs before they are loaded.</p>
        </div>
        <svg width='22' height='18' viewBox='0 0 22 18' fill='none' aria-hidden>
          <path d='M2 9h17m-5-5 5 5-5 5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
        <div>
          <strong>eBPF sandbox</strong>
          <p>Capture executes within kernel-enforced constraints.</p>
        </div>
      </div>
    </div>
    <div className='agent'>
      <b>Your AI agent</b>
      <span>Requests scoped capture through Odigos MCP</span>
    </div>
    <figcaption>The verifier checks eBPF programs at load time. Odigos controls the scope of capture requests.</figcaption>
  </Architecture>
);
const Checks = styled.dl`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 36px;
  margin: 40px 0 0;
  > div {
    border-top: 2px solid var(--line-strong);
    padding-top: 22px;
  }
  dt {
    font-size: 21px;
    font-weight: 600;
    line-height: 1.3;
    letter-spacing: -0.025em;
  }
  dd {
    margin: 12px 0 0;
    color: var(--ink-soft);
    font-size: 15.5px;
    line-height: 1.65;
  }
  a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    margin-top: 10px;
    color: var(--accent);
    font-size: 13px;
    text-underline-offset: 4px;
  }
  @media (max-width: 750px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;
const Depth = styled.div`
  margin-top: 56px;
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 56px;
  align-items: center;
  padding: 38px;
  border: 1px solid #d9d1f4;
  border-radius: var(--r-lg);
  background: var(--accent-soft);
  h3 {
    margin: 0;
    font-size: clamp(26px, 3vw, 36px);
    line-height: 1.12;
    font-weight: 600;
    letter-spacing: -0.03em;
    text-wrap: balance;
  }
  p {
    margin: 18px 0 0;
    color: var(--ink-soft);
    font-size: 16px;
    line-height: 1.65;
  }
  dl {
    margin: 0;
  }
  dl > div {
    padding: 16px 0;
    border-bottom: 1px solid #d9d1f4;
  }
  dl > div:first-child {
    padding-top: 0;
  }
  dl > div:last-child {
    border: 0;
    padding-bottom: 0;
  }
  dt {
    font-weight: 600;
    font-size: 16px;
  }
  dd {
    margin: 7px 0 0;
    font-size: 15px;
    line-height: 1.65;
    color: var(--ink-soft);
  }
  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    gap: 28px;
    padding: 28px;
  }
  @media (max-width: 450px) {
    padding: 24px;
  }
`;
const Access = styled.div`
  border-bottom: 1px solid var(--line);
  background: var(--paper-3);
  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 28px;
    padding-block: 30px;
  }
  p {
    max-width: 76ch;
    margin: 0;
    font-size: 15px;
    line-height: 1.65;
    color: var(--ink-soft);
  }
  a {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    color: var(--accent);
    font-size: 14px;
    text-underline-offset: 4px;
  }
  @media (max-width: 750px) {
    > div {
      flex-direction: column;
      align-items: start;
      gap: 8px;
    }
  }
`;

export const TechnologyContent = () => (
  <div className='landing-root'>
    <LandingHeader />
    <main>
      <PageHero
        eyebrow='Odigos DeepBPF'
        title='Deep inside your application. Entirely outside its process.'
        sub={
          <>
            <b>AI investigations need a sandbox.</b> Odigos DeepBPF captures functions, arguments and return values across Java, Python, Node.js and Go—from
            outside the application, through kernel-verified eBPF.
          </>
        }
        visual={<OutsideView />}
        primary={<DemoCTA label='See DeepBPF in action' variant='primary' />}
        secondary={
          <DocsLink href={MCP_DOCS} target='_blank' rel='noreferrer'>
            Explore Odigos MCP
          </DocsLink>
        }
      />
      <Section>
        <Inner>
          <Head>
            <h2>AI chooses what to inspect. Linux verifies the instrumentation.</h2>
            <p>
              An AI agent can take a different path through every investigation. Production needs an execution boundary enforced independently of the model.
              Before an eBPF program is loaded, the Linux verifier checks it against the kernel’s execution rules.
            </p>
          </Head>
          <Checks>
            <div>
              <dt>Checked memory access</dt>
              <dd>The verifier tracks pointer types and bounds, rejecting invalid accesses within the eBPF program.</dd>
              <a href={`${KERNEL}/kernel/bpf/verifier.c#L7451`} target='_blank' rel='noreferrer'>
                Memory checks in the verifier
              </a>
            </div>
            <div>
              <dt>Constrained operations</dt>
              <dd>Programs can use only the helpers permitted for their type, with arguments that satisfy the verifier’s checks.</dd>
              <a href={`${KERNEL}/kernel/bpf/verifier.c#L11364`} target='_blank' rel='noreferrer'>
                Helper checks in the verifier
              </a>
            </div>
            <div>
              <dt>Verified before execution</dt>
              <dd>Linux checks the program’s control flow and rejects programs that fail verification before selecting their execution runtime.</dd>
              <a href={`${KERNEL}/kernel/bpf/syscall.c#L3076`} target='_blank' rel='noreferrer'>
                Verification in the load path
              </a>
            </div>
          </Checks>
          <Depth>
            <div>
              <h3>The depth comes from DeepBPF.</h3>
              <p>
                The eBPF sandbox provides the execution boundary. Odigos DeepBPF adds the runtime understanding to see deep into Java, Python, Node.js and Go
                entirely from outside their processes.
              </p>
            </div>
            <dl>
              <div>
                <dt>See the application’s decisions</dt>
                <dd>Connect a request to the functions it called, the arguments they received and the values they returned.</dd>
              </div>
              <div>
                <dt>Keep capture outside the application</dt>
                <dd>Collect that context without loading instrumentation into the application’s runtime.</dd>
              </div>
              <div>
                <dt>Let the investigation go deeper</dt>
                <dd>Agents request the next capture through MCP. New evidence arrives with subsequent matching traffic in your telemetry backend.</dd>
              </div>
            </dl>
          </Depth>
        </Inner>
      </Section>
      <LandingProduct
        eyebrow='Your team controls the investigation'
        title='Set the scope of what AI can inspect.'
        desc='Choose workloads and capture rules. Apply masking and sampling before telemetry leaves your environment. The Odigos console brings sources, instrumentation, processing and destinations into one view.'
      />
      <Access>
        <Container>
          <p>
            The verifier checks eBPF program behavior. Your team sets workload access, MCP write permissions and data-handling policies. Those controls work
            together to govern an AI investigation.
          </p>
          <Link href={MCP_DOCS} target='_blank' rel='noreferrer'>
            Configure agent access
          </Link>
        </Container>
      </Access>
      <LandingCTA />
    </main>
    <LandingFooter />
  </div>
);
