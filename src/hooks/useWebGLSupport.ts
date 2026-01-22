'use client';

import { useState, useEffect } from 'react';

/**
 * Detects if the browser supports WebGL
 * Returns false on server and during initial hydration for safety
 */
export const useWebGLSupport = (): boolean => {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setIsSupported(!!gl);
    } catch {
      setIsSupported(false);
    }
  }, []);

  return isSupported;
};
