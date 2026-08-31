'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Container, Eyebrow, TrialCTA, DemoCTA } from './primitives';
import { HeroArt } from './hero-art';

const rise = keyframes`from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}`;

const Section = styled.section`
  position: relative;
  overflow: hidden;
  background: var(--paper);
  border-bottom: 1px solid var(--line);
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 58px 58px;
  background-position: center top;
  -webkit-mask-image: radial-gradient(125% 78% at 60% -8%, #000 32%, transparent 74%);
  mask-image: radial-gradient(125% 78% at 60% -8%, #000 32%, transparent 74%);
`;

const Bloom = styled.div`
  position: absolute;
  top: -360px;
  left: 58%;
  width: 1100px;
  height: 720px;
  transform: translateX(-50%);
  pointer-events: none;
  background: radial-gradient(closest-side, rgba(91, 67, 241, 0.12), rgba(91, 67, 241, 0) 70%);
`;

const Grid = styled(Container)`
  position: relative;
  display: grid;
  grid-template-columns: 1.12fr 1.08fr;
  align-items: center;
  gap: 56px;
  padding-top: 64px;
  padding-bottom: 52px;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    gap: 44px;
    padding-top: 52px;
    padding-bottom: 64px;
  }
`;

const Copy = styled.div`
  & > * {
    animation: ${rise} 0.85s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  & > *:nth-child(1) {
    animation-delay: 0.02s;
  }
  & > *:nth-child(2) {
    animation-delay: 0.09s;
  }
  & > *:nth-child(3) {
    animation-delay: 0.18s;
  }
  & > *:nth-child(4) {
    animation-delay: 0.27s;
  }
  & > *:nth-child(5) {
    animation-delay: 0.36s;
  }
  & > *:nth-child(6) {
    animation-delay: 0.45s;
  }
`;

const H1 = styled.h1`
  margin: 26px 0 0;
  font-size: clamp(32px, 4vw, 50px);
  line-height: 1.22;
  padding-bottom: 0.1em;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: var(--ink);
  span {
    display: block;
  }
  em {
    font-style: normal;
  }
  span:first-child {
    color: var(--ink-faint);
  }
`;

const Sub = styled.p`
  margin: 26px 0 0;
  max-width: 500px;
  font-size: 19px;
  line-height: 1.6;
  color: var(--ink-soft);

  b {
    font-weight: 600;
    color: var(--ink);
  }
  @media (max-width: 1000px) {
    font-size: 17px;
  }
`;

const Ctas = styled.div`
  margin: 32px 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const Visual = styled.div`
  position: relative;
  animation: ${rise} 1s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: 0.16s;
  @media (max-width: 1000px) {
    order: 2;
  }
`;

export const LandingHero = () => {
  return (
    <Section>
      <Backdrop />
      <Bloom />
      <Grid>
        <Copy>
          <Eyebrow>Dynamic telemetry, decided at the moment you ask</Eyebrow>
          <H1>
            <span>Let your agents</span>
            <span>
              <em>interrogate production.</em>
            </span>
          </H1>
          <Sub>Ask production <b>a question nobody set it up to answer</b>. Any function in any running service, answered in seconds, with no code change.</Sub>
          <Ctas>
            <TrialCTA />
            <DemoCTA />
          </Ctas>
        </Copy>

        <Visual>
          <HeroArt />
        </Visual>
      </Grid>
    </Section>
  );
};
