'use client';
import BlogFilter from '../blogs-filter';
import { useEffect, useState } from 'react';
import BlogList from '@/components/blog/BlogList';
import BlogCover from '@/components/blog/BlogCover';

const BlogBody = ({ posts }) => {
  const [selectedItems, setSelectedItems] = useState<any>(['EXPLORE ALL']);
  const [filteredPosts, setFilteredPosts] = useState<any>([]);

  useEffect(() => {
    setFilteredPosts(
      selectedItems.length === 0 || selectedItems.includes('EXPLORE ALL')
        ? posts
        : posts.filter((post) =>
            post.tags.some((tag) => selectedItems.includes(tag))
          )
    );
  }, [selectedItems]);

  const handleSetSelectedItems = (items) => {
    if (items.length === 0) {
      setSelectedItems(['EXPLORE ALL']);
      return;
    }

    if (items.includes('EXPLORE ALL') && items.length > 1) {
      items = items.filter((item) => item !== 'EXPLORE ALL');
    }
    setSelectedItems(items);
  };

  return (
    <>
      <BlogFilter
        posts={posts}
        selectedItems={selectedItems}
        setSelectedItems={handleSetSelectedItems}
      />
      <BlogCover blog={posts[0]} />
      <BlogList posts={filteredPosts} />
    </>
  );
};

export default BlogBody;
