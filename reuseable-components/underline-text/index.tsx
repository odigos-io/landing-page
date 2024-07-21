'use client';
import theme from '@/style/theme';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface UnderlineTextProps {
  children: ReactNode;
  size?: number;
  className?: string;
  color?: string;
  font?: string;
  uppercase?: boolean;
  weight?: number;
}

const UnderlineTextStyled = styled.span<{
  size?: number;
  color?: string;
  font: string;
  uppercase?: boolean;
  weight?: number;
}>`
  color: ${({ color }) => color || '#f9f9f9'};
  font-family: ${({ font }) => font};
  font-size: ${({ size }) => size || 16}px;
  font-style: normal;
  font-weight: ${({ weight }) => weight};
  line-height: 150%;
  text-decoration-line: underline;
  text-transform: ${({ uppercase }) => (uppercase ? 'uppercase' : 'none')};
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 600px) {
    font-size: ${({ size }) => size || 14}px;
  }
`;

export const UnderlineText: React.FC<UnderlineTextProps> = ({
  children,
  size,
  className,
  color = '#f9f9f9',
  font = theme.font_family.secondary,
  uppercase = true,
  weight = 500,
}) => {
  return (
    <UnderlineTextStyled
      font={font}
      weight={weight}
      uppercase={uppercase}
      className={className}
      size={size}
      color={color}
    >
      {children}
    </UnderlineTextStyled>
  );
};
