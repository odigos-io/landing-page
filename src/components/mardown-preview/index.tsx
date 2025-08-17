'use client';

import React from 'react';
import { useTheme } from 'styled-components';
import Preview from '@uiw/react-markdown-preview';

export const MarkdownPreview = ({ content }: { content?: string }) => {
  const theme = useTheme();
  if (!content) return null;

  return (
    <Preview
      source={content}
      style={{
        background: theme.colors.black,
        color: theme.colors.off_white,
      }}
      wrapperElement={{
        'data-color-mode': 'dark',
      }}
    />
  );
};
