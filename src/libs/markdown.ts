import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import type { BlogPost } from '@/types';
import {
  getAllBlogs as sanityGetAllBlogs,
  getBlogBySlug as sanityGetBlogBySlug,
  getAllEvents,
  getEventBySlug,
  getAllWebinars,
  getWebinarBySlug,
  getAllDinnerEvents,
  getDinnerEventBySlug,
} from './sanity';

export { getAllEvents, getEventBySlug, getAllWebinars, getWebinarBySlug, getAllDinnerEvents, getDinnerEventBySlug };

const blogsDir = join(process.cwd(), 'blogs');

function getLocalBlogBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = join(blogsDir, `${slug}.mdx`);
    const file = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(file);
    return { ...(data as BlogPost), slug, content };
  } catch {
    return null;
  }
}

function getAllLocalBlogs(): BlogPost[] {
  try {
    const fileNames = fs.readdirSync(blogsDir);
    return fileNames
      .filter((f) => f.endsWith('.mdx'))
      .map((f) => getLocalBlogBySlug(f.replace(/\.mdx$/, '')))
      .filter((b): b is BlogPost => b !== null)
      .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
  } catch {
    return [];
  }
}

export const getBlogBySlug = async (slug: string): Promise<BlogPost | null> => {
  const blog = await sanityGetBlogBySlug(slug);
  if (blog) return blog;
  return getLocalBlogBySlug(slug);
};

export const getAllBlogs = async (): Promise<BlogPost[]> => {
  const sanityBlogs = await sanityGetAllBlogs();
  const localBlogs = getAllLocalBlogs();
  const sanitySlugs = new Set(sanityBlogs.map((b) => b.slug));
  const missingLocals = localBlogs.filter((b) => !sanitySlugs.has(b.slug));
  return [...sanityBlogs, ...missingLocals].sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );
};
