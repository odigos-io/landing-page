'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { CONTACT_SALES_LINK, NAVIGATION } from '@/constants';

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  background: color-mix(in srgb, var(--nd-page) 92%, transparent);
  color: var(--nd-text-strong);
  backdrop-filter: blur(14px);
`;

const Nav = styled.nav`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  width: min(100% - 48px, 1360px);
  height: 64px;
  margin: 0 auto;

  @media (max-width: 800px) {
    display: flex;
    justify-content: space-between;
    width: min(100% - 32px, 1360px);
    height: 58px;
  }
`;

const LogoLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-self: start;
  line-height: 0;

  img {
    filter: none;
  }

  html[data-new-theme='dark'] & img {
    filter: invert(1);
  }
`;

const CenterLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;

  @media (max-width: 800px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: inherit;
  font-size: 13px;
  font-weight: 400;
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;
  transition: opacity 160ms ease;

  &:hover {
    opacity: 0.58;
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 4px;
    border-radius: 2px;
  }
`;

const RightLinks = styled.div`
  display: flex;
  align-items: center;
  justify-self: end;
  gap: 8px;

  @media (max-width: 800px) {
    margin-left: auto;
  }
`;

const DemoLink = styled.a`
  color: var(--nd-button-text);
  padding: 9px 14px;
  border-radius: 999px;
  background: var(--nd-button-bg);
  font-size: 13px;
  font-weight: 400;
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;
  transition: opacity 160ms ease;

  &:hover {
    opacity: 0.82;
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 3px;
  }
`;

const MenuButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  margin: 0 0 0 2px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: inherit;
  cursor: pointer;

  @media (max-width: 800px) {
    display: inline-flex;
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
`;

const MenuIcon = styled.span<{ $open: boolean }>`
  position: relative;
  width: 17px;
  height: 12px;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 17px;
    height: 1.5px;
    border-radius: 1px;
    background: currentColor;
    transition:
      top 160ms ease,
      transform 160ms ease;
  }

  &::before {
    top: ${({ $open }) => ($open ? '5px' : '1px')};
    transform: rotate(${({ $open }) => ($open ? '45deg' : '0deg')});
  }

  &::after {
    top: ${({ $open }) => ($open ? '5px' : '10px')};
    transform: rotate(${({ $open }) => ($open ? '-45deg' : '0deg')});
  }
`;

const MobileMenu = styled.div<{ $open: boolean }>`
  display: none;

  @media (max-width: 800px) {
    display: ${({ $open }) => ($open ? 'flex' : 'none')};
    flex-direction: column;
    gap: 0;
    padding: 14px 16px 24px;
    border-top: 1px solid var(--nd-border);
    background: var(--nd-page);

    ${NavLink} {
      padding: 15px 0;
      border-bottom: 1px solid var(--nd-border);
      font-size: 18px;
    }
  }
`;

const getNavigationHref = (label: string, href: string) => {
  if (label === 'Product') return '/new/product';
  if (label === 'About') return '/new/about';
  if (label === 'Comparisons') return '/new/comparisons';
  if (label === 'Pricing') return '/new/pricing';
  if (label === 'Blog') return '/new/blog';
  if (label === 'Events') return '/new/events';
  if (label === 'ROI Calculator') return '/new/roi-calculator';
  return href;
};

export const NewNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const closeMenu = () => setIsMenuOpen(false);
    window.addEventListener('resize', closeMenu);
    return () => window.removeEventListener('resize', closeMenu);
  }, []);

  return (
    <>
      <Header>
        <Nav aria-label='Main navigation'>
          <LogoLink href='/new' aria-label='Odigos home'>
            <Image src='/assets/odigos/logo_text_black.svg' alt='Odigos' width={98} height={22} priority />
          </LogoLink>

          <CenterLinks>
            {NAVIGATION.map(({ label, href }) => (
              <NavLink key={label} href={getNavigationHref(label, href)}>
                {label}
              </NavLink>
            ))}
          </CenterLinks>

          <RightLinks>
            <DemoLink href={CONTACT_SALES_LINK} target='_blank' rel='noopener noreferrer'>
              Request a Demo
            </DemoLink>
            <MenuButton
              type='button'
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <MenuIcon $open={isMenuOpen} />
            </MenuButton>
          </RightLinks>
        </Nav>

        <MobileMenu $open={isMenuOpen}>
          {NAVIGATION.map(({ label, href }) => (
            <NavLink key={label} href={getNavigationHref(label, href)} onClick={() => setIsMenuOpen(false)}>
              {label}
            </NavLink>
          ))}
        </MobileMenu>
      </Header>
    </>
  );
};
