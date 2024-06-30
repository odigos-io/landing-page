'use client';
import Link from 'next/link';
import styled from 'styled-components';
import { Text } from '@/reuseable-components';
import theme from '@/style/theme';
import { useEffect, useState } from 'react';

const BlogItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-radius: 48px;
  border: 1px dashed rgba(249, 249, 249, 0.32);
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 64px;
  padding: 80px 0;
`;

const BlogTitle = styled.h3`
  color: ${({ theme }) => theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: 32px;
  line-height: 150%;
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
`;

const BlogCover = ({ blog }: { blog: any }) => {
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

  return (
    <div style={{ padding: '0 64px 120px' }}>
      <Link href={`/blog/${slug}`}>
        <BlogItemContainer>
          <TextContainer>
            <BlogTitle>
              <Link href={`/blog/${slug}`}>{title}</Link>
            </BlogTitle>
            <BlogDescription>{description}</BlogDescription>
            <div
              style={{
                display: 'flex',
                gap: 16,
              }}
            >
              <Text color="#f5f5f576" fontFam={theme.font_family.secondary}>
                {tags[0]?.toUpperCase() || 'OBSERVABILITY'}
              </Text>
              <Text color="#f5f5f576" fontFam={theme.font_family.secondary}>
                {'|'}
              </Text>
              <Text color="#f5f5f576" fontFam={theme.font_family.secondary}>
                {'5 MIN READ' || ''}
              </Text>
            </div>
          </TextContainer>
          {image ? (
            <img
              style={{
                borderTopRightRadius: 48,
                borderBottomRightRadius: 48,
                objectFit: 'cover',
                maxWidth: 616,
              }}
              src={image}
              alt={title}
            />
          ) : (
            'No image'
          )}
        </BlogItemContainer>
      </Link>
    </div>
  );
};

export default BlogCover;
