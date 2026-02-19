export interface BlogPost {
  slug: string;
  pubDate: string;
  author?: string;
  authorImage?: string;
  image?: string;
  webCoverImage?: string;
  mobileCoverImage?: string;
  title: string;
  description: string;
  metadata?: string;
  category?: string;
  tags?: string[];
  boldTag?: string;
  buttonText?: string;
  buttonLink?: string;
  content?: string;
}

export interface EventPost {
  slug: string;
  pubDate: string;
  image?: string;
  title: string;
  eventStartDate?: string;
  eventEndDate?: string;
  location?: string;
  booth?: string;
  content?: string;
}

export interface WebinarSpeaker {
  name: string;
  title: string;
  company?: string;
  image?: string;
}

export interface WebinarPost {
  slug: string;
  pubDate: string;
  image?: string;
  title: string;
  eventDate?: string;
  eventTime?: string;
  duration?: string;
  content?: string;
  speakers?: WebinarSpeaker[];
  riversideEventId: string;
}

export interface DinnerEvent {
  city: string;
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  venue: string;
  venueAddress?: string;
  venueUrl?: string;
  hubspotFormId: string;
  hubspotPortalId: string;
  heroImage: string;
  heroImageIsBright?: boolean;
  formImage: string;
  formImageIsBright?: boolean;
  whyAttend: {
    title: string;
    description: string;
    icon: 'networking' | 'insights' | 'experience';
  }[];
  roles: string[];
}
