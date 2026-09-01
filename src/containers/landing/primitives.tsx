'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import styled, { css } from 'styled-components';
import { ModalType, useModalStore } from '@/store';
import { usePlausible } from '@/hooks';

/* ----------------------------------------------------------------
   Layout
----------------------------------------------------------------- */
export const Container = styled.div`
  width: 100%;
  max-width: var(--maxw);
  margin: 0 auto;
  padding-left: 24px;
  padding-right: 24px;
  @media (max-width: 640px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

export const Eyebrow = styled.span<{ $light?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-family: var(--font-mono), 'Geist Mono', ui-monospace, monospace;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ $light }) => ($light ? 'var(--panel-mute)' : 'var(--ink-mute)')};

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 0 0 rgba(91, 67, 241, 0.45);
    animation: lp-pulse 2.6s ease-out infinite;
  }

  @keyframes lp-pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(91, 67, 241, 0.4);
    }
    70% {
      box-shadow: 0 0 0 7px rgba(91, 67, 241, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(91, 67, 241, 0);
    }
  }
`;

/* ----------------------------------------------------------------
   Scroll reveal — progressive enhancement.
   Content is visible by default; we only arm the hidden state in JS,
   so users without JS / before hydration still see everything.
----------------------------------------------------------------- */
export const Reveal = ({ children, delay = 0, as }: { children: React.ReactNode; delay?: number; as?: React.ElementType }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Anything already on screen at load stays painted. Arming it would hide
    // server-rendered content until hydration, which pushes out LCP badly on
    // a throttled phone.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.classList.add('is-armed');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.transitionDelay = `${delay}ms`;
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  const Tag = (as || 'div') as React.ElementType;
  return (
    <Tag ref={ref} data-reveal>
      {children}
    </Tag>
  );
};

/* ----------------------------------------------------------------
   Buttons
----------------------------------------------------------------- */
const buttonBase = css`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 50px;
  padding: 0 22px;
  border-radius: 12px;
  font-family: var(--font-display), 'Geist', sans-serif;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -0.01em;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid transparent;
  text-decoration: none;
  transition: transform 0.12s ease, background 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;

  &:active {
    transform: translateY(1px);
  }
  svg {
    transition: transform 0.2s ease;
  }
  &:hover svg.arrow {
    transform: translateX(3px);
  }
`;

const PrimaryBtn = styled.button<{ $size?: 'sm' | 'md' }>`
  ${buttonBase};
  background: var(--ink);
  color: var(--paper-2);
  box-shadow: 0 1px 2px rgba(18, 18, 21, 0.18), 0 12px 26px -14px rgba(18, 18, 21, 0.5);
  ${({ $size }) => $size === 'sm' && 'height: 42px; padding: 0 18px; font-size: 14px; border-radius: 11px;'}
  &:hover {
    background: #000;
    box-shadow: 0 1px 2px rgba(18, 18, 21, 0.2), 0 16px 34px -14px rgba(18, 18, 21, 0.55);
  }
`;

const SecondaryLink = styled(Link)<{ $size?: 'sm' | 'md' }>`
  ${buttonBase};
  background: var(--paper-2);
  color: var(--ink);
  border-color: var(--line-strong);
  ${({ $size }) => $size === 'sm' && 'height: 42px; padding: 0 18px; font-size: 14px; border-radius: 11px;'}
  &:hover {
    border-color: var(--ink);
    background: var(--paper-2);
  }
`;

const Arrow = () => (
  <svg className='arrow' width='16' height='16' viewBox='0 0 16 16' fill='none' aria-hidden='true'>
    <path d='M3 8h9M8.5 3.5 13 8l-4.5 4.5' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

export const HUBSPOT_DEMO_URL =
  'https://cta-service-cms2.hubspot.com/web-interactives/public/v1/track/redirect?encryptedPayload=AVxigLKKpYFkaGHLV2SjisuKL8vGZv8GBmHLZBbEO8WEPKpvVFGLbCJ75h5TYp0EunqgNph6y6otczaQIcIVW%2Bjg6QKGujbcqjfJbc0ppMX0vfLpYVru76VnnU3%2FWnz91xJehZPt8GVQCH9oQWAKvhLTOMypjCua0VKp16%2Bf%2BFCDMSrqktcXUfrk&webInteractiveContentId=208657275164&portalId=50932826';

export const TrialCTA = ({ size = 'md', label = 'Start 14-day trial' }: { size?: 'sm' | 'md'; label?: string }) => {
  const setModal = useModalStore((s) => s.setModal);
  const { trackClick } = usePlausible();
  return (
    <PrimaryBtn
      $size={size}
      data-track='cta'
      data-track-label={label}
      onClick={() => {
        trackClick(label);
        setModal(ModalType.TRIAL);
      }}
    >
      {label}
      <Arrow />
    </PrimaryBtn>
  );
};

export const DemoCTA = ({ size = 'md', label = 'Get a demo' }: { size?: 'sm' | 'md'; label?: string }) => {
  const { trackClick } = usePlausible();
  return (
    <SecondaryLink href={HUBSPOT_DEMO_URL} $size={size} data-track='cta' data-track-label={label} onClick={() => trackClick(label)}>
      {label}
    </SecondaryLink>
  );
};
