'use client';
import Markdown from '@/components/Markdown';
import styled from 'styled-components';

type Props = {
  content: string;
};

const BlogPageContentContainer = styled.div`
  display: flex;
  padding: 120px 260px 200px 260px;
  flex-direction: column;
  align-items: flex-start;
  gap: 64px;
`;

const BlogPageContent = ({ content }: Props) => {
  return (
    <BlogPageContentContainer>
      <Markdown source={content} />
    </BlogPageContentContainer>
  );
};

export default BlogPageContent;
