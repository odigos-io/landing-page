import Image from 'next/image';
import markdownToHtml from '@/app/libs/markdownToHtml';
import BlogNotFound from '@/components/Blog/BlogNotFound';

type Props = {
  slug: string;
  posts: any;
};

const gradientBackground = {
  background: 'linear-gradient(to right, #ff9900, #ff6600)', // Define your gradient here
  WebkitBackgroundClip: 'text',
  color: 'transparent', // Make the text transparent
  display: 'inline-block',
};

const BlogPageHeader = async ({ slug, posts }: Props) => {
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
        </div>
      </div>
    </>
  ) : (
    <BlogNotFound />
  );
};

export default BlogPageHeader;
