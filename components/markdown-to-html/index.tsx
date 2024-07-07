'use client';
import './style.css';
import theme from '@/style/theme';
import React, { useEffect } from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';

export function MarkdownToHtml({ source }: { source?: any }) {
  useEffect(() => {
    document.documentElement.setAttribute('data-color-mode', 'dark');
  }, []);
  return (
    <MarkdownPreview
      style={{ background: theme.colors.secondary }}
      source={source}
    />
  );
}
