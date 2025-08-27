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
    title: 'Instant Observability. Zero Engineering Overhead',
    descriptions: ['No source code modification, no redeployment, and no restart.'],
    bullets: [
      '<strong>Metrics, Traces, and Logs:</strong> Get real-time health, performance, and holistic incident analysis',
      '<strong>Full Context Propagation:</strong> End-to-end traces across services, protocols, and infrastructure - even without headers',
      '<strong>Deep Coverage, Any Stack:</strong> Support for modern and legacy environments across all major languages and runtimes',
    ],
    imageSrc: '/assets/renders/product_section_1.png',
  },
  {
    title: 'Automatic Tracing Across All Runtimes',
    descriptions: ['Automatic distributed tracing for hard-to-instrument languages, platforms, and services.'],
    bullets: [
      'eBPF supported auto-instrumented programming languages: <strong>Go, Java, Python, NodeJS, Rust, C++</strong>',
      'Full-stack visibility - Native support <strong>Kubernetes, Virtual Machines & Bare Metal</strong>',
      'eBPF powered tracing for <strong>microservices, monoliths, and databases</strong>',
    ],
    imageSrc: '/assets/renders/product_section_2.png',
  },
  {
    title: 'High-Performance Observability, Powered by eBPF',
    descriptions: ['eBPF-powered tracing that stays out of your process and out of your way.'],
    bullets: [
      '<strong><1% CPU overhead</strong> and virtually zero added latency',
      '<strong>Scales effortlessly</strong> in Kubernetes and bare-metal deployments',
      '<strong>Safe for production usage</strong> without compromising performance',
    ],
    imageSrc: '/assets/renders/product_section_3.png',
  },
  {
    title: 'Odigos Tower: Centralized Control Over Your Fleets',
    descriptions: ['Centrally manage, scale, and govern your entire OpenTelemetry pipeline, without touching your application code.'],
    bullets: ['Apply Instrumentation Policies across organization', 'Centralized Control across all environments (Kubernetes, Virtual Machines, Bare Metal)', 'Centralized authentication and RBAC'],
    imageSrc: '/assets/renders/product_section_4.png',
  },
  {
    title: 'Odigos Data Streams: Take Control of Your Observability',
    descriptions: ['Telemetry configuration made easy. Odigos takes the pain out of OpenTelemetry pipelines.'],
    bullets: [
      '<strong>Enrich & Transform</strong> data with custom attributes, masking, and aggregation',
      '<strong>Smart Sampling:</strong> Control data volume by focusing on relevant data, reducing costs',
      '<strong>Send Anywhere:</strong> Route to any OpenTelemetry-compatible backend, no vendor lock-in',
      '<strong>No Hassle Setup</strong> Configuration via GitOps-friendly YAML or UI',
    ],
    imageSrc: '/assets/renders/product_section_5.png',
  },
  {
    title: 'Odigos Dynamic Rules: Trace the Code That Matters - Dynamically',
    descriptions: ['Trace  your critical workflows without code changes or redeployments.'],
    bullets: [
      '<strong>Real-time Adjustments:</strong> React to changing needs on the fly',
      '<strong>Zero Downtime:</strong> Implement changes without service interruptions',
      '<strong>Effortless Management:</strong> Manage configurations centrally via UI or files',
    ],
    imageSrc: '/assets/renders/product_section_6.png',
  },
];
