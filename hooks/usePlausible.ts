'use client';
import { useCallback } from 'react';

export const usePlausible = () => {
  const trackEvent = useCallback((eventName, options) => {
    if (window.plausible) {
      window.plausible(eventName, options);
    } else {
      console.warn('Plausible Analytics is not loaded yet.');
    }
  }, []);

  return trackEvent;
};
