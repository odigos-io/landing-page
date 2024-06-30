import BlogItem from '@/components/Blog/BlogItem';
import { getAllBlogs } from '@/app/libs/markdown';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import BlogCover from '@/components/Blog/BlogCover';
import theme from '@/style/theme';

const BlogHero = dynamic(() => import('@/containers/blog/hero'), {
  ssr: false,
});
const CTASection = dynamic(() => import('@/containers/cta'), { ssr: false });

export const metadata: Metadata = {
  metadataBase: new URL('https://odigos.io'),
  title: 'Odigos - Instant Distributed Tracing',
  icons: '/images/logo/logo.png',
  openGraph: {
    title: 'Odigos - Instant Distributed Tracing',
    images: '/images/hero/overview.gif',
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
  ]);

  return (
    <div style={{ background: theme.colors.secondary }}>
      <BlogHero />
      <BlogCover blog={posts[0]} />
      <div
        style={{ padding: '0px 64px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7.5 xl:gap-10"
      >
        {posts.length > 0 &&
          posts.map((post, key) => <BlogItem key={key} blog={post} />)}
      </div>
      <CTASection />
    </div>
  );
};

export default BlogPage;
