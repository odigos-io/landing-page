// app/api/posts/route.ts

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const postsDirectory = join(process.cwd(), 'markdown/docs');
const blogsDirectory = join(process.cwd(), 'markdown/blogs');

function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items: Record<string, string> = {};
  console.log({ fields });
  console.log({ data });
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });

  return items;
}

function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();

  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
}

function getBlogBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = join(blogsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items: Record<string, any> = { ...data, content };

  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });

  return items;
}

function compareByPubDate(a, b) {
  const dateA = new Date(a.pubDate);
  const dateB = new Date(b.pubDate);

  if (dateA > dateB) {
    return -1;
  } else if (dateA < dateB) {
    return 1;
  } else {
    return 0;
  }
}

function getAllBlogs(fields: string[] = []) {
  const slugs = getPostSlugs();

  const posts = slugs
    .map((slug) => getBlogBySlug(slug, fields))
    .sort(compareByPubDate);

  return posts;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  const slug = searchParams.get('slug');
  const fields = searchParams.getAll('fields');

  let data;

  if (type === 'post') {
    // if (slug) {
    //   data = getPostBySlug(slug, fields || []);
    // } else {
    //   data = getAllPosts(fields || []);
    // }

    data = getAllPosts(
      [
        'title',
        'pubDate',
        'category',
        'image',
        'slug',
        'body',
        'description',
        'tags',
        'author',
      ] || []
    );
  } else if (type === 'blog') {
    if (slug) {
      data = getBlogBySlug(slug, fields || []);
    } else {
      data = getAllBlogs(fields || []);
    }
  } else {
    return NextResponse.json(
      { message: 'Invalid type parameter' },
      { status: 400 }
    );
  }

  return NextResponse.json(data);
}
