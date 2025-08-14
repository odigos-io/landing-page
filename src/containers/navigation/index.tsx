'use client';

import React, { CSSProperties } from 'react';
import Image from 'next/image';
import { hexOpacity } from '@/styles';
import { Button } from '@/components';
import { NAVIGATION } from '@/constants';
import styled, { css } from 'styled-components';

interface NavigationProps {
  isMenu?: boolean;
  isMenuOpen?: boolean;
  closeMenu?: () => void;
  flexDirection?: CSSProperties['flexDirection'];
  gap?: number;
}

const NavigationItems = styled.div<{
  $isMenu: NavigationProps['isMenu'];
  $isMenuOpen: NavigationProps['isMenuOpen'];
  $flexDirection: NavigationProps['flexDirection'];
  $gap: NavigationProps['gap'];
}>`
  ${({ $isMenu, $isMenuOpen, $flexDirection, $gap, theme }) =>
    $isMenu
      ? css`
          position: absolute;
          top: 0;
          left: 0;
          z-index: 100;
          display: ${$isMenuOpen ? 'flex' : 'none'};
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-end;
          gap: 16px;
          width: calc(100% - 30vw);
          height: calc(100% - 30vw);
          padding: 15vw;
          background-color: ${theme.colors.black + hexOpacity['088']};
          backdrop-filter: blur(4.5px);
        `
      : css`
          display: flex;
          flex-direction: ${$flexDirection || 'row'};
          align-items: ${$flexDirection === 'column' ? 'flex-start' : 'center'};
          justify-content: center;
          flex-wrap: wrap;
          gap: ${$gap}px;
        `}
`;

const NavigationItem = styled(Button)<{ $isMenu: NavigationProps['isMenu'] }>`
  font-size: ${({ $isMenu }) => ($isMenu ? '22px' : '16px')};
`;

export const Navigation = ({ isMenu, isMenuOpen, closeMenu, flexDirection, gap = 42 }: NavigationProps) => {
  return (
    <NavigationItems $isMenu={isMenu} $isMenuOpen={isMenuOpen} $flexDirection={flexDirection} $gap={gap} onClick={closeMenu}>
      {NAVIGATION.map(({ label, iconSrc, href }) => (
        <NavigationItem key={label} variant='transparent' href={href} $isMenu={isMenu} padding='0'>
          {iconSrc && <Image src={iconSrc} alt={label} width={24} height={24} />}
          {label}
        </NavigationItem>
      ))}
    </NavigationItems>
  );
};
