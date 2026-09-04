import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ROI Calculator | Odigos',
  description:
    'Estimate CPU and cost savings when switching from DataDog, Dynatrace, New Relic, or OTel agents to Odigos.',
  alternates: {
    canonical: 'https://odigos.io/roi-calculator',
  },
};

export default function RoiCalculatorLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
