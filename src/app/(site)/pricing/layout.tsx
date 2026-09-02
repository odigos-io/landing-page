import React from 'react';
import type { Metadata } from 'next';
import { FAQ, ldScript } from '@/constants';

export const metadata: Metadata = {
  title: 'Pricing | Odigos',
  description: 'Start free with open source Odigos and scale to Enterprise. Plans compared line by line, plus answers on eBPF overhead, language support and data governance.',
  alternates: { canonical: 'https://odigos.io/pricing' },
  openGraph: { title: 'Pricing | Odigos', description: 'Start free with open source Odigos and scale to Enterprise. Plans compared line by line, plus answers on eBPF overhead, language support and data governance.', url: 'https://odigos.io/pricing' },
};

/* Generated from the same constant the page renders, so the markup can never
   describe questions the visitor cannot see. */
const FAQ_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': 'https://odigos.io/pricing#faq',
  mainEntity: FAQ.map((f) => ({
    '@type': 'Question',
    name: f.title,
    acceptedAnswer: { '@type': 'Answer', text: f.description },
  })),
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type='application/ld+json' dangerouslySetInnerHTML={ldScript(FAQ_LD)} />
      {children}
    </>
  );
}
