'use client';

import { usePlausible as use } from 'next-plausible';

export const usePlausible = () => {
  const plausible = use();

  const trackClick = (eventName: string) => {
    const { origin, pathname } = new URL(window.location.href);

    plausible(eventName, {
      props: {
        conversion: origin + pathname,
      },
    });
  };

  const trackEvent = (eventName: string, options: PlausibleOptions) => {
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
