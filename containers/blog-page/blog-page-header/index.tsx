'use client';
import BlogFooter from '@/components/Blog/BlogFooter';
import { Button, UnderlineText } from '@/reuseable-components';
import theme from '@/style/theme';
import Image from 'next/image';
import styled from 'styled-components';

type Props = {
  post: any;
};

const gradientBackground = {
  background: 'linear-gradient(to right, #ff9900, #ff6600)', // Define your gradient here
  WebkitBackgroundClip: 'text',
  color: 'transparent', // Make the text transparent
  display: 'inline-block',
};

const Title = styled.div`
  color: ${theme.colors.white};
  font-family: ${theme.font_family.primary};
  font-size: 80px;
  font-style: normal;
  font-weight: 400;
  line-height: 110%;
`;

const ButtonWrapper = styled.div`
  width: 144px;
  height: 64px;
`;

const BlogPageHeaderContainer = styled.div`
  padding: 120px 64px 0px 64px;
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 48px;
  background: linear-gradient(
      0deg,
      rgba(36, 32, 35, 0.16) 0%,
      rgba(36, 32, 35, 0.16) 100%
    ),
    url(<path-to-image>) lightgray 50% / cover no-repeat;
  height: 360px;
`;

const BlogPageHeader = async ({ post }: Props) => {
  function renderTags() {
    return post?.tags.map((item) => (
      <h1 style={{ fontSize: 20, fontWeight: 600, ...gradientBackground }}>
        {item}
      </h1>
    ));
  }

  return (
    <BlogPageHeaderContainer>
      <div style={{ display: 'flex', gap: 64 }}>
        <ButtonWrapper>
          <Button
            style={{
              background: theme.colors.secondary,
              padding: '8px 32px',
              height: 64,
            }}
          >
            <Image
              src="/icons/common/expand.svg"
              alt="back"
              width={16}
              height={24}
              style={{ transform: 'rotate(-90deg)' }}
            />
            <UnderlineText size={20}>BACK</UnderlineText>
          </Button>
        </ButtonWrapper>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <Title>{post.title}</Title>
          <BlogFooter blog={post} />
        </div>
      </div>
      <CoverImage src={post.image} alt={post.title} />
    </BlogPageHeaderContainer>
  );
};

export default BlogPageHeader;
