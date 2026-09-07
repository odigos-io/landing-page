import type { Metadata } from 'next';
import React from 'react';
import { SecurityContent } from './security-content';

const TITLE = 'Odigos Security: See into the runtime. Block AI-powered attacks.';
const DESC = 'Odigos sees every function call in every service, on Kubernetes, VMs and bare metal, with nothing in your code, and blocks AI-powered attacks at the function level.';
const URL = 'https://odigos.io/security';
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
    name: 'Odigos Security',
    description: DESC,
    inLanguage: 'en-US',
    isPartOf: { '@id': 'https://odigos.io/#website' },
    about: {
      '@type': 'SoftwareApplication',
      name: 'Odigos',
      applicationCategory: 'SecurityApplication',
      operatingSystem: 'Linux',
      url: 'https://odigos.io',
      description: DESC,
      featureList: [
        'Function-level visibility across services',
        'Virtual patching at the function level without a redeploy',
        'Under 1% CPU, measured across more than a million production cores',
        'Open-source node sensor',
      ],
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: '14-day trial' },
    },
  },
];

const Security = () => (
  <>
    <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
    <SecurityContent />
  </>
);

export default Security;
