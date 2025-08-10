import { useState, useEffect, useRef } from 'react';

// threshold
//   Description: Controls when the intersection callback fires based on how much of the target element is visible.
//   Type: number or number[] (between 0.0 and 1.0)
//   How it works:
//     0.0 (default): Callback fires as soon as any part of the element becomes visible
//     0.5: Callback fires when 50% of the element is visible
//     1.0: Callback fires only when 100% of the element is visible
//     [0, 0.5, 1.0]: Callback fires at multiple thresholds (0%, 50%, and 100% visibility)

// rootMargin
//   Description: Expands or shrinks the root's bounding box before calculating intersections. Think of it as adding "padding" around the viewport.
//   Type: string (CSS margin syntax)
//   How it works:
//     '0px' (default): No margin, uses actual viewport bounds
//     '50px': Adds 50px padding on all sides (triggers 50px before element enters viewport)
//     '-50px': Shrinks bounds by 50px (triggers 50px after element enters viewport)
//     '50px 0px -50px 0px': Different margins for top, right, bottom, left

export const useOnScreen = <T extends Element>(threshold = 0.0, rootMargin = '0px') => {
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
