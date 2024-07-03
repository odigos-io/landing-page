import React from 'react';
import Link from 'next/link';
import menuData from './menuData';
import styled from 'styled-components';
import { UnderlineText, Text, LazyImage } from '@/reuseable-components';
import Github from '@/components/github';

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 3rem;
  }

  @media (max-width: 1024px) {
    display: none;
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
const MenuItemList = () => {
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
        <Github />
      </NavItem>
    </NavList>
  );
};

export default MenuItemList;
