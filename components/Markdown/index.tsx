'use client';
import React, { useEffect } from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';

export default function Markdown({ source }: { source?: any }) {
  useEffect(() => {
    document.documentElement.setAttribute('data-color-mode', 'dark');
  }, []);
  return <MarkdownPreview source={source} />;
}
