import { CAREERS_LINK, DOCS_LINK } from './links';

export const HEADER_HEIGHT_MOBILE = 75;
export const HEADER_HEIGHT_DESKTOP = 91;

interface NavItem {
  label: string;
  href: string;
  iconSrc?: string;
}

export const NAVIGATION: NavItem[] = [
  {
    label: 'Security',
    href: '/security',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Comparisons',
    href: '/comparisons',
  },
  {
    label: 'Pricing',
    href: '/pricing',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: 'Events',
    href: '/events',
  },
  {
    label: 'Careers',
    href: CAREERS_LINK,
  },
  {
    label: 'Documentation',
    href: DOCS_LINK,
  },
  {
    label: 'ROI Calculator',
    href: '/roi-calculator',
  },
];

export interface NavGroup {
  label: string;
  href?: string;
  items?: { label: string; href: string; blurb: string; external?: boolean }[];
}

/* Ten flat items pushed the burger breakpoint out to 1240px. Grouped into
   four, the bar fits on a laptop again. */
export const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Platform',
    items: [
      { label: 'Observability', href: '/observability', blurb: 'Give investigations the evidence they are missing' },
      { label: 'Security', href: '/security', blurb: 'Understand attacks, assess exposure and contain threats' },
      { label: 'Coding Agents', href: '/coding-agents', blurb: 'Investigate production, fix code and verify' },
      { label: 'Technology', href: '/technology', blurb: 'The runtime access behind AI investigations' },
      { label: 'Comparisons', href: '/comparisons', blurb: 'How the approaches differ' },
    ],
  },
  {
    label: 'Pricing',
    items: [
      { label: 'Plans', href: '/pricing', blurb: 'What it costs and what is included' },
      { label: 'ROI calculator', href: '/roi-calculator', blurb: 'What it saves against what you run today' },
    ],
  },
  {
    label: 'Resources',
    items: [
      { label: 'Documentation', href: DOCS_LINK, blurb: 'Install, configure and operate', external: true },
      { label: 'Blog', href: '/blog', blurb: 'eBPF, OpenTelemetry and production debugging' },
      { label: 'Events', href: '/events', blurb: 'Where to find us' },
    ],
  },
  {
    label: 'Company',
    items: [
      { label: 'About', href: '/about', blurb: 'Who we are and what we are building' },
      { label: 'Careers', href: CAREERS_LINK, blurb: 'Open roles', external: true },
    ],
  },
];
