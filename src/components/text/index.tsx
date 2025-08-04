'use client';

import React, { forwardRef, type CSSProperties, Fragment } from 'react';
import styled from 'styled-components';

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  color?: string;
  noWrap?: boolean;
  fontSize?: CSSProperties['fontSize'];
  fontWeight?: CSSProperties['fontWeight'];
  lineHeight?: CSSProperties['lineHeight'];
  letterSpacing?: CSSProperties['letterSpacing'];
  textAlign?: CSSProperties['textAlign'];
  textDecoration?: CSSProperties['textDecoration'];
}

const Container = styled.p<{
  $color: TextProps['color'];
  $noWrap: TextProps['noWrap'];
  $fontSize: TextProps['fontSize'];
  $fontWeight: TextProps['fontWeight'];
  $lineHeight: TextProps['lineHeight'];
  $letterSpacing: TextProps['letterSpacing'];
  $textAlign: TextProps['textAlign'];
  $textDecoration: TextProps['textDecoration'];
}>`
  margin: 0;
  padding: 0;
  color: ${({ $color, theme }) => $color || theme.colors.white};
  ${({ $noWrap }) => $noWrap && 'white-space: nowrap;'}
  ${({ $fontSize }) => `font-size: ${typeof $fontSize === 'number' ? `${$fontSize}px` : $fontSize};`}
  ${({ $fontWeight }) => `font-weight: ${$fontWeight};`}
  ${({ $lineHeight }) => `line-height: ${$lineHeight};`}
  ${({ $letterSpacing }) => `letter-spacing: ${$letterSpacing};`}
  ${({ $textAlign }) => `text-align: ${$textAlign};`}
  ${({ $textDecoration }) => `text-decoration: ${$textDecoration};`}
`;

const Text = forwardRef<HTMLParagraphElement, TextProps>(({ children, color, noWrap, fontSize = 16, fontWeight, lineHeight, letterSpacing, textAlign, textDecoration, ...props }, ref) => {
  const text =
    typeof children === 'string'
      ? children
      : Array.isArray(children)
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (children as any[]).filter((x) => x && typeof x === 'string').join(' ')
      : '';

  const arr = text.split('\n') as string[];

  return (
    <Container
      ref={ref}
      $color={color}
      $noWrap={noWrap}
      $fontSize={fontSize}
      $fontWeight={fontWeight}
      $lineHeight={lineHeight}
      $letterSpacing={letterSpacing}
      $textAlign={textAlign}
      $textDecoration={textDecoration}
      {...props}
    >
      {arr.map((str, i) => (
        <Fragment key={`text-${i}-${str}`}>
          {str}
          {i !== arr.length - 1 ? <br /> : null}
        </Fragment>
      ))}
    </Container>
  );
});

Text.displayName = Text.name;
export { Text };
