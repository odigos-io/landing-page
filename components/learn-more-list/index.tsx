import React, { useEffect, useState } from 'react';
import { BlogItem } from '@/reuseable-components';
import styled from 'styled-components';

type Post = {
  slug: string;
  content: string;
  [key: string]: string;
};

const BlogGrid = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  @media (max-width: 1000px) {
    flex-wrap: wrap;
    width: 100%;
  }
`;

const BlogGridItem = styled.div`
  flex: 1 1 442px;
  max-width: 442px;
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
    <BlogGrid>
      {posts.slice(0, 3).map((blog, key) => (
        <BlogGridItem key={key}>
          <BlogItem blog={blog} />
        </BlogGridItem>
      ))}
    </BlogGrid>
  );
};

export default LearnMoreList;
