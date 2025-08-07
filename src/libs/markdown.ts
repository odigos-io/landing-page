import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import type { BlogPost } from '@/types';

const blogsDir = join(process.cwd(), 'blogs');

const getSlugs = (): string[] => {
  const fileNames = fs.readdirSync(blogsDir);
  const slugs = fileNames.map((file) => file.replace(/\.mdx$/, ''));
  return slugs;
};

const getFile = (slug: string): string => {
  const fileName = `${slug}.mdx`;
  const fullPath = join(blogsDir, fileName);
  const file = fs.readFileSync(fullPath, 'utf8');
  return file;
};

export const getBlogBySlug = (slug: string): BlogPost => {
  const fileContents = getFile(slug);
  const { data, content } = matter(fileContents);

  const blog: BlogPost = {
    ...(data as BlogPost),
    slug,
    content,
  };

  return blog;
};

const compareByPubDate = (a: BlogPost, b: BlogPost) => {
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

export const getAllBlogs = (): BlogPost[] => {
  const slugs = getSlugs();
  const posts = slugs.map((slug) => getBlogBySlug(slug)).sort(compareByPubDate);

  return posts;
};
