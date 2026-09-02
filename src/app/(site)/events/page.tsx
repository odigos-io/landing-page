'use client';

import React, { Suspense, useEffect } from 'react';
import { useEvents } from '@/contexts';
import { useRouter, useSearchParams } from 'next/navigation';
import { EventsContent } from './events-content';

/* Boundary scoped to the query-string reader only, so the listing still
   server-renders. */
const LatestRedirect = () => {
  const { events } = useEvents();
  const router = useRouter();
  const searchParams = useSearchParams();
  const goToLatest = searchParams?.get('latest') != null && events.length > 0;

  useEffect(() => {
    if (goToLatest) router.push(`/events/${events[0].slug}`);
  }, [router, goToLatest, events]);

  return null;
};

const EventPage = () => (
  <>
    <Suspense fallback={null}>
      <LatestRedirect />
    </Suspense>
    <EventsContent />
  </>
);

export default EventPage;
