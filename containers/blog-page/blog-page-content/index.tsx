'use client';

import { MarkdownToHtml, NewsletterPopup } from '@/components';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
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
  const [showNewsletter, setShowNewsletter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled to the bottom of the blog post
      const scrollPosition = window.scrollY + window.innerHeight;
      const bottomPosition = document.documentElement.scrollHeight - 1400; // Adjusting to trigger a little before the absolute bottom

      if (scrollPosition >= bottomPosition) {
        setShowNewsletter(true);
        window.removeEventListener('scroll', handleScroll); // Remove event listener once the popup is shown
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll); // Clean up listener
    };
  }, []);
  return (
    <BlogPageContentContainer>
      <MarkdownWrapper>
        <MarkdownToHtml source={post.content} />
        <ShareButtons link={post.slug} />
      </MarkdownWrapper>
      {showNewsletter && <NewsletterPopup />}
    </BlogPageContentContainer>
  );
};

export default BlogPageContent;
