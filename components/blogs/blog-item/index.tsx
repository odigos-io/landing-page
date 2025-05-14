'use client';
import Link from 'next/link';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { BlogFooter } from '../blog-footer';
import { BLOGS_COVERS } from '@/public/images/blogs-cover';

const BlogItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  height: 100%;
  border-radius: 48px;
  border: 1px dashed rgba(249, 249, 249, 0.32);
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.white};

    a {
      text-decoration: underline;
    }
  }
`;

const TextContainer = styled.div`
  display: flex;
  padding: 0px 40px 40px 40px;
  flex-direction: column;
  gap: 32px;
`;

const BlogTitle = styled.h3`
  color: ${({ theme }) => theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: 24px;
  line-height: 133.333%;
`;

const BlogDescription = styled.p`
  color: rgba(249, 249, 249, 0.8);
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.32px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BlogImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 200px;
  border-top-left-radius: 48px;
  border-top-tight-tadius: 48px;
`;

export const BlogItem = ({ blog }: { blog: any }) => {
  const [isHydrationComplete, setIsHydrationComplete] = useState(false);
  const [imageInvalid, setImageInvalid] = useState(false);

  useEffect(() => {
    if (!isHydrationComplete) {
      setIsHydrationComplete(true);
    }
  }, []);

  if (!isHydrationComplete) {
    return null;
  }

  const { image, title, description, slug, tags } = blog;
  const blogCover = (!imageInvalid && image) || BLOGS_COVERS[Math.floor(Math.random() * BLOGS_COVERS.length)];

  function saveCurrentBlogImageInLocalStorage(img: string) {
    localStorage.setItem(slug, img);
  }

  return (
    <>
      <Link href={`/blog/${slug}`}>
        <BlogItemContainer onClick={() => saveCurrentBlogImageInLocalStorage(blogCover)}>
          <BlogImage src={blogCover} alt={title} onError={() => setImageInvalid(true)} />
          <TextContainer>
            <BlogTitle>
              <Link href={`/blog/${slug}`}>{title}</Link>
            </BlogTitle>
            <BlogDescription>{description}</BlogDescription>
            <BlogFooter blog={blog} />
          </TextContainer>
        </BlogItemContainer>
      </Link>
    </>
  );
};
