'use client';

import React from 'react';
import styled from 'styled-components';
import { Container, Eyebrow, Reveal, DemoCTA, TrialCTA } from './primitives';

/* The inner-page hero: copy on the left, a visual on the right, the home
   hero's grid and bloom behind it. Observability and Technology share it. */

const HeroSection = styled.section`
  position: relative;
  overflow: hidden;
  background: var(--paper);
  border-bottom: 1px solid var(--line);
`;

const HeroBackdrop = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 58px 58px;
  -webkit-mask-image: radial-gradient(120% 78% at 50% -8%, #000 30%, transparent 72%);
  mask-image: radial-gradient(120% 78% at 50% -8%, #000 30%, transparent 72%);
`;

const HeroBloom = styled.div`
  position: absolute;
  top: -360px;
  left: 58%;
  width: 1100px;
  height: 720px;
  transform: translateX(-50%);
  pointer-events: none;
  background: radial-gradient(closest-side, rgba(91, 67, 241, 0.12), rgba(91, 67, 241, 0) 70%);
`;

const HeroInner = styled(Container)`
  position: relative;
  padding-top: 64px;
  padding-bottom: 56px;
  display: grid;
  grid-template-columns: 1.02fr 1.12fr;
  > * {
    min-width: 0;
  }
  gap: 56px;
  align-items: center;
  @media (max-width: 1040px) {
    grid-template-columns: 1fr;
    gap: 40px;
    padding-top: 48px;
    padding-bottom: 48px;
  }
`;

const HeroH1 = styled.h1`
  margin: 18px 0 0;
  font-size: clamp(34px, 4.3vw, 54px);
  line-height: 1.05;
  font-weight: 600;
  letter-spacing: -0.038em;
  color: var(--ink);

  em {
    font-style: normal;
    display: block;
    color: var(--ink-faint);
  }
`;

const HeroSub = styled.p`
  margin: 24px 0 0;
  max-width: 52ch;
  font-size: clamp(16.5px, 1.6vw, 19px);
  line-height: 1.55;
  color: var(--ink-soft);

  b {
    font-weight: 600;
    color: var(--ink);
  }
`;

const HeroCtas = styled.div`
  margin-top: 32px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  @media (max-width: 600px) {
    > * {
      flex: 1 1 100%;
    }
  }
`;

const Visual = styled.div`
  position: relative;
  min-width: 0;
`;

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  sub: React.ReactNode;
  visual: React.ReactNode;
  primary?: React.ReactNode;
  secondary?: React.ReactNode;
};

export const PageHero = ({ eyebrow, title, sub, visual, primary = <TrialCTA />, secondary = <DemoCTA /> }: Props) => (
  <HeroSection>
    <HeroBackdrop />
    <HeroBloom />
    <HeroInner>
      <div>
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={60}>
          <HeroH1>{title}</HeroH1>
        </Reveal>
        <Reveal delay={120}>
          <HeroSub>{sub}</HeroSub>
        </Reveal>
        <Reveal delay={180}>
          <HeroCtas>
            {primary}
            {secondary}
          </HeroCtas>
        </Reveal>
      </div>
      <Reveal delay={140}>
        <Visual>{visual}</Visual>
      </Reveal>
    </HeroInner>
  </HeroSection>
);
