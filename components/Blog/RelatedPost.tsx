import React from 'react';
import { getAllBlogs } from '@/app/libs/markdown';
import BlogItem from './BlogItem';

const RelatedPost = async () => {
  // const posts = await getPosts();
  const posts = getAllBlogs([
    'title',
    'date',
    'excerpt',
    'coverImage',
    'slug',
    'body',
  ]);

  function getRandomItemsFromArray(originalArray, numItems) {
    if (numItems >= originalArray.length) {
      return originalArray.slice(); // Return a shallow copy of the original array if numItems is greater or equal to the array's length
    }

    const shuffledArray = originalArray.slice().sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, numItems);
  }

  return (
    <>
      <section style={{ marginBottom: 200 }}>
        <div className="mx-auto max-w-c-1280 px-4 md:px-8 xl:px-0 mt-15 xl:mt-20">
          <h4 className="font-semibold text-2xl text-black dark:text-white mb-7.5">
            Related posts
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7.5 xl:gap-10">
            {posts.length > 0 &&
              getRandomItemsFromArray(posts, 3).map((post, key) => (
                <BlogItem key={key} blog={post} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default RelatedPost;
