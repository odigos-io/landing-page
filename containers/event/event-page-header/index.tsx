'use client';
import theme from '@/style/theme';
import styled from 'styled-components';
import useIsMobile from '@/hooks/useIsMobile';
import { Button, UnderlineText, LazyImage, Text } from '@/reuseable-components';
import { useRouter } from 'next/navigation';
import { BLOGS_COVERS } from '@/public/images/blogs-cover';
import { MaxWidthContainer } from '@/style';

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
  @media (width < 1200px) {
    font-size: 56px;
  }

  @media (width < 600px) {
    font-size: 40px;
  }
`;

const ButtonWrapper = styled.div<{ isMobile?: boolean }>`
  height: 64px;
  width: ${({ isMobile }) => (isMobile ? '100%' : 'auto')};
`;

const BlogPageHeaderContainer = styled.div`
  padding: 30px 64px 64px 64px;
  display: flex;
  width: 100%;
  max-width: 1440px;
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
const COLOR = '#F5F5F576';
const EventPageHeader = async ({ post }: Props) => {
  const isMobile = useIsMobile();

  const handleShareClick = () => {
    let shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      `https://odigos.io/join-us/meet-odigos-srecon-2025`
    )}`;

    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

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

  function renderShareButton() {
    return (
      <ButtonWrapper>
        <Button
          onClick={handleShareClick}
          style={{
            background: theme.colors.secondary,
            gap: 8,
          }}
        >
          <LazyImage
            src={'/icons/social/linkedin.svg'}
            alt="linkedin"
            width={18}
            height={18}
            style={{ marginTop: 2 }}
          />
          <UnderlineText size={20}>{'SHARE'}</UnderlineText>
        </Button>
      </ButtonWrapper>
    );
  }

  return (
    <MaxWidthContainer>
      <BlogPageHeaderContainer>
        <TitleWrapper>
          <div style={{ display: 'flex' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: isMobile ? 15 : 32,
              }}
            >
              <Title>{post.title}</Title>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  flexWrap: 'wrap',
                }}
              >
                <Text
                  color={COLOR}
                  fontFam={theme.font_family.secondary}
                  size={20}
                >
                  {'SANTA CLARA, CA, USA'}
                </Text>
                <Text
                  size={20}
                  color={COLOR}
                  fontFam={theme.font_family.secondary}
                >
                  {'|'}
                </Text>
                <Text
                  size={20}
                  color={COLOR}
                  fontFam={theme.font_family.secondary}
                >
                  {'March 25–27, 2025'}
                </Text>
                <Text
                  size={20}
                  color={COLOR}
                  fontFam={theme.font_family.secondary}
                >
                  {'|'}
                </Text>
                <Text
                  size={20}
                  color={COLOR}
                  fontFam={theme.font_family.secondary}
                >
                  {`Meet us at Odigos ${isMobile ? 'Booth 30' : ''}`}
                </Text>
                {!isMobile && (
                  <Text
                    size={20}
                    weight={700}
                    fontFam={theme.font_family.secondary}
                  >
                    {'Booth 30'}
                  </Text>
                )}
                <div
                  style={{
                    display: 'flex',
                    gap: 16,
                    width: isMobile ? '100%' : 'auto',
                  }}
                >
                  <ButtonWrapper isMobile={isMobile}>
                    <Button
                      onClick={() =>
                        window.open(
                          'https://calendly.com/d/cmtj-z7h-vgn/test-eden?month=2025-02'
                        )
                      }
                      style={{
                        background: theme.colors.secondary,
                        gap: 8,
                      }}
                    >
                      <LazyImage
                        src="/icons/common/expand.svg"
                        alt="back"
                        width={16}
                        height={24}
                        style={{ transform: 'rotate(-90deg)' }}
                      />
                      <UnderlineText size={20}>
                        {'BOOK A MEETING'}
                      </UnderlineText>
                    </Button>
                  </ButtonWrapper>
                  {!isMobile && renderShareButton()}
                </div>
              </div>
            </div>
          </div>
        </TitleWrapper>
        <CoverImage src={getCurrentBlogImage()} alt={post.title} />
        {isMobile && renderShareButton()}
      </BlogPageHeaderContainer>
    </MaxWidthContainer>
  );
};

export default EventPageHeader;
