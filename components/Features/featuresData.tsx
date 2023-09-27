import { Feature } from '@/types/feature';

const featuresData: Feature[] = [
  {
    id: 5,
    icon: '/images/icon/icon-05.svg',
    title: 'No Code Changes',
    description:
      'Get started in minutes, without having to change a single line of code. Just select an observability backend and that`s it',
  },
  {
    id: 2,
    icon: '/images/icon/icon-02.svg',
    title: 'Works On Any Application',
    description:
      'Odigos is the only solution that automatically instruments compiled languages (like Go)',
  },
  {
    id: 4,
    icon: '/images/icon/icon-01.svg',
    title: 'Observability By Default',
    description:
      'Automatically get traces, metrics and logs for every new deployed application. No more blind spots',
  },
  {
    id: 3,
    icon: '/images/icon/icon-03.svg',
    title: 'Open Source',
    description:
      'Odigos is developed together with the community. Parts of Odigos are contributed to OpenTelemetry and eBPF',
  },
  {
    id: 1,
    icon: '/images/icon/icon-04.svg',
    title: 'Boost Your Existing Tools',
    description:
      'Odigos supports the leading vendors and open source backends. Keep using the tools you use today, with higher-quality data',
  },
  {
    id: 6,
    icon: '/images/icon/icon-06.svg',
    title: 'Collectors Management',
    description:
      'Scale the number of collectors based on the traffic of your applications. No need to manage complex collectors topology',
  },
];

export default featuresData;
