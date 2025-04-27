export const DATA = [
  {
    plan: 'Open Source',
    icon: '/images/pricing/free.svg',
    description: 'Zero-code distributed tracing.',
    priceTitle: 'always',
    price: 'Free',
    isBeta: false,
    features: ['Support for Java, Python, Go, .NET, and NodeJS applications', 'Kubernetes environment', 'Local UI for a single cluster', 'Community Support'],
    button: {
      text: 'Go to GitHub',
      link: 'https://github.com/odigos-io/odigos',
    },
  },
  // {
  //   icon: '/images/pricing/pro.svg',
  //   plan: 'Pro',
  //   status: 'Open Beta',
  //   description: 'Multiple clusters and teams.',
  //   priceTitle: '',
  //   price: 'COMING SOON',
  //   isBeta: true,
  //   features: [
  //     'Control instrumentation in runtime',
  //     'Virtual Machines, Bare Metal, and serverless environments',
  //     'Multi Cluster management',
  //     'Business Hours Support',
  //   ],
  //   button: {
  //     text: 'Contact Us',
  //     link: 'https://app.odigos.io/signin',
  //   },
  // },
  {
    icon: '/images/pricing/enterprise.svg',
    plan: 'Enterprise',
    description: 'Mission critical distributed tracing.',
    cta: 'Figure it out together',
    priceTitle: 'Figure it out together',
    price: "Let's Talk!",
    isBeta: false,
    features: ['eBPF-based instrumentation for additional programming languages', 'Enterprise-grade performance', 'Support for legacy applications', '24/7 Premium Support'],
    button: {
      text: 'Contact Us',
      link: 'https://example.com/contact',
    },
  },
];

export const pricingPlan = [
  {
    feature: 'Zero-Code OTEL Tracing',
    community: true,
    premium: true,
  },
  {
    feature: 'Odigos Collector Sampling Actions',
    community: true,
    premium: true,
  },
  {
    feature: 'Odigos Instrumentation Actions',
    community: true,
    premium: true,
  },
  {
    feature: 'Multi Cluster Distributed Tracing',
    community: true,
    premium: true,
  },
  {
    feature: 'Kubernetes Tracing',
    community: true,
    premium: true,
  },
  {
    feature: 'Linux VM/Cloud VM Tracing',
    community: false,
    premium: true,
  },
  {
    feature: 'Linux Bare Metal Tracing',
    community: false,
    premium: true,
  },
  {
    section: 'Low Overhead eBPF Instrumentation',
  },
  {
    feature: 'Go',
    community: true,
    premium: true,
  },
  {
    feature: 'Java, Python, NodeJS',
    community: 'OTEL Based',
    premium: true,
  },
  {
    feature: '.NET',
    community: 'OTEL Based',
    premium: 'Coming Soon',
  },
  {
    feature: 'Custom instrumentation',
    community: 'DIY',
    premium: 'Coming Soon',
  },
  {
    section: 'Database Extended Distributed Tracing',
  },
  {
    feature: 'MySQL',
    community: false,
    premium: true,
  },
  {
    feature: 'Postgres',
    community: false,
    premium: true,
  },
  {
    feature: 'Oracle',
    community: false,
    premium: 'Coming Soon',
  },
  {
    feature: 'Multi Cluster Administration',
    community: false,
    premium: 'Coming Soon',
  },
  {
    feature: 'Supported OTEL instrumentation',
    community: 'DIY',
    premium: '24/7 Premium',
  },
  {
    feature: 'Support',
    community: 'Odigos Community Support',
    premium: '24/7 Premium',
  },
];

export const HEADER_DATA = [
  {
    title: 'Compare Plans',
  },
  {
    plan: 'Open Source',
    icon: '/images/pricing/free.svg',
    description: 'Zero-code distributed tracing. Always free.',
    priceTitle: 'always',
    price: 'Free',
    isBeta: false,
    features: ['Support for Java, Python, Go, .NET, and NodeJS applications', 'Kubernetes environment', 'Local UI for a single cluster', 'Community Support'],
    button: {
      text: 'Go to GitHub',
      link: 'https://github.com/odigos-io/odigos',
    },
  },
  {
    plan: 'Enterprise',
    icon: '/images/pricing/enterprise.svg',
    description: 'Mission critical distributed tracing.',
    priceTitle: 'Figure it out together',
    price: "Let's Talk!",
    isBeta: false,
    features: ['eBPF-based instrumentation for additional programming languages', 'Enterprise-grade performance', 'Support for legacy applications', '24/7 Premium Support'],
    button: {
      text: 'Contact Us',
      link: 'https://example.com/contact', // This will trigger the Modal instead of redirecting
    },
  },
];
