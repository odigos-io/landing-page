import type { Metadata } from 'next';
import React from 'react';
import { SOFTWARE_LD, ldScript } from '@/constants';
import { TechnologyContent } from './technology-content';

const TITLE = 'Deep Application Visibility. Outside the Process. | Odigos DeepBPF';
const DESC = 'Odigos DeepBPF captures functions, arguments and return values across Java, Python, Node.js and Go from outside the application, using kernel-verified eBPF.';
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
