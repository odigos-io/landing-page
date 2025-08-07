import React from 'react';
import { notFound } from 'next/navigation';
import { getBlogBySlug } from '@/libs/markdown';
import { BlogSingle, Hero3, LearnMoreBlogs } from '@/containers';

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const Blog = async ({ params }: BlogPageProps) => {
  const { slug } = await params;

  try {
    const blog = getBlogBySlug(slug);
    if (!blog) notFound();

    return (
      <>
        <BlogSingle blog={blog} />
        <LearnMoreBlogs title='Related Articles' />
        <Hero3 />
      </>
    );
  } catch {
    notFound();
  }
};

export default Blog;
