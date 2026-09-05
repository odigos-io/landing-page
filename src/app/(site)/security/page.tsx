import type { Metadata } from 'next';
import React from 'react';
import { SecurityContent } from './security-content';
import { FAQ } from './security-faq';

const TITLE = 'Odigos Security: See into the runtime. Block AI-powered attacks.';
const DESC = 'eBPF runtime security for Kubernetes. Odigos reads every function call in every service, with nothing in your code, and blocks AI-powered attacks at the function level.';
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
      operatingSystem: 'Kubernetes',
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
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [{"@type": "Question", "name": "What is Odigos security?", "acceptedAnswer": {"@type": "Answer", "text": "Odigos is eBPF runtime security for Kubernetes. It reads the function calls inside live services, with their arguments and return values, across every service, and blocks a call at the function level by policy."}}, {"@type": "Question", "name": "How does Odigos detect AI-powered attacks?", "acceptedAnswer": {"@type": "Answer", "text": "Detection is baselined on your own traffic: the calls a route normally makes, and the one it has never made. No shared model, no signature feed."}}, {"@type": "Question", "name": "Does Odigos require code changes?", "acceptedAnswer": {"@type": "Answer", "text": "No. Nothing goes in your code, your process or your build. One sensor on the node, no SDK, no sidecar, no redeploy."}}, {"@type": "Question", "name": "What is virtual patching at the function level?", "acceptedAnswer": {"@type": "Answer", "text": "A policy that refuses one vulnerable function, or changes what it returns, in a running service. Scoped to the callers you name, shipped or reverted without a redeploy, deleted when the real patch lands."}}, {"@type": "Question", "name": "How is Odigos different from a WAF, EDR or ADR?", "acceptedAnswer": {"@type": "Answer", "text": "Each of those judges one piece of an attack: a request, a process, one application. Odigos reads the function calls the attack is made of, across services, so a chain of ordinary-looking steps is visible as a chain."}}],
  },
];

const Security = () => (
  <>
    <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
    <SecurityContent />
  </>
);

export default Security;
