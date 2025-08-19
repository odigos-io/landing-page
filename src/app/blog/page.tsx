'use client';

import React, { useEffect } from 'react';
import { useBlogs } from '@/contexts';
import { BlogsAll, Hero3 } from '@/containers';
import { useRouter, useSearchParams } from 'next/navigation';

const Blog = () => {
  const { blogs } = useBlogs();
  const router = useRouter();
  const searchParams = useSearchParams();
  const shouldGoToLatest = searchParams?.get('latest') != null && blogs.length > 0;

  useEffect(() => {
    if (shouldGoToLatest) router.push(`/blog/${blogs[0].slug}`);
  }, [router, shouldGoToLatest, blogs]);

  if (shouldGoToLatest) return null;

  return (
    <>
      <BlogsAll />
      <Hero3 />
    </>
  );
};

export default Blog;
