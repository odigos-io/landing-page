'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import menuData from './menuData';
import styled from 'styled-components';
import { UnderlineText, Text } from '@/reuseable-components';

const HeaderContainer = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 999;
  background: ${({ theme }) => theme.colors.primary};
  height: 100%;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  gap: 1.25rem;
  padding: 44px 56px;
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

const GithubNumberWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin-left: -4px;
`;

const MobileHeaderMenu = ({ onClick }) => {
  return (
    <HeaderContainer>
      <NavList>
        {menuData.map((menuItem, key) => (
          <NavItem
            onClick={onClick}
            key={key}
            className={menuItem.submenu && 'group'}
          >
            <UnderlineText size={24}>
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
          <UnderlineText size={24}>
            <Link
              target={'_blank'}
              href={'https://github.com/keyval-dev/odigos'}
            >
              {'GITHUB'}
            </Link>
          </UnderlineText>
          <GithubNumberWrapper>
            <Text size={12}>24K</Text>
          </GithubNumberWrapper>
        </NavItem>
      </NavList>
    </HeaderContainer>
  );
};

export default MobileHeaderMenu;
