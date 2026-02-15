import dynamic from 'next/dynamic';
import PlausibleProvider from 'next-plausible';
import { getAllBlogs, getAllEvents } from '@/libs/markdown';

const ThemeProvider = dynamic(() => import('@/styles/theme-provider'));
const MobileProvider = dynamic(() => import('@/contexts/useMobile'));
const BlogsProvider = dynamic(() => import('@/contexts/useBlogs'));
const EventsProvider = dynamic(() => import('@/contexts/useEvents'));

// const AnnouncementBanner = dynamic(() => import('@/containers/announcement-banner'));
const Header = dynamic(() => import('@/containers/header'));
const Footer = dynamic(() => import('@/containers/footer'));
const Modals = dynamic(() => import('@/containers/modals'));

const Scripts = dynamic(() => import('@/libs/scripts'));

type SiteLayoutProps = Readonly<{ children: React.ReactNode }>;

export default async function SiteLayout({ children }: SiteLayoutProps) {
  const blogs = await getAllBlogs();
  const events = await getAllEvents();

  return (
    <PlausibleProvider
      domain='odigos.io'
      scriptProps={{
        src: 'https://plausible.io/js/pa-XwhChNEQuiNGeGzBgCvMO.js',
      }}
    >
      <ThemeProvider>
        <MobileProvider>
          <BlogsProvider blogs={blogs}>
            <EventsProvider events={events}>
              {/* <AnnouncementBanner title='Meet Odigos at <EVENT_NAME_HERE>!' link='/events?latest' linkText='Event' /> */}
              <Header />
              {children}
              <Footer />
              <Modals />
            </EventsProvider>
          </BlogsProvider>
        </MobileProvider>
      </ThemeProvider>
    </PlausibleProvider>
  );
}
