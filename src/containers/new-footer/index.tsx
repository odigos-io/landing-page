'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { NewColorModeToggle } from '@/components/new-color-mode-toggle';
import {
  ACTIONS_LINK,
  CAREERS_LINK,
  CONTACT_SALES_LINK,
  DOCS_LINK,
  PRIVACY_POLICY_LINK,
  QUICKSTART_LINK,
  SOC_LINK,
  TRUST_CENTER_LINK,
} from '@/constants';

const Footer = styled.footer`
  border-top: 1px solid var(--nd-border);
  background: var(--nd-surface);
`;

const Inner = styled.div`
  width: min(100% - 48px, 1360px);
  margin: 0 auto;
  padding: 64px 0 28px;

  @media (max-width: 800px) {
    width: min(100% - 32px, 1360px);
    padding-top: 48px;
  }
`;

const Brand = styled.a`
  display: inline-flex;
  margin-bottom: 48px;
  align-items: center;
  gap: 10px;
  color: var(--nd-text);
  font-size: 17px;
  font-weight: 600;
  text-decoration: none;

  img {
    width: 28px;
    height: 28px;
    filter: none;
  }

  html[data-new-theme='dark'] & img {
    filter: invert(1);
  }
`;

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 28px;
  padding-bottom: 72px;

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 42px;
    padding-bottom: 56px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 9px;
`;

const ColumnTitle = styled.div`
  margin-bottom: 3px;
  color: var(--nd-text-muted);
  font-size: 12px;
`;

const FooterLink = styled.a`
  color: var(--nd-text-secondary);
  font-size: 13px;
  line-height: 1.25;
  text-decoration: none;

  &:hover {
    color: var(--nd-accent);
  }

  &:focus-visible {
    border-radius: 2px;
    outline: 2px solid var(--nd-accent);
    outline-offset: 3px;
  }
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  border-top: 1px solid var(--nd-border);
  padding-top: 22px;
  color: var(--nd-text-muted);
  font-size: 12px;

  @media (max-width: 600px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const BottomLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 18px;
`;

const BottomLink = styled(FooterLink)`
  color: var(--nd-text-muted);
  font-size: 12px;
`;

const externalProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
} as const;

export const NewFooter = () => {
  return (
    <Footer>
      <Inner>
        <Brand href='/new' aria-label='Odigos new homepage'>
          <Image src='/assets/odigos/logo_black.svg' alt='' width={28} height={28} />
          Odigos
        </Brand>
        <Columns>
          <Column>
            <ColumnTitle>Product</ColumnTitle>
            <FooterLink href='/new/product'>Overview</FooterLink>
            <FooterLink href='/new/pricing'>Pricing</FooterLink>
            <FooterLink href='/new/comparisons'>Comparisons</FooterLink>
            <FooterLink href={ACTIONS_LINK} {...externalProps}>
              Actions
            </FooterLink>
          </Column>
          <Column>
            <ColumnTitle>Resources</ColumnTitle>
            <FooterLink href={DOCS_LINK} {...externalProps}>
              Documentation
            </FooterLink>
            <FooterLink href={QUICKSTART_LINK} {...externalProps}>
              Quickstart
            </FooterLink>
            <FooterLink href='/new/blog'>Blog</FooterLink>
            <FooterLink href='/new/events'>Events</FooterLink>
          </Column>
          <Column>
            <ColumnTitle>Company</ColumnTitle>
            <FooterLink href='/new/about'>About</FooterLink>
            <FooterLink href={CAREERS_LINK} {...externalProps}>
              Careers
            </FooterLink>
            <FooterLink href={CONTACT_SALES_LINK} {...externalProps}>
              Contact sales
            </FooterLink>
          </Column>
          <Column>
            <ColumnTitle>Security</ColumnTitle>
            <FooterLink href={TRUST_CENTER_LINK} {...externalProps}>
              Trust center
            </FooterLink>
            <FooterLink href={PRIVACY_POLICY_LINK} {...externalProps}>
              Privacy policy
            </FooterLink>
            <FooterLink href={SOC_LINK} {...externalProps}>
              SOC 2
            </FooterLink>
          </Column>
        </Columns>
        <Bottom>
          <span>© {new Date().getFullYear()} Odigos. The production data layer for the AI era.</span>
          <BottomLinks>
            <BottomLink href={PRIVACY_POLICY_LINK} {...externalProps}>
              Privacy
            </BottomLink>
            <BottomLink href={TRUST_CENTER_LINK} {...externalProps}>
              Security
            </BottomLink>
            <NewColorModeToggle />
          </BottomLinks>
        </Bottom>
      </Inner>
    </Footer>
  );
};
