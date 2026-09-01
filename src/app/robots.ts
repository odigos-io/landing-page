import { MetadataRoute } from 'next';

/* Bare paths matter: "/new/" does not match "/new", which left the draft
   site crawlable. */
const disallow = ['/studio', '/studio/', '/dinner', '/dinner/', '/new', '/new/'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow },
      /* Odigos sells to teams running AI agents, so being citable in an
         assistant's answer is a primary discovery channel. The content is
         public marketing material either way. */
      {
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-User',
          'Claude-SearchBot',
          'anthropic-ai',
          'PerplexityBot',
          'Perplexity-User',
          'Google-Extended',
          'CCBot',
          'Applebot-Extended',
          'meta-externalagent',
          'cohere-ai',
        ],
        allow: '/',
        disallow,
      },
    ],
    sitemap: 'https://odigos.io/sitemap.xml',
    host: 'https://odigos.io',
  };
}
