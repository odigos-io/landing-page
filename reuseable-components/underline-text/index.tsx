'use client';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface UnderlineTextProps {
  children: ReactNode;
  size?: number;
}

const UnderlineTextStyled = styled.span<{ size?: number }>`
  color: #f9f9f9;
  font-family: 'Kode Mono';
  font-size: ${({ size }) => size || 16}px;
  font-style: normal;
  line-height: 150%;
  text-decoration-line: underline;
  text-transform: uppercase;
`;

export const UnderlineText: React.FC<UnderlineTextProps> = ({
  children,
  size,
}) => {
  return <UnderlineTextStyled size={size}>{children}</UnderlineTextStyled>;
};
