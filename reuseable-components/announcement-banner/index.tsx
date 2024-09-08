import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Text } from '../text';
import Image from 'next/image';
import Link from 'next/link';
import { useAnnouncementStore } from '@/store/announcementStore';

interface AnnouncementBannerProps {
  title: string;
  link: string;
  linkText: string;
}

// Define the slide-in animation
const slideIn = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
`;

const Banner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #444ad9;
  width: 100%;
  border-bottom-right-radius: 24px;
  border-bottom-left-radius: 24px;
  padding: 16px 64px;
  visibility: hidden;
  animation: ${slideIn} 0.8s ease-out 1s forwards; /* 0.8s for animation, 2s delay */

  @media (max-width: 600px) {
    padding: 20px;
    animation: ${slideIn} 0.8s ease-out 0s forwards; /* Remove delay on mobile */
  }

  @media (max-width: 1100px) {
    padding: 20px;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  /* width: 100%; */
  /* max-width: 1440px; */
  padding-right: 4px;
`;

const Title = styled(Text)``;

const StyledLink = styled.span`
  display: flex;
  width: 89px;
  color: #f9f9f9;
  text-decoration: underline;
`;

const Divider = styled.div`
  width: 1.5px;
  height: 20px;
  opacity: 0.4;
  background: #f9f9f9;
  margin: 0 32px;
  @media (width < 600px) {
    opacity: 0;
    margin: 0 8px;
  }
`;

const LinksWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CloseIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  right: 16px;
`;

const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({
  title,
  link,
  linkText,
}) => {
  const { isOpen, closeBanner } = useAnnouncementStore();

  if (!isOpen || !title) {
    return null;
  }

  return (
    <Banner>
      <Content>
        <Image
          alt="frame"
          src={'/icons/common/frame.svg'}
          width={24}
          height={24}
          style={{ marginRight: 12 }}
        />
        <Title>{title}</Title>
      </Content>
      <Divider />
      <Link href={link} target="_blank">
        <LinksWrapper>
          <StyledLink>{linkText}</StyledLink>
        </LinksWrapper>
      </Link>
      <CloseIconWrapper>
        <Image
          onClick={closeBanner}
          alt="frame"
          src={'/icons/common/close.svg'}
          width={15}
          height={12}
        />
      </CloseIconWrapper>
    </Banner>
  );
};

export { AnnouncementBanner };
