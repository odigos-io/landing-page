import type { Metadata } from 'next';
import React from 'react';
import { SOFTWARE_LD, ldScript } from '@/constants';
import { TechnologyContent } from './technology-content';

const TITLE = 'Odigos Technology: eBPF that sees inside the application.';
const DESC = 'Odigos DeepBPF reads what happens inside a running process, in every language, with nothing loaded into your application. Function-level depth, under 1% CPU.';
const URL = 'https://odigos.io/technology';
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
    name: 'Odigos Technology',
    description: DESC,
    inLanguage: 'en-US',
    isPartOf: { '@id': 'https://odigos.io/#website' },
    about: { '@id': 'https://odigos.io/#software' },
  },
];

const Technology = () => (
  <>
    <script type='application/ld+json' dangerouslySetInnerHTML={ldScript(SOFTWARE_LD)} />
    <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
    <TechnologyContent />
  </>
);

export default Technology;
