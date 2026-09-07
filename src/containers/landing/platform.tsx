'use client';

import React from 'react';
import Link from 'next/link';
import styled, { keyframes } from 'styled-components';
import { Container, Eyebrow, Reveal } from './primitives';

/* The platform in one picture. Buyers have nothing to compare this to, so
   the whole model has to land in one look: production at the bottom, the
   Odigos context layer across the middle, and the agents that run on it at
   the top. The two use-case cards under it are the doors into each page. */

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
  max-width: 860px;
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
    max-width: 660px;
    font-size: 18px;
    line-height: 1.6;
    color: var(--ink-soft);
  }
`;

/* ---------------- the diagram ---------------- */
const rise = keyframes`
  0% { transform: translateY(0); opacity: 0; }
  15% { opacity: 1; }
  85% { opacity: 1; }
  100% { transform: translateY(-44px); opacity: 0; }
`;
const sink = keyframes`
  0% { transform: translateY(0); opacity: 0; }
  15% { opacity: 1; }
  85% { opacity: 1; }
  100% { transform: translateY(44px); opacity: 0; }
`;

const Diagram = styled.div`
  position: relative;
  margin-top: 56px;
  border-radius: var(--r-lg);
  border: 1px solid var(--line);
  background:
    linear-gradient(var(--grid) 1px, transparent 1px) 0 0 / 34px 34px,
    linear-gradient(90deg, var(--grid) 1px, transparent 1px) 0 0 / 34px 34px,
    linear-gradient(180deg, var(--paper-2), var(--paper));
  box-shadow: var(--shadow-soft);
  padding: 34px 34px 30px;
  @media (max-width: 1000px) {
    margin-top: 40px;
  }
  @media (max-width: 700px) {
    padding: 22px 16px 18px;
  }
`;

const Tier = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
  font-family: var(--font-mono), monospace;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-faint);
  .r {
    text-transform: none;
    letter-spacing: 0.02em;
    color: var(--ink-mute);
  }
  @media (max-width: 700px) {
    .r {
      display: none;
    }
  }
`;

const Agents = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 14px;
  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const Agent = styled.div<{ $ghost?: boolean }>`
  position: relative;
  border-radius: var(--r);
  padding: 18px 20px 20px;
  background: ${({ $ghost }) => ($ghost ? 'transparent' : 'var(--paper-2)')};
  border: 1px ${({ $ghost }) => ($ghost ? 'dashed var(--line-strong)' : 'solid var(--line-strong)')};
  box-shadow: ${({ $ghost }) => ($ghost ? 'none' : 'var(--shadow-soft)')};
  .k {
    font-family: var(--font-mono), monospace;
    font-size: 10.5px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${({ $ghost }) => ($ghost ? 'var(--ink-faint)' : 'var(--accent)')};
  }
  h3 {
    margin: 8px 0 0;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: ${({ $ghost }) => ($ghost ? 'var(--ink-mute)' : 'var(--ink)')};
  }
  p {
    margin: 6px 0 0;
    font-size: 13.5px;
    line-height: 1.5;
    color: var(--ink-mute);
  }
  @media (max-width: 760px) {
    padding: 14px 16px 16px;
    h3 {
      font-size: 16px;
    }
  }
`;

/* the vertical exchange between agents and the layer */
const Flow = styled.div`
  position: relative;
  height: 64px;
  margin: 6px 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    height: 56px;
  }
`;

const Lane = styled.div<{ $dir: 'up' | 'down'; $delay?: number }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 1px;
    background: linear-gradient(180deg, transparent, var(--line-strong) 20%, var(--line-strong) 80%, transparent);
  }
  .dot {
    position: absolute;
    left: 50%;
    margin-left: -3px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-soft);
    ${({ $dir }) => ($dir === 'up' ? 'bottom: 8px;' : 'top: 8px;')}
    animation: ${({ $dir }) => ($dir === 'up' ? rise : sink)} 2.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    animation-delay: ${({ $delay = 0 }) => $delay}s;
  }
  .lbl {
    position: relative;
    padding: 3px 9px;
    border-radius: 999px;
    background: var(--paper-2);
    border: 1px solid var(--line);
    font-family: var(--font-mono), monospace;
    font-size: 10.5px;
    letter-spacing: 0.04em;
    color: var(--ink-mute);
    white-space: nowrap;
  }
  @media (prefers-reduced-motion: reduce) {
    .dot {
      animation: none;
      opacity: 0.6;
    }
  }
  @media (max-width: 760px) {
    &:nth-child(n + 2) {
      display: none;
    }
  }
