'use client';
import BlogItem from '@/components/Blog/BlogItem';
import styled from 'styled-components';

const BlogItemsContainer = styled.div`
  padding: 0 64px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(341px, 1fr));
  gap: 24px;
  @media (width < 768px) {
    padding: 0px 20px 48px 20px;
  }
`;

const BlogList = async ({ posts }) => {
  return (
    <BlogItemsContainer>
      {posts.length > 0 &&
        posts.map((post, key) => <BlogItem key={key} blog={post} />)}
    </BlogItemsContainer>
  );
};

export default BlogList;
