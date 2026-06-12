'use client';

import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { Container, Reveal } from './primitives';

const Section = styled.section`
  background: var(--paper);
  border-bottom: 1px solid var(--line);
`;

const Inner = styled(Container)`
  padding-top: 92px;
  padding-bottom: 92px;
  max-width: 980px;
  @media (max-width: 1000px) {
    padding-top: 64px;
    padding-bottom: 64px;
  }
`;

const Mark = styled.div`
  font-family: var(--font-display), serif;
  font-size: 80px;
  line-height: 0.6;
  font-weight: 600;
  color: var(--accent);
  height: 36px;
`;

const Quote = styled.blockquote`
  margin: 22px 0 0;
  font-size: clamp(24px, 3.2vw, 38px);
  line-height: 1.32;
  font-weight: 500;
  letter-spacing: -0.022em;
  color: var(--ink);
  b {
    font-weight: 600;
    background: linear-gradient(transparent 62%, var(--signal-soft) 62%);
  }
`;

const Author = styled.div`
  margin-top: 34px;
  display: flex;
  align-items: center;
  gap: 18px;
  .who {
    font-size: 15px;
    color: var(--ink);
    font-weight: 600;
  }
  .who span {
    display: block;
    font-weight: 400;
    color: var(--ink-mute);
    font-size: 14px;
    margin-top: 2px;
  }
  .bar {
    width: 1px;
    height: 34px;
    background: var(--line-strong);
  }
  img {
    filter: brightness(0);
    opacity: 0.66;
  }
`;

export const LandingTestimonial = () => {
  return (
    <Section>
      <Inner>
        <Reveal>
          <Mark>&ldquo;</Mark>
          <Quote>
            eBPF-based instrumentation is clearly the future for observability. With Odigos we expanded observability across our services with <b>almost zero developer overhead</b>, sending traces, metrics, and logs straight into our existing stack.
          </Quote>
          <Author>
            <div className='who'>
              Sebastian Bonk
              <span>Avodaq</span>
            </div>
            <div className='bar' />
            <Image src='/assets/partners/avodaq.svg' alt='Avodaq' width={92} height={29} />
          </Author>
        </Reveal>
      </Inner>
    </Section>
  );
};
