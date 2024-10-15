import { Metadata } from 'next';
import theme from '@/style/theme';
import dynamic from 'next/dynamic';
import { BlogNotFound } from '@/components';
import { getAllBlogs } from '@/app/libs/markdown';
import markdownToHtml from '@/app/libs/markdownToHtml';
import HubSpotForm from '@/components/forms/HubSpotForm';

type Props = {
  params: { slug: string };
};

const CTASection = dynamic(() => import('@/containers/cta'), { ssr: false });
const RelatedPosts = dynamic(
  () => import('@/containers/blog-page/related-post')
);
const BlogPageContent = dynamic(
  () => import('@/containers/blog-page/blog-page-content')
);
const BlogPageHeader = dynamic(
  () => import('@/containers/blog-page/blog-page-header'),
  { ssr: false }
);
export function generateMetadata({ params }: Props): Metadata {
  const { slug } = params;
  const posts = getAllBlogs(['title', 'date', 'coverImage', 'slug']);

  const post = posts.find((post) => post.slug === slug);
  //random number 1-6
  const random = Math.floor(Math.random() * 6) + 1;
  const url = `/images/blogs-cover-png/odigos_blog${random}.png`;

  return {
    metadataBase: new URL('https://odigos.io'),
    title: post?.title,
    keywords: post?.tags,
    description: post?.description,
    icons: '/icons/brand/icon-png.png',
    openGraph: {
      title: post?.title,
      images: [
        {
          url,
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

  const isKubeCon =
    post.title ===
    'Join Odigos at KubeCon + CloudNativeCon North America 2024! ';
  return content ? (
    <>
      <section style={{ background: theme.colors.secondary }} className="pt-25">
        <BlogPageHeader post={post} />
        <BlogPageContent post={post} />
        {isKubeCon && <HubSpotForm />}
        <RelatedPosts posts={posts} />
        <CTASection />
      </section>
    </>
  ) : (
    <BlogNotFound />
  );
};

export default SingleBlogPage;
