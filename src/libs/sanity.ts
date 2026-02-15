import { createClient } from 'next-sanity';
import type { BlogPost, EventPost, DinnerEvent } from '@/types';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ulvtmsy9';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true,
});

// ─── Blog Queries ──────────────────────────────────────────────────────────────

const BLOG_FIELDS = `
  "slug": slug.current,
  pubDate,
  author,
  authorImage,
  image,
  webCoverImage,
  mobileCoverImage,
  title,
  description,
  metadata,
  category,
  tags,
  boldTag,
  buttonText,
  buttonLink,
  content
`;

export const getAllBlogs = async (): Promise<BlogPost[]> => {
  const blogs = await client.fetch<BlogPost[]>(
    `*[_type == "blog"] | order(pubDate desc) { ${BLOG_FIELDS} }`,
    {},
    { next: { revalidate: 60 } }
  );
  return blogs;
};

export const getBlogBySlug = async (slug: string): Promise<BlogPost | null> => {
  const blog = await client.fetch<BlogPost | null>(
    `*[_type == "blog" && slug.current == $slug][0] { ${BLOG_FIELDS} }`,
    { slug },
    { next: { revalidate: 60 } }
  );
  return blog;
};

// ─── Event Queries ─────────────────────────────────────────────────────────────

const EVENT_FIELDS = `
  "slug": slug.current,
  pubDate,
  image,
  title,
  eventStartDate,
  eventEndDate,
  location,
  booth,
  content
`;

export const getAllEvents = async (): Promise<EventPost[]> => {
  const events = await client.fetch<EventPost[]>(
    `*[_type == "event"] | order(pubDate desc) { ${EVENT_FIELDS} }`,
    {},
    { next: { revalidate: 60 } }
  );
  return events;
};

export const getEventBySlug = async (slug: string): Promise<EventPost | null> => {
  const event = await client.fetch<EventPost | null>(
    `*[_type == "event" && slug.current == $slug][0] { ${EVENT_FIELDS} }`,
    { slug },
    { next: { revalidate: 60 } }
  );
  return event;
};

// ─── Dinner Event Queries ──────────────────────────────────────────────────────

const DINNER_EVENT_FIELDS = `
  city,
  "slug": slug.current,
  title,
  subtitle,
  date,
  time,
  venue,
  venueAddress,
  venueUrl,
  hubspotFormId,
  hubspotPortalId,
  heroImage,
  heroImageIsBright,
  formImage,
  formImageIsBright,
  whyAttend[] {
    title,
    description,
    icon
  },
  roles
`;

export const getAllDinnerEvents = async (): Promise<DinnerEvent[]> => {
  const events = await client.fetch<DinnerEvent[]>(
    `*[_type == "dinnerEvent"] { ${DINNER_EVENT_FIELDS} }`,
    {},
    { next: { revalidate: 60 } }
  );
  return events;
};

export const getDinnerEventBySlug = async (slug: string): Promise<DinnerEvent | null> => {
  const event = await client.fetch<DinnerEvent | null>(
    `*[_type == "dinnerEvent" && slug.current == $slug][0] { ${DINNER_EVENT_FIELDS} }`,
    { slug },
    { next: { revalidate: 60 } }
  );
  return event;
};
