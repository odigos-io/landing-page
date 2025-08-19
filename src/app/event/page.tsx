'use client';

import React, { useEffect } from 'react';
import { useEvents } from '@/contexts';
import { EventsAll, Hero3 } from '@/containers';
import { useRouter, useSearchParams } from 'next/navigation';

const Event = () => {
  const { events } = useEvents();
  const router = useRouter();
  const searchParams = useSearchParams();
  const shouldGoToLatest = searchParams?.get('latest') != null && events.length > 0;

  useEffect(() => {
    if (shouldGoToLatest) router.push(`/event/${events[0].slug}`);
  }, [router, shouldGoToLatest, events]);

  if (shouldGoToLatest) return null;

  return (
    <>
      <EventsAll />
      <Hero3 />
    </>
  );
};

export default Event;
