'use client';

import React from 'react';
import styled from 'styled-components';
import { Container, Eyebrow, Reveal } from './primitives';
import { RoutesDiagram } from './routes-diagram';

/* The argument, given room: an agent needs data nobody collected, and there
   are exactly two ways to get it. */

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
  max-width: 720px;
  h2 {
    margin: 14px 0 0;
    font-size: clamp(28px, 3.6vw, 44px);
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

const Board = styled.div`
  margin-top: 44px;
`;

export const LandingRoutes = () => {
  return (
    <Section>
      <Inner>
        <Reveal>
          <Head>
            <Eyebrow>Two routes, one production</Eyebrow>
            <h2>
              Your agent needs one more signal. <span className='mute'>Watch what that costs.</span>
            </h2>
            <p>An agent working an incident hits data nobody collected. Today the only way to get it is to write it into the code and push that through review, CI and a release window, which is why AI stops being useful the moment it needs something new. Odigos gives it the other route.</p>
          </Head>
        </Reveal>
        <Reveal delay={70}>
          <Board>
            <RoutesDiagram />
          </Board>
        </Reveal>
      </Inner>
    </Section>
  );
};
