'use client';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface UnderlineTextProps {
  children: ReactNode;
  size?: number;
  className?: string;
  color?: string;
}

const UnderlineTextStyled = styled.span<{ size?: number; color?: string }>`
  color: ${({ color }) => color || '#f9f9f9'};
  font-family: 'Kode Mono';
  font-size: ${({ size }) => size || 16}px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  text-decoration-line: underline;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const UnderlineText: React.FC<UnderlineTextProps> = ({
  children,
  size,
  className,
  color = '#f9f9f9',
}) => {
  return (
    <UnderlineTextStyled className={className} size={size} color={color}>
      {children}
    </UnderlineTextStyled>
  );
};
