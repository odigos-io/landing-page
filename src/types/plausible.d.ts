// plausible.d.ts

interface Plausible {
  (eventName: string, options?: PlausibleOptions): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  q?: any[];
}

interface PlausibleOptions {
  props?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
  callback?: () => void;
}

interface Window {
  plausible: Plausible;
}
