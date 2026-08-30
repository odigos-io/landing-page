export const FAQ = [
  {
    title: 'How does an agent know which function to ask about?',
    description:
      'It does not have to guess from 40,000. Odigos already maps every service, the calls between them and the functions on the path of a request, so the agent narrows the way a person would: the failing endpoint, then the slow span, then the functions inside it. Capture is the last step, on a handful of candidates, not a fishing expedition across the fleet.',
  },
  {
    title: 'Where does the captured data go?',
    description:
      'Wherever you send it. Odigos runs inside your cluster and exports as OpenTelemetry to the destinations you configure, so captured data can stay entirely within your own infrastructure. Values are shaped before they leave: PII masking, attribute deletion and sampling all run in flight, in your cluster.',
  },
  {
    title: 'Who can capture argument values, and how is that audited?',
    description:
      'Capture is a governed action, not a developer convenience. RBAC controls who can request it and on which workloads, policy controls limit what may be captured at all, and every capture is scoped to the workload it was requested for. Teams handling card or patient data typically mask at the source and allow capture only on named services.',
  },
  {
    title: 'Can our agents ask for data nobody set up to collect?',
    description:
      'Yes. That is the point of the platform. An agent (or an engineer) can point at a function, a query, or a service that nobody ever set up to be watched, and Odigos attaches the capture live in running production. The answer comes back in seconds, as OpenTelemetry, with no code change and no redeploy.',
  },
  {
    title: 'Is capturing new data in live production actually safe?',
    description:
      'It runs out of process in eBPF, under 1% CPU. It never loads into your application, so a bad release of ours cannot take your application down with it. What may be captured, and by whom, is governed by RBAC and policy controls, and every capture is scoped to the workload you point it at.',
  },
  {
    title: 'How does Odigos work?',
    description:
      'Odigos runs out-of-process eBPF and starts capturing from every service the moment it comes up. You get distributed traces, metrics, and logs with no code changes and no redeploys. It detects the language of each application and picks the right approach on its own.',
  },
  {
    title: 'Do I need to replace my current APM?',
    description:
      'Not on day one. Odigos runs alongside Datadog, New Relic, Honeycomb, Grafana Cloud, and the open source stack (Jaeger, Tempo, Loki, SigNoz). It captures what they cannot reach. Most teams start there. Many end up replacing them.',
  },
  {
    title: 'Which programming languages are supported?',
    description:
      'Go, Java, Python, .NET, JavaScript, PHP, and Ruby, with more landing constantly, including the compiled runtimes most tools cannot trace.',
  },
  {
    title: 'Does Odigos add performance overhead?',
    description:
      'No. eBPF runs in the kernel, outside your process. CPU impact stays under 1% and added latency is effectively zero, even at high throughput.',
  },
];
