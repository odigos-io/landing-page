import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ROI Calculator | Odigos',
  description:
    'Estimate CPU and cost savings when switching from DataDog, Dynatrace, New Relic, or OTel agents to Odigos.',
  openGraph: {
    title: 'ROI Calculator | Odigos',
    description: 'Estimate CPU and cost savings when switching from DataDog, Dynatrace, New Relic, or OTel agents to Odigos.',
    url: 'https://odigos.io/roi-calculator',
    type: 'website',
    siteName: 'Odigos',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ROI Calculator | Odigos',
    description: 'Estimate CPU and cost savings when switching from DataDog, Dynatrace, New Relic, or OTel agents to Odigos.',
  },
  alternates: {
    canonical: 'https://odigos.io/roi-calculator',
  },
};

export default function RoiCalculatorLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
