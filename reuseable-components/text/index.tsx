import React from 'react';
import styled from 'styled-components';

type TextProps = {
  size?: number;
  children: React.ReactNode;
};

const TextStyled = styled.span<{ size?: number }>`
  color: #f9f9f9;
  font-family: 'Inter Tight';
  font-size: ${({ size }) => size || 16}px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 200% */
  text-transform: uppercase;
`;

export const Text = ({ size, children }: TextProps) => {
  return <TextStyled size={size}>{children}</TextStyled>;
};