`;

const Layer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: var(--r-lg);
  background: radial-gradient(120% 160% at 10% 0%, #1b1730, var(--panel) 55%);
  border: 1px solid var(--panel-line);
  box-shadow: var(--shadow-panel);
  padding: 26px 28px 24px;
  color: var(--panel-ink);
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(60% 120% at 85% 110%, rgba(91, 67, 241, 0.28), transparent 70%);
  }
  @media (max-width: 700px) {
    padding: 20px 18px 18px;
  }
`;

const LayerHead = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: var(--font-mono), monospace;
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--panel-mute);
    b {
      color: #c9bfff;
      font-weight: 600;
    }
    .live {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--signal-bright);
      box-shadow: 0 0 0 3px rgba(31, 215, 147, 0.18);
    }
  }
  h3 {
    margin: 10px 0 0;
    font-size: clamp(20px, 2.3vw, 27px);
    font-weight: 600;
    letter-spacing: -0.025em;
    color: #fff;
  }
  h3 span {
    color: var(--panel-mute);
    font-weight: 500;
  }
  .otel {
    font-family: var(--font-mono), monospace;
    font-size: 11.5px;
    letter-spacing: 0.02em;
    color: var(--panel-mute);
    text-align: right;
    line-height: 1.6;
    b {
      color: var(--panel-ink);
      font-weight: 500;
    }
  }
  @media (max-width: 700px) {
    .otel {
      text-align: left;
    }
  }
`;

const Cells = styled.div`
  position: relative;
  z-index: 1;
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const Cell = styled.div`
  border-radius: var(--r-sm);
  padding: 13px 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--panel-line);
  .t {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: #fff;
  }
  .d {
    margin-top: 4px;
    font-size: 12.5px;
    line-height: 1.5;
    color: var(--panel-mute);
  }
`;

const Prod = styled.div`
  border-radius: var(--r);
  padding: 16px 18px;
  background: var(--paper-2);
  border: 1px solid var(--line-strong);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  .svcs {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .note {
    font-family: var(--font-mono), monospace;
    font-size: 11px;
    letter-spacing: 0.04em;
    color: var(--ink-faint);
    white-space: nowrap;
  }
  @media (max-width: 700px) {
    .note {
      white-space: normal;
    }
  }
`;

const Svc = styled.span<{ $old?: boolean }>`
  font-family: var(--font-mono), monospace;
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid var(--line-strong);
  background: var(--paper-3);
  color: var(--ink-soft);
  i {
    font-style: normal;
    color: ${({ $old }) => ($old ? 'var(--hot-ink)' : 'var(--ink-faint)')};
  }
`;

/* ---------------- the two doors ---------------- */
const Doors = styled.div`
  margin-top: 22px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 18px;
  @media (max-width: 1100px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const Door = styled(Link)`
  display: flex;
  flex-direction: column;
  border-radius: var(--r-lg);
  overflow: hidden;
  border: 1px solid var(--line);
  background: var(--paper-2);
  box-shadow: var(--shadow-soft);
  text-decoration: none;
  color: inherit;
  transition: transform 0.25s ease, box-shadow 0.3s ease, border-color 0.25s ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-lift);
    border-color: var(--line-strong);
  }
  &:hover .go {
    color: var(--accent);
  }
  &:hover .go svg {
    transform: translateX(3px);
  }
