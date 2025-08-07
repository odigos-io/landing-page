'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const DEFAULT_LIMIT = 992;
const INITIAL_STATE = {
  isMobile: true,
  screenWidth: 0,
};

const MobileContext = createContext<typeof INITIAL_STATE>(INITIAL_STATE);

const MobileProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState(INITIAL_STATE.isMobile);
  const [screenWidth, setScreenWidth] = useState(INITIAL_STATE.screenWidth);

  useEffect(() => {
    const handleResize = () => {
      const isMobileUserAgent = typeof window !== 'undefined' ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent) : false;

      const isMobileScreen = window.innerWidth <= DEFAULT_LIMIT;

      setIsMobile(isMobileUserAgent || isMobileScreen);
      setScreenWidth(window.innerWidth);
    };

    handleResize(); // Initial check

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <MobileContext.Provider value={{ isMobile, screenWidth }}>{screenWidth > 0 ? children : null}</MobileContext.Provider>;
};

const useMobile = () => {
  const context = useContext(MobileContext);
  if (!context) {
    throw new Error('useMobile must be used within a MobileProvider');
  }
  return context;
};

export { useMobile };
export default MobileProvider;
