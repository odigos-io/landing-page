'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePlausible } from 'next-plausible';
import menuData from './menuData';
import styled from 'styled-components';
import { Button, UnderlineText, Text } from '@/reuseable-components';
import theme from '@/style/theme';

const HeaderContainer = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 999;
`;

const HeaderInner = styled.div`
  max-width: 1312px;
  margin: 0 auto;
  padding: 24px 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  @media (max-width: 1024px) {
    padding: 20px;
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

const NavMenu = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  background: ${({ theme, isOpen }) =>
    isOpen ? theme.bg.secondary : 'transparent'};
  box-shadow: ${({ isOpen }) =>
    isOpen ? '0 5px 20px rgba(0, 0, 0, 0.1)' : 'none'};
  height: ${({ isOpen }) => (isOpen ? 'auto' : '0')};
  overflow-y: ${({ isOpen }) => (isOpen ? 'scroll' : 'hidden')};
  border-radius: ${({ isOpen }) => (isOpen ? '8px' : '0')};
  padding: ${({ isOpen }) => (isOpen ? '2rem' : '0')};
  transition: all 0.3s ease-in-out;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
    visibility: visible;
    background: transparent;
    height: auto;
    overflow: visible;
    border-radius: 0;
    padding: 0;
    box-shadow: none;
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
`;

const NavItem = styled.li`
  position: relative;
  display: flex;
  gap: 8px;

  &.group {
    cursor: pointer;
  }
`;

const Submenu = styled.ul<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  background: ${({ theme }) => theme.bg.primary};
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  border-radius: 8px;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const SubmenuItem = styled.li`
  margin: 0.5rem 0;
`;

const GithubNumberWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin-left: -4px;
`;

const ActionBarWrapper = styled.div`
  display: flex;

  @media (max-width: 1024px) {
    gap: 1rem;
    width: 172px;
  }
`;

export const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [dropdownToggler, setDropdownToggler] = useState(false);
  const plausible = usePlausible();
  const pathUrl = usePathname();

  return (
    <HeaderContainer>
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

        {/* <NavMenu isOpen={navigationOpen}>
          <nav>
            <NavList>
              {menuData.map((menuItem, key) => (
                <NavItem key={key} className={menuItem.submenu && 'group'}>
                  {menuItem.submenu ? (
                    <>
                      <a
                        onClick={() => setDropdownToggler(!dropdownToggler)}
                        className="hover:text-secondary flex items-center justify-between gap-3 cursor-pointer"
                      >
                        {menuItem.title}
                        <span>
                          <svg
                            className="fill-waterloo group-hover:fill-secondary w-3 h-3 cursor-pointer"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                          </svg>
                        </span>
                      </a>

                      <Submenu isOpen={dropdownToggler}>
                        {menuItem.submenu.map((item, key) => (
                          <SubmenuItem key={key}>
                            <Link href={item.path || '#'}>{item.title}</Link>
                          </SubmenuItem>
                        ))}
                      </Submenu>
                    </>
                  ) : (
                    <UnderlineText>
                      <Link
                        legacyBehavior
                        href={`${menuItem.path}`}
                        target={menuItem.newTab ? '_blank' : '_self'}
                      >
                        <a onClick={() => setNavigationOpen(false)}>
                          {menuItem.title}
                        </a>
                      </Link>
                    </UnderlineText>
                  )}
                </NavItem>
              ))}
            </NavList>
          </nav>
        </NavMenu> */}
        <NavMenu isOpen={navigationOpen}>
          <NavList>
            {menuData.map((menuItem, key) => (
              <NavItem key={key} className={menuItem.submenu && 'group'}>
                <UnderlineText>
                  <Link
                    legacyBehavior
                    href={`${menuItem.path}`}
                    target={menuItem.newTab ? '_blank' : '_self'}
                  >
                    <a onClick={() => setNavigationOpen(false)}>
                      {menuItem.title}
                    </a>
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
                <Link href={'/'} onClick={() => setNavigationOpen(false)}>
                  {'GITHUB'}
                </Link>
              </UnderlineText>
              <GithubNumberWrapper>
                <Text size={10}>24K</Text>
              </GithubNumberWrapper>
            </NavItem>
          </NavList>
        </NavMenu>
        <ActionBarWrapper>
          <SignInButton variant="secondary">
            <UnderlineText color={theme.text.secondary}>Sign in</UnderlineText>
          </SignInButton>
          <HamburgerButton
            aria-label="hamburger Toggler"
            onClick={() => setNavigationOpen(!navigationOpen)}
          >
            <Image
              src="/icons/common/hamburger.svg"
              alt="hamburger"
              width={24}
              height={24}
            />
          </HamburgerButton>
        </ActionBarWrapper>
      </HeaderInner>
    </HeaderContainer>
  );
};
