'use client';
import React, { useState } from 'react';
import theme from '@/style/theme';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import MenuItemList from './menu-item-list';
import { Button, UnderlineText, LazyImage } from '@/reuseable-components';

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
              <LazyImage
                src="/images/logo/text-logo.svg"
                alt="logo"
                width={133}
                height={32}
              />
            </a>
          </LogoContainer>

          <MenuItemList />
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
              <LazyImage
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
