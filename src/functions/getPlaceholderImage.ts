export const isValidImageSrc = (src: string) => src.startsWith('/') || src.startsWith('http://') || src.startsWith('https://');

const PLACEHOLDERS = [
  '/assets/blogs/_placeholder_01.svg',
  '/assets/blogs/_placeholder_02.svg',
  '/assets/blogs/_placeholder_03.svg',
  '/assets/blogs/_placeholder_04.svg',
  '/assets/blogs/_placeholder_05.svg',
  '/assets/blogs/_placeholder_06.svg',
  '/assets/blogs/_placeholder_07.svg',
  '/assets/blogs/_placeholder_08.svg',
  '/assets/blogs/_placeholder_09.svg',
  '/assets/blogs/_placeholder_10.svg',
];

// Deterministic per seed (e.g. slug) so server and client render the same image
// and hydration doesn't mismatch.
export const getPlaceholderImage = (seed = '') => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return PLACEHOLDERS[hash % PLACEHOLDERS.length];
};
