export const DATA = [
  {
    plan: 'Open Source',
    icon: '/images/pricing/free.svg',
    description: 'Zero-code distributed tracing.',
    priceTitle: 'always',
    price: 'Free',
    isBeta: false,
    features: [
      'Support for Java, Python, Go, .NET, and NodeJS applications',
      'Kubernetes environment',
      'Local UI for a single cluster',
      'Community Support',
    ],
    button: {
      text: 'Go to GitHub',
      link: 'https://github.com/odigos-io',
    },
  },
  {
    icon: '/images/pricing/pro.svg',
    plan: 'Pro',
    status: 'Open Beta',
    description: 'Multiple clusters and teams.',
    priceTitle: '',
    price: 'COMING SOON',
    isBeta: true,
    features: [
      'Control instrumentation in runtime',
      'Virtual Machines, Bare Metal, and serverless environments',
      'Multi Cluster management',
      'Business Hours Support',
    ],
    button: {
      text: 'Contact Us',
      link: 'https://app.odigos.io/signin',
    },
  },
  {
    icon: '/images/pricing/enterprise.svg',
    plan: 'Enterprise',
    description: 'Mission critical distributed tracing.',
    cta: 'Figure it out together',
    priceTitle: 'Figure it out together',
    price: "Let's Talk!",
    isBeta: false,
    features: [
      'eBPF-based instrumentation for additional programming languages',
      'Enterprise-grade performance',
      'Support for legacy applications',
      '24/7 Premium Support',
    ],
    button: {
      text: 'Contact Us',
      link: 'https://example.com/contact',
    },
  },
];
