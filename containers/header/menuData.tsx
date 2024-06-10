import { Menu } from '@/types/menu';

const menuData: Menu[] = [
  {
    id: 1,
    title: 'About',
    newTab: false,
    path: '/about',
  },

  {
    id: 2.1,
    title: 'Blog',
    newTab: false,
    path: '/blog',
  },

  {
    id: 4,
    title: 'Pricing',
    newTab: false,
    path: '/pricing',
  },
  {
    id: 5,
    title: 'Documentation',
    newTab: true,
    path: 'https://docs.odigos.io',
  },
];

export default menuData;
