import BlogFooter from '@/components/Blog/BlogFooter';
import { Text } from '@/reuseable-components/text';
import theme from '@/style/theme';
import Link from 'next/link';
import styled from 'styled-components';

const BlogItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  border-radius: 48px;
  border: 1px dashed rgba(249, 249, 249, 0.32);
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
  height: 74px;
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
  const { image, title, metadata, slug, tags, author, pubDate, description } =
    blog;

  return (
    <>
      <Link href={`/blog/${slug}`}>
        <BlogItemContainer>
          {image ? (
            <img
              style={{
                objectFit: 'cover',
                height: 200,
                width: '100%',
                borderTopLeftRadius: 48,
                borderTopRightRadius: 48,
              }}
              src={image}
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
