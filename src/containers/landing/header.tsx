'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { NAVIGATION } from '@/constants';
import { Container, TrialCTA, DemoCTA } from './primitives';

const Bar = styled.header<{ $scrolled: boolean }>`
  position: sticky;
  top: 0;
  z-index: 60;
  background: ${({ $scrolled }) => ($scrolled ? 'rgba(251, 250, 247, 0.82)' : 'rgba(251, 250, 247, 0)')};
  /* saturate() forces a full-viewport repaint behind a sticky element on
     every scroll frame. A plain blur composites far more cheaply. */
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'blur(10px)' : 'none')};
  border-bottom: 1px solid ${({ $scrolled }) => ($scrolled ? 'var(--line)' : 'transparent')};
  transition:
    background 0.3s ease,
    border-color 0.3s ease;
`;

const Row = styled.div`
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
`;

const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  line-height: 0;
  flex-shrink: 0;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 4px;
  @media (max-width: 1240px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  position: relative;
  padding: 8px 13px;
  border-radius: 9px;
  font-size: 14.5px;
  font-weight: 450;
  color: var(--ink-soft);
  text-decoration: none;
  transition:
    color 0.18s ease,
    background 0.18s ease;
  &:hover {
    color: var(--ink);
    background: rgba(18, 18, 21, 0.045);
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  @media (max-width: 1240px) {
    display: none;
  }
`;

const Burger = styled.button`
  display: none;
  @media (max-width: 1240px) {
    display: inline-flex;
  }
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 11px;
  border: 1px solid var(--line-strong);
  background: var(--paper-2);
  cursor: pointer;
  span {
    position: relative;
    width: 17px;
    height: 1.6px;
    background: var(--ink);
    border-radius: 2px;
  }
  span::before,
  span::after {
    content: '';
    position: absolute;
    left: 0;
    width: 17px;
    height: 1.6px;
    background: var(--ink);
    border-radius: 2px;
  }
  span::before {
    top: -5px;
  }
  span::after {
    top: 5px;
  }
`;

const Sheet = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 80;
  background: var(--paper);
  display: ${({ $open }) => ($open ? 'flex' : 'none')};
  flex-direction: column;
  padding: 20px;
`;

const SheetTop = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Close = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 11px;
  border: 1px solid var(--line-strong);
  background: var(--paper-2);
  font-size: 20px;
  line-height: 1;
  color: var(--ink);
  cursor: pointer;
`;

const SheetLinks = styled.nav`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  border-top: 1px solid var(--line);
`;

const SheetLink = styled(Link)`
  padding: 18px 4px;
  border-bottom: 1px solid var(--line);
  font-size: 19px;
  font-weight: 500;
  color: var(--ink);
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SheetCtas = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  & > * {
    width: 100%;
  }
`;

export const LandingHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    /* The sheet must not live inside Bar. Bar gets a backdrop-filter once
       scrolled, and a backdrop-filter becomes the containing block for
       position:fixed descendants, which clamped the open menu to the height
       of the header instead of the viewport. */
    <>
      <Bar $scrolled={scrolled}>
        <Container>
          <Row>
            <Brand href='/' aria-label='Odigos home'>
              <Image src='/assets/odigos/logo_text_black.svg' alt='Odigos' width={128} height={29} priority />
            </Brand>

            <Nav>
              {NAVIGATION.map(({ label, href }) => (
                <NavLink key={label} href={href}>
                  {label}
                </NavLink>
              ))}
            </Nav>

            <Right>
              <DemoCTA size='sm' />
              <TrialCTA size='sm' />
            </Right>

            <Burger aria-label='Open menu' aria-expanded={open} aria-controls='mobile-nav' onClick={() => setOpen(true)}>
              <span />
            </Burger>
          </Row>
        </Container>
      </Bar>

      <Sheet id='mobile-nav' $open={open}>
        <SheetTop>
          <Image src='/assets/odigos/logo_text_black.svg' alt='Odigos' width={120} height={27} />
          <Close aria-label='Close menu' onClick={() => setOpen(false)}>
            ×
          </Close>
        </SheetTop>
        <SheetLinks>
          {NAVIGATION.map(({ label, href }) => (
            <SheetLink key={label} href={href} onClick={() => setOpen(false)}>
              {label}
              <span aria-hidden style={{ color: 'var(--ink-faint)' }}>
                →
              </span>
            </SheetLink>
          ))}
        </SheetLinks>
        <SheetCtas onClick={() => setOpen(false)}>
          <TrialCTA />
        </SheetCtas>
      </Sheet>
    </>
  );
};
