import BlogItem from '@/components/Blog/BlogItem';
import { Metadata } from 'next';
import { getAllBlogs } from '@/app/libs/markdown';
import SectionHeader from '@/components/Common/SectionHeader';

export const metadata: Metadata = {
  title: 'Blog Page - Solid SaaS Boilerplate',
  description: 'This is Blog page for Solid Pro',
  // other metadata
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
    <>
      {/* <!-- ===== Blog Grid Start ===== --> */}
      <div style={{ marginTop: 200 }}>
        {/* <!-- Section Title Start --> */}
        <div className="animate_top text-center mx-auto">
          <SectionHeader
            headerInfo={{
              title: `NEWS & BLOGS`,
              subtitle: `Latest News & Blogs`,
              description: `Welcome to Odigos blog where we write about distributed tracing, OpenTelemetry, eBPF, performance and company culture.`,
            }}
          />
        </div>
        {/* <!-- Section Title End --> */}
      </div>
      <section style={{ marginBottom: 200 }}>
        <div className="mx-auto max-w-c-1280 px-4 md:px-8 xl:px-0 mt-15 xl:mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7.5 xl:gap-10">
            {posts.length > 0 &&
              posts.map((post, key) => <BlogItem key={key} blog={post} />)}
          </div>
        </div>
      </section>
      {/* <!-- ===== Blog Grid End ===== --> */}
    </>
  );
};

export default BlogPage;
