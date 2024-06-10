'use client';
import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import FooterItemList from './footer-menu-list';
import { UnderlineText } from '@/reuseable-components';
import { NewsletterInput } from '@/components';
import Link from 'next/link';
import theme from '@/style/theme';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  padding: 80px 64px 32px 64px;
  flex-direction: column;
  gap: 64px;
  @media (max-width: 1100px) {
    gap: 48px;
    padding: 48px 20px 24px 20px;
  }
`;

const Header = styled.section`
  display: flex;
  gap: 80px;

  @media (max-width: 1100px) {
    flex-direction: column;
    gap: 50px;
  }
`;

const MenuItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 42px;
`;

const InputWrapper = styled.div``;

const Body = styled.section``;

const FooterWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Divider = styled.div`
  border: 1px solid #f9f9f9;
  opacity: 0.4;
  background: #f9f9f9;
  width: 100%;
`;

const FooterText = styled.span`
  color: ${({ theme }) => theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: 18px;
  line-height: 150%;
  font-weight: 300;
  opacity: 0.8;
  @media (max-width: 1100px) {
    font-size: 14px;
  }
`;

const RightsText = styled.span`
  color: ${({ theme }) => theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: 18px;
  font-weight: 300;
  line-height: 150%;
  opacity: 0.64;
`;

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
      <Divider />
      <FooterWrapper>
        <FooterText>
          Enterprise-Grade OpenTelemetry for Superior Application Performance
          Monitoring
        </FooterText>
        <Link href="https://app.odigos.io/about/terms-of-use" target="_blank">
          <UnderlineText
            weight={300}
            uppercase={false}
            font={theme.font_family.primary}
          >
            Privacy policy
          </UnderlineText>
        </Link>
      </FooterWrapper>
      <Divider />
      <RightsText>© 2024 Odigos. All rights reserved.</RightsText>
    </FooterContainer>
  );
};

export default Footer;
