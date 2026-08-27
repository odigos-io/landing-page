export const FAQ = [
  {
    title: 'Can our own agents ask Odigos for data that was never instrumented?',
    description:
      'Yes. That is the point of the platform. An agent (or an engineer) can point at a function, a query, or a service that nobody instrumented ahead of time, and Odigos attaches the capture live in running production. The answer comes back in seconds, as OpenTelemetry, with no code change and no redeploy.',
  },
  {
    title: 'Is capturing new data in live production actually safe?',
    description:
      'It runs out of process in eBPF, under 1% CPU, so it cannot take your application down the way an in-process agent can. What may be captured, and by whom, is governed by RBAC and policy controls, and every capture is scoped to the workload you point it at.',
  },
  {
    title: 'How does Odigos work?',
    description:
      'Odigos uses out-of-process eBPF to instrument every running service the moment it starts. You get distributed traces, metrics, and logs with no code changes and no redeploys. It detects the language of each application and applies the right instrumentation automatically.',
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
