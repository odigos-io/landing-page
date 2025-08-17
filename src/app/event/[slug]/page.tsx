import React from 'react';
import { notFound } from 'next/navigation';
import { EventSingle } from '@/containers';
import { getEventBySlug } from '@/libs/markdown';

interface EventPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const Event = async ({ params }: EventPageProps) => {
  const { slug } = await params;

  try {
    const event = getEventBySlug(slug);
    if (!event) notFound();

    return (
      <>
        <EventSingle event={event} />
      </>
    );
  } catch {
    notFound();
  }
};

export default Event;
