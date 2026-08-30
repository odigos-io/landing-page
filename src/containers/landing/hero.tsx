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
  grid-template-columns: 1.02fr 1.18fr;
  align-items: center;
  gap: 56px;
  padding-top: 84px;
  padding-bottom: 100px;
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
  font-size: clamp(34px, 4.4vw, 56px);
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
    position: relative;
    white-space: nowrap;
  }
  em::after {
    content: '';
    position: absolute;
    left: -0.02em;
    right: -0.02em;
    bottom: -0.17em;
    height: 0.075em;
    background: linear-gradient(90deg, var(--accent), #8a74ff 60%, var(--signal-bright));
    border-radius: 3px;
  }
`;

const Sub = styled.p`
  margin: 26px 0 0;
  max-width: 500px;
  font-size: 19px;
  line-height: 1.6;
  color: var(--ink-soft);
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
          <Eyebrow>eBPF that reads inside the process, not at the syscall</Eyebrow>
          <H1>
            <span>Production</span>
            <span>
              <em>answers back.</em>
            </span>
          </H1>
          <Sub>Point Odigos at any function in a live service, including a stripped Go binary with no symbols that nothing was ever set up to watch, and get back the arguments it was called with and what it returned. In about a second.</Sub>
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
