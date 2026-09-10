'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Container } from './primitives';

const Section = styled.section`
  background: var(--paper-3);
  border-bottom: 1px solid var(--line);
  scroll-margin-top: 90px;
`;
const Inner = styled(Container)`
  padding-block: 88px;
  @media (max-width: 960px) {
    padding-block: 64px;
  }
`;
const Head = styled.div`
  max-width: 750px;
  h2 {
    margin: 0;
    font-size: clamp(28px, 3.6vw, 44px);
    line-height: 1.1;
    font-weight: 600;
    letter-spacing: -0.035em;
    text-wrap: balance;
  }
  p {
    margin: 20px 0 0;
    max-width: 64ch;
    font-size: 18px;
    line-height: 1.6;
    color: var(--ink-soft);
  }
`;
const Doors = styled.div`
  margin-top: 40px;
  border-top: 1px solid var(--line-strong);
`;
const Door = styled(Link)`
  display: grid;
  grid-template-columns: 150px 1fr 1.12fr 22px;
  align-items: start;
  gap: 30px;
  padding: 32px 0;
  border-bottom: 1px solid var(--line-strong);
  text-decoration: none;
  color: var(--ink);
  .category {
    color: var(--accent);
    font-size: 14px;
    font-weight: 500;
    padding-top: 5px;
  }
  h3 {
    margin: 0;
    font-size: 25px;
    line-height: 1.2;
    letter-spacing: -0.025em;
    font-weight: 600;
    text-wrap: balance;
  }
  p {
    margin: 0;
    color: var(--ink-soft);
    font-size: 15.5px;
    line-height: 1.65;
  }
  svg {
    margin-top: 5px;
    color: var(--accent);
    transition: transform 0.2s ease;
  }
  &:hover h3 {
    color: var(--accent);
  }
  &:hover svg {
    transform: translateX(3px);
  }
  &:focus-visible {
    outline-offset: 6px;
  }
  @media (max-width: 960px) {
    grid-template-columns: 125px 1fr 1fr 20px;
    gap: 22px;
  }
  @media (max-width: 750px) {
    grid-template-columns: 1fr 24px;
    gap: 13px;
    .category,
    h3,
    p {
      grid-column: 1;
    }
    h3 {
      max-width: 28ch;
    }
    svg {
      grid-column: 2;
      grid-row: 2;
    }
  }
`;
const DOORS = [
  {
    category: 'Observability',
    title: 'Find the decision behind the failure.',
    body: 'Let the investigation reach beyond the traces you already have. Capture the function and values that explain why a request failed.',
    href: '/observability',
  },
  {
    category: 'Security',
    title: 'Understand the attack. Limit the damage.',
    body: 'See what an attack did inside your application, which connected services may be at risk, and where to apply a virtual patch.',
    href: '/security',
  },
  {
    category: 'Coding Agents',
    title: 'Find the assumption your code got wrong.',
    body: 'Give your agent runtime evidence for a targeted code change. Review the fix, deploy it and verify what happens on the next request.',
    href: '/coding-agents',
  },
];
export const LandingDoors = () => (
  <Section id='production-context'>
    <Inner>
      <Head>
        <h2>Find the cause. Decide what comes next.</h2>
        <p>One Production Context Platform connects the investigation to the work: resolving incidents, stopping attacks and shipping better code.</p>
      </Head>
      <Doors>
        {DOORS.map((d) => (
          <Door key={d.href} href={d.href}>
            <span className='category'>{d.category}</span>
            <h3>{d.title}</h3>
            <p>{d.body}</p>
            <svg width='20' height='20' viewBox='0 0 20 20' fill='none' aria-hidden>
              <path d='M3 10h13M11 5l5 5-5 5' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </Door>
        ))}
      </Doors>
    </Inner>
  </Section>
);