`;

const Prompt = styled.div`
  padding: 18px 22px 16px;
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
`;

const DoorBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 22px 22px 22px;
  .k {
    font-family: var(--font-mono), monospace;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ink-faint);
  }
  h3 {
    margin: 10px 0 0;
    font-size: clamp(20px, 2.2vw, 25px);
    line-height: 1.15;
    font-weight: 600;
    letter-spacing: -0.025em;
    color: var(--ink);
  }
  p {
    margin: 12px 0 0;
    font-size: 15.5px;
    line-height: 1.6;
    color: var(--ink-soft);
  }
  .go {
    margin-top: auto;
    padding-top: 20px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 14.5px;
    font-weight: 600;
    color: var(--ink);
    transition: color 0.2s ease;
  }
  .go svg {
    transition: transform 0.2s ease;
  }
`;

const Arrow = () => (
  <svg width='16' height='16' viewBox='0 0 16 16' fill='none' aria-hidden>
    <path d='M3 8h9M8.5 3.5 13 8l-4.5 4.5' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

const DOORS = [
  {
    k: '01 / Observability',
    q: 'Why did checkout fail for these customers, and what changed?',
    a: (
      <>
        <b>Discount code missing from the rules table</b> since the 14:02 deploy. 312 orders paid full price. Fix is one row.
      </>
    ),
    title: 'The cause from the code, not a guess from a graph.',
    body: 'Every trace from every service on day one. When the trace runs out, an engineer or an AI agent asks production what the code did on the failing request and has it in seconds. The cause is found in minutes, without a deploy.',
    href: '/observability',
    cta: 'Explore observability',
  },
  {
    k: '02 / Security',
    q: 'Which of ten thousand permitted calls is the attack, and can we refuse just that one?',
    a: (
      <>
        <b>One reflective call in the ticket service</b>, reached through a normal session. Policy refuses that call. Service still serving.
      </>
    ),
    title: 'Block the attack call. Keep the service.',
    body: 'An AI-driven attack moves as permitted calls between services. WAF, EDR and SIEM each see a permitted call. Odigos records every call and enforces a policy your team approved: it refuses the call the policy names, and nothing else. The service keeps serving. Scoped to the callers you name, the policy ships and reverts without a redeploy and comes off when the fix lands.',
    href: '/security',
    cta: 'Explore security',
  },
  {
    k: '03 / Coding agents',
    q: 'Did the retry change I shipped at 14:30 do what I meant?',
    a: (
      <>
        <b>No. Every failed payment now retries against the slow region.</b> Latency on payments-api is 3x since the deploy. Revert one flag.
      </>
    ),
    title: 'Wrote it at 14:30. Checked it at 14:31.',
    body: 'Claude Code, Cursor, Copilot and the agents you build ship faster than anyone can watch. After each deploy they ask the record what their change did on real requests, so the fix is in the next commit, not the next incident. Same approvals, masking and audit as an engineer.',
    href: '/observability#coding-agents',
    cta: 'Explore coding agents',
  },
];

export const LandingPlatform = () => {
  return (
    <Section>
      <Inner>
        <Reveal>
          <Head>
            <Eyebrow>The platform, in one picture</Eyebrow>
            <h2>
              Record production once. <span className='mute'>Debug it, defend it, and check what you shipped.</span>
            </h2>
            <p>
              Logs and metrics record what someone predicted would matter. Incidents and attacks are the cases nobody predicted. Odigos keeps one record of what happened inside every running service,
              live, from outside your code, and every purpose reads from it. An engineer or an AI agent asks it after a page. A policy your team approved checks it on every call and refuses one. A
              coding agent checks what the change it just shipped did, before the next commit.
            </p>
          </Head>
        </Reveal>

        <Reveal delay={80}>
          <Diagram role='img' aria-label='The Odigos platform: your production at the bottom, the Odigos production context record in the middle, and on top the engineers, AI agents and security policies that read from it'>
            <Tier>
              <span>Who uses it</span>
              <span className='r'>and whatever you build on the same record</span>
            </Tier>
            <Agents>
              <Agent>
                <span className='k'>Observability</span>
                <h3>Engineers and AI agents</h3>
                <p>Root cause after a page. Ask what the code did on the failing request.</p>
              </Agent>
              <Agent>
                <span className='k'>Security</span>
                <h3>Your security policy</h3>
                <p>Approved by a human. Refuses one attack call. The service stays up.</p>
              </Agent>
              <Agent>
                <span className='k'>Coding agents</span>
                <h3>Claude Code, Cursor, Copilot</h3>
                <p>See what the code they wrote did in production. Fix it before anyone pages.</p>
              </Agent>
            </Agents>

            <Flow>
              <Lane $dir='up'>
                <span className='dot' />
                <span className='lbl'>questions down · answers up</span>
              </Lane>
              <Lane $dir='down' $delay={0.9}>
                <span className='dot' />
                <span className='lbl'>policy down · every call up</span>
              </Lane>
              <Lane $dir='up' $delay={1.7}>
                <span className='dot' />
                <span className='lbl'>what you shipped · what it did</span>
              </Lane>
            </Flow>

            <Layer>
              <LayerHead>
                <div>
                  <div className='brand'>
                    <span className='live' />
                    <b>Odigos</b> production context
                  </div>
                  <h3>
                    What ran inside every service, <span>live.</span>
                  </h3>
                </div>
                <div className='otel'>
                  exports <b>OpenTelemetry</b>
                  <br />
                  to Datadog, Grafana, Splunk, your SIEM
                  <br />
                  and your AI agents, under the same RBAC
                </div>
              </LayerHead>
              <Cells>
                <Cell>
                  <div className='t'>Every service</div>
                  <div className='d'>On day one, in every language, even the ones nobody owns.</div>
                </Cell>
                <Cell>
                  <div className='t'>Autofocus</div>
                  <div className='d'>Senses where a service drifts and captures deeper there, before anyone asks.</div>
                </Cell>
                <Cell>
                  <div className='t'>Out of process</div>
                  <div className='d'>Under 1% CPU, outside your applications. Every capture approved and audited, sensitive values masked in your cluster.</div>
                </Cell>
              </Cells>
            </Layer>

            <Flow>
              <Lane $dir='up' $delay={0.4}>
                <span className='dot' />
                <span className='lbl'>our own eBPF · nothing in your code</span>
              </Lane>
              <Lane $dir='up' $delay={1.3}>
                <span className='dot' />
                <span className='lbl'>every call, every service</span>
              </Lane>
              <Lane $dir='up' $delay={2.1}>
                <span className='dot' />
                <span className='lbl'>no code change</span>
              </Lane>
            </Flow>

            <Tier>
              <span>Your production</span>
              <span className='r'>Kubernetes, VMs, bare metal</span>
            </Tier>
            <Prod>
              <div className='svcs'>
                <Svc>
                  api-gateway <i>go</i>
                </Svc>
                <Svc>
                  checkout <i>java</i>
                </Svc>
                <Svc>
                  payments <i>node</i>
                </Svc>
                <Svc>
                  inventory <i>python</i>
                </Svc>
                <Svc $old>
                  ledger <i>java 8 · 2014</i>
                </Svc>
                <Svc $old>
                  pricing <i>stripped go binary</i>
                </Svc>
                <Svc>
                  postgres
                </Svc>
              </div>
              <span className='note'>and the 4,000 services behind them</span>
            </Prod>
          </Diagram>
        </Reveal>

        <Reveal delay={140}>
          <Doors>
            {DOORS.map((d) => (
              <Door key={d.href} href={d.href}>
                <Prompt>
                  <div className='q'>
                    <span className='pmt' aria-hidden>❯</span>
                    <span>{d.q}</span>
                  </div>
                  <div className='a'>
                    <span className='pmt' aria-hidden>✓</span>
                    <span>{d.a}</span>
                  </div>
                </Prompt>
                <DoorBody>
                  <span className='k'>{d.k}</span>
                  <h3>{d.title}</h3>
                  <p>{d.body}</p>
                  <span className='go'>
                    {d.cta}
                    <Arrow />
                  </span>
                </DoorBody>
              </Door>
            ))}
          </Doors>
        </Reveal>
      </Inner>
    </Section>
  );
};
