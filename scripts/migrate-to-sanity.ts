/**
 * One-time migration script: MDX files + dinner-events.ts → Sanity
 *
 * Usage:
 *   npx tsx scripts/migrate-to-sanity.ts
 *
 * Prerequisites:
 *   - .env.local must contain NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN
 *   - The Sanity project must have the dataset created (default: "production")
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error('Missing environment variables. Ensure .env.local has:');
  console.error('  NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
});

// ─── Helpers ───────────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function readMdxFiles(dir: string): { slug: string; data: Record<string, unknown>; content: string }[] {
  if (!fs.existsSync(dir)) {
    console.warn(`Directory not found: ${dir}`);
    return [];
  }

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));
  return files.map((file) => {
    const slug = file.replace(/\.mdx$/, '');
    const raw = fs.readFileSync(path.join(dir, file), 'utf8');
    const { data, content } = matter(raw);
    return { slug, data, content };
  });
}

// ─── Migrate Blogs ─────────────────────────────────────────────────────────────

async function migrateBlogs() {
  const blogsDir = path.resolve(process.cwd(), 'blogs');
  const blogs = readMdxFiles(blogsDir);

  console.log(`\nMigrating ${blogs.length} blog posts...`);

  for (const { slug, data, content } of blogs) {
    const doc = {
      _type: 'blog',
      _id: `blog-${slug}`,
      title: data.title || slug,
      slug: { _type: 'slug', current: slug },
      pubDate: data.pubDate || '',
      author: data.author || undefined,
      authorImage: data.authorImage || undefined,
      image: data.image || undefined,
      webCoverImage: data.webCoverImage || undefined,
      mobileCoverImage: data.mobileCoverImage || undefined,
      description: data.description || '',
      metadata: data.metadata || undefined,
      category: data.category || undefined,
      tags: data.tags || undefined,
      boldTag: data.boldTag || undefined,
      buttonText: data.buttonText || undefined,
      buttonLink: data.buttonLink || undefined,
      content: content.trim(),
    };

    try {
      await client.createOrReplace(doc);
      console.log(`  ✓ Blog: ${slug}`);
    } catch (err) {
      console.error(`  ✗ Blog: ${slug} — ${(err as Error).message}`);
    }
  }
}

// ─── Migrate Events ────────────────────────────────────────────────────────────

async function migrateEvents() {
  const eventsDir = path.resolve(process.cwd(), 'events');
  const events = readMdxFiles(eventsDir);

  console.log(`\nMigrating ${events.length} events...`);

  for (const { slug, data, content } of events) {
    const doc = {
      _type: 'event',
      _id: `event-${slug}`,
      title: data.title || slug,
      slug: { _type: 'slug', current: slug },
      pubDate: data.pubDate || '',
      image: data.image || undefined,
      eventStartDate: data.eventStartDate || undefined,
      eventEndDate: data.eventEndDate || undefined,
      location: data.location || undefined,
      booth: data.booth || undefined,
      content: content.trim(),
    };

    try {
      await client.createOrReplace(doc);
      console.log(`  ✓ Event: ${slug}`);
    } catch (err) {
      console.error(`  ✗ Event: ${slug} — ${(err as Error).message}`);
    }
  }
}

// ─── Migrate Dinner Events ─────────────────────────────────────────────────────

async function migrateDinnerEvents() {
  // Import the hardcoded dinner events
  const { DINNER_EVENTS } = await import('../src/constants/dinner-events');

  const entries = Object.entries(DINNER_EVENTS);
  console.log(`\nMigrating ${entries.length} dinner events...`);

  for (const [key, event] of entries) {
    const doc = {
      _type: 'dinnerEvent',
      _id: `dinner-${key}`,
      city: event.city,
      slug: { _type: 'slug', current: event.slug },
      title: event.title,
      subtitle: event.subtitle,
      date: event.date,
      time: event.time,
      venue: event.venue,
      venueAddress: event.venueAddress || undefined,
      venueUrl: event.venueUrl || undefined,
      hubspotFormId: event.hubspotFormId,
      hubspotPortalId: event.hubspotPortalId,
      heroImage: event.heroImage,
      heroImageIsBright: event.heroImageIsBright || false,
      formImage: event.formImage,
      formImageIsBright: event.formImageIsBright || false,
      whyAttend: event.whyAttend.map((item, i) => ({
        _key: `why-${i}`,
        title: item.title,
        description: item.description,
        icon: item.icon,
      })),
      roles: event.roles,
    };

    try {
      await client.createOrReplace(doc);
      console.log(`  ✓ Dinner: ${event.city} (${key})`);
    } catch (err) {
      console.error(`  ✗ Dinner: ${event.city} — ${(err as Error).message}`);
    }
  }
}

// ─── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('=== Sanity Content Migration ===');
  console.log(`Project: ${projectId}`);
  console.log(`Dataset: ${dataset}`);

  await migrateBlogs();
  await migrateEvents();
  await migrateDinnerEvents();

  console.log('\n=== Migration Complete ===');
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
