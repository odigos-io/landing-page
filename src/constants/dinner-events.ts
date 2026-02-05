export interface DinnerEvent {
  city: string;
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  venue: string;
  hubspotFormId: string;
  hubspotPortalId: string;
  heroImage: string;
  formImage: string;
  whyAttend: {
    title: string;
    description: string;
    icon: 'networking' | 'insights' | 'experience';
  }[];
  roles: string[];
}

export const DINNER_EVENTS: Record<string, DinnerEvent> = {
  nyc: {
    city: 'New York City',
    slug: 'nyc',
    title: 'Dinner with Odigos and Your Peers',
    subtitle: 'An intimate evening of fine dining, meaningful connections, and conversations about the future of observability',
    date: 'Thurs Mar 19',
    time: '7:00 pm',
    venue: 'Aqua',
    hubspotFormId: '2d41614e-0442-4545-9637-a66acffc7877',
    hubspotPortalId: '50932826',
    heroImage: '/assets/dinner/nyc/hero-bg.png',
    formImage: '/assets/dinner/nyc/form-bg.png',
    whyAttend: [
      {
        title: 'Peer Networking',
        description: 'Connect with fellow engineering and observability leaders facing similar challenges. Build relationships that extend beyond the dinner table.',
        icon: 'networking',
      },
      {
        title: 'Industry Insights',
        description: 'Engage in candid discussions about observability trends, OpenTelemetry adoption, and strategies for managing complex distributed systems.',
        icon: 'insights',
      },
      {
        title: 'Exclusive Experience',
        description: "Intimate gathering limited to senior leaders. Enjoy exceptional Italian and Japanese cuisine at one of Manhattan's most stunning venues.",
        icon: 'experience',
      },
    ],
    roles: [
      'Chief Information Officer (CIO)',
      'Chief Technology Officer (CTO)',
      'Director of Engineering',
      'Director of Observability',
      'Director of Platform Engineering',
    ],
  },
  // seattle: { ... } - to be added later
};

export const getDinnerEvent = (city: string): DinnerEvent | undefined => {
  return DINNER_EVENTS[city.toLowerCase()];
};

export const getAllDinnerEventSlugs = (): string[] => {
  return Object.keys(DINNER_EVENTS);
};
