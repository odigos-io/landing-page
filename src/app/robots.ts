import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio/', '/dinner/', '/new/'],
    },
    sitemap: 'https://odigos.io/sitemap.xml',
  };
}
