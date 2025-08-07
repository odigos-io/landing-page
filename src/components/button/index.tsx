'use client';

import React from 'react';
import Image from 'next/image';
import { hexOpacity } from '@/styles';
import { useMobile } from '@/contexts';
import { usePlausible } from '@/hooks';
import { useRouter } from 'next/navigation';
import { handleHrefClick } from '@/functions';
import styled, { css } from 'styled-components';

export * from './contact-us-button';
export * from './quickstart-button';
export * from './share-facebook-button';
export * from './share-linkedin-button';
export * from './share-twitter-button';
export * from './slack-invite-button';
export * from './watch-demo-button';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'transparent';
  children?: React.ReactNode;
  label?: string;
  tag?: string;
  href?: string;
  rightIconSrc?: string;
  leftIconSrc?: string;
  iconSize?: number;
  fontSize?: number;
  padding?: string;
  fullWidth?: boolean;
  hide?: boolean;
}

const Container = styled.div<{ $hide: ButtonProps['hide'] }>`
  position: relative;
  ${({ $hide }) => $hide && 'display: none;'}
`;

const Tag = styled.div`
  position: absolute;
  top: -30%;
  left: 10%;
  padding: 2px 6px;
  font-size: 10px;
  font-weight: 600;
  line-height: 150%;
  color: ${({ theme }) => theme.colors.black};
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.cyan};
  box-shadow: ${({ theme }) => `0px 4px 10px 0px ${theme.colors.black + hexOpacity['030']}`};
`;

const Btn = styled.button<{
  $isMobile: boolean;
  $variant: ButtonProps['variant'];
  $fontSize: ButtonProps['fontSize'];
  $padding: ButtonProps['padding'];
  $fullWidth: ButtonProps['fullWidth'];
}>`
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'unset')};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ $padding }) => ($padding && ['0', '0px', '0%'].includes($padding) ? 8 : 12)}px;
  padding: ${({ $padding, $isMobile }) => $padding || ($isMobile ? '8px 18px' : '8px 24px')};
  border-radius: 12px;
  font-size: ${({ $fontSize }) => $fontSize}px;
  font-weight: 500;
  line-height: 150%;
  color: ${({ theme }) => theme.colors.white};
  outline: none;
  white-space: nowrap;
  cursor: pointer;
  pointer-events: auto;

  ${({ theme, $variant }) =>
    $variant === 'primary'
      ? css`
          border: none;
          background: ${theme.colors.purple_darker};
          &:hover {
            background: ${theme.colors.purple};
          }
        `
      : $variant === 'secondary'
      ? css`
          border: 1px solid ${theme.colors.white};
          background: ${theme.colors.black};
          &:hover {
            background: ${theme.colors.grey_darkest};
          }
        `
      : css`
          border: none;
          background: transparent;
          &:hover {
            text-decoration: underline;
          }
        `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Button = ({
  type = 'button',
  variant = 'primary',
  children,
  label,
  tag,
  href,
  rightIconSrc,
  leftIconSrc,
  onClick,
  iconSize = 24,
  fontSize = 18,
  padding,
  fullWidth,
  hide,
  ...props
}: ButtonProps) => {
  const router = useRouter();
  const { isMobile } = useMobile();
  const { trackClick } = usePlausible();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    trackClick(label || children?.toString() || 'Button Click');

    if (href) handleHrefClick(href, router);
    else if (onClick) onClick(e);
    else alert('TODO!');
  };

  return (
    <Container $hide={hide}>
      {tag && <Tag>{tag}</Tag>}
      <Btn type={type} $isMobile={isMobile} $variant={variant} $fontSize={fontSize} $padding={padding} $fullWidth={fullWidth} onClick={type === 'button' ? handleClick : undefined} {...props}>
        {leftIconSrc && (
          <Image
            src={leftIconSrc}
            alt='left-icon'
            width={iconSize}
            height={iconSize}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        )}
        {label || children}
        {rightIconSrc && (
          <Image
            src={rightIconSrc}
            alt='right-icon'
            width={iconSize}
            height={iconSize}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        )}
      </Btn>
    </Container>
  );
};
