'use client';
import React from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';

export default function Markdown({ source }: { source?: any }) {
  return (
    <MarkdownPreview source={source} style={{ background: 'transparent' }} />
  );
}
