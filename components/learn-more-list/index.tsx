import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GridContainer } from '@/style';
import BlogItem from '../blog/blog-item';

type Post = {
  slug: string;
  content: string;
  [key: string]: string;
};

const BlogGrid = styled(GridContainer)`
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

const BlogGridItem = styled.div`
  @media (max-width: 1000px) {
    flex: 1 1 100%;
    max-width: 100%;
  }
`;

const LearnMoreList = async () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/posts?type=post');
      const data = await res.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <BlogGrid gap={24}>
      {posts.slice(0, 3).map((blog, key) => (
        <BlogGridItem key={key}>
          <BlogItem blog={blog} />
        </BlogGridItem>
      ))}
    </BlogGrid>
  );
};

export default LearnMoreList;
