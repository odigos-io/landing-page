'use client';
import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import FooterItemList from './footer-menu-list';
import { NewsletterInput } from '@/components';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  padding: 80px 64px 32px 64px;
  flex-direction: column;
  gap: 64px;
`;

const Header = styled.section`
  display: flex;
  gap: 80px;
`;

const MenuItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 42px;
`;

const InputWrapper = styled.div``;

const Body = styled.section``;

const FooterWrapper = styled.section``;

const Footer = () => {
  return (
    <FooterContainer>
      <Header>
        <MenuItemWrapper>
          <Image
            src="/icons/brand/icon.svg"
            alt="logo"
            width={40}
            height={32}
          />
          <FooterItemList />
        </MenuItemWrapper>
        <InputWrapper>
          <NewsletterInput />
        </InputWrapper>
      </Header>
    </FooterContainer>
  );
};

export default Footer;
