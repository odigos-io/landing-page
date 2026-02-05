import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDinnerEvent, getAllDinnerEventSlugs } from '@/constants/dinner-events';
import { DinnerEvent } from '@/containers/dinner-event';

interface DinnerPageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllDinnerEventSlugs();
  return slugs.map((city) => ({ city }));
}

export async function generateMetadata({ params }: DinnerPageProps): Promise<Metadata> {
  const { city } = await params;
  const event = getDinnerEvent(city);

  if (!event) {
    return {
      title: 'Event Not Found - Odigos',
    };
  }

  return {
    title: `${event.title} - ${event.city} | Odigos Executive Dinner`,
    description: event.subtitle,
    openGraph: {
      title: `${event.title} - ${event.city}`,
      description: event.subtitle,
      type: 'website',
    },
  };
}

const DinnerPage = async ({ params }: DinnerPageProps) => {
  const { city } = await params;
  const event = getDinnerEvent(city);

  if (!event) {
    notFound();
  }

  return <DinnerEvent event={event} />;
};

export default DinnerPage;
