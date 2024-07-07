'use client';
import Link from 'next/link';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { BlogFooter } from '../blog-footer';

const BlogCoverContainer = styled.div`
  padding: 120px 64px;
  @media (max-width: 800px) {
    padding: 80px 20px 48px 20px;
  }
`;

const BlogItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-radius: 48px;
  border: 1px dashed rgba(249, 249, 249, 0.32);
  @media (width <= 1200px) {
    flex-direction: column-reverse;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 64px;
  padding: 80px 0;
  max-width: 45%;
  @media (max-width: 1200px) {
    max-width: 100%;
    padding: 32px;
    margin-left: 0;
  }
`;

const BlogTitle = styled.h3`
  color: ${({ theme }) => theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: 32px;
  line-height: 150%;
  @media (max-width: 800px) {
    font-size: 28px;
  }
`;

const BlogDescription = styled.p`
  color: rgba(249, 249, 249, 0.8);
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: 20px;
  line-height: 160%;
  letter-spacing: 0.4px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 24px;
  margin-bottom: 40px;

  @media (max-width: 800px) {
    font-size: 16px;
    margin-top: 12px;
    margin-bottom: 32px;
  }
`;

const BlogCoverImage = styled.img`
  border-top-right-radius: 48px;
  border-bottom-right-radius: 48px;
  object-fit: cover;
  max-width: 45%;

  @media (max-width: 1200px) {
    border-bottom-right-radius: 0px;
    border-top-left-radius: 48px;
    max-width: 100%;
  }
`;

export const BlogCover = ({ blog }: { blog: any }) => {
  const [isHydrationComplete, setIsHydrationComplete] = useState(false);

  useEffect(() => {
    if (!isHydrationComplete) {
      setIsHydrationComplete(true);
    }
  }, []);

  if (!isHydrationComplete) {
    return null;
  }

  const { image, title, description, slug } = blog;

  return (
    <BlogCoverContainer>
      <Link href={`/blog/${slug}`}>
        <BlogItemContainer>
          <TextContainer>
            <BlogTitle>
              <Link href={`/blog/${slug}`}>{title}</Link>
            </BlogTitle>
            <BlogDescription>{description}</BlogDescription>
            <BlogFooter blog={blog} />
          </TextContainer>
          {image ? <BlogCoverImage src={image} alt={title} /> : 'No image'}
        </BlogItemContainer>
      </Link>
    </BlogCoverContainer>
  );
};
