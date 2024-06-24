import { useState, useEffect } from 'react';

const useIsMobile = (limit: number = 756): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const userAgent =
      typeof window !== 'undefined' ? window.navigator.userAgent : '';
    const mobileRegex =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    const isMobileUserAgent = mobileRegex.test(userAgent);

    const handleResize = () => {
      const isMobileScreen = window.innerWidth <= limit; // You can adjust the width threshold as needed

      setIsMobile(isMobileUserAgent || isMobileScreen);
    };

    handleResize(); // Initial check

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
