'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Container, Eyebrow, Reveal } from './primitives';

/* One record, three readers. One question, one answer, one link each. */

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
  max-width: 760px;
  h2 {
    margin: 18px 0 0;
    font-size: clamp(28px, 3.6vw, 46px);
    line-height: 1.05;
    font-weight: 600;
    letter-spacing: -0.035em;
    color: var(--ink);
  }
  p {
    margin: 18px 0 0;
    max-width: 560px;
    font-size: 18px;
    line-height: 1.6;
    color: var(--ink-soft);
  }
`;

const Doors = styled.div`
  margin-top: 44px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 18px;
  @media (max-width: 1100px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    margin-top: 32px;
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
    color: #8a78f5;
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

const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px 22px 22px;
  .k {
    font-family: var(--font-mono), monospace;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ink-faint);
  }
  h3 {
    margin: 10px 0 0;
    font-size: clamp(19px, 2vw, 23px);
    line-height: 1.15;
    font-weight: 600;
    letter-spacing: -0.025em;
    color: var(--ink);
  }
  p {
    margin: 10px 0 0;
    font-size: 15px;
    line-height: 1.55;
    color: var(--ink-soft);
  }
  .go {
    margin-top: auto;
    padding-top: 18px;
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
    q: 'Why did checkout fail, and what changed?',
    a: (
      <>
        <b>BLACK50 missing from the rules table</b> since 02:58. 312 orders paid full price.
      </>
    ),
    title: 'Root cause, not a guess.',
    body: 'Where the trace ends, ask the service what its code did.',
    href: '/observability',
    cta: 'Observability',
  },
  {
    k: '02 / Security',
    q: 'Which of ten thousand permitted calls should be refused?',
    a: (
      <>
        <b>One reflective call in the ticket service.</b> Named by policy. Refused.
      </>
    ),
    title: 'Block the call. Keep the service.',
    body: 'Your policy names the function. The call fails there. No redeploy.',
    href: '/security',
    cta: 'Security',
  },
  {
    k: '03 / Coding agents',
    q: 'Did the retry change I shipped at 14:30 do what I meant?',
    a: (
      <>
        <b>No. Every failed payment now retries against the slow region.</b> Revert one flag.
      </>
    ),
    title: 'Wrote it at 14:30. Checked it at 14:31.',
    body: 'Claude Code, Cursor and Copilot check what their change did on real requests.',
    href: '/observability#coding-agents',
    cta: 'Coding agents',
  },
];

export const LandingDoors = () => (
  <Section>
    <Inner>
      <Reveal>
        <Head>
          <Eyebrow>One record, three readers</Eyebrow>
          <h2>Debug it. Defend it. Check what you shipped.</h2>
          <p>The same record answers an engineer after a page, a security policy on every call, and a coding agent after every deploy.</p>
        </Head>
      </Reveal>
      <Reveal delay={100}>
        <Doors>
          {DOORS.map((d) => (
            <Door key={d.href} href={d.href}>
              <Prompt>
                <div className='q'>
                  <span className='pmt' aria-hidden>
                    ❯
                  </span>
                  <span>{d.q}</span>
                </div>
                <div className='a'>
                  <span className='pmt' aria-hidden>
                    ✓
                  </span>
                  <span>{d.a}</span>
                </div>
              </Prompt>
              <Body>
                <span className='k'>{d.k}</span>
                <h3>{d.title}</h3>
                <p>{d.body}</p>
                <span className='go'>
                  {d.cta}
                  <Arrow />
                </span>
              </Body>
            </Door>
          ))}
        </Doors>
      </Reveal>
    </Inner>
  </Section>
);
