'use client';

import React from 'react';
import styled from 'styled-components';
import { LandingHeader, LandingFooter, LandingCTA } from '@/containers/landing';
import { Container, Eyebrow, Reveal, DemoCTA, TrialCTA } from '@/containers/landing/primitives';
import { PlatformBridge } from '@/containers/landing/platform-bridge';
import { SecurityArt } from './security-art';
import { SecurityCards } from './security-cards';

// Original hero preserved at the owner's request.
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
    > * {
      min-width: 0;
    }
    gap: 40px;
    padding-top: 48px;
    padding-bottom: 48px;
  }
`;

const HeroH1 = styled.h1`
  margin: 18px 0 0;
  font-size: clamp(38px, 5.2vw, 66px);
  line-height: 1.03;
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


export const SecurityContent = () => (
  <div className='landing-root'>
    <LandingHeader />
    <main>
        <HeroSection>
          <HeroBackdrop />
          <HeroInner>
            <div>
              <Reveal>
                <Eyebrow>Security on the production context platform</Eyebrow>
              </Reveal>
              <Reveal delay={60}>
                <HeroH1>
                  Nation-state firepower <em>is now an AI subscription.</em>
                </HeroH1>
              </Reveal>
              <Reveal delay={120}>
                <HeroSub>
                  One attacker with a frontier model now does what took a team. <b>Odigos sees into the runtime like never before and blocks AI-powered attacks at the function level</b>, with
                  nothing in your code.
                </HeroSub>
              </Reveal>
              <Reveal delay={180}>
                <HeroCtas>
                  <DemoCTA label='Talk to our security team' variant='primary' />
                  <TrialCTA variant='secondary' />
                </HeroCtas>
              </Reveal>
            </div>
            <Reveal delay={140}>
              <SecurityArt />
            </Reveal>
          </HeroInner>
        </HeroSection>
      <SecurityCards />
      <PlatformBridge current='security' />
      <LandingCTA audience='security' />
    </main>
    <LandingFooter />
  </div>
);
