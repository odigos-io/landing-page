import { Metadata } from 'next';
import theme from '@/style/theme';
import dynamic from 'next/dynamic';
import Markdown from '@/components/Markdown';
import { getAllBlogs } from '@/app/libs/markdown';
import markdownToHtml from '@/app/libs/markdownToHtml';
import RelatedPost from '@/components/Blog/RelatedPost';
import BlogNotFound from '@/components/Blog/BlogNotFound';

type Props = {
  params: { slug: string };
};

const CTASection = dynamic(() => import('@/containers/cta'), { ssr: false });
const BlogPageContent = dynamic(
  () => import('@/containers/blog-page/blog-page-content'),
  { ssr: false }
);
const BlogPageHeader = dynamic(
  () => import('@/containers/blog-page/blog-page-header'),
  { ssr: false }
);
export function generateMetadata({ params }: Props): Metadata {
  const { slug } = params;
  const posts = getAllBlogs(['title', 'date', 'coverImage', 'slug']);

  const post = posts.find((post) => post.slug === slug);

  return {
    metadataBase: new URL('https://odigos.io'),
    title: post?.title,
    keywords: post?.tags,
    icons: '/images/logo/logo.png',
    openGraph: {
      title: post?.title,
      images: [
        {
          url: post?.image,
          width: 1000,
          height: 470,
          alt: post?.title,
        },
      ],
      type: 'article',
    },
  };
}

const SingleBlogPage = async ({ params }: Props) => {
  const { slug } = params;
  const posts = getAllBlogs([
    'title',
    'date',
    'excerpt',
    'coverImage',
    'slug',
    'body',
  ]);

  const post = posts.find((post) => post.slug === slug);
  const content = await markdownToHtml(post?.content || '');

  return content ? (
    <>
      <section
        style={{ background: theme.colors.secondary }}
        className="pt-35 lg:pt-45 xl:pt-35 pb-20 lg:pb-25 xl:pb-30"
      >
        <div className="lg:w-[100%]">
          <div className="animate_top rounded-md shadow-solid-13 p-2.5 md:p-10">
            <BlogPageHeader slug={slug} posts={posts} />
            <BlogPageContent content={post?.content} />
            <RelatedPost />
            <CTASection />
          </div>
        </div>
      </section>
    </>
  ) : (
    <BlogNotFound />
  );
};

export default SingleBlogPage;
