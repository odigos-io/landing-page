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

export const getPlaceholderImage = () => {
  return PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)];
};
