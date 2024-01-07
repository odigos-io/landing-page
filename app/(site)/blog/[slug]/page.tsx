import Image from 'next/image';
import RelatedPost from '@/components/Blog/RelatedPost';
import { getAllBlogs } from '@/app/libs/markdown';
import markdownToHtml from '@/app/libs/markdownToHtml';
import { Metadata } from 'next';
import BlogNotFound from '@/components/Blog/BlogNotFound';
import Markdown from '@/components/Markdown';
import FloatingHeader from '@/components/FloatingHeader';

type Props = {
  params: { slug: string };
};

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

const gradientBackground = {
  background: 'linear-gradient(to right, #ff9900, #ff6600)', // Define your gradient here
  WebkitBackgroundClip: 'text',
  color: 'transparent', // Make the text transparent
  display: 'inline-block',
};

const borderGradient = {
  paddingBottom: 16,
  borderImage: 'linear-gradient(to right, #ff9900, #ff6600) 1', // Define your gradient here
  borderImageSlice: '1',
  borderBottom: '2px solid transparent', // Set the border width and make it transparent
};

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

  function renderTags() {
    return post?.tags.map((item) => (
      <h1 style={{ fontSize: 20, fontWeight: 600, ...gradientBackground }}>
        {item}
      </h1>
    ));
  }

  return content ? (
    <>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          position: 'fixed',
          zIndex: 9999,
          top: 50,
        }}
      >
        <FloatingHeader />
      </div>
      <title>{`${post?.title}`}</title>
      <section className="pt-35 lg:pt-45 xl:pt-50 pb-20 lg:pb-25 xl:pb-30">
        <div
          className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0"
          style={{ width: '100%' }}
        >
          <div
            className="flex flex-col-reverse lg:flex-row gap-7.5 xl:gap-12.5"
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              // alignItems: 'center',
            }}
          >
            <div className="lg:w-[100%]">
              <div className="animate_top rounded-md shadow-solid-13 p-2.5 md:p-10">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                  {renderTags()}
                </div>
                <>
                  <h1
                    style={{
                      marginTop: 20,
                      fontSize: '5vh',
                      width: '100%',
                      lineHeight: 1.2,
                      color: '#fff',
                      fontWeight: 700,
                    }}
                  >
                    {post.title}
                  </h1>
                </>
                <h3
                  style={{
                    fontSize: 18,
                    marginBottom: 80,
                    width: '100%',
                    marginTop: 20,
                  }}
                >
                  {post.metadata}
                </h3>
                <div className="mb-10 w-full overflow-hidden ">
                  {post?.image && (
                    <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                      <Image
                        style={{ objectFit: 'contain' }}
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover object-center rounded-md"
                      />
                    </div>
                  )}
                </div>
                <div style={borderGradient}>
                  <div>
                    <div style={{ letterSpacing: 1.1, fontSize: 18 }}>
                      Author
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          gap: 16,
                          fontSize: 20,
                          fontWeight: 600,
                          color: '#fff',
                          alignItems: 'center',
                          marginTop: 12,
                        }}
                      >
                        <img
                          style={{
                            height: 40,
                            width: 40,
                            borderRadius: '100%',
                          }}
                          src={post.authorImage}
                          alt={post.authorImage}
                        />
                        {post?.author}
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginTop: 12,
                          borderLeft: 'solid 2px #474747',
                          height: 40,
                          paddingLeft: 16,
                        }}
                      >
                        {new Date(post?.pubDate)
                          .toDateString()
                          .split(' ')
                          .slice(1)
                          .join(' ')}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="lg:w-[70%] "
                  style={{ marginTop: 48, background: '#060606' }}
                >
                  <Markdown source={post.content} />
                  {/* <div
                    className="blog-details"
                    dangerouslySetInnerHTML={{ __html: content }}
                  /> */}
                </div>
                <div
                  className="lg:w-[65%] font-semibold text-white text-lg"
                  style={{ marginTop: 35 }}
                >
                  If you want to learn more about how you can generate
                  distributed traces instantly check out our GitHub repository.
                  We'd really appreciate it if you could throw us a ⭐👇
                  <br />
                  <a
                    target="_blank"
                    className="underline"
                    href="https://github.com/keyval-dev/odigos"
                  >
                    https://github.com/keyval-dev/odigos
                  </a>
                </div>
                <RelatedPost />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  ) : (
    <BlogNotFound />
  );
};

export default SingleBlogPage;
