import { Metadata } from 'next';
import theme from '@/style/theme';
import dynamic from 'next/dynamic';
import { getAllBlogs } from '@/app/libs/markdown';
import BlogHero from '@/containers/blog/hero';

const CTASection = dynamic(() => import('@/containers/cta'), { ssr: false });

const BlogBody = dynamic(() => import('@/containers/blog/blog-body'), {
  ssr: false,
});
export const metadata: Metadata = {
  metadataBase: new URL('https://odigos.io'),
  title: 'Odigos - Instant Distributed Tracing',
  icons: '/icons/brand/black-icon.svg',
  openGraph: {
    title: 'Odigos - Instant Distributed Tracing',
    images: '/icons/brand/black-icon.svg',
  },
};

const BlogPage = async () => {
  const posts = getAllBlogs([
    'title',
    'date',
    'excerpt',
    'coverImage',
    'slug',
    'body',
    'tags',
  ]);

  return (
    <div style={{ background: theme.colors.secondary }}>
      <BlogHero />
      <BlogBody posts={posts} />
      <CTASection />
    </div>
  );
};

export default BlogPage;
