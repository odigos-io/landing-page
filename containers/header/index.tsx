'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import theme from '@/style/theme'
import dynamic from 'next/dynamic'
import styled from 'styled-components'
import MenuItemList from './menu-item-list'
import Modal from '@/reuseable-components/modal'
import ContactForm from '../pricing/pricing-table/contact-us-form'
import { Button, LazyImage, UnderlineText, AnnouncementBanner } from '@/reuseable-components'

const MobileHeaderMenu = dynamic(() => import('./mobile-menu'))

const HeaderContainer = styled.header<{ isOpen: boolean }>`
  width: 100%;
  max-width: 1440px;
  z-index: 9999;
  background: ${({ theme, isOpen }) => (isOpen ? theme.colors.primary : theme.colors.secondary)};

  @media (width < 1700px) {
    padding: 0 64px;
  }
  @media (max-width: 1150px) {
    padding: 0 20px;
  }
`

const HeaderInner = styled.div`
  margin: 0 auto;
  padding: 24px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  @media (max-width: 1112px) {
    padding: 20px;
    height: 84px;
  }
  @media (max-width: 610px) {
    padding: 20px 0;
  }
`

const LogoContainer = styled.div``

const SignInButton = styled(Button)`
  @media (max-width: 1112px) {
    padding: 8px 16px;
    font-size: 16px;
  }
`

const HamburgerButton = styled.button`
  display: block;
  @media (min-width: 1112px) {
    display: none;
  }
`

const ActionBarWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (max-width: 1112px) {
    gap: 1rem;
    width: 200px;
  }
  @media (max-width: 600px) {
    gap: 1rem;
    width: 170px;
  }
`

const MaxWidthContainer = styled.div`
  position: fixed;
  background: ${theme.colors.secondary};
  width: 100%;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Header = () => {
  const [open, setOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState(10)
  const [success, setSuccess] = useState<boolean>(false)
  const [dropdownToggler, setDropdownToggler] = useState(false)

  const handleMenuItemClick = (index: number) => {
    setCurrentItem(index)
  }

  return (
    <MaxWidthContainer>
      <AnnouncementBanner
        title={'Come meet Odigos at SREcon Americas 2025!'}
        link={'https://odigos.io/blog/meet-odigos-srecon-2025'}
        linkText={'Read more'}
      />
      <HeaderContainer isOpen={dropdownToggler}>
        <HeaderInner>
          <LogoContainer onClick={() => setCurrentItem(10)}>
            <Link href='/'>
              <LazyImage src='/images/logo/text-logo.svg' alt='logo' width={133} height={32} />
            </Link>
          </LogoContainer>

          <MenuItemList onClick={handleMenuItemClick} currentIndexItem={currentItem} />
          <ActionBarWrapper>
            <SignInButton style={{ backgroundColor: theme.colors.secondary }} onClick={() => setOpen(true)}>
              <UnderlineText>Contact Us</UnderlineText>
            </SignInButton>

            <HamburgerButton aria-label='hamburger Toggler' onClick={() => setDropdownToggler(!dropdownToggler)}>
              <LazyImage src={dropdownToggler ? '/icons/common/close.svg' : '/icons/common/hamburger.svg'} alt='hamburger' width={24} height={24} />
            </HamburgerButton>
          </ActionBarWrapper>
        </HeaderInner>
      </HeaderContainer>
      {dropdownToggler && <MobileHeaderMenu onClick={() => setDropdownToggler(false)} />}
      {open && (
        <Modal
          title={success ? '' : 'We’d love to hear from you!'}
          description={'Whether you have questions, feedback, or need assistance, our team is here to help. '}
          onClose={() => setOpen(false)}
        >
          <ContactForm success={success} setSuccess={setSuccess} onClose={() => setOpen(false)} />
        </Modal>
      )}
    </MaxWidthContainer>
  )
}
