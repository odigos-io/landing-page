import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllDinnerEvents, getDinnerEventBySlug } from '@/libs/sanity';
import { DinnerEvent } from '@/containers/dinner-event';

interface DinnerPageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  const events = await getAllDinnerEvents();
  return events.map((event) => ({ city: event.slug }));
}

export async function generateMetadata({ params }: DinnerPageProps): Promise<Metadata> {
  const { city } = await params;
  const event = await getDinnerEventBySlug(city);

  if (!event) {
    return {
      title: 'Event Not Found - Odigos',
    };
  }

  return {
    title: `${event.title} - ${event.city} | Odigos Executive Dinner`,
    description: event.subtitle,
    robots: 'noindex, nofollow',
    openGraph: {
      title: `${event.title} - ${event.city}`,
      description: event.subtitle,
      type: 'website',
    },
  };
}

const DinnerPage = async ({ params }: DinnerPageProps) => {
  const { city } = await params;
  const event = await getDinnerEventBySlug(city);

  if (!event) {
    notFound();
  }

  return <DinnerEvent event={event} />;
};

export default DinnerPage;
