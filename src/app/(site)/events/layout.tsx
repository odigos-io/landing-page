import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events | Odigos',
  description: 'Discover upcoming and past Odigos events, conferences, and meetups.',
  alternates: {
    canonical: 'https://odigos.io/events',
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
