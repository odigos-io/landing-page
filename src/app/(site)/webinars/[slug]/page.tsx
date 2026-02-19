import React from 'react';
import { notFound } from 'next/navigation';
import { getWebinarBySlug } from '@/libs/markdown';
import { WebinarSingle, Hero3 } from '@/containers';

interface WebinarPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const Webinar = async ({ params }: WebinarPageProps) => {
  const { slug } = await params;

  try {
    const webinar = await getWebinarBySlug(slug);
    if (!webinar) notFound();

    return (
      <>
        <WebinarSingle webinar={webinar} />
        <Hero3 />
      </>
    );
  } catch {
    notFound();
  }
};

export default Webinar;
