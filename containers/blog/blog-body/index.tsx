'use client';
import { useEffect, useLayoutEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import BlogCover from '@/components/Blog/BlogCover';
import BlogList from '@/components/Blog/BlogList';

const BlogFilter = dynamic(() => import('@/containers/blog/blogs-filter'));

const BlogBody = ({ posts }) => {
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [filteredPosts, setFilteredPosts] = useState<any>([]);
  const [allData, setAllData] = useState<any>([]);
  useLayoutEffect(() => {
    if (posts && JSON.stringify(posts) !== JSON.stringify(allData)) {
      console.log('re-rendered');
      setAllData(posts);
    }
  }, [posts]);

  useEffect(() => {
    setFilteredPosts(
      selectedItems.length === 0 || selectedItems.includes('EXPLORE ALL')
        ? posts
        : posts.filter((post) =>
            post.tags.some((tag) => selectedItems.includes(tag))
          )
    );
  }, [selectedItems]);

  return (
    <>
      <BlogFilter
        posts={allData}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
      <BlogCover blog={allData[0]} />
      <BlogList posts={filteredPosts} />
    </>
  );
};

export default BlogBody;
