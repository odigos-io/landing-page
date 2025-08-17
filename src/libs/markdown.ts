import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import type { BlogPost, EventPost } from '@/types';

const compareByPubDate = (a: { pubDate: string }, b: { pubDate: string }) => {
  const dateA = new Date(a.pubDate);
  const dateB = new Date(b.pubDate);

  if (dateA > dateB) {
    return -1;
  } else if (dateA < dateB) {
    return 1;
  } else {
    return 0;
  }
};

const blogsDir = join(process.cwd(), 'blogs');
const eventsDir = join(process.cwd(), 'events');

const getSlugs = (dir: string): string[] => {
  const fileNames = fs.readdirSync(dir);
  const slugs = fileNames.map((file) => file.replace(/\.mdx$/, ''));
  return slugs;
};

const getFile = (dir: string, slug: string): string => {
  const fileName = `${slug}.mdx`;
  const fullPath = join(dir, fileName);
  const file = fs.readFileSync(fullPath, 'utf8');
  return file;
};

export const getBlogBySlug = (slug: string): BlogPost => {
  const fileContents = getFile(blogsDir, slug);
  const { data, content } = matter(fileContents);

  const blog: BlogPost = {
    ...(data as BlogPost),
    slug,
    content,
  };

  return blog;
};

export const getAllBlogs = (): BlogPost[] => {
  const slugs = getSlugs(blogsDir);
  const blogs = slugs.map((slug) => getBlogBySlug(slug)).sort(compareByPubDate);

  return blogs;
};

export const getEventBySlug = (slug: string): EventPost => {
  const fileContents = getFile(eventsDir, slug);
  const { data, content } = matter(fileContents);

  const event: EventPost = {
    ...(data as EventPost),
    slug,
    content,
  };

  return event;
};

export const getAllEvents = (): EventPost[] => {
  const slugs = getSlugs(eventsDir);
  const events = slugs.map((slug) => getEventBySlug(slug)).sort(compareByPubDate);

  return events;
};
