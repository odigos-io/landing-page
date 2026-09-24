export interface ComparisonLanguage {
  name: string;
  icon: string;
  odigos: boolean | string;
  competitor: boolean | string;
}

export interface ComparisonPillar {
  name: string;
  tagline: string;
  description: string;
  docsUrl?: string;
  docsLabel?: string;
  secondaryDocsUrl?: string;
  secondaryDocsLabel?: string;
  points: { title: string; body: string; icon: string }[];
}

export interface ComparisonMatrixRow {
  feature: string;
  odigos: boolean | string;
  competitor: boolean | string;
}

export interface ComparisonPage {
  slug: string;
  href: string;
  competitorName: string;
  competitorShort: string;
  title: string;
  subtitle: string;
  description: string;
  logos: { src: string; alt: string }[];
  libraryLanguages: ComparisonLanguage[];
  odigos: ComparisonPillar;
  competitor: ComparisonPillar;
  matrixIntro: string;
  matrix: ComparisonMatrixRow[];
}

export const COMPARISONS: ComparisonPage[] = [
  {
    slug: 'odigos-vs-obi',
    href: '/comparisons/odigos-vs-obi',
    competitorName: 'OpenTelemetry eBPF Instrumentation (OBI)',
    competitorShort: 'OBI',
    title: 'Odigos vs OBI',
    subtitle: 'Deep library-level eBPF across languages vs network tracing with limited Go-library support',
    description:
      'Compare Odigos userspace eBPF instrumentation with OpenTelemetry eBPF Instrumentation (OBI). OBI offers language-agnostic protocol tracing plus a small set of Go library probes, Odigos adds deep library-level coverage for Go, Java, and custom code.',
    logos: [
      { src: '/assets/odigos/logo_white.svg', alt: 'Odigos' },
      { src: '/assets/opentelemetry.svg', alt: 'OpenTelemetry' },
    ],
    libraryLanguages: [
      {
        name: 'Go',
        icon: '/assets/icons/comparisons/languages/go.svg',
        odigos: true,
        competitor: true,
      },
      {
        name: 'Java',
        icon: '/assets/icons/comparisons/languages/java.png',
        odigos: true,
        competitor: false,
      },
      {
        name: 'Python',
        icon: '/assets/icons/comparisons/languages/python.svg',
        odigos: true,
        competitor: false,
      },
      {
        name: 'Node.js',
        icon: '/assets/icons/comparisons/languages/nodejs.svg',
        odigos: true,
        competitor: false,
      },
      {
        name: 'C++',
        icon: '/assets/icons/comparisons/languages/cpp.svg',
        odigos: true,
        competitor: false,
      },
      {
        name: 'Ruby',
        icon: '/assets/icons/comparisons/languages/ruby.svg',
        odigos: true,
        competitor: false,
      },
      {
        name: '.NET',
        icon: '/assets/icons/comparisons/languages/dotnet.svg',
        odigos: true,
        competitor: false,
      },
      {
        name: 'PHP',
        icon: '/assets/icons/comparisons/languages/php.svg',
        odigos: true,
        competitor: false,
      },
    ],
    odigos: {
      name: 'Odigos',
      tagline: 'Application-level eBPF platform',
      description: 'Instrument real application and library functions at runtime, across Go, Java, Python, Node.js, C++, Ruby, .NET, PHP, and custom code. No code changes or restarts required.',
      points: [
        {
          title: 'Broad library-level probes',
          body: '30+ Go libraries and 60+ Java libraries via uprobes, not just syscalls or network flows.',
          icon: '/assets/icons/comparisons/probe.svg',
        },
        {
          title: 'OSS and Custom Code Support',
          body: 'Instrument custom code live, no redeploys or importing SDKs.',
          icon: '/assets/icons/comparisons/code.svg',
        },
        {
          title: 'Encrypted Traffic & mesh-aware',
          body: 'TLS context propagation across load balancers, service mesh, and managed hops, not just direct app-to-app HTTPS.',
          icon: '/assets/icons/comparisons/lock.svg',
        },
        {
          title: 'Automated OpenTelemetry Pipeline + AI Native',
          body: 'Managed OTEL collectors, RBAC, SSO, built-in MCP Server, and live OTTL.',
          icon: '/assets/icons/comparisons/pipeline.svg',
        },
      ],
    },
    competitor: {
      name: 'OBI',
      tagline: 'Network eBPF + limited Go library probes',
      description:
        'Language-agnostic protocol and syscall tracing, with library-level uprobes limited to a small set of Go libraries. No Java library-level instrumentation.',
      docsUrl: 'https://opentelemetry.io/docs/zero-code/obi/',
      docsLabel: 'OpenTelemetry OBI docs',
      secondaryDocsUrl: 'https://github.com/open-telemetry/opentelemetry-ebpf-instrumentation/blob/main/SUPPORT_MATRIX.md#go-library-instrumentation',
      secondaryDocsLabel: 'OBI Go library support matrix',
      points: [
        {
          title: 'Go library probes only',
          body: 'Library-level instrumentation for ~13 Go libraries.',
          icon: '/assets/icons/comparisons/network.svg',
        },
        {
          title: 'No Java library-level instrumentation',
          body: 'Java coverage stays at protocol/network and runtime metrics, no library uprobes.',
          icon: '/assets/icons/comparisons/shallow.svg',
        },
        {
          title: 'Limited TLS context propagation',
          body: 'Can monitor encrypted traffic, but context propagation needs OBI on both ends, or Go TLS. Load balancers, service mesh, and managed hops still break the chain.',
          icon: '/assets/icons/comparisons/lock-off.svg',
        },
        {
          title: 'Instrumentation only',
          body: 'No pipeline management, RBAC/SSO, or MCP Server.',
          icon: '/assets/icons/comparisons/agent.svg',
        },
      ],
    },
    matrixIntro: 'Detailed capability comparison for production observability',
    matrix: [
      {
        feature: 'Library-level Go instrumentation',
        odigos: '30+ libraries',
        competitor: '~13 libraries',
      },
      {
        feature: 'Library-level Java instrumentation',
        odigos: '60+ libraries',
        competitor: false,
      },
      {
        feature: 'Custom code instrumentation without code changes',
        odigos: true,
        competitor: false,
      },
      {
        feature: 'CPU and memory profiling',
        odigos: true,
        competitor: false,
      },
      {
        feature: 'MCP server & dynamic instrumentation / sampling',
        odigos: true,
        competitor: false,
      },
      {
        feature: 'Load-balancer / service mesh context propagation',
        odigos: true,
        competitor: false,
      },
      {
        feature: 'Encrypted traffic monitoring',
        odigos: true,
        competitor: true,
      },
      {
        feature: 'TLS context propagation',
        odigos: 'Across LB, mesh, and managed hops',
        competitor: 'OBI end-to-end, or Go TLS only',
      },
      {
        feature: 'Kafka producer/consumer message body capture',
        odigos: true,
        competitor: false,
      },
      {
        feature: 'Code attributes (stack traces, line numbers)',
        odigos: true,
        competitor: false,
      },
      {
        feature: 'Custom HTTP headers, requests & responses',
        odigos: true,
        competitor: false,
      },
      {
        feature: 'Internal DB spans (locks, unlocks, etc.)',
        odigos: true,
        competitor: false,
      },
      {
        feature: 'Full RBAC and SSO through a UI',
        odigos: true,
        competitor: false,
      },
      {
        feature: 'Automatic OpenTelemetry pipeline management',
        odigos: true,
        competitor: false,
      },
      {
        feature: 'JVM Metrics',
        odigos: true,
        competitor: true,
      },
      {
        feature: 'Log Capture',
        odigos: true,
        competitor: true,
      },
    ],
  },
];

export const getComparisonBySlug = (slug: string) => COMPARISONS.find((c) => c.slug === slug);
