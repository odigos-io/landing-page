'use client';
import React from 'react';
import styled from 'styled-components';
import { Button, UnderlineText } from '@/reuseable-components';
import useIsMobile from '@/hooks/useIsMobile';

interface ShareButtonsProps {
  isMobile?: boolean;
  link: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ link }) => {
  const theme = {
    colors: {
      secondary: '#151515',
    },
  };

  const isMobile = useIsMobile();

  const handleShareClick = (platform: string) => {
    let shareUrl = '';

    switch (platform) {
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          `https://odigos.io/blog/${link}`
        )}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          `https://odigos.io/blog/${link}`
        )}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          `https://odigos.io/blog/${link}`
        )}`;
        break;
      default:
        break;
    }

    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Divider />
      <Container>
        <ShareText>Share:</ShareText>
        <ButtonGroup>
          <ButtonWrapper>
            <Button
              onClick={() => handleShareClick('linkedin')}
              style={{
                background: theme.colors.secondary,
                padding: '8px 32px',
                height: isMobile ? 48 : 64,
              }}
            >
              <UnderlineText size={20}>LINKEDIN</UnderlineText>
            </Button>
          </ButtonWrapper>
          <ButtonWrapper>
            <Button
              onClick={() => handleShareClick('facebook')}
              style={{
                background: theme.colors.secondary,
                padding: '8px 32px',
                height: isMobile ? 48 : 64,
              }}
            >
              <UnderlineText size={20}>FACEBOOK</UnderlineText>
            </Button>
          </ButtonWrapper>
          <ButtonWrapper>
            <Button
              onClick={() => handleShareClick('twitter')}
              style={{
                background: theme.colors.secondary,
                padding: '8px 32px',
                height: isMobile ? 48 : 64,
              }}
            >
              <UnderlineText size={20}>X (TWITTER)</UnderlineText>
            </Button>
          </ButtonWrapper>
        </ButtonGroup>
      </Container>
    </>
  );
};

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #f9f9f9;
  opacity: 0.4;
  margin: 64px 0;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ShareText = styled.span`
  color: #f9f9f9;
  font-family: 'Inter Tight';
  font-size: 20px;
  font-weight: 300;
  line-height: 160%;
  letter-spacing: 0.4px;
  margin-right: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
`;

const ButtonWrapper = styled.div`
  min-width: 144px;
  height: 64px;
`;

export default ShareButtons;
