export const DATA = [
  {
    id: 1,
    quest: ' How does Odigos work?',
    ans: 'Odigos combines OpenTelemetry and eBPF to automatically instrument your applications. As soon as you install Odigos you will get distributed traces, metrics and logs. In addition, you will be able to correlate the different signals using features like exemplars. Odigos detects the programming language of every running application and use the best instrumentation technology for this programming language.',
  },
  {
    id: 2,
    quest: 'Do I need to change my current APM?',
    ans: 'No. Odigos works with all the leading vendors (Datadog, New Relic, Honeycomb, Grafana Cloud and many more!) Prefer an open source solution? Odigos supports many of the popular open source tools like Jaeger, Tempo, Loki, Grafana and SigNoz.',
  },
  {
    id: 3,
    quest: 'Which programming languages are supported?',
    ans: 'Java, Python, .NET, Go and JavaScript. We are constantly adding support for more languages.',
  },
  {
    id: 4,
    quest: 'Does Odigos adds performance overhead?',
    ans: 'Odigos instrument applications using eBPF. eBPF is a kernel technology that adds almost zero overhead to the application.',
  },
];
