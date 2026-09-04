'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { GITHUB_LINK, DOCS_LINK, CAREERS_LINK, PRIVACY_POLICY_LINK, TRUST_CENTER_LINK, SOC_LINK } from '@/constants';
import { Container } from './primitives';

const Foot = styled.footer`
  background: var(--paper);
  border-top: 1px solid var(--line);
`;

const Top = styled(Container)`
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: 40px;
  padding-top: 72px;
  padding-bottom: 56px;
  @media (max-width: 820px) {
    grid-template-columns: 1fr 1fr;
    gap: 36px 24px;
    padding-top: 56px;
  }
`;

const Brand = styled.div`
  @media (max-width: 820px) {
    grid-column: 1 / -1;
  }
  p {
    margin: 18px 0 0;
    max-width: 30ch;
    font-size: 14.5px;
    line-height: 1.6;
    color: var(--ink-mute);
  }
`;

const Socials = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
`;

const Social = styled(Link)`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  border: 1px solid var(--line);
  background: var(--paper-2);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s ease, transform 0.15s ease;
  img {
    filter: brightness(0);
    opacity: 0.6;
  }
  &:hover {
    border-color: var(--ink);
    transform: translateY(-2px);
  }
`;

const Col = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 13px;
  h3 {
    margin: 0 0 4px;
    font-family: var(--font-mono), monospace;
    font-size: 11.5px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ink-faint);
  }
  a {
    /* 19px tall in a 32px pitch was under the 24px WCAG AA target floor.
       Negative margin keeps the visual rhythm while growing the hit area. */
    padding: 7px 0;
    margin: -7px 0;
    font-size: 14.5px;
    color: var(--ink-soft);
    text-decoration: none;
    transition: color 0.18s ease;
    width: fit-content;
  }
  a:hover {
    color: var(--ink);
  }
`;

const Bottom = styled.div`
  border-top: 1px solid var(--line);
`;

const BottomInner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-top: 22px;
  padding-bottom: 28px;
  flex-wrap: wrap;
  .copy {
    font-family: var(--font-mono), monospace;
    font-size: 12px;
    letter-spacing: 0.02em;
    color: var(--ink-mute);
  }
  .legal {
    display: flex;
    gap: 18px;
  }
  .legal a {
    font-size: 13px;
    color: var(--ink-mute);
    text-decoration: none;
  }
  .legal a:hover {
    color: var(--ink);
  }
`;

const YEAR = new Date().getFullYear();

export const LandingFooter = () => {
  return (
    <Foot>
      <Top>
        <Brand>
          <Image src='/assets/odigos/logo_text_black.svg' alt='Odigos' width={128} height={29} />
          <p>The runtime context platform. Our own eBPF runtime captures whatever your engineers or your agents ask for, live in production, and exports it as OpenTelemetry you always own.</p>
          <Socials>
            <Social href={GITHUB_LINK} target='_blank' aria-label='GitHub'>
              <Image src='/assets/github.svg' alt='GitHub' width={17} height={17} />
            </Social>
            <Social href='https://www.linkedin.com/company/odigos' target='_blank' aria-label='LinkedIn'>
              <Image src='/assets/linkedin.svg' alt='LinkedIn' width={17} height={17} />
            </Social>
            <Social href='https://x.com/odigos_io' target='_blank' aria-label='X'>
              <Image src='/assets/x.svg' alt='X' width={15} height={15} />
            </Social>
          </Socials>
        </Brand>

        <Col>
          <h3>Product</h3>
          <Link href='/product'>Product</Link>
          <Link href='/pricing'>Pricing</Link>
          <Link href='/roi-calculator'>ROI Calculator</Link>
          <Link href={DOCS_LINK} target='_blank'>Documentation</Link>
          <Link href={DOCS_LINK + '/quickstart/introduction'} target='_blank'>Quickstart</Link>
        </Col>

        <Col>
          <h3>Company</h3>
          <Link href='/about'>About</Link>
          <Link href='/blog'>Blog</Link>
          <Link href='/events'>Events</Link>
          <Link href={CAREERS_LINK} target='_blank'>Careers</Link>
        </Col>

        <Col>
          <h3>Trust</h3>
          <Link href={TRUST_CENTER_LINK} target='_blank'>Trust Center</Link>
          <Link href={SOC_LINK} target='_blank'>SOC 2</Link>
          <Link href={PRIVACY_POLICY_LINK} target='_blank'>Privacy Policy</Link>
          <Link href={GITHUB_LINK} target='_blank'>Open source</Link>
        </Col>
      </Top>

      <Bottom>
        <BottomInner>
          <span className='copy'>© {YEAR} Odigos. All rights reserved.</span>
          <span className='legal'>
            <Link href={PRIVACY_POLICY_LINK} target='_blank'>Privacy</Link>
            <Link href={TRUST_CENTER_LINK} target='_blank'>Trust</Link>
            <Link href={DOCS_LINK} target='_blank'>Docs</Link>
          </span>
        </BottomInner>
      </Bottom>
    </Foot>
  );
};
