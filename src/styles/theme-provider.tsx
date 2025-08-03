'use client';

import React, { type FC, type PropsWithChildren, useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { theme } from './theme';
import { ServerStyleSheet, StyleSheetManager, ThemeProvider as StyledThemeProvider } from 'styled-components';
import './globals.css';

const StyledComponentsRegistry: FC<PropsWithChildren> = ({ children }) => {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== 'undefined') return <>{children}</>;

  return <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>{children}</StyleSheetManager>;
};

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StyledThemeProvider theme={theme}>
      <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
    </StyledThemeProvider>
  );
};

export default ThemeProvider;
