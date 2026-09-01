import { Suspense } from 'react';
import PlausibleProvider from 'next-plausible';
import { getAllBlogs, getAllEvents } from '@/libs/markdown';
import { calculateReadingTime } from '@/functions';

/* These wrap the entire tree. Loading them through next/dynamic meant the
   server rendered a placeholder and every page shipped an empty shell, so
   nothing was in the HTML for crawlers or for first paint. */
import ThemeProvider from '@/styles/theme-provider';
import MobileProvider from '@/contexts/useMobile';
import BlogsProvider from '@/contexts/useBlogs';
import EventsProvider from '@/contexts/useEvents';

import Header from '@/containers/header';
import Footer from '@/containers/footer';
import Modals from '@/containers/modals';
import HideOnHome from '@/containers/site-chrome/hide-on-home';

import Scripts from '@/libs/scripts';

type SiteLayoutProps = Readonly<{ children: React.ReactNode }>;

export default async function SiteLayout({ children }: SiteLayoutProps) {
  // Listing components only need the metadata. Passing full article bodies into
  // a client context serialised every post into every route's payload.
  const blogs = (await getAllBlogs()).map(({ content, customHtml, ...meta }) => ({
    ...meta,
    readingTime: content ? calculateReadingTime(content) : undefined,
  }));
  const events = await getAllEvents();

  return (
    <PlausibleProvider domain='odigos.io'>
      <ThemeProvider>
        <MobileProvider>
          <BlogsProvider blogs={blogs}>
            <EventsProvider events={events}>
              <HideOnHome>
                <Header />
              </HideOnHome>
              {children}
              <HideOnHome>
                <Footer />
              </HideOnHome>
              <Suspense fallback={null}>
                <Modals />
              </Suspense>
              <Scripts />
            </EventsProvider>
          </BlogsProvider>
        </MobileProvider>
      </ThemeProvider>
    </PlausibleProvider>
  );
}
