'use client';

import React, { Suspense, useEffect } from 'react';
import { useBlogs } from '@/contexts';
import { BlogContent } from './blog-content';
import { useRouter, useSearchParams } from 'next/navigation';

/* Only this bit reads the query string, so only this bit needs a boundary.
   Wrapping the whole page made the listing client-only and left the server
   HTML empty, which matters for a page search engines are meant to index. */
const LatestRedirect = () => {
  const { blogs } = useBlogs();
  const router = useRouter();
  const searchParams = useSearchParams();
  const goToLatest = searchParams?.get('latest') != null && blogs.length > 0;

  useEffect(() => {
    if (goToLatest) router.push(`/blog/${blogs[0].slug}`);
  }, [router, goToLatest, blogs]);

  return null;
};

const BlogPage = () => (
  <>
    <Suspense fallback={null}>
      <LatestRedirect />
    </Suspense>
    <BlogContent />
  </>
);

export default BlogPage;
