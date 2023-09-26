import Image from 'next/image';
import { getPost, imageBuilder } from '@/sanity/sanity-utils';
import { PortableText } from '@portabletext/react';
import SharePost from '@/components/Blog/SharePost';
import RelatedPost from '@/components/Blog/RelatedPost';
import { getAllBlogs } from '@/app/libs/markdown';
import markdownToHtml from '@/app/libs/markdownToHtml';

type Props = {
  params: { slug: string };
};

const SingleBlogPage = async ({ params }: Props) => {
  const { slug } = params;
  // const post = await getPost(slug);
  const posts = getAllBlogs([
    'title',
    'date',
    'excerpt',
    'coverImage',
    'slug',
    'body',
  ]);

  const post = posts.find((post) => post.slug === slug);

  const content = await markdownToHtml(post.content || '');

  return (
    <>
      <title>{`${post?.title} - Solid`}</title>
      <section className="pt-35 lg:pt-45 xl:pt-50 pb-20 lg:pb-25 xl:pb-30">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex flex-col-reverse lg:flex-row gap-7.5 xl:gap-12.5">
            <div className="md:w-1/2 lg:w-[20%]">
              <div className="animate_top rounded-md shadow-solid-13 bg-white dark:bg-blacksection border border-stroke dark:border-strokedark p-3.5 mb-10">
                <form
                  action="https://formbold.com/s/unique_form_id"
                  method="POST"
                >
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search Here..."
                      className="w-full dark:bg-black border border-stroke dark:border-strokedark shadow-solid-12 dark:shadow-none rounded-lg focus:outline-none focus:border-primary dark:focus:border-primary py-4 px-6"
                    />

                    <button
                      className="absolute top-0 right-0 p-5"
                      aria-label="search-icon"
                    >
                      <svg
                        className="fill-black dark:fill-white hover:fill-primary dark:hover:fill-primary transition-all duration-300"
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M16.031 14.617L20.314 18.899L18.899 20.314L14.617 16.031C13.0237 17.3082 11.042 18.0029 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18.0029 11.042 17.3082 13.0237 16.031 14.617ZM14.025 13.875C15.2941 12.5699 16.0029 10.8204 16 9C16 5.132 12.867 2 9 2C5.132 2 2 5.132 2 9C2 12.867 5.132 16 9 16C10.8204 16.0029 12.5699 15.2941 13.875 14.025L14.025 13.875Z" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>

              <div className="animate_top rounded-md shadow-solid-13 bg-white dark:bg-blacksection border border-stroke dark:border-strokedark p-9 mb-10">
                <h4 className="font-semibold text-2xl text-black dark:text-white mb-7.5">
                  Categories
                </h4>

                <ul>
                  <li className="last:mb-0 mb-3 transition-all duration-300 hover:text-primary">
                    <a href="#">Blog</a>
                  </li>
                  <li className="last:mb-0 mb-3 transition-all duration-300 hover:text-primary">
                    <a href="#">Events</a>
                  </li>
                  <li className="last:mb-0 mb-3 transition-all duration-300 hover:text-primary">
                    <a href="#">Grids</a>
                  </li>
                  <li className="last:mb-0 mb-3 transition-all duration-300 hover:text-primary">
                    <a href="#">News</a>
                  </li>
                  <li className="last:mb-0 mb-3 transition-all duration-300 hover:text-primary">
                    <a href="#">Rounded</a>
                  </li>
                </ul>
              </div>

              <RelatedPost />
            </div>

            <div className="lg:w-[80%]">
              <div className="animate_top rounded-md shadow-solid-13 bg-white dark:bg-blacksection border border-stroke dark:border-strokedark p-7.5 md:p-10">
                <div className="mb-10 w-full overflow-hidden ">
                  {post?.image && (
                    <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                      <Image
                        src={post.image.replace('~/assets/images', '')}
                        alt={post.title}
                        fill
                        className="object-cover object-center rounded-md"
                      />
                    </div>
                  )}
                </div>

                <h2 className="font-semibold text-3xl 2xl:text-sectiontitle2 text-black dark:text-white mt-11 mb-5">
                  {post.title}
                </h2>

                <ul className="flex flex-wrap gap-5 2xl:gap-7.5 mb-9">
                  <li>
                    <span className="text-black dark:text-white">Author: </span>{' '}
                    {post?.author}
                  </li>
                  <li>
                    <span className="text-black dark:text-white">
                      Published On:{' '}
                    </span>{' '}
                    {new Date(post?.pubDate)
                      .toDateString()
                      .split(' ')
                      .slice(1)
                      .join(' ')}
                  </li>
                  <li>
                    <span className="text-black dark:text-white">
                      Category:{' '}
                    </span>{' '}
                    {post?.tags ? post?.tags[0] : 'Not added'}
                  </li>
                </ul>

                <div className="w-full ">
                  <div
                    className="blog-details"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                </div>

                <SharePost />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleBlogPage;
