'use client';

import React from 'react';
import styled from 'styled-components';
import Preview from '@uiw/react-markdown-preview';

/* Long-form markdown in the landing design language. The upstream previewer
   ships its own dark canvas, so this pins it to light and dresses it in the
   landing type scale. Shared by blog posts and event pages. */

export const Prose = styled.div`
  .wmde-markdown {
    background: transparent !important;
    color: var(--ink-soft);
    font-family: var(--font-display), system-ui, sans-serif;
    font-size: 17.5px;
    line-height: 1.72;
    letter-spacing: -0.003em;
  }
  .wmde-markdown h1,
  .wmde-markdown h2,
  .wmde-markdown h3,
  .wmde-markdown h4 {
    color: var(--ink);
    letter-spacing: -0.028em;
    border-bottom: 0;
    margin-top: 2em;
    margin-bottom: 0.5em;
  }
  .wmde-markdown h2 {
    font-size: 30px;
  }
  .wmde-markdown h3 {
    font-size: 22px;
  }
  .wmde-markdown a {
    color: var(--accent);
    text-decoration: none;
    border-bottom: 1px solid rgba(91, 67, 241, 0.35);
  }
  .wmde-markdown a:hover {
    border-bottom-color: var(--accent);
  }
  .wmde-markdown strong {
    color: var(--ink);
  }
  .wmde-markdown blockquote {
    color: var(--ink-mute);
    border-left: 3px solid var(--accent);
    background: var(--paper-3);
    border-radius: 0 var(--r) var(--r) 0;
    padding: 14px 20px;
  }
  .wmde-markdown code {
    background: var(--paper-3);
    color: var(--ink);
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 0.88em;
  }
  .wmde-markdown pre {
    border-radius: var(--r);
    border: 1px solid var(--panel-line);
  }
  .wmde-markdown pre code {
    background: transparent;
  }
  .wmde-markdown img {
    border-radius: var(--r);
    border: 1px solid var(--line);
    max-width: 100%;
    height: auto;
  }
  .wmde-markdown table tr,
  .wmde-markdown table td,
  .wmde-markdown table th {
    background: transparent;
    border-color: var(--line-strong);
  }
  .wmde-markdown hr {
    background: var(--line);
  }
  /* the library hangs an octicon anchor off every heading; it reads as a stray
     dash at this type scale */
  .wmde-markdown .anchor,
  .wmde-markdown .octicon-link {
    display: none;
  }
`;

export const Markdown = ({ content }: { content?: string }) => {
  if (!content) return null;
  /* The page already renders the post title as the h1. A markdown body that
     opens with "# Title" would emit a second one, which splits the page's
     topic signal for search engines and for anything extracting structure. */
  const demoted = content.replace(/^#\s+/gm, '## ');
  return <Preview source={demoted} wrapperElement={{ 'data-color-mode': 'light' }} style={{ background: 'transparent' }} />;
};
