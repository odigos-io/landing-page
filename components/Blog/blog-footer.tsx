'use client';
import theme from '@/style/theme';
import { Text } from '@/reuseable-components';
import { calculateReadingTime } from '@/utils';

const BlogFooter = ({ blog }: { blog: any }) => {
  const { tags, content } = blog;

  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
      }}
    >
      <Text color="#f5f5f576" fontFam={theme.font_family.secondary}>
        {tags[0]?.toUpperCase() || 'OBSERVABILITY'}
      </Text>
      <Text color="#f5f5f576" fontFam={theme.font_family.secondary}>
        {'|'}
      </Text>
      <Text color="#f5f5f576" fontFam={theme.font_family.secondary}>
        {`${calculateReadingTime(content)} MIN READ` || ''}
      </Text>
    </div>
  );
};

export default BlogFooter;
