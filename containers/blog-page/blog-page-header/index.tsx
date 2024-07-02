'use client';
import BlogFooter from '@/components/blog/BlogFooter';
import useIsMobile from '@/hooks/useIsMobile';
import { Button, UnderlineText } from '@/reuseable-components';
import theme from '@/style/theme';
import Image from 'next/image';
import styled from 'styled-components';

type Props = {
  post: any;
};

const Title = styled.div`
  color: ${theme.colors.white};
  font-family: ${theme.font_family.primary};
  font-size: 80px;
  font-style: normal;
  font-weight: 400;
  line-height: 110%;
  @media (width < 1000px) {
    font-size: 56px;
  }

  @media (width < 600px) {
    font-size: 40px;
  }
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
  @media (width < 1000px) {
    padding: 0px 20px 0px 20px;
    gap: 40px;
  }
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

const TitleWrapper = styled.div`
  display: flex;
  gap: 64px;

  @media (width< 1000px) {
    flex-direction: column;
    gap: 24px;
  }
`;

const BlogPageHeader = async ({ post }: Props) => {
  const isMobile = useIsMobile();
  return (
    <BlogPageHeaderContainer>
      <TitleWrapper>
        <ButtonWrapper>
          <Button
            style={{
              background: theme.colors.secondary,
              padding: '8px 32px',
              height: isMobile ? 48 : 64,
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? 15 : 32,
          }}
        >
          <Title>{post.title}</Title>
          <BlogFooter blog={post} />
        </div>
      </TitleWrapper>
      <CoverImage src={post.image} alt={post.title} />
    </BlogPageHeaderContainer>
  );
};

export default BlogPageHeader;
