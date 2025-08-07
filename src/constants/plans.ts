interface RowItem {
  label: string;
  oss: boolean | string;
  enterprise: boolean | string;
}

export const PLANS: {
  base: RowItem[];
  ebpf: RowItem[];
  databases: RowItem[];
} = {
  base: [
    {
      label: 'Zero-Code OTEL Tracing',
      oss: true,
      enterprise: true,
    },
    {
      label: 'Odigos Collector Sampling Actions',
      oss: true,
      enterprise: true,
    },
    {
      label: 'Odigos Instrumentation Actions',
      oss: true,
      enterprise: true,
    },
    {
      label: 'Multi Cluster Distributed Tracing',
      oss: true,
      enterprise: true,
    },
    {
      label: 'Kubernetes Tracing',
      oss: true,
      enterprise: true,
    },
    {
      label: 'Linux VM/Cloud VM Tracing',
      oss: false,
      enterprise: true,
    },
    {
      label: 'Linux Bare Metal Tracing',
      oss: false,
      enterprise: true,
    },
  ],
  ebpf: [
    {
      label: 'Go',
      oss: true,
      enterprise: true,
    },
    {
      label: 'Java, Python, NodeJS',
      oss: 'OTEL Based',
      enterprise: true,
    },
    {
      label: '.NET, PHP, Ruby',
      oss: 'OTEL Based',
      enterprise: 'Coming Soon',
    },
    {
      label: 'Custom Instrumentation',
      oss: 'DIY',
      enterprise: 'Coming Soon',
    },
  ],
  databases: [
    {
      label: 'MySQL',
      oss: false,
      enterprise: true,
    },
    {
      label: 'Postgres',
      oss: false,
      enterprise: true,
    },
    {
      label: 'Oracle',
      oss: false,
      enterprise: 'Coming Soon',
    },
    {
      label: 'Multi Cluster Administration',
      oss: false,
      enterprise: 'Coming Soon',
    },
    {
      label: 'Supported OTEL Instrumentation',
      oss: 'DIY',
      enterprise: '24/7 Premium',
    },
    {
      label: 'Support',
      oss: 'Odigos Community Support',
      enterprise: '24/7 Premium',
    },
  ],
};
