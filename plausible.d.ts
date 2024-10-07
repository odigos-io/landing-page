// plausible.d.ts

interface Plausible {
  (eventName: string, options?: PlausibleOptions): void;
  q?: any[];
}

interface PlausibleOptions {
  props?: {
    [key: string]: any;
  };
  callback?: () => void;
}

interface Window {
  plausible: Plausible;
}
