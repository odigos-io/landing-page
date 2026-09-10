import type { Metadata } from 'next';
import { ldScript } from '@/constants';
import { CodingAgentsContent } from './coding-agents-content';

const TITLE = 'Give Coding Agents the Power to Investigate Production | Odigos';
const DESCRIPTION =
  'Let your coding agent request missing runtime evidence with Odigos MCP, connect a failure to the responsible code, and verify the deployed fix against new traffic.';
const URL = 'https://odigos.io/coding-agents';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: 'website',
    siteName: 'Odigos',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: TITLE }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/og.png'] },
};

export default function CodingAgents() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={ldScript({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${URL}#webpage`,
          url: URL,
          name: TITLE,
          description: DESCRIPTION,
          inLanguage: 'en-US',
          isPartOf: { '@id': 'https://odigos.io/#website' },
          about: { '@id': 'https://odigos.io/#software' },
        })}
      />
      <CodingAgentsContent />
    </>
  );
}
