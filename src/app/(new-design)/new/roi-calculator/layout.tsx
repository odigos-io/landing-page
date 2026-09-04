import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ROI Calculator | Odigos',
  robots: { index: false, follow: false },
};

export default function NewRoiCalculatorLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
