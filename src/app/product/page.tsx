'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Hero3, Hero4, InfoSections2, LearnMoreBlogs } from '@/containers';

const Product = () => {
  // TODO: remove this once we have a proper product page
  const router = useRouter();
  const searchParams = useSearchParams();
  const shouldStay = searchParams.get('stay') != null;

  useEffect(() => {
    if (!shouldStay) router.push('/');
  }, [router, shouldStay]);

  if (!shouldStay) return null;

  return (
    <>
      <Hero4 />
      <InfoSections2 />
      <Hero3 />
      <LearnMoreBlogs />
    </>
  );
};

export default Product;
