'use client';

import React from 'react';
import Image from 'next/image';
import styled, { keyframes } from 'styled-components';
import { CUSTOMERS } from '@/constants';
import { Container } from './primitives';

const Section = styled.section`
  background: var(--paper);
  border-bottom: 1px solid var(--line);
`;

const Inner = styled(Container)`
  padding-top: 30px;
  padding-bottom: 40px;
`;

const Label = styled.p`
  margin: 0 0 26px;
  text-align: center;
  font-family: var(--font-mono), 'Geist Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-mute);
`;

const travel = keyframes`
  to { transform: translateX(-50%); }
`;

const Viewport = styled.div`
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, #000 48px, #000 calc(100% - 48px), transparent);
  &:hover > div {
    animation-play-state: paused;
  }
  @media (max-width: 520px) {
    mask-image: linear-gradient(to right, transparent, #000 20px, #000 calc(100% - 20px), transparent);
  }
  @media (prefers-reduced-motion: reduce) {
    mask-image: none;
  }
`;

const Track = styled.div`
  display: flex;
  width: max-content;
  animation: ${travel} 36s linear infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    width: 100%;
  }
`;

const Group = styled.ul`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  @media (prefers-reduced-motion: reduce) {
    flex: 1;
    flex-wrap: wrap;
    justify-content: center;
    gap: 28px 0;
    &[aria-hidden='true'] {
      display: none;
    }
  }
`;

const Logo = styled.li`
  flex: 0 0 184px;
  width: 184px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  @media (max-width: 520px) {
    flex-basis: 152px;
    width: 152px;
  }
  @media (max-width: 520px) and (prefers-reduced-motion: reduce) {
    flex-basis: 50%;
  }
  img {
    filter: brightness(0);
    opacity: 0.58;
    transition: opacity 0.2s ease;
    width: auto;
    height: auto;
    max-height: 32px;
    max-width: 120px;
  }
  &:hover img {
    opacity: 0.74;
  }
`;

export const LandingLogos = () => {
  return (
    <Section aria-label='Customers'>
      <Inner>
        <Label>Running in production at</Label>
        <Viewport>
          <Track>
            {[false, true].map((duplicate) => (
              <Group key={String(duplicate)} aria-hidden={duplicate || undefined}>
                {CUSTOMERS.map(({ src, alt, width, height }) => (
                  <Logo key={alt}>
                    <Image src={src} alt={duplicate ? '' : alt} width={Math.round(width * 0.82)} height={Math.round(height * 0.82)} />
                  </Logo>
                ))}
              </Group>
            ))}
          </Track>
        </Viewport>
      </Inner>
    </Section>
  );
};
