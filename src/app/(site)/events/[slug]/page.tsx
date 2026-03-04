import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getEventBySlug } from '@/libs/markdown';
import { EventSingle, Hero3, LearnMoreEvents } from '@/containers';

interface EventPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const event = await getEventBySlug(slug);
    if (!event) {
      return {
        title: 'Event Not Found',
        description: 'The requested event could not be found.',
      };
    }

    const baseUrl = 'https://odigos.io';
    const eventUrl = `${baseUrl}/events/${slug}`;
    const imageUrl = event.image || `${baseUrl}/assets/odigos/logo_white_filled.svg`;

    return {
      title: `${event.title} | Odigos Events`,
      description: `${event.title}${event.location ? ` — ${event.location}` : ''}`,
      openGraph: {
        title: event.title,
        description: `${event.title}${event.location ? ` — ${event.location}` : ''}`,
        url: eventUrl,
        siteName: 'Odigos',
        images: [{ url: imageUrl, width: 1200, height: 630, alt: event.title }],
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: event.title,
        description: `${event.title}${event.location ? ` — ${event.location}` : ''}`,
        images: [imageUrl],
      },
      alternates: {
        canonical: eventUrl,
      },
    };
  } catch {
    return {
      title: 'Event Not Found',
      description: 'The requested event could not be found.',
    };
  }
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
