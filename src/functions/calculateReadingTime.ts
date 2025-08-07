export const calculateReadingTime = (content: string): string => {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const readingTimeMinutes = words / wordsPerMinute;

  return `${Math.ceil(readingTimeMinutes)} MIN READ`;
};
