import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { UnderlineText, Text, LazyImage } from '@/reuseable-components';
import menuData from '../header/menuData';

const NavList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 32px;
  @media (max-width: 1100px) {
    gap: 56px;
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
const FooterItemList = () => {
  return (
    <NavList>
      {menuData.map((menuItem, key) => (
        <NavItem key={key}>
          <UnderlineText>
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
        <LazyImage
          src="/icons/common/github.svg"
          alt="github"
          width={18}
          height={18}
        />
        <UnderlineText>
          <Link target={'_blank'} href={'https://github.com/odigos-io/odigos'}>
            {'GITHUB'}
          </Link>
        </UnderlineText>
        <GithubNumberWrapper>
          <Text size={10}>24K</Text>
        </GithubNumberWrapper>
      </NavItem>
    </NavList>
  );
};

export default FooterItemList;
