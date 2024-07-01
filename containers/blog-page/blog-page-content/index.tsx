'use client';
import Markdown from '@/components/Markdown';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

type Props = {
  post: any;
};
const ShareButtons = dynamic(
  () => import('@/containers/blog-page/blog-page-share'),
  { ssr: false }
);

const BlogPageContentContainer = styled.div`
  display: flex;
  padding: 120px 260px 200px 260px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 64px;
  @media (width < 1400px) {
    padding: 40px 40px 120px 40px;
    gap: 48px;
  }
  @media (width < 800px) {
    padding: 40px 20px 120px 20px;
    gap: 48px;
  }
`;

const MarkdownWrapper = styled.div`
  max-width: 1000px;
  width: 100%;
`;

const BlogPageContent = ({ post }: Props) => {
  return (
    <BlogPageContentContainer>
      <MarkdownWrapper>
        <Markdown source={post.content} />
        <ShareButtons link={post.slug} />
      </MarkdownWrapper>
    </BlogPageContentContainer>
  );
};

export default BlogPageContent;
