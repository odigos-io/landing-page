import theme from '@/style/theme';
import React from 'react';
import styled from 'styled-components';

type TextProps = {
  size?: number;
  fontFam?: string;
  weight?: number;
  children: React.ReactNode;
  color?: string;
  style?: React.CSSProperties;
};

const TextStyled = styled.span<{
  size?: number;
  fontFam?: string;
  weight: number;
  color?: string;
}>`
  color: ${({ color }) => color || theme.text.primary};
  font-family: ${({ fontFam }) => fontFam};
  font-size: ${({ size }) => size || 16}px;
  font-style: normal;
  font-weight: ${({ weight }) => weight};
  line-height: 20px; /* 200% */
`;

export const Text = ({
  size,
  children,
  fontFam = theme.font_family.primary,
  weight = 500,
  color,
  style = {},
}: TextProps) => {
  return (
    <TextStyled
      weight={weight}
      size={size}
      fontFam={fontFam}
      color={color}
      style={{ ...style }}
    >
      {children}
    </TextStyled>
  );
};
