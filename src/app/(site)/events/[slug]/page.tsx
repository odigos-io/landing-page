import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getEventBySlug } from '@/libs/markdown';
import { formatEventDateRange } from '@/functions';
import { LandingHeader, LandingEventPost, LandingCTA, LandingFooter } from '@/containers/landing';

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
    // Unfurls already show the title, so the description carries when and where.
    const description = [formatEventDateRange(event.eventStartDate, event.eventEndDate), event.location].filter(Boolean).join(' · ') || event.title;

    return {
      title: `${event.title} | Odigos Events`,
      description,
      openGraph: {
        title: event.title,
        description,
        url: eventUrl,
        siteName: 'Odigos',
        images: [{ url: imageUrl, width: 1200, height: 630, alt: event.title }],
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: event.title,
        description,
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
      <div className='landing-root'>
        <LandingHeader />
        <main>
          <LandingEventPost event={event} />
          <LandingCTA />
        </main>
        <LandingFooter />
      </div>
    );
  } catch {
    notFound();
  }
};

export default Event;
