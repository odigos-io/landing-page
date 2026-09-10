'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { NAV_GROUPS } from '@/constants';
import { useModalStore } from '@/store';
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
  @media (max-width: 940px) {
    display: none;
  }
`;

const NavGroupWrap = styled.div`
  position: relative;
`;

const NavTrigger = styled.button<{ $open: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 13px;
  border: none;
  border-radius: 9px;
  background: ${({ $open }) => ($open ? 'rgba(18, 18, 21, 0.045)' : 'transparent')};
  font-family: inherit;
  font-size: 14.5px;
  font-weight: 450;
  color: ${({ $open }) => ($open ? 'var(--ink)' : 'var(--ink-soft)')};
  cursor: pointer;
  transition:
    color 0.18s ease,
    background 0.18s ease;
  &:hover {
    color: var(--ink);
    background: rgba(18, 18, 21, 0.045);
  }

  svg {
    transition: transform 0.18s ease;
    transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
  }
`;

const Menu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 306px;
  padding: 8px;
  border-radius: 14px;
  border: 1px solid var(--line);
  background: var(--paper-2);
  box-shadow: var(--shadow-lift);
  z-index: 70;
`;

const MenuItem = styled(Link)`
  display: block;
  padding: 11px 12px;
  border-radius: 10px;
  text-decoration: none;
  transition: background 0.16s ease;
  &:hover {
    background: var(--paper-3);
  }

  .l {
    font-size: 15px;
    font-weight: 550;
    letter-spacing: -0.01em;
    color: var(--ink);
  }
  .b {
    margin-top: 3px;
    font-size: 13px;
    line-height: 1.45;
    color: var(--ink-mute);
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
  @media (max-width: 940px) {
    display: none;
  }
`;

const Burger = styled.button`
  display: none;
  @media (max-width: 940px) {
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
  overflow-y: auto;
  overscroll-behavior: contain;
  > * {
    flex-shrink: 0;
  }
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
  padding-top: 24px;
  padding-bottom: env(safe-area-inset-bottom, 0px);
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
  const [menu, setMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menu) return;
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenu(null);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [menu]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const trigger = burgerRef.current;
    document.body.style.overflow = 'hidden';
    const focusable = () => Array.from(sheetRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') || []);
    focusable()[0]?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
      if (event.key !== 'Tab') return;
      const elements = focusable();
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      // A trial opened from this sheet owns focus and the scroll lock now.
      if (!useModalStore.getState().modal) {
        document.body.style.overflow = previousOverflow;
        trigger?.focus();
      }
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

            <Nav ref={navRef}>
              {NAV_GROUPS.map((g) =>
                g.items ? (
                  <NavGroupWrap key={g.label}>
                    <NavTrigger
                      $open={menu === g.label}
                      aria-expanded={menu === g.label}
                      aria-haspopup='true'
                      onClick={() => setMenu(menu === g.label ? null : g.label)}
                    >
                      {g.label}
                      <svg width='10' height='10' viewBox='0 0 12 12' fill='none' aria-hidden>
                        <path d='M2.5 4.5 6 8l3.5-3.5' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' />
                      </svg>
                    </NavTrigger>
                    {menu === g.label && (
                      <Menu role='menu'>
                        {g.items.map((it) => (
                          <MenuItem
                            key={it.label}
                            href={it.href}
                            role='menuitem'
                            onClick={() => setMenu(null)}
                            {...(it.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                          >
                            <div className='l'>{it.label}</div>
                            <div className='b'>{it.blurb}</div>
                          </MenuItem>
                        ))}
                      </Menu>
                    )}
                  </NavGroupWrap>
                ) : (
                  <NavLink key={g.label} href={g.href as string}>
                    {g.label}
                  </NavLink>
                ),
              )}
            </Nav>

            <Right>
              <DemoCTA size='sm' />
              <TrialCTA size='sm' />
            </Right>

            <Burger ref={burgerRef} aria-label='Open menu' aria-expanded={open} aria-controls='mobile-nav' onClick={() => setOpen(true)}>
              <span />
            </Burger>
          </Row>
        </Container>
      </Bar>

      <Sheet ref={sheetRef} id='mobile-nav' role='dialog' aria-modal='true' aria-label='Site navigation' $open={open}>
        <SheetTop>
          <Image src='/assets/odigos/logo_text_black.svg' alt='Odigos' width={120} height={27} />
          <Close aria-label='Close menu' onClick={() => setOpen(false)}>
            ×
          </Close>
        </SheetTop>
        <SheetLinks>
          {NAV_GROUPS.flatMap((g) =>
            g.items
              ? g.items.map((it) => (
                  <SheetLink key={it.label} href={it.href} onClick={() => setOpen(false)} {...(it.external ? { target: '_blank', rel: 'noreferrer' } : {})}>
                    {it.label}
                    <span aria-hidden style={{ color: 'var(--ink-faint)' }}>
                      →
                    </span>
                  </SheetLink>
                ))
              : [
                  <SheetLink key={g.label} href={g.href as string} onClick={() => setOpen(false)}>
                    {g.label}
                    <span aria-hidden style={{ color: 'var(--ink-faint)' }}>
                      →
                    </span>
                  </SheetLink>,
                ],
          )}
        </SheetLinks>
        <SheetCtas onClick={() => setOpen(false)}>
          <TrialCTA />
        </SheetCtas>
      </Sheet>
    </>
  );
};
