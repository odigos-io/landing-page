import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GridContainer } from '@/style';
import { BlogItem } from '../blogs';

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

const LearnMoreList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts?type=post');

        // Check if the response is OK (status code 200-299)
        if (!res.ok) {
          console.error('Failed to fetch posts:', res.statusText);
          return;
        }

        // Check if the response has content to parse
        const text = await res.text();
        if (!text) {
          console.error('Response is empty');
          return;
        }

        // Parse the JSON content
        const data = JSON.parse(text);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
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
