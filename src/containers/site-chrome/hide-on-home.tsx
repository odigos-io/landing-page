'use client';

import { usePathname } from 'next/navigation';

// Pages that ship their own self-contained light header and footer (the landing
// design system). On these routes the shared dark site chrome is hidden so the
// two don't double up. Everywhere else keeps the shared chrome.
const LIGHT_PREFIXES = ['/about', '/product', '/pricing', '/blog', '/events', '/comparisons', '/roi-calculator'];

const HideOnHome = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname() || '';
  const isLight = pathname === '/' || LIGHT_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  if (isLight) return null;
  return <>{children}</>;
};

export default HideOnHome;
