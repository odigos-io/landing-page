export const FAQ = [
  {
    title: 'How does Odigos work?',
    description:
      'Odigos combines OpenTelemetry and eBPF to automatically instrument your applications. As soon as you install Odigos you will get distributed traces, metrics and logs. In addition, you will be able to correlate the different signals using features like exemplars. Odigos detects the programming language of every running application and use the best instrumentation technology for this programming language.',
  },
  {
    title: 'Do I need to change my current APM?',
    description:
      'No. Odigos works with all the leading vendors (Datadog, New Relic, Honeycomb, Grafana Cloud and many more!) Prefer an open source solution? Odigos supports many of the popular open source tools like Jaeger, Tempo, Loki, Grafana and SigNoz.',
  },
  {
    title: 'Which programming languages are supported?',
    description: 'Java, Python, .NET, Go, JavaScript, PHP and Ruby. We are constantly adding support for more languages.',
  },
  {
    title: 'Does Odigos adds performance overhead?',
    description: 'Odigos instruments applications using eBPF. eBPF is a kernel technology that adds almost zero overhead to the application.',
  },
];
