'use client';

import type { EventPost } from '@/types';
import { createContext, useContext } from 'react';

const INITIAL_STATE: {
  events: EventPost[];
} = {
  events: [],
};

const EventsContext = createContext<typeof INITIAL_STATE>(INITIAL_STATE);

const EventsProvider = ({ events, children }: { events: EventPost[]; children: React.ReactNode }) => {
  return <EventsContext.Provider value={{ events }}>{children}</EventsContext.Provider>;
};

const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error('useEvents must be used within a EventsProvider');
  }
  return context;
};

export { useEvents };
export default EventsProvider;
