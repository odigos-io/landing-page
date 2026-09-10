import type { Metadata } from 'next';
import React from 'react';
import { SecurityContent } from './security-content';

const TITLE = 'Understand Attacks. Assess Risk. Contain Threats. | Odigos';
const DESC =
  'Understand attacks in your running applications, assess the blast radius, and contain threats with function-level virtual patching or thread and process stops.';
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
      '@id': 'https://odigos.io/#software-security',
      name: 'Odigos',
      applicationCategory: 'SecurityApplication',
      operatingSystem: 'Linux',
      url: 'https://odigos.io',
      description: DESC,
      featureList: [
        'Function-level visibility across services',
        'Virtual patching at the function level without a redeploy',
        'Service communication maps for blast-radius assessment',
        'Thread and process mitigation options',
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
