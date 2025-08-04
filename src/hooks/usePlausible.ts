'use client';

import { usePlausible as use } from 'next-plausible';

export const usePlausible = () => {
  const plausible = use();

  const trackClick = (eventName: string) => {
    if (typeof window === 'undefined') return;

    const { origin, pathname } = new URL(window.location.href);

    plausible(eventName, {
      props: {
        conversion: origin + pathname,
      },
    });
  };

  const trackEvent = (eventName: string, options: PlausibleOptions) => {
    if (typeof window === 'undefined') return;

    if (window.plausible) {
      window.plausible(eventName, options);
    } else {
      console.warn('Plausible Analytics is not loaded yet.');
    }
  };

  return {
    trackClick,
    trackEvent,
  };
};
