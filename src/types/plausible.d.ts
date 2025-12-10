// plausible.d.ts

interface Plausible {
  (eventName: string, options?: PlausibleOptions): void;
  q?: unknown[];
}

interface PlausibleOptions {
  props?: {
    [key: string]: unknown;
  };
  callback?: () => void;
}

interface Window {
  plausible: Plausible;
}
