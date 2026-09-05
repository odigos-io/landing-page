import type { Metadata } from 'next';
import React from 'react';
import { SecurityContent } from './security-content';

export const metadata: Metadata = {
  title: 'Odigos Security: See into the runtime. Block AI-powered attacks.',
  description:
    'An operator with a model chains weaknesses across your services inside one request. Odigos lets you see into the runtime like never before, with nothing in your code, and block AI-powered attacks at the function level, before they run. No code changes, no SDK, no sidecar, no redeploy.',
  openGraph: {
    title: 'Odigos Security: See into the runtime. Block AI-powered attacks.',
    description:
      'An operator with a model chains weaknesses across your services inside one request. Odigos lets you see into the runtime like never before, with nothing in your code, and block AI-powered attacks at the function level, before they run. No code changes, no SDK, no sidecar, no redeploy.',
    url: '/security',
  },
  twitter: {
    title: 'Odigos Security: See into the runtime. Block AI-powered attacks.',
    description:
      'An operator with a model chains weaknesses across your services inside one request. Odigos lets you see into the runtime like never before, with nothing in your code, and block AI-powered attacks at the function level, before they run. No code changes, no SDK, no sidecar, no redeploy.',
  },
  alternates: { canonical: '/security' },
};

const Security = () => <SecurityContent />;

export default Security;
