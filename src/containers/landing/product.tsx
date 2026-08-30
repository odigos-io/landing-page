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

  /* the screenshot is 1440 wide; on phones it would become unreadable mush, so
     it scrolls sideways inside its own frame instead of shrinking. The scroll
     starts past the first column so the frame opens on the part that matters,
     and the right edge fades so it reads as scrollable rather than cropped. */
  @media (max-width: 720px) {
    overflow-x: auto;
    overscroll-behavior-x: contain;
    img {
      width: 1040px;
      max-width: none;
      margin-left: -232px;
    }
    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 56px;
      z-index: 2;
      pointer-events: none;
      background: linear-gradient(90deg, rgba(11, 11, 13, 0), rgba(11, 11, 13, 0.85));
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
            <Eyebrow>What a capture actually is</Eyebrow>
            <h2>
              Every capture is one line <span className='mute'>you can read.</span>
            </h2>
            <p>A capture names a workload and a function. It is scoped per cluster, reversible, and governed by RBAC, so reading a value out of production is an action somebody authorised rather than a side effect of an agent.</p>
          </Head>
        </Reveal>

        <Reveal delay={70}>
          <Shot>
            <Image src='/assets/renders/product_preview.png' alt='The Odigos console: detected sources, in-flight actions and export destinations for a production cluster' width={1440} height={900} sizes='(max-width: 1200px) 100vw, 1200px' />
          </Shot>
        </Reveal>

      </Inner>
    </Section>
  );
};
