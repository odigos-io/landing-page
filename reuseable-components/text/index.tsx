import theme from '@/style/theme';
import React from 'react';
import styled from 'styled-components';

type TextProps = {
  size?: number;
  fontFam?: string;
  children: React.ReactNode;
};

const TextStyled = styled.span<{
  size?: number;
  fontFam?: string;
}>`
  color: #f9f9f9;
  font-family: ${({ fontFam }) => fontFam};
  font-size: ${({ size }) => size || 16}px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 200% */
  text-transform: uppercase;
`;

export const Text = ({
  size,
  children,
  fontFam = theme.font_family.primary,
}: TextProps) => {
  return (
    <TextStyled size={size} fontFam={fontFam}>
      {children}
    </TextStyled>
  );
};
