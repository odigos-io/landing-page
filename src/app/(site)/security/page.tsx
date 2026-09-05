import type { Metadata } from 'next';
import React from 'react';
import { SecurityContent } from './security-content';

export const metadata: Metadata = {
  title: 'Odigos Security: AI-speed attacks, refused at the function',
  description:
    'An operator with a model chains weaknesses across your services inside one request. Odigos sees every function call in every service, with nothing in your code, and refuses the one that matters. No code changes, no SDK, no sidecar, no redeploy.',
  openGraph: {
    title: 'Odigos Security: AI-speed attacks, refused at the function',
    description:
      'An operator with a model chains weaknesses across your services inside one request. Odigos sees every function call in every service, with nothing in your code, and refuses the one that matters. No code changes, no SDK, no sidecar, no redeploy.',
    url: '/security',
  },
  twitter: {
    title: 'Odigos Security: AI-speed attacks, refused at the function',
    description:
      'An operator with a model chains weaknesses across your services inside one request. Odigos sees every function call in every service, with nothing in your code, and refuses the one that matters. No code changes, no SDK, no sidecar, no redeploy.',
  },
  alternates: { canonical: '/security' },
};

const Security = () => <SecurityContent />;

export default Security;
