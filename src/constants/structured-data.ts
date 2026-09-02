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
    'Odigos captures the arguments and return values of any function in a live production service, in seconds, with no code change and no redeploy, and exports the result as OpenTelemetry.',
  sameAs: ['https://github.com/odigos-io/odigos', 'https://www.linkedin.com/company/odigos', 'https://x.com/odigos_io'],
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
    'Ask production a question nobody set it up to answer. Odigos attaches to any function in a running service with its own eBPF runtime and returns the arguments and return values in seconds, with no code change.',
  featureList: [
    'Capture any function in a live service with no redeploy',
    'Out of process eBPF at under 1% CPU overhead',
    'Automatic language detection across Go, Java, Python, .NET, JavaScript, PHP and Ruby',
    'Exports OpenTelemetry to any destination you already run',
    'PII masking, attribute deletion and sampling inside your own cluster',
    'RBAC over who may capture what, on which workloads',
  ],
  offers: [
    { '@type': 'Offer', name: 'Open Source', price: '0', priceCurrency: 'USD', url: `${SITE}/pricing` },
    { '@type': 'Offer', name: 'Enterprise', priceCurrency: 'USD', url: `${SITE}/pricing`, availability: 'https://schema.org/InStock' },
  ],
};

export const ldScript = (data: unknown) => ({
  __html: JSON.stringify(data).replace(/</g, '\\u003c'),
});
