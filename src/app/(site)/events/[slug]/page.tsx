import React from 'react';
import { notFound } from 'next/navigation';
import { getEventBySlug } from '@/libs/markdown';
import { EventSingle, Hero3, LearnMoreEvents } from '@/containers';

interface EventPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const Event = async ({ params }: EventPageProps) => {
  const { slug } = await params;

  try {
    const event = await getEventBySlug(slug);
    if (!event) notFound();

    return (
      <>
        <EventSingle event={event} />
        <LearnMoreEvents title='Related Events' />
        <Hero3 />
      </>
    );
  } catch {
    notFound();
  }
};

export default Event;
