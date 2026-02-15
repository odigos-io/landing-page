'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { markdownSchema } from 'sanity-plugin-markdown';
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
  name: 'odigos-landing-page',
  title: 'Odigos Landing Page',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ulvtmsy9',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/studio',

  plugins: [structureTool(), markdownSchema()],

  schema: {
    types: schemaTypes,
  },
});
