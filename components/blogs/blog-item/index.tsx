'use client';
import Link from 'next/link';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { BlogFooter } from '../blog-footer';
import Image from 'next/image';

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

export const BlogItem = ({ blog }: { blog: any }) => {
  const [isHydrationComplete, setIsHydrationComplete] = useState(false);

  useEffect(() => {
    if (!isHydrationComplete) {
      setIsHydrationComplete(true);
    }
  }, []);

  if (!isHydrationComplete) {
    return null;
  }

  const { image, title, description, slug, tags } = blog;

  const imagesArray = [
    '/images/blogs-cover/odigos_blog1.png',
    '/images/blogs-cover/odigos_blog3.png',
  ];

  return (
    <>
      <Link href={`/blog/${slug}`}>
        <BlogItemContainer>
          {image ? (
            <img
              style={{
                // objectFit: 'cover',
                height: 200,
                width: '100%',
                borderTopLeftRadius: 48,
                borderTopRightRadius: 48,
              }}
              src={imagesArray[Math.floor(Math.random() * imagesArray.length)]}
              alt={title}
            />
          ) : (
            'No image'
          )}

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
