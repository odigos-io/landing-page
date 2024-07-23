import React from 'react';
import Link from 'next/link';
import menuData from './menuData';
import styled from 'styled-components';
import Github from '@/components/github';
import { UnderlineText } from '@/reuseable-components';

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @media (min-width: 1024px) {
    flex-direction: row;
  }

  @media (max-width: 1024px) {
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
  gap: 8px;

  transition: background-color 0.3s ease;

  border-radius: 48px;
  background-color: ${({ selected }) =>
    selected ? 'rgba(68, 74, 217, 0.20)' : 'transparent'};

  &:hover {
    background: rgba(68, 74, 217, 0.12);
  }
  &.group {
    cursor: pointer;
  }
`;

const MenuItemList = ({
  onClick,
  currentIndexItem,
}: {
  onClick: (index: number) => void;
  currentIndexItem: number;
}) => {
  return (
    <NavList>
      {menuData.map((menuItem, key) => (
        <NavItem
          key={key}
          onClick={() => onClick(key)}
          selected={key === currentIndexItem}
        >
          <UnderlineText>
            <Link
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
