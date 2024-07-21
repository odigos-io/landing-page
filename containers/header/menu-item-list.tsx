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
  gap: 1.25rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 3rem;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const NavItem = styled.li<{ selected?: boolean }>`
  position: relative;
  display: flex;
  gap: 8px;
  opacity: ${({ selected }) => (selected ? 1 : 0.4)};
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.64;
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
