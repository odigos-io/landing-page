export const FAQ = [
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
