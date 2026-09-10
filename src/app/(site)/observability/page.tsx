import type { Metadata } from 'next';
import React from 'react';
import { SOFTWARE_LD, ldScript } from '@/constants';
import { ObservabilityContent } from './observability-content';

const TITLE = 'Wake up to the root cause, not the alert | Odigos';
const DESC = 'Give AI investigations the evidence they are missing. Odigos combines automatic coverage with dynamic instrumentation, exporting new runtime evidence to your existing telemetry backend.';
const URL = 'https://odigos.io/observability';
const OG = '/og.png';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: URL,
    type: 'website',
    siteName: 'Odigos',
    locale: 'en_US',
    images: [{ url: OG, width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESC,
    images: [OG],
  },
};

const LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${URL}#webpage`,
    url: URL,
    name: 'Odigos Observability',
    description: DESC,
    inLanguage: 'en-US',
    isPartOf: { '@id': 'https://odigos.io/#website' },
    about: { '@id': 'https://odigos.io/#software' },
  },
];

const Observability = () => (
  <>
    <script type='application/ld+json' dangerouslySetInnerHTML={ldScript(SOFTWARE_LD)} />
    <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
    <ObservabilityContent />
  </>
);

export default Observability;
