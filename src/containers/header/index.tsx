'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { useMobile } from '@/contexts';
import { Navigation } from '../navigation';
import { Button, ContactUsButton } from '@/components';
import { ConstrainedWrapper, FlexRow, hexOpacity } from '@/styles';

const Sticky = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Container = styled.header<{ $isMobile: boolean }>`
  padding: ${({ $isMobile }) => ($isMobile ? '16px' : '24px 0')};
  background-color: ${({ theme }) => theme.colors.black};
  box-shadow: ${({ theme }) => `0px 4px 10px 0px ${theme.colors.black + hexOpacity['030']}`};
`;

const ContainMobileButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Header = () => {
  const { isMobile } = useMobile();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // if mobile and menu is open, disable body scroll
  useEffect(() => {
    if (isMobile && isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobile, isMenuOpen]);

  return (
    <Sticky>
      <Container $isMobile={isMobile}>
        <ConstrainedWrapper $isMobile={isMobile} $paddingTop={0} $paddingBottom={0} $paddingLeft={0} $paddingRight={0}>
          <FlexRow $align='center' $justify='space-between'>
            <Logo isMobile={isMobile} />
            <Navigation isMenu={isMobile} isMenuOpen={isMenuOpen} closeMenu={toggleMenu} />
            <ContainMobileButtons>
              <ContactUsButton />
              {isMobile && <MenuIcon toggleMenu={toggleMenu} />}
            </ContainMobileButtons>
          </FlexRow>
        </ConstrainedWrapper>
      </Container>
    </Sticky>
  );
};

const Logo = ({ isMobile }: { isMobile: boolean }) => (
  <Link href='/'>
    <Image src='/assets/odigos/logo_text_white.svg' alt='logo' width={isMobile ? 107 : 143} height={isMobile ? 24 : 32} priority />
  </Link>
);

const MenuIcon = ({ toggleMenu }: { toggleMenu: () => void }) => (
  <Button variant='transparent' padding='0' onClick={toggleMenu}>
    <Image src='/assets/icons/menu.svg' alt='menu' width={24} height={24} />
  </Button>
);

// as default, so we can use dynamic import in app/layout.tsx
export default Header;
