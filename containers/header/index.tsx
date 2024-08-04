'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import theme from '@/style/theme';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import MenuItemList from './menu-item-list';
import { Button, UnderlineText, LazyImage } from '@/reuseable-components';
import Modal from '@/reuseable-components/modal';
import ContactForm from '../pricing/pricing-table/contact-us-form';

const MobileHeaderMenu = dynamic(() => import('./mobile-menu'));

const HeaderContainer = styled.header<{ isOpen: boolean }>`
  width: 100%;
  max-width: 1440px;
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

  @media (max-width: 1100px) {
    padding: 20px;
    height: 84px;
  }
`;

const LogoContainer = styled.div``;

const SignInButton = styled(Button)`
  @media (max-width: 1100px) {
    padding: 8px 16px;
    font-size: 16px;
  }
`;

const HamburgerButton = styled.button`
  display: block;
  @media (min-width: 1100px) {
    display: none;
  }
`;

const ActionBarWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (max-width: 1100px) {
    gap: 1rem;
    width: 172px;
  }
`;

const MaxWidthContainer = styled.div`
  position: fixed;
  background: ${theme.colors.secondary};
  width: 100%;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Header = () => {
  const [dropdownToggler, setDropdownToggler] = useState(false);
  const [currentItem, setCurrentItem] = useState(10);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [showSignInButton, setShowSignInButton] = useState(false);

  const handleMenuItemClick = (index: number) => {
    setCurrentItem(index);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      if (scrollPosition >= windowHeight) {
        setShowSignInButton(true);
      } else {
        setShowSignInButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <MaxWidthContainer>
      <HeaderContainer isOpen={dropdownToggler}>
        <HeaderInner>
          <LogoContainer onClick={() => setCurrentItem(10)}>
            <Link href="/">
              <LazyImage
                src="/images/logo/text-logo.svg"
                alt="logo"
                width={133}
                height={32}
              />
            </Link>
          </LogoContainer>

          <MenuItemList
            onClick={handleMenuItemClick}
            currentIndexItem={currentItem}
          />
          <ActionBarWrapper>
            <SignInButton
              style={{ visibility: showSignInButton ? 'visible' : 'hidden' }}
              containerStyle={{
                visibility: showSignInButton ? 'visible' : 'hidden',
              }}
              onClick={() => setOpen(true)}
              variant="secondary"
            >
              <UnderlineText color={theme.text.secondary}>
                Contact Us
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
      {open && (
        <Modal
          title={success ? '' : 'We’d love to hear from you!'}
          description={
            'Whether you have questions, feedback, or need assistance, our team is here to help. '
          }
          onClose={() => setOpen(false)}
        >
          <ContactForm
            success={success}
            setSuccess={setSuccess}
            onClose={() => setOpen(false)}
          />
        </Modal>
      )}
    </MaxWidthContainer>
  );
};
