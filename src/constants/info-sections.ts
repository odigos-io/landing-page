import { ACTIONS_LINK, BENCHMARKS_LINK, INSTALL_LINK, MULTI_CLUSTER_LINK, SYSTEM_REQUIREMENTS_LINK } from './links';

export const INFO_SECTIONS_1 = [
  {
    title: 'Eliminate Blind Spots Everywhere',
    descriptions: [
      'Odigos captures traces from every service automatically. No code, no coverage gaps. Even hard-to-instrument environments like Go, Rust, C++, and databases are fully visible from day one.',
    ],
    threeDAsset: 'https://prod.spline.design/HxLeZ864BgWEnGgs/scene.splinecode',
    buttonText: 'Deploy Instantly',
    buttonHref: INSTALL_LINK,
  },
  {
    title: 'Blazing Fast, Zero Overhead',
    descriptions: [
      'Using eBPF, Odigos instruments every service with <1% CPU impact with no latency penalties. Built for scale, it runs safely in production without slowing apps down, even in the most demanding, high-throughput environments.',
    ],
    threeDAsset: 'https://prod.spline.design/nqKNxeSS9qMxOg66/scene.splinecode',
    buttonText: 'See Benchmarks',
    buttonHref: BENCHMARKS_LINK,
  },
  {
    title: 'Zero-Code, Full-Stack Observability in Minutes',
    descriptions: ['Leverages eBPF technology to automatically instrument applications without modifying codebases or redeploying services.'],
    threeDAsset: 'https://prod.spline.design/SqXWN3hHsZO4jX5f/scene.splinecode',
    buttonText: 'Explore Insights',
    buttonHref: SYSTEM_REQUIREMENTS_LINK,
  },
  {
    title: 'Multi-Cluster Visibility & Centralized Management',
    descriptions: [
      "Managing observability across multiple Kubernetes clusters shouldn't be painful. Odigos Enterprise includes first-class multi-cluster support, allowing centralized policy management, global observability rollouts, and real-time instrumentation visibility across environments.",
    ],
    threeDAsset: 'https://prod.spline.design/jTFjyYgXvk1UplHI/scene.splinecode',
    buttonText: 'Automate Setup',
    buttonHref: MULTI_CLUSTER_LINK,
  },
  {
    title: 'Flexible Telemetry Pipelines with Odigos Actions',
    descriptions: [
      'Odigos Actions let you enrich, route, and transform telemetry on the fly-without code. Customize pipelines, apply filters, and fan out OTLP data to multiple destinations instantly, all through declarative YAML policies.',
    ],
    threeDAsset: 'https://prod.spline.design/C-LbCsM9zsBwo-oQ/scene.splinecode',
    buttonText: 'Choose Freely',
    buttonHref: ACTIONS_LINK,
  },
];

export const INFO_SECTIONS_2 = [
  {
    title: 'See everything. Change nothing.',
    descriptions: ['No code edits. No redeploys. No restarts. Install Odigos and every service starts reporting.'],
    bullets: [
      '<strong>Metrics, Traces, and Logs:</strong> Real-time health, performance, and full incident analysis',
      '<strong>Full Context Propagation:</strong> End-to-end traces across services, protocols, and infrastructure, even without headers',
      '<strong>Deep Coverage, Any Stack:</strong> Modern and legacy environments, every major language and runtime',
    ],
    imageSrc: '/assets/renders/product_section_1.png',
  },
  {
    title: 'Tracing for the runtimes nobody else can reach.',
    descriptions: ['Automatic distributed tracing for the languages, platforms, and services other tools give up on.'],
    bullets: [
      'eBPF auto-instrumented languages: <strong>Go, Java, Python, NodeJS, Rust, C++</strong>',
      'Native support for <strong>Kubernetes, Virtual Machines & Bare Metal</strong>',
      'eBPF-powered tracing for <strong>microservices, monoliths, and databases</strong>',
    ],
    imageSrc: '/assets/renders/product_section_2.png',
  },
  {
    title: 'Out of your process. Out of your way.',
    descriptions: ['Deep visibility with the overhead of a rounding error.'],
    bullets: [
      '<strong><1% CPU overhead</strong> and virtually zero added latency',
      '<strong>Scales effortlessly</strong> in Kubernetes and bare-metal deployments',
      '<strong>Safe for production</strong> without compromising performance',
    ],
    imageSrc: '/assets/renders/product_section_3.png',
  },
  {
    title: 'Odigos Tower: one control plane for every fleet.',
    descriptions: ['Manage, scale, and govern your entire OpenTelemetry pipeline without touching application code.'],
    bullets: ['Apply instrumentation policies across the organization', 'Centralized control across Kubernetes, Virtual Machines, and Bare Metal', 'Centralized authentication and RBAC'],
    imageSrc: '/assets/renders/product_section_4.png',
  },
  {
    title: 'Odigos Data Streams: your telemetry, your rules.',
    descriptions: ['Shape every signal and send it anywhere. No vendor owns your data again.'],
    bullets: [
      '<strong>Enrich & Transform</strong> data with custom attributes, masking, and aggregation',
      '<strong>Smart Sampling:</strong> Cut data volume and cost by keeping only what matters',
      '<strong>Send Anywhere:</strong> Any OpenTelemetry-compatible backend, zero lock-in',
      '<strong>No Hassle Setup:</strong> GitOps-friendly YAML or UI',
    ],
    imageSrc: '/assets/renders/product_section_5.png',
  },
  {
    title: 'Odigos Dynamic Rules: trace what matters, the moment it matters.',
    descriptions: ['Turn deep tracing on for a critical path in real time. No code changes. No redeploy.'],
    bullets: [
      '<strong>Real-time Adjustments:</strong> React to changing needs on the fly',
      '<strong>Zero Downtime:</strong> Change anything without interrupting a service',
      '<strong>Effortless Management:</strong> Manage it all centrally via UI or files',
    ],
    imageSrc: '/assets/renders/product_section_6.png',
  },
];
