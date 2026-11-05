interface RowItem {
  label: string;
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
      enterprise: true,
    },
    {
      label: 'Odigos Collector Sampling Actions',
      enterprise: true,
    },
    {
      label: 'Odigos Instrumentation Actions',
      enterprise: true,
    },
    {
      label: 'Multi Cluster Distributed Tracing',
      enterprise: true,
    },
    {
      label: 'Kubernetes Tracing',
      enterprise: true,
    },
    {
      label: 'Linux VM/Cloud VM Tracing',
      enterprise: true,
    },
    {
      label: 'Linux Bare Metal Tracing',
      enterprise: true,
    },
  ],
  ebpf: [
    {
      label: 'Go',
      enterprise: true,
    },
    {
      label: 'Java, Python, NodeJS',
      enterprise: true,
    },
    {
      label: '.NET, PHP, Ruby',
      enterprise: true,
    },
    {
      label: 'Custom Instrumentation',
      enterprise: true,
    },
  ],
  databases: [
    {
      label: 'MySQL',
      enterprise: true,
    },
    {
      label: 'Postgres',
      enterprise: true,
    },
    {
      label: 'Oracle',
      enterprise: 'Coming Soon',
    },
    {
      label: 'Multi Cluster Administration',
      enterprise: true,
    },
    {
      label: 'Supported OTEL Instrumentation',
      enterprise: '24/7 Premium',
    },
    {
      label: 'Support',
      enterprise: '24/7 Premium',
    },
  ],
};
