'use client';
import styled from 'styled-components';
import { MaxWidthContainer } from '@/style';
import useIsMobile from '@/hooks/useIsMobile';
import { BLOGS_COVERS } from '@/public/images/blogs-cover';
import { useAnnouncementStore } from '@/store/announcementStore';

type Props = {
  post: any;
};

const BlogPageHeaderContainer = styled.div<{ largePadding: boolean }>`
  padding: 120px 64px 0px 64px;
  display: flex;
  width: 100%;
  max-width: 1440px;
  flex-direction: column;
  gap: 80px;
  @media (width < 1000px) {
    padding: 120px 20px 0px 20px;
    gap: 40px;
    @media (max-width: 600px) {
      padding-top: ${({ largePadding }) => (largePadding ? '120px' : '60px')};
    }
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

const EventHero = async ({ post }: Props) => {
  const isMobile = useIsMobile();
  const { isOpen } = useAnnouncementStore();

  function getCurrentBlogImage() {
    if (post.webCoverImage) {
      return isMobile && post.mobileCoverImage
        ? post.mobileCoverImage
        : post.webCoverImage;
    }

    const currentBlogImage = localStorage.getItem(post.slug);

    if (currentBlogImage) {
      return currentBlogImage;
    }

    return BLOGS_COVERS[Math.floor(Math.random() * BLOGS_COVERS.length)];
  }

  return (
    <MaxWidthContainer>
      <BlogPageHeaderContainer largePadding={isOpen}>
        <CoverImage src={getCurrentBlogImage()} alt={post.title} />
      </BlogPageHeaderContainer>
    </MaxWidthContainer>
  );
};

export default EventHero;
