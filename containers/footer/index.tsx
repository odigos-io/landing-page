'use client';
import React from 'react';
import Link from 'next/link';
import theme from '@/style/theme';
import styled from 'styled-components';
import { NewsletterInput } from '@/components';
import FooterItemList from './footer-menu-list';
import { UnderlineText, LazyImage } from '@/reuseable-components';
import { MaxWidthContainer } from '@/style';

const FooterContainer = styled.footer`
  display: flex;
  padding: 80px 32px;
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
    <MaxWidthContainer style={{ background: theme.colors.primary }}>
      <FooterContainer>
        <Header>
          <MenuItemWrapper>
            <LazyImage
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
    </MaxWidthContainer>
  );
};

export default Footer;
