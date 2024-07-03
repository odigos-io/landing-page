import React, { useEffect } from 'react';

const useConversionInitiator = () => {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const load = localStorage.getItem('conversion');
    if (!load) {
      const { origin, pathname } = new URL(window.location.href);
      localStorage.setItem('conversion', origin + pathname);
    }
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
};

export default useConversionInitiator;
