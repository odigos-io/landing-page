/* Structured data. Kept in one place so the values cannot drift away from what
   the pages actually say. Rendered as application/ld+json script tags. */

const SITE = 'https://odigos.io';

export const ORGANIZATION_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE}/#organization`,
  name: 'Odigos',
  url: SITE,
  logo: { '@type': 'ImageObject', url: `${SITE}/icon.png`, width: 512, height: 512 },
  description:
    'Odigos gives AI the power to investigate production. Its Production Context Platform lets agents request missing evidence from running code to investigate incidents, understand attacks and verify code changes.',
  sameAs: ['https://github.com/odigos-io/odigos', 'https://www.linkedin.com/company/odigoss', 'https://x.com/odigosio'],
};

export const WEBSITE_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE}/#website`,
  url: SITE,
  name: 'Odigos',
  publisher: { '@id': `${SITE}/#organization` },
  inLanguage: 'en-US',
};

export const SOFTWARE_LD = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': `${SITE}/#software`,
  name: 'Odigos',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Kubernetes, Linux',
  url: SITE,
  downloadUrl: 'https://github.com/odigos-io/odigos',
  softwareHelp: 'https://docs.odigos.io',
  publisher: { '@id': `${SITE}/#organization` },
  description:
    'The Production Context Platform for AI investigations. Start with OpenTelemetry, then let engineers and agents request targeted runtime evidence as the investigation needs it.',
  featureList: [
    'Targeted function capture on supported running workloads without an instrumentation release',
    'DeepBPF captures application context from outside the process using kernel-verified eBPF',
    'Deep application visibility across Java, Python, Node.js and Go from outside the application',
    'Exports OpenTelemetry to any destination you already run',
    'PII masking, attribute deletion and sampling inside your own cluster',
    'RBAC over who may capture what, on which workloads',
    'MCP instrumentation controls for coding agents with Odigos Enterprise',
  ],
  offers: [
    { '@type': 'Offer', name: 'Open Source', price: '0', priceCurrency: 'USD', url: `${SITE}/pricing` },
    { '@type': 'Offer', name: 'Enterprise', url: `${SITE}/pricing`, availability: 'https://schema.org/InStock' },
  ],
};

export const ldScript = (data: unknown) => ({
  __html: JSON.stringify(data).replace(/</g, '\\u003c'),
});
