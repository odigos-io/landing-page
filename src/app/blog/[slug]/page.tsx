'use client';

import React, { useEffect } from 'react';
import { useBlogs } from '@/contexts';
import { useParams, useRouter } from 'next/navigation';
import { BlogSingle, Hero3, LearnMoreBlogs } from '@/containers';

const Blog = () => {
  const router = useRouter();
  const { slug } = useParams();
  const { blogs } = useBlogs();
  const blog = blogs.find((blog) => blog.slug === slug);

  useEffect(() => {
    // blog with this slug was not found, go back to all blogs
    if (blogs.length && !blog) router.push('/blog');
  }, [blogs.length, blog, router]);

  if (!blogs.length || !blog) return null;

  return (
    <>
      <BlogSingle blog={blog} />
      <LearnMoreBlogs title='Related Articles' />
      <Hero3 />
    </>
  );
};

export default Blog;
