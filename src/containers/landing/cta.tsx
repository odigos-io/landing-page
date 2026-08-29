'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { ModalType, useModalStore } from '@/store';
import { usePlausible } from '@/hooks';
import { Container, Reveal } from './primitives';

const HUBSPOT_DEMO_URL =
  'https://cta-service-cms2.hubspot.com/web-interactives/public/v1/track/redirect?encryptedPayload=AVxigLKKpYFkaGHLV2SjisuKL8vGZv8GBmHLZBbEO8WEPKpvVFGLbCJ75h5TYp0EunqgNph6y6otczaQIcIVW%2Bjg6QKGujbcqjfJbc0ppMX0vfLpYVru76VnnU3%2FWnz91xJehZPt8GVQCH9oQWAKvhLTOMypjCua0VKp16%2Bf%2BFCDMSrqktcXUfrk&webInteractiveContentId=208657275164&portalId=50932826';

const Section = styled.section`
  background: var(--paper);
  padding: 28px 0 0;
`;

const Band = styled(Container)``;

const Card = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 26px;
  background: radial-gradient(120% 140% at 15% 0%, #1a1a20, var(--panel) 55%);
  border: 1px solid var(--panel-line);
  box-shadow: var(--shadow-panel);
  padding: 76px 56px;
  text-align: center;

  @media (max-width: 700px) {
    padding: 52px 24px;
    border-radius: 20px;
  }
`;

const Mesh = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
  background-size: 46px 46px;
  -webkit-mask-image: radial-gradient(70% 90% at 50% 0%, #000, transparent 75%);
  mask-image: radial-gradient(70% 90% at 50% 0%, #000, transparent 75%);
`;

const Glow = styled.div`
  position: absolute;
  top: -120px;
  left: 50%;
  width: 700px;
  height: 460px;
  transform: translateX(-50%);
  pointer-events: none;
  background: radial-gradient(closest-side, rgba(91, 67, 241, 0.34), transparent 70%);
`;

const Eyebrow = styled.div`
  position: relative;
  font-family: var(--font-mono), monospace;
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--panel-mute);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--signal);
  }
`;

const Title = styled.h2`
  position: relative;
  margin: 22px auto 0;
  max-width: 18ch;
  font-size: clamp(28px, 4.4vw, 50px);
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.035em;
  color: #fff;
`;

const Ctas = styled.div`
  position: relative;
  margin-top: 36px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
`;

const Primary = styled.button`
  height: 52px;
  padding: 0 24px;
  border-radius: 13px;
  border: none;
  background: var(--paper-2);
  color: var(--ink);
  font-family: var(--font-display), sans-serif;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  transition: transform 0.12s ease, box-shadow 0.2s ease;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
  &:hover {
    box-shadow: 0 14px 38px -10px rgba(0, 0, 0, 0.6);
  }
  &:active {
    transform: translateY(1px);
  }
  svg {
    transition: transform 0.2s ease;
  }
  &:hover svg {
    transform: translateX(3px);
  }
`;

const Ghost = styled(Link)`
  height: 52px;
  padding: 0 24px;
  border-radius: 13px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.04);
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  transition: border-color 0.2s ease, background 0.2s ease;
  &:hover {
    border-color: rgba(255, 255, 255, 0.45);
    background: rgba(255, 255, 255, 0.08);
  }
`;

const Note = styled.p`
  position: relative;
  margin: 22px 0 0;
  font-family: var(--font-mono), monospace;
  font-size: 12px;
  letter-spacing: 0.04em;
  color: var(--panel-mute);
`;

export const LandingCTA = () => {
  const setModal = useModalStore((s) => s.setModal);
  const { trackClick } = usePlausible();

  return (
    <Section>
      <Band>
        <Reveal>
          <Card>
            <Mesh />
            <Glow />
            <Eyebrow>One command. Any Kubernetes cluster.</Eyebrow>
            <Title>Bring us the question your stack can&rsquo;t answer.</Title>
            <Ctas>
              <Primary
                data-track='cta'
                data-track-label='Start 14-day trial'
                onClick={() => {
                  trackClick('Start 14-day trial');
                  setModal(ModalType.TRIAL);
                }}
              >
                Start 14-day trial
                <svg width='16' height='16' viewBox='0 0 16 16' fill='none' aria-hidden>
                  <path d='M3 8h9M8.5 3.5 13 8l-4.5 4.5' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' />
                </svg>
              </Primary>
              <Ghost href={HUBSPOT_DEMO_URL} data-track='cta' data-track-label='Get a demo' onClick={() => trackClick('Get a demo')}>
                Get a demo
              </Ghost>
            </Ctas>
            <Note>Our own eBPF. Nothing enters your process.</Note>
          </Card>
        </Reveal>
      </Band>
    </Section>
  );
};
