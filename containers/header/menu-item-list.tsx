import React from 'react';
import Link from 'next/link';
import menuData from './menuData';
import styled from 'styled-components';
import Github from '@/components/github';
import { UnderlineText } from '@/reuseable-components';

const NavList = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (width < 1112px) {
    flex-direction: column;
  }

  @media (max-width: 1112px) {
    display: none;
  }
`;

const NavItem = styled.li<{ selected?: boolean }>`
  position: relative;
  display: flex;
  height: 56px;
  padding: 8px 24px;
  justify-content: center;
  align-items: center;

  transition: background-color 0.3s ease;

  border-radius: 48px;
  background-color: ${({ selected }) => (selected ? 'rgba(68, 74, 217, 0.20)' : 'transparent')};

  &:hover {
    background: rgba(68, 74, 217, 0.12);
  }
  &.group {
    cursor: pointer;
  }
`;

const MenuItemList = ({ onClick, currentIndexItem }: { onClick: (index: number) => void; currentIndexItem: number }) => {
  return (
    <NavList>
      {menuData.map((menuItem, key) => (
        <NavItem key={key} onClick={() => onClick(key)} selected={key === currentIndexItem && menuItem.id !== 5}>
          <UnderlineText>
            <Link href={`${menuItem.path}`} target={menuItem.newTab ? '_blank' : '_self'}>
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
