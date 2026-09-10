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
     starts at the first column so every control remains reachable. */
  @media (max-width: 720px) {
    overflow-x: auto;
    overscroll-behavior-x: contain;
    img {
      width: 1040px;
      max-width: none;
    }
  }
`;

const FullSize = styled.a`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  margin-top: 18px;
  color: var(--accent);
  font-size: 14px;
  text-underline-offset: 4px;
`;

type ProductProps = {
  eyebrow?: string;
  title?: React.ReactNode;
  desc?: string;
};

export const LandingProduct = ({
  eyebrow = 'Governed by design',
  title = (
    <>
      One question someone approved. <span className='mute'>One answer from production.</span>
    </>
  ),
  desc = 'A capture names a workload and the code it may read. It is scoped, reversible, approved under role-based access, and masked for sensitive values before it leaves your cluster. Reading a value out of production is a decision your organisation made, with an audit trail, not a side effect of an AI agent.',
}: ProductProps) => {
  return (
    <Section>
      <Inner>
        <Reveal>
          <Head>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2>{title}</h2>
            <p>{desc}</p>
          </Head>
        </Reveal>

        <Reveal delay={70}>
          <Shot tabIndex={0} role='region' aria-label='Odigos console screenshot; scroll horizontally to inspect all controls'>
            <Image
              src='/assets/renders/product_preview.png'
              alt='The Odigos console: detected sources, in-flight actions and export destinations for a production cluster'
              width={1440}
              height={900}
              sizes='(max-width: 1200px) 100vw, 1200px'
            />
          </Shot>
          <FullSize href='/assets/renders/product_preview.png' target='_blank' rel='noopener noreferrer'>
            Open the full-size console
          </FullSize>
        </Reveal>
      </Inner>
    </Section>
  );
};
