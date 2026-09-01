'use client';

import React, { Suspense, useEffect } from 'react';
import { useEvents } from '@/contexts';
import { useRouter, useSearchParams } from 'next/navigation';
import { EventsContent } from './events-content';

const Event = () => {
  const { events } = useEvents();
  const router = useRouter();
  const searchParams = useSearchParams();
  const shouldGoToLatest = searchParams?.get('latest') != null && events.length > 0;

  useEffect(() => {
    if (shouldGoToLatest) router.push(`/events/${events[0].slug}`);
  }, [router, shouldGoToLatest, events]);

  if (shouldGoToLatest) return null;

  return <EventsContent />;
};

const EventPage = () => (
  <Suspense fallback={null}>
    <Event />
  </Suspense>
);

export default EventPage;
