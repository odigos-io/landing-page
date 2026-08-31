'use client';

import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
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

const Wall = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 36px 8px;
  @media (max-width: 520px) {
    gap: 28px 4px;
  }
`;

const Logo = styled.div`
  flex: 0 0 176px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 34px;
  @media (max-width: 520px) {
    flex-basis: 44%;
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
    <Section>
      <Inner>
          <Label>Running in production at</Label>
          <Wall>
            {CUSTOMERS.map(({ src, alt, width, height }) => (
              <Logo key={alt} aria-label={alt}>
                <Image src={src} alt={alt} width={Math.round(width * 0.82)} height={Math.round(height * 0.82)} />
              </Logo>
            ))}
          </Wall>
      </Inner>
    </Section>
  );
};
