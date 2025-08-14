import type { BlogPost } from '@/types';

export const aggregateTags = (
  blogs: BlogPost[],
): {
  tag: string;
  count: number;
}[] => {
  const aggregatedTags: Record<string, number> = {};

  blogs.forEach(({ tags }) => {
    tags?.forEach((tag) => {
      const lowerCased = tag.toLowerCase();

      if (aggregatedTags[lowerCased]) {
        aggregatedTags[lowerCased] += 1;
      } else {
        aggregatedTags[lowerCased] = 1;
      }
    });
  });

  return Object.entries(aggregatedTags)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
};
