import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const handleHrefClick = (str: string, router: AppRouterInstance) => {
  if (str.charAt(0) === '/') {
    router.push(str);
  } else {
    window.open(str, '_blank', 'noopener,noreferrer');
  }
};
