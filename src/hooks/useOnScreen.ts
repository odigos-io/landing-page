import { useState, useEffect, useRef } from 'react';

export const useOnScreen = <T extends Element>(threshold = 0.1, rootMargin = '0px') => {
  const visibleRef = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold, rootMargin });

    if (visibleRef.current) observer.observe(visibleRef.current);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (visibleRef.current) observer.unobserve(visibleRef.current);
    };
  }, [visibleRef, threshold, rootMargin]);

  return { visibleRef, isVisible };
};
