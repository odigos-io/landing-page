import { CSSProperties } from 'react';
import styled from 'styled-components';

export const ConstrainedWrapper = styled.div<{
  $isMobile: boolean;
  $paddingTop?: number;
  $paddingBottom?: number;
  $paddingLeft?: number;
  $paddingRight?: number;
}>`
  max-width: ${({ theme }) => theme.sizes.innerContentMaxWidth};
  margin: 0 auto;
  padding-top: ${({ $paddingTop: p, $isMobile }) => (typeof p === 'number' ? p : $isMobile ? 32 : 64)}px;
  padding-bottom: ${({ $paddingBottom: p, $isMobile }) => (typeof p === 'number' ? p : $isMobile ? 32 : 64)}px;
  padding-left: ${({ $paddingLeft: p, $isMobile }) => (typeof p === 'number' ? p : $isMobile ? 16 : 32)}px;
  padding-right: ${({ $paddingRight: p, $isMobile }) => (typeof p === 'number' ? p : $isMobile ? 16 : 32)}px;
`;

export const FlexRow = styled.div<{
  $gap?: number;
  $align?: CSSProperties['alignItems'];
  $justify?: CSSProperties['justifyContent'];
  $wrap?: CSSProperties['flexWrap'];
  $reverse?: boolean;
  $fullWidth?: boolean;
  $fullHeight?: boolean;
}>`
  display: flex;
  flex-direction: ${({ $reverse }) => ($reverse ? 'row-reverse' : 'row')};
  align-items: ${({ $align = 'unset' }) => $align};
  justify-content: ${({ $justify = 'unset' }) => $justify};
  flex-wrap: ${({ $wrap = 'unset' }) => $wrap};
  gap: ${({ $gap = 2 }) => $gap}px;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'unset')};
  height: ${({ $fullHeight }) => ($fullHeight ? '100%' : 'unset')};
`;

export const FlexColumn = styled.div<{
  $gap?: number;
  $align?: CSSProperties['alignItems'];
  $justify?: CSSProperties['justifyContent'];
  $wrap?: CSSProperties['flexWrap'];
  $reverse?: boolean;
  $fullWidth?: boolean;
  $fullHeight?: boolean;
}>`
  display: flex;
  flex-direction: ${({ $reverse }) => ($reverse ? 'column-reverse' : 'column')};
  align-items: ${({ $align = 'unset' }) => $align};
  justify-content: ${({ $justify = 'center' }) => $justify};
  flex-wrap: ${({ $wrap = 'unset' }) => $wrap};
  gap: ${({ $gap = 2 }) => $gap}px;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'unset')};
  height: ${({ $fullHeight }) => ($fullHeight ? '100%' : 'unset')};
`;
