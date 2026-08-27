'use client';

import React from 'react';
import styled from 'styled-components';
import { Container, Reveal } from './primitives';

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

const Statement = styled.h2`
  margin: 0 auto;
  max-width: 920px;
  text-align: center;
  font-size: clamp(28px, 4.2vw, 46px);
  line-height: 1.2;
  font-weight: 500;
  letter-spacing: -0.025em;
  color: var(--ink-faint);
  b {
    color: var(--ink);
    font-weight: 600;
  }
`;

export const LandingValue = () => {
  return (
    <Section>
      <Inner>
        <Reveal>
          <Statement>
            An agent can form a hypothesis, test it and move on in under a second. Getting it one signal nobody captured takes a code change, a review, a pipeline and a deploy. <b>Your agents run in seconds. Your visibility ships in sprints.</b>
          </Statement>
        </Reveal>
      </Inner>
    </Section>
  );
};
