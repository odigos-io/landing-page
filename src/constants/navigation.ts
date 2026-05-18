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
    label: 'Product',
    href: '/product',
  },
  {
    label: 'About',
    href: '/about',
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
];
