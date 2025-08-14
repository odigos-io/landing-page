'use client';

import React, { forwardRef, type CSSProperties, Fragment, type HTMLAttributes, type ReactNode, useMemo } from 'react';
import styled from 'styled-components';

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
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

const getStrongsFromText = (text: string) => {
  const strongs = text.match(/<strong[^>]*>(.*?)<\/strong>/g);
  return strongs?.map((strong) => {
    const label = strong.replace(/<strong[^>]*>/, '').replace(/<\/strong>/, '');

    return {
      original: strong,
      label,
    };
  });
};

const renderText = (text: string): { mappedText: ReactNode; hasStrongs: boolean } => {
  const strongs = getStrongsFromText(text);
  strongs?.forEach((strong, i) => {
    text = text.replace(strong.original, `STRONG-${i}###`);
  });

  const mappedText = text.split(' ').map((word) => {
    if (word.includes('STRONG-')) {
      const [strongId, postLabel] = word.split('###');
      const entry = strongs?.[parseInt(strongId.replace('STRONG-', ''))];

      return (
        <Fragment key={word}>
          <strong style={{ fontWeight: 600 }}>{entry?.label}</strong>
          {postLabel ? `${postLabel} ` : ' '}
        </Fragment>
      );
    }

    return word + ' ';
  });

  return { mappedText, hasStrongs: !!strongs?.length };
};

const Text = forwardRef<HTMLParagraphElement, TextProps>(({ children, color, noWrap, fontSize = 16, fontWeight, lineHeight, letterSpacing, textAlign, textDecoration, ...props }, ref) => {
  const textArray = useMemo(() => {
    const str =
      typeof children === 'string'
        ? children
        : Array.isArray(children)
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (children as any[]).filter((x) => x && typeof x === 'string').join(' ')
        : '';

    return str.split('\n') as string[];
  }, [children]);

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
      {textArray.map((str, i) => {
        const { mappedText } = renderText(str);
        return (
          <Fragment key={`text-${i}-${str}`}>
            {mappedText}
            {i !== textArray.length - 1 ? <br /> : null}
          </Fragment>
        );
      })}
    </Container>
  );
});

Text.displayName = Text.name;
export { Text };
