'use client';
import theme from '@/style/theme';
import styled from 'styled-components';
import useIsMobile from '@/hooks/useIsMobile';
import { Button, UnderlineText, LazyImage } from '@/reuseable-components';
import { BlogFooter } from '@/components';
import { useRouter } from 'next/navigation';
import { BLOGS_COVERS } from '@/public/images/blogs-cover';

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
  height: 360px;
  border: 1px dashed rgba(249, 249, 249, 0.32);
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
  const router = useRouter();

  function getCurrentBlogImage() {
    const currentBlogImage = localStorage.getItem(post.slug);

    if (currentBlogImage) {
      return currentBlogImage;
    }

    return BLOGS_COVERS[Math.floor(Math.random() * BLOGS_COVERS.length)];
  }

  return (
    <BlogPageHeaderContainer>
      <TitleWrapper>
        <ButtonWrapper>
          <Button
            onClick={() => router.push('/blog')}
            style={{
              background: theme.colors.secondary,
              padding: '8px 32px',
              height: isMobile ? 48 : 64,
            }}
          >
            <LazyImage
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
      <CoverImage src={getCurrentBlogImage()} alt={post.title} />
    </BlogPageHeaderContainer>
  );
};

export default BlogPageHeader;
