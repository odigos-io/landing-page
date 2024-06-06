'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import menuData from './menuData';
import theme from '@/style/theme';
import styled from 'styled-components';
import { Button, UnderlineText, Text } from '@/reuseable-components';
import dynamic from 'next/dynamic';

const MobileHeaderMenu = dynamic(() => import('./mobile-menu'));

const HeaderContainer = styled.header<{ isOpen: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 9999;
  background: ${({ theme, isOpen }) =>
    isOpen ? theme.colors.primary : theme.colors.secondary};
`;

const HeaderInner = styled.div`
  margin: 0 auto;
  padding: 24px 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  @media (max-width: 1024px) {
    padding: 20px;
    height: 84px;
  }
`;

const LogoContainer = styled.div``;

const SignInButton = styled(Button)`
  @media (max-width: 1024px) {
    padding: 8px 16px;
    font-size: 16px;
  }
`;

const HamburgerButton = styled.button`
  display: block;
  @media (min-width: 1024px) {
    display: none;
  }
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 3rem;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const NavItem = styled.li`
  position: relative;
  display: flex;
  gap: 8px;

  &.group {
    cursor: pointer;
  }
`;

const GithubNumberWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin-left: -4px;
`;

const ActionBarWrapper = styled.div`
  display: flex;

  justify-content: flex-end;
  @media (max-width: 1024px) {
    gap: 1rem;
    width: 172px;
  }
`;

export const Header = () => {
  const [dropdownToggler, setDropdownToggler] = useState(false);

  return (
    <>
      <HeaderContainer isOpen={dropdownToggler}>
        <HeaderInner>
          <LogoContainer>
            <a href="/">
              <Image
                src="/images/logo/text-logo.svg"
                alt="logo"
                width={133}
                height={32}
              />
            </a>
          </LogoContainer>

          <NavList>
            {menuData.map((menuItem, key) => (
              <NavItem key={key}>
                <UnderlineText>
                  <Link
                    legacyBehavior
                    href={`${menuItem.path}`}
                    target={menuItem.newTab ? '_blank' : '_self'}
                  >
                    {menuItem.title}
                  </Link>
                </UnderlineText>
              </NavItem>
            ))}
            <NavItem>
              <Image
                src="/icons/common/github.svg"
                alt="github"
                width={18}
                height={18}
              />
              <UnderlineText>
                <Link
                  target={'_blank'}
                  href={'https://github.com/keyval-dev/odigos'}
                >
                  {'GITHUB'}
                </Link>
              </UnderlineText>
              <GithubNumberWrapper>
                <Text size={10}>24K</Text>
              </GithubNumberWrapper>
            </NavItem>
          </NavList>
          <ActionBarWrapper>
            <SignInButton variant="secondary">
              <UnderlineText color={theme.text.secondary}>
                Sign in
              </UnderlineText>
            </SignInButton>
            <HamburgerButton
              aria-label="hamburger Toggler"
              onClick={() => setDropdownToggler(!dropdownToggler)}
            >
              <Image
                src={
                  dropdownToggler
                    ? '/icons/common/close.svg'
                    : '/icons/common/hamburger.svg'
                }
                alt="hamburger"
                width={24}
                height={24}
              />
            </HamburgerButton>
          </ActionBarWrapper>
        </HeaderInner>
      </HeaderContainer>
      {dropdownToggler && (
        <MobileHeaderMenu onClick={() => setDropdownToggler(false)} />
      )}
    </>
  );
};
