'use client';
import { useEffect, useState, useDebugValue } from 'react';
import isMobile from 'ismobilejs';

export function useIsMobile({
  width = 768,
  customAgent = navigator.userAgent,
} = {}) {
  const [isMobileState, setIsMobile] = useState(
    window.innerWidth <= width ||
      isMobile(customAgent).phone ||
      isMobile(customAgent).tablet
  );

  useEffect(() => {
    function handleResize() {
      if (
        global.window.innerWidth <= width ||
        isMobile(customAgent).phone ||
        isMobile(customAgent).tablet
      ) {
        if (!isMobileState) {
          setIsMobile(true);
        }
      } else if (isMobileState) {
        setIsMobile(false);
      }
    }

    global.window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      global.window.removeEventListener('resize', handleResize);
    };
  });

  useDebugValue('useIsMobile');

  return isMobileState;
}
